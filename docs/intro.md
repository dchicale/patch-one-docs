---
id: intro
title: Introduction
sidebar_position: 1
---

# PatchOne

**PatchOne** is a Windows software update management platform built for Brazilian SMEs with 10–500 machines per organisation. It gives IT administrators a single console to detect, deploy, and audit software updates across their entire fleet — with no per-machine cost and no manual enrollment.

## What problem it solves

Managing software updates across a Windows fleet is painful without enterprise tools like WSUS or Intune. PatchOne fills that gap: it targets the Brazilian SME market where Microsoft 365 licences are common but Intune is not, and where GravityZone (Bitdefender) is the dominant endpoint security tool.

## Key capabilities

| Capability | Detail |
|---|---|
| **Auto-discovery** | Agents self-register on first check-in — no manual roster |
| **Live inventory** | Installed software per machine, refreshed automatically |
| **Update detection** | Pending updates surfaced as dashboard badges |
| **One-click deploy** | Push any catalog title to one machine or the entire fleet |
| **Silent install** | Updates install silently — zero end-user interruption |
| **Tamper-proof audit** | Every deploy, login, and config change logged immutably |
| **Offline alerting** | Dashboard notification when a machine stops checking in |
| **Daily briefing** | Fleet-health snapshot pushed to the dashboard each morning |
| **Agent self-update** | Agent updates itself when the server publishes a new version |
| **Multi-tenant** | Cloud mode isolates each client organisation's data |
| **Database backup** | Scheduled daily backups plus manual trigger from the dashboard |

## Who it is for

- **IT administrators** at Brazilian SMEs managing 10–500 Windows machines
- **MSPs** bundling PatchOne with GravityZone licences
- **On-prem admins** who need patch management without cloud dependency

## Deployment modes

| Mode | Description | Setup |
|---|---|---|
| **On-premises** | Single Windows Server, no internet required | `install_server.bat` |
| **Cloud / SaaS** | Docker-based, TLS, multi-tenant | `docker compose up` |

## Next steps

- [Quick Start](/docs/getting-started/quickstart) — get running in 5 minutes
- [System Requirements](/docs/getting-started/requirements) — hardware and software prerequisites
- [On-Premises Installation](/docs/installation/on-premises) — full on-prem setup guide
- [Cloud Installation](/docs/installation/cloud) — Docker + TLS production setup
