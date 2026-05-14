---
id: overview
title: API Overview
sidebar_position: 1
---

# API Overview

PatchOne exposes a REST API at the same base URL as the dashboard. You can use it to automate fleet management tasks, integrate with monitoring systems, or build custom tooling.

## Base URL

| Deployment | Base URL |
|---|---|
| On-premises | `http://<server-address>` |
| Cloud | `https://<your-domain>` |

## Authentication

All API requests require a valid admin session. Authenticate first via the login endpoint, then include the session cookie in subsequent requests.

See [Authentication](/docs/api/authentication) for details.

## Response format

All endpoints return JSON. Errors use a consistent shape:

```json
{
  "detail": "Description of the problem"
}
```

## HTTP status codes

| Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Created |
| 204 | No content |
| 400 | Bad request |
| 401 | Not authenticated |
| 403 | Forbidden |
| 404 | Not found |
| 409 | Conflict |
| 422 | Validation error |
| 429 | Rate limited |
| 500 | Server error |

## Available API sections

| Section | Purpose |
|---|---|
| [Authentication](/docs/api/authentication) | Login, logout, session management |
| [Machines](/docs/api/machines) | Fleet inventory and machine management |
| [Deploy](/docs/api/deploy) | Queue and monitor update deployments |
| [Catalog](/docs/api/catalog) | Manage the software catalog |
| [Notifications](/docs/api/notifications) | Read and dismiss notifications |
| [Audit](/docs/api/audit) | Query the immutable audit log |
| [Backup](/docs/api/backup) | Trigger and download database backups |

## Rate limiting

Login attempts are rate-limited. Repeated failures from the same source result in a temporary lockout.

## Multi-tenancy

In cloud mode, every request is automatically scoped to your organisation. You cannot access another organisation's data regardless of the request.
