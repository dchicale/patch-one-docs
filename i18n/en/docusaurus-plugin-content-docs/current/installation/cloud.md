---
id: cloud
title: Cloud / Docker Installation
sidebar_position: 2
---

# Cloud / Docker Installation

The cloud mode uses Docker Compose with a PostgreSQL database and TLS termination. It supports multiple client organisations, each with fully isolated data.

## Prerequisites

- Docker Engine 24.x
- Docker Compose v2.x
- A domain name pointing to the server
- TLS certificate and private key (Let's Encrypt / Certbot recommended)

## Step 1 — Clone and configure

```bash
git clone <repo> patchone
cd patchone
cp deploy/cloud/.env.example deploy/cloud/.env
```

Edit `deploy/cloud/.env` and fill in:

| Setting | Description |
|---|---|
| `POSTGRES_PASSWORD` | Strong random password for the database |
| `SECRET_KEY` | Long random string for session security |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Initial admin credentials |
| `SERVER_MODE` | Set to `cloud` |
| `DOMAIN` | Your domain name |
| `TLS_CERT_PATH` / `TLS_KEY_PATH` | Paths to your TLS certificate files |

:::warning
Never commit `.env` to version control. Use a secrets manager or encrypted storage for production values.
:::

## Step 2 — TLS certificates

```bash
certbot certonly --standalone -d your-domain.example.com
```

## Step 3 — Start

```bash
cd deploy/cloud
docker compose up -d
```

## Step 4 — Verify

```bash
curl https://your-domain.example.com/health
```

Expected: `{"status": "ok", "db": "ok"}`

## Upgrading

```bash
git pull
docker compose pull
docker compose up -d --build
```

## Logs

```bash
docker compose logs -f patchone-server
```
