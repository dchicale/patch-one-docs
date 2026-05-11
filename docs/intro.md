---
id: intro
title: Introduction
sidebar_position: 1
---

# PatchOne

**PatchOne** is a Windows software update management platform built for Brazilian SMEs with 10–500 machines per organisation. It gives IT administrators a single console to detect, deploy, and audit software updates across their entire fleet — with zero cloud dependency, no per-machine cost, and no manual enrollment.

## What problem it solves

Managing software updates across a Windows fleet is painful without enterprise tools like WSUS or Intune. PatchOne fills that gap: it targets the Brazilian SME market where Microsoft 365 licences are common but Intune is not, and where GravityZone (Bitdefender) is the dominant endpoint security tool.

## Key capabilities

| Capability | Detail |
|---|---|
| **Auto-discovery** | Agents self-register on first heartbeat — no manual roster |
| **Live inventory** | Installed software per machine, refreshed every 5 min |
| **Update detection** | Pending winget updates surfaced as dashboard badges |
| **One-click deploy** | Push any catalog title to one machine or the entire fleet |
| **Silent install** | `winget upgrade --silent --scope machine` — zero user interruption |
| **Tamper-proof audit** | Every deploy, login, and config change logged immutably |
| **Offline alerting** | Dashboard notification when a machine stops checking in |
| **Daily briefing** | 8 AM fleet-health snapshot pushed to the dashboard |
| **Agent self-update** | Agent replaces its own binary when the server advertises a new version |
| **Multi-tenant** | Single cloud instance isolates each client org by `tenant_id` |
| **Database backup** | Scheduled daily + manual trigger, downloadable from dashboard |

## Who it is for

- **IT administrators** at Brazilian SMEs managing 10–500 Windows machines
- **MSPs** bundling PatchOne with GravityZone licences (Securisoft partnership)
- **On-prem admins** who cannot use cloud-based patch management

## Deployment modes

| Mode | Database | Setup tool |
|---|---|---|
| **On-premises** | SQLite on Windows Server | `install_server.bat` |
| **Cloud / SaaS** | PostgreSQL with Docker Compose | `docker compose up` |

## Next steps

- [Quick Start](/docs/getting-started/quickstart) — get running in 5 minutes
- [System Requirements](/docs/getting-started/requirements) — hardware and software prerequisites
- [On-Premises Installation](/docs/installation/on-premises) — full on-prem setup guide
- [Cloud Installation](/docs/installation/cloud) — Docker + TLS production setup
