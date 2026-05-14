---
id: audit
title: Audit API
sidebar_position: 7
---

# Audit API

Read the immutable audit log. No write or delete operations are available.

## Endpoints

### List audit entries

```
GET /api/audit
```

**Auth:** Required

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `event_type` | string | Filter by event type (e.g., `deploy_queued`) |
| `from` | ISO 8601 date | Start of date range (inclusive) |
| `to` | ISO 8601 date | End of date range (inclusive) |
| `actor` | string | Filter by admin username |
| `limit` | integer | Max records to return (default: 100, max: 1000) |
| `offset` | integer | Pagination offset |

**Response (200):**

```json
[
  {
    "id": "audit-uuid",
    "timestamp": "2026-05-11T10:05:30Z",
    "event_type": "deploy_completed",
    "actor": "admin",
    "target": "DESKTOP-ABC01",
    "detail": {
      "job_id": "job-uuid-1",
      "software": "Google Chrome",
      "result": "Successfully installed Google.Chrome"
    },
    "ip_address": "192.168.1.50"
  }
]
```

**Event types:** See [Audit Log](/docs/dashboard/audit#what-is-logged) for the full list.

---

### Export audit log as CSV

```
GET /api/audit/export.csv
```

**Auth:** Required

**Query parameters:** Same as the list endpoint (date range, event type, actor). The export respects current filters.

**Response:** `Content-Type: text/csv` file download.

CSV columns:

```
timestamp,event_type,actor,target,detail,ip_address
```

The `detail` column is serialised as a JSON string within the CSV cell.

## Tamper protection

The audit API provides no `POST`, `PUT`, `PATCH`, or `DELETE` operations. Audit entries are append-only at the database level. In on-premises mode, apply OS-level file permissions to the database directory to prevent direct modification.
