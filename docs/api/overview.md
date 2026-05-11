---
id: overview
title: API Overview
sidebar_position: 1
---

# API Overview

PatchOne exposes a REST API at the same base URL as the dashboard.

## Base URL

| Deployment | Base URL |
|---|---|
| On-premises | `http://<server-ip>:8000` |
| Cloud | `https://<domain>` |

## Authentication

All admin endpoints require an `access_token` HttpOnly cookie set by `POST /api/admin/login`. Agent endpoints use a shared `API_KEY` header instead of cookies.

See [Authentication](/docs/api/authentication) for details.

## Response format

All endpoints return JSON. Standard error shape:

```json
{
  "detail": "Error message describing the problem"
}
```

## HTTP status codes

| Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Created |
| 204 | No content (delete operations) |
| 400 | Bad request — validation error |
| 401 | Unauthenticated — missing or expired token |
| 403 | Forbidden — wrong tenant or insufficient permission |
| 404 | Not found |
| 409 | Conflict — e.g., duplicate deploy job |
| 422 | Unprocessable entity — request body schema error |
| 429 | Rate limited |
| 500 | Internal server error |

## Routers

| Router | Prefix | Purpose |
|---|---|---|
| [Authentication](/docs/api/authentication) | `/api/admin` | Login, logout, profile |
| [Machines](/docs/api/machines) | `/api/machines` | Fleet management |
| Agent | `/api/agent` | Heartbeat, jobs, version (agent-only) |
| [Deploy](/docs/api/deploy) | `/api/deploy`, `/api/jobs` | Queue and monitor deploy jobs |
| [Catalog](/docs/api/catalog) | `/api/catalog` | Software catalog CRUD |
| [Notifications](/docs/api/notifications) | `/api/notifications` | Read and dismiss notifications |
| [Audit](/docs/api/audit) | `/api/audit` | Immutable audit log |
| [Backup](/docs/api/backup) | `/api/backup` | Database backup management |

## Health check

```
GET /health
```

No authentication required. Returns server and database liveness:

```json
{"status": "ok", "db": "ok"}
```

Use this endpoint for load balancer health checks and monitoring.

## Rate limiting

Login attempts are rate-limited at the server level. Repeated failed logins from the same IP result in a temporary lockout. The lockout duration is not configurable in v1.0.

## Multi-tenancy

In cloud mode, every request is scoped to the `tenant_id` extracted from the admin's JWT token. You cannot access another tenant's resources with your token.
