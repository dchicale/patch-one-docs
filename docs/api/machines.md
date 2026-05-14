---
id: machines
title: Machines API
sidebar_position: 3
---

# Machines API

Manage the fleet of registered Windows machines.

## Endpoints

### List machines

```
GET /api/machines
```

**Auth:** Required

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `status` | `online` \| `offline` | Filter by machine status |
| `search` | string | Filter by hostname or tag (partial match) |

**Response (200):**

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

### Get machine detail

```
GET /api/machines/{machine_id}
```

**Auth:** Required

**Path parameter:** `machine_id` — unique machine identifier (UUID)

**Response (200):**

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

### Update machine tags / notes

```
PATCH /api/machines/{machine_id}
```

**Auth:** Required

**Request body** (all fields optional):

```json
{
  "tags": ["office", "priority"],
  "notes": "Finance department — replaced SSD 2026-03-10"
}
```

**Response (200):** Updated machine object.

---

### Delete (soft-delete) machine

```
DELETE /api/machines/{machine_id}
```

**Auth:** Required

**Response (204):** No content.

The machine record is marked `status = deleted` and hidden from the default list. If the same physical machine checks in again, it is automatically restored.

**Audit:** This action is logged as `machine_deleted`.
