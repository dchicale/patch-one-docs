---
id: notifications
title: API de Notificações
sidebar_position: 6
---

# API de Notificações

Leia e dispense notificações do painel.

## Endpoints

### Listar notificações

```
GET /api/notifications
```

**Auth:** Obrigatória

**Parâmetros de consulta:**

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `unread_only` | boolean | Se `true`, retorna apenas notificações não lidas |

**Resposta (200):**

```json
[
  {
    "id": "notif-uuid",
    "type": "machine_offline",
    "message": "Machine DESKTOP-ABC01 has gone offline",
    "read": false,
    "created_at": "2026-05-11T09:30:00Z"
  },
  {
    "id": "notif-uuid-2",
    "type": "daily_summary",
    "message": "Daily summary: 45 online, 2 offline, 12 with pending updates",
    "read": true,
    "created_at": "2026-05-11T08:00:00Z"
  }
]
```

**Tipos de notificação:**

| `type` | Descrição |
|---|---|
| `machine_registered` | Nova máquina apareceu na frota |
| `machine_offline` | Máquina perdeu sua janela de heartbeat |
| `job_completed` | Job de deploy concluído com sucesso |
| `job_failed` | Job de deploy falhou |
| `updates_available` | Máquina reportou atualizações winget pendentes |
| `daily_summary` | Resumo automatizado da saúde da frota às 8h |

---

### Marcar uma notificação como lida

```
PATCH /api/notifications/{notification_id}/read
```

**Auth:** Obrigatória

**Resposta (200):**

```json
{"id": "notif-uuid", "read": true}
```

---

### Marcar todas as notificações como lidas

```
PATCH /api/notifications/read-all
```

**Auth:** Obrigatória

**Resposta (200):**

```json
{"marked_read": 5}
```

Retorna a quantidade de notificações que foram marcadas como lidas.
