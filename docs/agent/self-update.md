---
id: self-update
title: Agent Self-Update
sidebar_position: 3
---

# Agent Self-Update

The agent can update itself when the server advertises a new version. No manual intervention is required on client machines.

## How it works

1. **Version check** — on each heartbeat, the server response includes the `latest_agent_version` field.
2. **Comparison** — the agent compares the running version (embedded at build time) with `latest_agent_version`.
3. **Download** — if the server version is newer, the agent calls `GET /api/agent/version` to get the download URL, then downloads the new binary to a temp path.
4. **Replace** — the agent writes the new binary to a side-path (`PatchPilotAgent.exe.new`), stops the current service, renames files, and restarts the service.
5. **Verify** — on the next heartbeat after the update, the server confirms the new version is running.

## Update flow

```
Agent heartbeat
    ↓
Server response: { "latest_agent_version": "1.2.0" }
    ↓
Agent checks: running version "1.1.0" < "1.2.0"
    ↓
GET /api/agent/version  →  download URL
    ↓
Download PatchPilotAgent-1.2.0.exe → %TEMP%\patchpilot-update.exe
    ↓
sc stop PatchOneAgent
Rename PatchPilotAgent.exe → PatchPilotAgent.exe.bak
Rename %TEMP%\patchpilot-update.exe → PatchPilotAgent.exe
sc start PatchOneAgent
```

## Rollback

If the new binary fails to start, the agent service does not start. To roll back manually:

```bat
sc stop PatchOneAgent
rename "C:\Program Files\PatchOne\PatchPilotAgent.exe" PatchPilotAgent.exe.bad
rename "C:\Program Files\PatchOne\PatchPilotAgent.exe.bak" PatchPilotAgent.exe
sc start PatchOneAgent
```

## Publishing a new agent version

On the server side, place the new binary in the configured agent download path and update the version string in `server/config.py`:

```python
AGENT_VERSION = "1.2.0"
```

The next heartbeat from any agent running an older version triggers the self-update.

## Version format

Agent versions follow semantic versioning (`MAJOR.MINOR.PATCH`). The running version is embedded at build time by PyInstaller via the `--distpath` metadata.

## AV considerations during update

During self-update, the agent writes a new binary to `%TEMP%`. If AV blocks this, the update silently fails and the agent continues running the current version. Ensure the `%TEMP%` path and `PatchPilotAgent.exe` process are excluded from AV real-time scanning. See [GravityZone coexistence](/docs/security/gravityzone).
