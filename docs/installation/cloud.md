---
id: cloud
title: Cloud / Docker Installation
sidebar_position: 2
---

# Cloud / Docker Installation

The cloud mode uses Docker Compose with PostgreSQL and nginx TLS termination. It supports multiple tenants — each client organisation's data is isolated by `tenant_id`.

## Architecture

```
Internet
    ↓ HTTPS :443
nginx  (TLS termination, reverse proxy)
    ↓ HTTP :8000
FastAPI server  (Uvicorn)
    ↓ SQLAlchemy Core
PostgreSQL  (persistent Docker volume)
```

## Prerequisites

- Docker Engine 24.x
- Docker Compose v2.x
- A domain name pointing to the server
- TLS certificate and key (Let's Encrypt / Certbot recommended)

## Step 1 — Clone and configure

```bash
git clone <repo> patchone
cd patchone
cp deploy/cloud/.env.example deploy/cloud/.env
```

Edit `deploy/cloud/.env`:

```ini
# PostgreSQL
POSTGRES_USER=patchone
POSTGRES_PASSWORD=<strong-random-password>
POSTGRES_DB=patchone

# Server
SECRET_KEY=<generate: python3 -c "import secrets; print(secrets.token_hex(32))">
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<strong-password>
SERVER_MODE=cloud

# TLS / nginx
DOMAIN=patchone.example.com
TLS_CERT_PATH=/etc/letsencrypt/live/patchone.example.com/fullchain.pem
TLS_KEY_PATH=/etc/letsencrypt/live/patchone.example.com/privkey.pem

# Optional tuning
SESSION_TIMEOUT_HOURS=8
HEARTBEAT_TIMEOUT_MINUTES=30
BACKUP_RETENTION_DAYS=7
```

## Step 2 — TLS certificates

Using Certbot:

```bash
certbot certonly --standalone -d patchone.example.com
```

Certificates are placed in `/etc/letsencrypt/live/patchone.example.com/`. Mount this directory into the nginx container (already configured in `docker-compose.yml`).

## Step 3 — Start production stack

```bash
cd deploy/cloud
docker compose up -d
```

This starts three containers:
- `patchone-server` — FastAPI + Uvicorn
- `patchone-nginx` — nginx TLS termination
- `patchone-postgres` — PostgreSQL 15

On first start, the server automatically runs Alembic migrations and seeds the catalog.

## Step 4 — Verify

```bash
curl https://patchone.example.com/health
```

Expected:

```json
{"status": "ok", "db": "ok"}
```

Dashboard is available at `https://patchone.example.com`.

## Development mode

Use the dev compose file for local development (SQLite, no TLS, hot-reload):

```bash
cd deploy/cloud
docker compose -f docker-compose.dev.yml up
```

The dev server exposes port 8000 directly without TLS.

## Multi-tenancy

In cloud mode, every API request is scoped to the `tenant_id` extracted from the admin's JWT token. Tenant isolation is enforced at the middleware layer — cross-tenant queries are blocked at the database level.

To create a new tenant admin, call the admin provisioning endpoint or use the seed script:

```bash
docker compose exec patchone-server python server/seed/create_admin.py \
  --tenant my-client-org \
  --username admin \
  --password <password>
```

## Volumes

| Volume | Contents |
|---|---|
| `patchone-postgres-data` | PostgreSQL data directory |
| `patchone-backups` | Database backup archives |

Back up these volumes before upgrades.

## Upgrading

```bash
git pull
docker compose pull
docker compose up -d --build
```

Alembic migrations run automatically on server startup.

## nginx configuration

The nginx config template is at `deploy/cloud/nginx.conf.template`. Substitute `${DOMAIN}` at runtime from your `.env` file. The default config:
- Redirects HTTP → HTTPS
- Proxies all requests to the FastAPI server
- Sets secure headers (`X-Content-Type-Options`, `X-Frame-Options`, `HSTS`)
- Enables gzip for static assets

## Logs

```bash
docker compose logs -f patchone-server
docker compose logs -f patchone-nginx
```
