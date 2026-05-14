---
id: requirements
title: System Requirements
sidebar_position: 2
---

# System Requirements

## Server

### On-premises mode

| Component | Minimum | Recommended |
|---|---|---|
| **OS** | Windows Server 2019 | Windows Server 2022 |
| **CPU** | 2 vCPU | 4 vCPU |
| **RAM** | 2 GB | 4 GB |
| **Disk** | 10 GB | 50 GB (for backups + growth) |
| **Python** | 3.11 | 3.11 or 3.12 |
| **Network** | Port accessible from agent machines | — |

### Cloud mode

| Component | Minimum |
|---|---|
| **Docker** | 24.x |
| **Docker Compose** | v2.x |
| **RAM** | 2 GB |
| **Disk** | 20 GB |
| **Ports** | 80, 443 (nginx terminates TLS) |
| **PostgreSQL** | 15+ (managed by Docker Compose) |

## Agent (Windows clients)

| Component | Requirement |
|---|---|
| **OS** | Windows 10 1903+ or Windows 11 |
| **winget** | 1.x (pre-installed on Windows 11; available via App Installer on Windows 10) |
| **Network** | Outbound HTTPS to server (no inbound rules required) |
| **Privileges** | Run as LocalSystem (Windows Service) for machine-scope installs |
| **Disk** | ~30 MB for the agent binary |
| **Python runtime** | Not required — `PatchPilotAgent.exe` is a self-contained binary |

:::note winget on Windows 10
winget ships with Windows 10 1903+ via the [App Installer](https://apps.microsoft.com/store/detail/app-installer/9NBLGGH4NNS1) package. Verify with `winget --version` before deploying agents.
:::

## Dashboard (browser)

Any modern browser works:

| Browser | Minimum version |
|---|---|
| Chrome / Edge | 90+ |
| Firefox | 88+ |
| Safari | 14+ |

## Network requirements

| Flow | Direction | Protocol |
|---|---|---|
| Agent → Server | Outbound from agent | HTTPS |
| Browser → Server | Outbound from admin workstation | HTTPS |
| Server → Agent | **None** | — |

The pull model means the server never initiates connections to agents. No inbound firewall rules are required on client machines.

## Antivirus considerations

If using Bitdefender GravityZone, register AV exclusions before deploying agents:

```powershell title="Register AV exclusions (run as Administrator)"
deploy\register_av_exclusion.ps1
```

See the [GravityZone coexistence guide](/docs/security/gravityzone) for details.
