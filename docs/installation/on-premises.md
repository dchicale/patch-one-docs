---
id: on-premises
title: On-Premises Installation
sidebar_position: 1
---

# On-Premises Installation

The on-premises mode runs on a single Windows Server with a local SQLite database. No internet connection is required after initial setup.

## Overview

```
Windows Server
├── PatchOne Server  (Windows Service, port 8000)
├── SQLite database  (server\patchone.db)
└── Dashboard SPA    (served by FastAPI at /)
```

## Step 1 — Prerequisites

- Windows Server 2019+ (or Windows 10/11 for dev/test)
- Python 3.11+ in PATH
- Git (for cloning the repository)
- Administrator privileges

Verify Python:

```bat
python --version
```

## Step 2 — Clone and configure

```bat
git clone <repo> C:\PatchOne
cd C:\PatchOne
copy server\.env.example server\.env
```

Edit `server\.env`:

```ini
# Required
SECRET_KEY=<generate with: python -c "import secrets; print(secrets.token_hex(32))">
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<strong-password>

# On-premises settings
SERVER_MODE=onprem
DB_URL=sqlite:///./patchone.db

# Optional tuning
SESSION_TIMEOUT_HOURS=8
HEARTBEAT_TIMEOUT_MINUTES=30
BACKUP_RETENTION_DAYS=7
```

:::warning SECRET_KEY
Use a cryptographically random value for `SECRET_KEY`. It signs JWT session tokens. Generate one with:
```
python -c "import secrets; print(secrets.token_hex(32))"
```
:::

## Step 3 — Run the installer

```bat
deploy\install_server.bat
```

The script performs these steps in order:

1. Creates a Python virtual environment at `server\venv\`
2. Installs server dependencies from `server\requirements.txt`
3. Runs Alembic migrations — creates `server\patchone.db`
4. Seeds the software catalog (50+ titles)
5. Creates the initial admin account
6. Registers PatchOne as a Windows Service (`PatchOneServer`)
7. Opens Windows Firewall inbound rule for port 8000
8. Starts the service

## Step 4 — Verify the server

```bat
sc query PatchOneServer
```

Expected output includes `STATE: 4 RUNNING`.

Test the health endpoint:

```bat
curl http://localhost:8000/health
```

Expected response:

```json
{"status": "ok", "db": "ok"}
```

## Step 5 — Open the dashboard

Navigate to `http://<server-ip>:8000` from any browser on the network. Log in with the admin credentials set in `.env`.

## Service management

| Action | Command |
|---|---|
| Start | `sc start PatchOneServer` |
| Stop | `sc stop PatchOneServer` |
| Restart | `sc stop PatchOneServer && sc start PatchOneServer` |
| Uninstall | `python server\server_service.py remove` |

## Log files

Server logs are written to `server\logs\patchone.log`. The file rotates daily and retains 7 days by default.

## Upgrading

```bat
git pull
pip install -r server\requirements.txt
alembic -c server\alembic.ini upgrade head
sc stop PatchOneServer && sc start PatchOneServer
```

## Firewall configuration

If the installer cannot open the firewall rule automatically, add it manually:

```powershell
New-NetFirewallRule -DisplayName "PatchOne Server" `
  -Direction Inbound -Protocol TCP -LocalPort 8000 `
  -Action Allow -Profile Domain,Private
```

## Next steps

- [Agent deployment](/docs/installation/agent-deployment) — push agents to client machines
- [Cloud deployment](/docs/installation/cloud) — Docker-based multi-tenant setup
