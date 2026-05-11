---
id: quickstart
title: Quick Start
sidebar_position: 1
---

# Quick Start

Get PatchOne running in under 5 minutes using the on-premises mode (SQLite, single Windows Server).

## Prerequisites

- Windows Server 2019+ (or Windows 10/11 for dev/test)
- Python 3.11+ installed
- Port 8000 open in Windows Firewall (the installer handles this)
- At least one Windows machine for the agent

## 1. Clone and configure

```bat
git clone <repo> patchone
cd patchone
copy server\.env.example server\.env
```

Open `server\.env` and set at minimum:

```ini
SECRET_KEY=change-this-to-a-random-string-at-least-32-chars
ADMIN_PASSWORD=your-admin-password
SERVER_MODE=onprem
```

## 2. Run the installer

```bat
deploy\install_server.bat
```

This single script:
1. Creates a Python virtual environment
2. Installs all server dependencies
3. Runs Alembic migrations (creates the SQLite database)
4. Seeds the 50-title software catalog
5. Creates the initial admin account
6. Registers PatchOne as a Windows Service on port 8000
7. Opens Windows Firewall port 8000

## 3. Open the dashboard

Navigate to `http://<server-ip>:8000` and log in with your admin credentials.

## 4. Deploy the first agent

Create `config.ini` from the template:

```ini
[server]
SERVER_URL=http://<server-ip>:8000
TENANT_ID=default
API_KEY=<your-api-key>
HEARTBEAT_INTERVAL=300

[agent]
LOG_LEVEL=INFO
```

Copy `PatchPilotAgent.exe` and `config.ini` to a test machine and run:

```bat
PatchPilotAgent.exe install
```

Within 5 minutes the machine appears in the **Machines** page.

## 5. Push your first update

1. Go to **Deploy** in the dashboard
2. Select the test machine
3. Choose a software title from the catalog (e.g., *Google Chrome*)
4. Click **Deploy**

The job runs silently on the agent. Check **Jobs** for the result.

## Verification checklist

- [ ] `GET http://<server>:8000/health` returns `{"status":"ok","db":"ok"}`
- [ ] Dashboard loads and login works
- [ ] Test machine appears in Fleet view within 5 minutes
- [ ] Software inventory visible on machine detail page
- [ ] Deploy job completes successfully

## Next steps

- [Full on-premises installation guide](/docs/installation/on-premises)
- [Agent deployment at scale (GPO / WinRM / PsExec)](/docs/installation/agent-deployment)
- [Dashboard walkthrough](/docs/dashboard/overview)
