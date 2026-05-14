---
id: backup
title: API de Backup
sidebar_position: 8
---

# API de Backup

Gerencie backups do banco de dados de forma programática.

## Endpoints

### Listar backups

```
GET /api/backup
```

**Auth:** Obrigatória

**Resposta (200):**

```json
[
  {
    "id": "backup-uuid",
    "filename": "patchone_backup_2026-05-11_02-00.db",
    "size_bytes": 4194304,
    "type": "scheduled",
    "created_at": "2026-05-11T02:00:00Z"
  },
  {
    "id": "backup-uuid-2",
    "filename": "patchone_backup_2026-05-11_11-30.db",
    "size_bytes": 4198400,
    "type": "manual",
    "created_at": "2026-05-11T11:30:00Z"
  }
]
```

---

### Acionar um backup manual

```
POST /api/backup
```

**Auth:** Obrigatória

**Corpo da requisição:** Nenhum

**Resposta (201):**

```json
{
  "id": "backup-uuid-new",
  "filename": "patchone_backup_2026-05-11_11-30.db",
  "size_bytes": 4198400,
  "type": "manual",
  "created_at": "2026-05-11T11:30:00Z"
}
```

**Auditoria:** Registrado como `backup_created`.

---

### Baixar um arquivo de backup

```
GET /api/backup/{backup_id}/download
```

**Auth:** Obrigatória

**Resposta:** Download de arquivo binário.

- On-premises: arquivo SQLite `.db`
- Modo nuvem: arquivo de dump do PostgreSQL

Use este endpoint para automatizar o arquivamento de backups fora do site:

```bash
BACKUP_ID=$(curl -s -b cookies.txt http://server:8000/api/backup | jq -r '.[0].id')
curl -b cookies.txt http://server:8000/api/backup/$BACKUP_ID/download \
  -o /offsite/backup_$(date +%Y%m%d).db
```

---

### Excluir um backup

```
DELETE /api/backup/{backup_id}
```

**Auth:** Obrigatória

**Resposta (204):** Sem conteúdo. O arquivo de backup é excluído permanentemente.

**Respostas de erro:**

| Código | Causa |
|---|---|
| 404 | Backup não encontrado |

**Auditoria:** Registrado como `backup_deleted`.

## Exemplo de arquivamento automatizado fora do site

```python
import requests

session = requests.Session()
session.post("http://server:8000/api/admin/login", json={
    "username": "admin", "password": "password"
})

backups = session.get("http://server:8000/api/backup").json()
latest = max(backups, key=lambda b: b["created_at"])

content = session.get(f"http://server:8000/api/backup/{latest['id']}/download").content

with open(f"/offsite/{latest['filename']}", "wb") as f:
    f.write(content)
```
