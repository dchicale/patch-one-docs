---
id: configuration
title: Agent Configuration
sidebar_position: 2
---

# Agent Configuration

The agent reads its configuration from `config.ini` in the same directory as `PatchPilotAgent.exe`.

## config.ini reference

```ini
[server]
SERVER_URL=http://<server-ip>:8000
TENANT_ID=default
API_KEY=<your-api-key>
HEARTBEAT_INTERVAL=300

[agent]
LOG_LEVEL=INFO
```

### [server] section

| Key | Type | Required | Default | Description |
|---|---|---|---|---|
| `SERVER_URL` | URL | Yes | — | Base URL of the PatchOne server. Include scheme and port. No trailing slash. |
| `TENANT_ID` | String | Yes | `default` | Tenant identifier. Use `default` for on-premises deployments. Cloud tenants receive a UUID. |
| `API_KEY` | String | Yes | — | Shared secret for agent authentication. Generated during server setup. |
| `HEARTBEAT_INTERVAL` | Integer | No | `300` | Seconds between heartbeat polls. Minimum: 60. Recommended: 300. |

### [agent] section

| Key | Type | Required | Default | Description |
|---|---|---|---|---|
| `LOG_LEVEL` | String | No | `INFO` | Log verbosity. One of: `DEBUG`, `INFO`, `WARNING`, `ERROR`. |

## Examples

### On-premises (default tenant)

```ini
[server]
SERVER_URL=http://192.168.1.100:8000
TENANT_ID=default
API_KEY=abc123xyz
HEARTBEAT_INTERVAL=300

[agent]
LOG_LEVEL=INFO
```

### Cloud (named tenant)

```ini
[server]
SERVER_URL=https://patchone.example.com
TENANT_ID=acme-corp
API_KEY=abc123xyz
HEARTBEAT_INTERVAL=300

[agent]
LOG_LEVEL=WARNING
```

### Debug mode (troubleshooting)

```ini
[server]
SERVER_URL=http://192.168.1.100:8000
TENANT_ID=default
API_KEY=abc123xyz
HEARTBEAT_INTERVAL=60

[agent]
LOG_LEVEL=DEBUG
```

## Configuration in GPO deployments

When deploying via GPO, store `config.ini` in the same network share as the binary:

```
\\server\sysvol\PatchOne\
  PatchPilotAgent.exe
  config.ini
```

The agent reads `config.ini` from its own directory at startup. The GPO copies both files to each machine.

## Changing configuration

After editing `config.ini`, restart the agent service for changes to take effect:

```bat
sc stop PatchOneAgent
sc start PatchOneAgent
```

## Security considerations

`config.ini` contains the `API_KEY`. Protect the file with appropriate NTFS permissions:

```bat
icacls "C:\Program Files\PatchOne\config.ini" /inheritance:d /grant:r "SYSTEM:R" "Administrators:F"
```

This grants read access to `SYSTEM` (the service account) and full control to Administrators only.
