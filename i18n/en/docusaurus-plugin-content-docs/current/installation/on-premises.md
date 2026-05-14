---
id: on-premises
title: On-Premises Installation
sidebar_position: 1
---

# On-Premises Installation

The on-premises mode runs on a single Windows Server on your local network. No internet connection is required after initial setup.

## Prerequisites

- Windows Server 2019 or later (Windows 10/11 acceptable for testing)
- Python 3.11 or later, available in PATH
- Git
- Administrator privileges on the server

```bat title="Verify Python is available"
python --version
```

## Step 1 — Clone and configure

```bat title="Clone the repository"
git clone <repo> C:\PatchOne
cd C:\PatchOne
copy server\.env.example server\.env
```

Edit `server\.env` and set the following values:

```ini title="server/.env" {1,2,3,4}
SECRET_KEY=<generate: python -c "import secrets; print(secrets.token_hex(32))">
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<strong-password>
SERVER_MODE=onprem
```

| Setting | Description |
|---|---|
| `SECRET_KEY` | Long random string that secures admin sessions |
| `ADMIN_USERNAME` | Username for the initial admin account |
| `ADMIN_PASSWORD` | Strong password for the initial admin account |
| `SERVER_MODE` | Set to `onprem` |

:::warning
Use a strong, randomly generated value for `SECRET_KEY`. Never share it or commit it to version control.
:::

## Step 2 — Run the installer

```bat title="Run as Administrator"
deploy\install_server.bat
```

The installer sets up the virtual environment, initialises the database, seeds the catalog, creates the admin account, registers the Windows Service, configures the firewall, and starts the server.

## Step 3 — Verify

Open the dashboard in a browser on your network at `http://<server-ip>` and log in with the credentials you set in Step 1.

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

```bat title="Upgrade to latest version"
git pull
pip install -r server\requirements.txt
sc stop PatchOneServer && sc start PatchOneServer
```

## Next steps

- [Agent deployment](/docs/installation/agent-deployment) — push agents to client machines
- [Cloud deployment](/docs/installation/cloud) — Docker-based multi-tenant setup
