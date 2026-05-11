---
id: notifications
title: Notifications API
sidebar_position: 6
---

# Notifications API

Read and dismiss dashboard notifications.

## Endpoints

### List notifications

```
GET /api/notifications
```

**Auth:** Required

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `unread_only` | boolean | If `true`, return only unread notifications |

**Response (200):**

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

**Notification types:**

| `type` | Description |
|---|---|
| `machine_registered` | New machine appeared in the fleet |
| `machine_offline` | Machine missed its heartbeat window |
| `job_completed` | Deploy job finished successfully |
| `job_failed` | Deploy job failed |
| `updates_available` | Machine reported pending winget updates |
| `daily_summary` | 8 AM automated fleet health briefing |

---

### Mark a notification as read

```
PATCH /api/notifications/{notification_id}/read
```

**Auth:** Required

**Response (200):**

```json
{"id": "notif-uuid", "read": true}
```

---

### Mark all notifications as read

```
PATCH /api/notifications/read-all
```

**Auth:** Required

**Response (200):**

```json
{"marked_read": 5}
```

Returns the count of notifications that were marked as read.
