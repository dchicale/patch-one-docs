---
id: deploy
title: API de Deploy e Jobs
sidebar_position: 4
---

# API de Deploy e Jobs

Enfileire implantações de software e monitore o status dos jobs.

## Endpoints de deploy

### Enfileirar um job de deploy

```
POST /api/deploy
```

**Auth:** Obrigatória

**Corpo da requisição:**

```json
{
  "machine_ids": [
    "550e8400-e29b-41d4-a716-446655440000",
    "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
  ],
  "catalog_item_id": 42
}
```

**Resposta (201):**

```json
{
  "batch_id": "batch-uuid",
  "jobs": [
    {
      "id": "job-uuid-1",
      "machine_id": "550e8400...",
      "catalog_item_id": 42,
      "status": "queued",
      "created_at": "2026-05-11T10:00:00Z"
    }
  ]
}
```

**Respostas de erro:**

| Código | Causa |
|---|---|
| 404 | ID de máquina ou ID de item do catálogo não encontrado |
| 409 | Duplicado — já existe um job enfileirado ou em andamento para este par máquina + software |

**Observações:**
- Todos os jobs em uma única requisição compartilham o mesmo `batch_id`
- A verificação `409` evita deploys duplicados; o job duplicado é ignorado, os demais prosseguem

---

## Endpoints de jobs

### Listar jobs

```
GET /api/jobs
```

**Auth:** Obrigatória

**Parâmetros de consulta:**

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `status` | `queued` \| `in_progress` \| `completed` \| `failed` | Filtrar por estado do job |
| `machine_id` | UUID | Filtrar para uma máquina específica |
| `batch_id` | UUID | Filtrar para um batch específico |

**Resposta (200):**

```json
[
  {
    "id": "job-uuid-1",
    "machine_id": "550e8400...",
    "machine_hostname": "DESKTOP-ABC01",
    "catalog_item_id": 42,
    "software_name": "Google Chrome",
    "status": "completed",
    "result": "Successfully installed Google.Chrome",
    "created_at": "2026-05-11T10:00:00Z",
    "updated_at": "2026-05-11T10:05:30Z",
    "batch_id": "batch-uuid"
  }
]
```

---

### Obter detalhes de um job

```
GET /api/jobs/{job_id}
```

**Auth:** Obrigatória

**Resposta (200):** Mesmo formato de um item individual da lista acima.

---

### Cancelar um job enfileirado

```
DELETE /api/jobs/{job_id}
```

**Auth:** Obrigatória

**Resposta (204):** Sem conteúdo. O job é removido da fila.

**Respostas de erro:**

| Código | Causa |
|---|---|
| 404 | Job não encontrado |
| 409 | O job está `in_progress` ou já foi concluído — não é possível cancelar |

## Ciclo de vida do job

```
queued
  └─► in_progress  (agent picks up on next check-in)
         ├─► completed
         └─► failed
```

O agente busca os jobs enfileirados automaticamente e reporta os resultados no próximo ciclo de check-in.
