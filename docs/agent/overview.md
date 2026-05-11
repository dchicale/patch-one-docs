---
id: overview
title: How the Agent Works
sidebar_position: 1
---

# How the Agent Works

`PatchPilotAgent.exe` is a self-contained Windows binary that runs as a Windows Service. It operates on a **pull model**: the agent initiates all connections to the server. No inbound ports are needed on client machines.

## Heartbeat loop

Every `HEARTBEAT_INTERVAL` seconds (default: 300 / 5 minutes), the agent:

1. **Collects inventory** — reads installed software from the Windows registry (`Win32_Product`)
2. **Detects pending updates** — calls `winget upgrade --include-unknown` and parses the output
3. **Sends heartbeat** — `POST /api/agent/report` with machine metadata, software list, and pending updates
4. **Picks up jobs** — the server response includes any `queued` deploy jobs for this machine
5. **Executes jobs** — runs `winget upgrade --silent --scope machine <winget-id>` for each job
6. **Reports results** — `POST /api/agent/jobs/{id}/done` with exit code and output

The `--run-once` flag skips the loop and exits after a single heartbeat. Useful for testing.

## Agent modules

| Module | Responsibility |
|---|---|
| `main.py` | Entry point, heartbeat loop, lifespan management |
| `config.py` | Reads `config.ini`; exposes typed settings |
| `inventory.py` | Queries the Windows registry for installed software |
| `updater.py` | Invokes `winget upgrade --include-unknown`; parses tabular output |
| `reporter.py` | Builds heartbeat payload and sends it to the server |
| `deploy_executor.py` | Executes `winget upgrade --silent --scope machine` for queued jobs |
| `self_update.py` | Compares running version vs server-advertised version; replaces binary |
| `service.py` | Registers / unregisters the Windows Service; handles start/stop signals |

## Machine identification

The agent identifies the machine by its **SMBIOS UUID**, read from:

```
HKLM\SOFTWARE\Microsoft\Cryptography\MachineGuid
```

This UUID persists across hostname changes and is stable across typical hardware configurations. The server uses it as the primary key (`machine_id`) for the `machines` table.

## Pull model rationale

The pull model means:
- No inbound firewall rules needed on client machines
- Works through NAT and corporate proxies
- The server cannot push commands directly (reduces attack surface)
- Jobs are delivered as part of the heartbeat response payload

## GravityZone compatibility

The agent uses `winget` and Windows registry APIs only. It does not:
- Write to `%TEMP%` during normal operation (only PyInstaller's startup does)
- Open listening ports
- Inject into other processes

See [GravityZone coexistence](/docs/security/gravityzone) for AV exclusion setup.
