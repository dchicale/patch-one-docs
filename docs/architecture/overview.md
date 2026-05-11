---
id: overview
title: Architecture Overview
sidebar_position: 1
---

# Architecture Overview

## System diagram

```
┌─────────────────────────────────────────────────────┐
│                    Admin Browser                     │
│          React SPA (Tailwind + Recharts)             │
└───────────────────────┬─────────────────────────────┘
                        │ HTTP(S) cookie auth
                        │
┌───────────────────────▼─────────────────────────────┐
│              PatchOne Server (FastAPI)                │
│                  Uvicorn :8000                        │
│                                                      │
│  Routers: admin | machines | deploy | catalog |      │
│           agent | notifications | audit | backup     │
│                                                      │
│  Middleware: auth | audit-log | tenant-isolation     │
│                                                      │
│  Services: scheduler (APScheduler) | notifier        │
└───────────────┬─────────────────────────────────────┘
                │ SQLAlchemy Core
        ┌───────┴────────┐
        │                │
  SQLite (on-prem)  PostgreSQL (cloud)
  patchone.db       patchone-postgres:5432
        
                        ▲ poll every 5 min
┌───────────────────────┴─────────────────────────────┐
│          PatchPilotAgent.exe  (Windows Service)       │
│                                                      │
│  inventory.py   — registry scan (Win32_Product)      │
│  updater.py     — winget pending updates             │
│  reporter.py    — heartbeat POST /api/agent/report   │
│  deploy_executor.py — winget upgrade --silent        │
│  self_update.py — binary self-replacement            │
└─────────────────────────────────────────────────────┘
```

## Pull model

The agent **always** initiates connections to the server. The server never connects to agents. This design means:

- No inbound firewall rules needed on client machines
- Works through NAT, corporate proxies, and VPNs
- The server cannot remotely execute arbitrary code on agents
- Jobs are delivered as part of the heartbeat response payload, not via a push channel

## Deployment modes

| Mode | Database | Tenancy | Entry point |
|---|---|---|---|
| **On-premises** | SQLite (local file) | Implicit single tenant (`default`) | `install_server.bat` → Windows Service |
| **Cloud / SaaS** | PostgreSQL (Docker volume) | Multi-tenant (per `tenant_id`) | `docker compose up` |

The same server codebase handles both modes. The `SERVER_MODE` environment variable (`onprem` or `cloud`) switches behavior where needed (e.g., tenant isolation middleware is active only in cloud mode).

## Technology choices

| Layer | Technology | Why |
|---|---|---|
| Server framework | FastAPI 0.110 | Async, Pydantic v2 validation, automatic OpenAPI spec |
| Database ORM | SQLAlchemy 2.0 Core | Raw SQL control, dual-DB support without ORM overhead |
| Migrations | Alembic 1.13 | Standard, works with SQLAlchemy Core |
| ASGI server | Uvicorn 0.29 | Fast, production-ready, pairs with FastAPI |
| Scheduler | APScheduler 3.x | In-process; avoids external dependencies (no Redis/Celery) |
| Dashboard | React 18 + Vite 5 | Fast HMR, Tailwind for utility CSS, Recharts for graphs |
| State management | TanStack Query 5 | Server-state caching, automatic refetch |
| Agent packaging | PyInstaller 6.x | Single `.exe` with no Python runtime dependency on clients |
| Agent HTTP | requests | Simple; no async needed for poll-based agent |

## Dual-database support

All SQL queries use SQLAlchemy Core (not ORM). Query text is written once and works against both SQLite (on-prem) and PostgreSQL (cloud) because:

- PatchOne avoids dialect-specific SQL syntax
- SQLAlchemy handles parameter binding differences (`:param` vs `$1`)
- Tests run against SQLite in CI for speed; integration tests can target PostgreSQL

## Scheduler

APScheduler runs inside the FastAPI process (no separate worker):

| Job | Schedule |
|---|---|
| Daily summary notification | Every day at 08:00 AM (server local time) |
| Offline machine detection | Every 5 minutes |
| Scheduled backup | Every day at 02:00 AM (server local time) |
| Backup retention cleanup | Every day at 02:05 AM |

## Request flow

A typical admin deploy request:

```
Browser POST /api/deploy
  → auth middleware validates JWT cookie
  → audit middleware records the incoming request
  → tenant middleware scopes to tenant_id
  → deploy router validates machine_ids + catalog_item_id
  → creates deploy_job rows (state: queued)
  → returns batch_id + job list

Agent next heartbeat (≤5 min later)
  → POST /api/agent/report (with machine inventory)
  → server includes queued jobs in response
  → agent runs winget upgrade --silent
  → POST /api/agent/jobs/{id}/done (with result)
  → server updates job state to completed/failed
  → server creates job_completed/job_failed notification
```
