---
id: backup
title: Backup API
sidebar_position: 8
---

# Backup API

Manage database backups programmatically.

## Endpoints

### List backups

```
GET /api/backup
```

**Auth:** Required

**Response (200):**

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

### Trigger a manual backup

```
POST /api/backup
```

**Auth:** Required

**Request body:** None

**Response (201):**

```json
{
  "id": "backup-uuid-new",
  "filename": "patchone_backup_2026-05-11_11-30.db",
  "size_bytes": 4198400,
  "type": "manual",
  "created_at": "2026-05-11T11:30:00Z"
}
```

**Audit:** Logged as `backup_created`.

---

### Download a backup file

```
GET /api/backup/{backup_id}/download
```

**Auth:** Required

**Response:** Binary file download.

- On-premises: SQLite `.db` file
- Cloud mode: PostgreSQL dump file

Use this endpoint to automate off-site backup archiving:

```bash
BACKUP_ID=$(curl -s -b cookies.txt http://server:8000/api/backup | jq -r '.[0].id')
curl -b cookies.txt http://server:8000/api/backup/$BACKUP_ID/download \
  -o /offsite/backup_$(date +%Y%m%d).db
```

---

### Delete a backup

```
DELETE /api/backup/{backup_id}
```

**Auth:** Required

**Response (204):** No content. The backup file is permanently deleted.

**Error responses:**

| Code | Cause |
|---|---|
| 404 | Backup not found |

**Audit:** Logged as `backup_deleted`.

## Automated off-site archiving example

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
