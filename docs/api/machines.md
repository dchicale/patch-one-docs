---
id: machines
title: API de Máquinas
sidebar_position: 3
---

# API de Máquinas

Gerencie a frota de máquinas Windows registradas.

## Endpoints

### Listar máquinas

```
GET /api/machines
```

**Auth:** Obrigatória

**Parâmetros de consulta:**

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `status` | `online` \| `offline` | Filtrar por status da máquina |
| `search` | string | Filtrar por hostname ou tag (correspondência parcial) |

**Resposta (200):**

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "hostname": "DESKTOP-ABC01",
    "os": "Windows 11 Pro 23H2",
    "agent_version": "1.1.0",
    "status": "online",
    "last_seen": "2026-05-11T10:30:00Z",
    "pending_updates": 3,
    "tags": ["office", "priority"],
    "notes": "Finance department"
  }
]
```

---

### Obter detalhes de uma máquina

```
GET /api/machines/{machine_id}
```

**Auth:** Obrigatória

**Parâmetro de caminho:** `machine_id` — identificador único da máquina (UUID)

**Resposta (200):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "hostname": "DESKTOP-ABC01",
  "os": "Windows 11 Pro 23H2",
  "agent_version": "1.1.0",
  "status": "online",
  "last_seen": "2026-05-11T10:30:00Z",
  "pending_updates": 3,
  "tags": ["office", "priority"],
  "notes": "Finance department",
  "software": [
    {
      "name": "Google Chrome",
      "version": "124.0.6367.60",
      "publisher": "Google LLC",
      "install_date": "2026-01-15"
    }
  ]
}
```

---

### Atualizar tags / notas da máquina

```
PATCH /api/machines/{machine_id}
```

**Auth:** Obrigatória

**Corpo da requisição** (todos os campos são opcionais):

```json
{
  "tags": ["office", "priority"],
  "notes": "Finance department — replaced SSD 2026-03-10"
}
```

**Resposta (200):** Objeto da máquina atualizado.

---

### Excluir (exclusão lógica) máquina

```
DELETE /api/machines/{machine_id}
```

**Auth:** Obrigatória

**Resposta (204):** Sem conteúdo.

O registro da máquina é marcado como `status = deleted` e ocultado da lista padrão. Se a mesma máquina física fizer check-in novamente, ela será restaurada automaticamente.

**Auditoria:** Esta ação é registrada como `machine_deleted`.
