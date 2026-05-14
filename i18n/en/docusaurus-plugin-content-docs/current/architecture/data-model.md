---
id: data-model
title: Data Storage
sidebar_position: 2
---

# Data Storage

PatchOne stores data in a relational database. The on-premises deployment uses a local SQLite file; the cloud deployment uses PostgreSQL with persistent volumes.

## What PatchOne stores

| Category | Description |
|---|---|
| **Machine inventory** | Hostname, OS version, agent version, online/offline status, installed software list |
| **Software history** | Append-only log of software installs, updates, and removals per machine |
| **Update catalog** | Curated list of software titles available for deployment |
| **Deploy jobs** | Queued, in-progress, and completed deployment records per machine |
| **Audit log** | Immutable record of every admin action |
| **Notifications** | Fleet-health alerts and deployment status updates |
| **Backups** | Metadata for scheduled and manual database backup archives |

## Retention and backup

- **Audit log**: never modified or deleted after creation
- **Software history**: append-only; past states are always preserved
- **Backups**: retained for a configurable number of days (default: 7)
