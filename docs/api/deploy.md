---
id: deploy
title: Deploy & Jobs API
sidebar_position: 4
---

# Deploy & Jobs API

Queue software deployments and monitor job status.

## Deploy endpoints

### Queue a deploy job

```
POST /api/deploy
```

**Auth:** Required

**Request body:**

```json
{
  "machine_ids": [
    "550e8400-e29b-41d4-a716-446655440000",
    "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
  ],
  "catalog_item_id": 42
}
```

**Response (201):**

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

**Error responses:**

| Code | Cause |
|---|---|
| 404 | Machine ID or catalog item ID not found |
| 409 | Duplicate — a queued or in-progress job already exists for this machine + software pair |

**Notes:**
- All jobs in a single request share the same `batch_id`
- The `409` check prevents double-deploys; the duplicate job is skipped, others proceed

---

## Jobs endpoints

### List jobs

```
GET /api/jobs
```

**Auth:** Required

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `status` | `queued` \| `in_progress` \| `completed` \| `failed` | Filter by job state |
| `machine_id` | UUID | Filter to a specific machine |
| `batch_id` | UUID | Filter to a specific batch |

**Response (200):**

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

### Get job detail

```
GET /api/jobs/{job_id}
```

**Auth:** Required

**Response (200):** Same shape as a single item from the list above.

---

### Cancel a queued job

```
DELETE /api/jobs/{job_id}
```

**Auth:** Required

**Response (204):** No content. Job is deleted from the queue.

**Error responses:**

| Code | Cause |
|---|---|
| 404 | Job not found |
| 409 | Job is `in_progress` or already completed — cannot cancel |

## Job lifecycle

```
queued
  └─► in_progress  (agent picks up on next heartbeat)
         ├─► completed  (winget exit code 0)
         └─► failed     (winget non-zero exit code)
```

The agent reports job completion via `POST /api/agent/jobs/{id}/done` (agent-only endpoint, uses `API_KEY` header not session cookie).
