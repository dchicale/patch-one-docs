---
id: access-control
title: Access Control
sidebar_position: 2
---

# Access Control

## Authentication model

PatchOne uses two separate authentication mechanisms:

| Actor | Mechanism | Where used |
|---|---|---|
| Admin (dashboard) | JWT in HttpOnly cookie | All `/api/admin/*`, `/api/machines`, `/api/deploy`, `/api/jobs`, `/api/catalog`, `/api/notifications`, `/api/audit`, `/api/backup` |
| Agent (Windows Service) | Shared `API_KEY` in header | `/api/agent/report`, `/api/agent/jobs/{id}/done`, `/api/agent/version` |

## JWT session tokens

- Signed with `HS256` using `SECRET_KEY` from `.env`
- Stored in an HttpOnly cookie — not accessible to JavaScript (prevents XSS theft)
- Expire after `SESSION_TIMEOUT_HOURS` (default: 8 hours)
- Validated on every request by the auth middleware

## Password storage

Admin passwords are hashed with **bcrypt** (cost factor 12). Plaintext passwords are never stored. The initial admin password is set during installation via `.env` and immediately hashed.

## Rate limiting

Login attempts are rate-limited per IP address. After a configurable number of consecutive failures, the IP is temporarily blocked. This prevents brute-force attacks on the admin login.

## API key security

The `API_KEY` is a shared secret between the server and all agents in a tenant. Store it securely:

- In `config.ini` on each agent machine with restricted NTFS permissions
- In the server `.env` (not committed to version control)

Rotate the API key by updating `.env` on the server and `config.ini` on all agents, then restarting both.

## Tenant isolation (cloud mode)

In cloud mode, every admin JWT contains a `tenant_id` claim. The tenant isolation middleware:

1. Extracts `tenant_id` from the JWT on every request
2. Appends `WHERE tenant_id = :tenant_id` to every database query
3. Returns HTTP 403 if the requested resource belongs to a different tenant

Cross-tenant access is impossible through the API regardless of credentials.

## Protected routes

The auth middleware blocks all requests to protected routes without a valid session cookie. Public routes (no auth required):

- `GET /health`
- `POST /api/admin/login`
- `POST /api/agent/report`
- `POST /api/agent/jobs/{id}/done`
- `GET /api/agent/version`
- Static dashboard assets

## Audit trail

Every authentication event is logged:

| Event | Logged when |
|---|---|
| `admin_login` | Successful login |
| `admin_login_failed` | Wrong username or password |
| `admin_logout` | Explicit logout |

Failed login attempts include the source IP address in the audit entry.

## Recommendations for production

- Set a strong, unique `SECRET_KEY` (32+ random bytes)
- Use HTTPS (TLS) — mandatory for cloud mode, strongly recommended for on-prem
- Rotate `API_KEY` if an agent machine is decommissioned or compromised
- Enable Windows Firewall and restrict port 8000 to trusted subnets
- Apply NTFS read restrictions to `server/.env` and `config.ini`
