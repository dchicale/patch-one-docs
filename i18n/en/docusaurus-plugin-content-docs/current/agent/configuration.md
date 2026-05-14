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
SERVER_URL=https://your-patchone-server
TENANT_ID=your-tenant-id
API_KEY=<provided-by-your-admin>
HEARTBEAT_INTERVAL=300

[agent]
LOG_LEVEL=INFO
```

| Key | Type | Required | Description |
|---|---|---|---|
| `SERVER_URL` | URL | Yes | Base URL of the PatchOne server. Use HTTPS for cloud. No trailing slash. |
| `TENANT_ID` | String | Yes | Your organisation identifier. Use `default` for on-premises. |
| `API_KEY` | String | Yes | Shared secret provided by your PatchOne administrator. |
| `HEARTBEAT_INTERVAL` | Integer | No | Seconds between check-ins. Default: `300`. Minimum: `60`. |
| `LOG_LEVEL` | String | No | `DEBUG`, `INFO`, `WARNING`, `ERROR`. Default: `INFO`. |

## Applying configuration changes

```bat
sc stop PatchOneAgent
sc start PatchOneAgent
```

## Security

`config.ini` contains the `API_KEY`. Restrict access with NTFS permissions so only the service account and administrators can read the file.
