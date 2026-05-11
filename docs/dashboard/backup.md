---
id: backup
title: Backup & Restore
sidebar_position: 7
---

# Backup & Restore

The **Backup** page manages database backups for the PatchOne server.

## Backup types

| Type | Trigger | Schedule |
|---|---|---|
| **Scheduled** | Automatic | Daily at 2:00 AM (configurable) |
| **Manual** | Admin clicks "Trigger Backup" | On demand |

## Backup list

Each row shows:

| Column | Description |
|---|---|
| **Filename** | Timestamped archive name (e.g., `patchone_backup_2026-05-11_02-00.db`) |
| **Size** | File size of the backup archive |
| **Type** | `scheduled` or `manual` |
| **Created** | Timestamp when the backup was created |
| **Actions** | Download or delete buttons |

## Triggering a manual backup

Click **Trigger Backup** to create an immediate backup. The backup appears in the list within a few seconds.

## Downloading a backup

Click **Download** next to any backup to download the database file to your local machine. For on-premises mode, this is a `.db` SQLite file. For cloud mode, it is a PostgreSQL dump.

Store downloaded backups in a location separate from the server (e.g., a network share or cloud storage) for disaster recovery.

## Retention policy

The server automatically deletes backups older than `BACKUP_RETENTION_DAYS` (default: 7 days). Adjust this in `server/.env`:

```ini
BACKUP_RETENTION_DAYS=14
```

Restart the server after changing this value. Manual backups are also subject to the retention policy.

## Restore (on-premises)

To restore from a backup on an on-premises server:

1. Stop the PatchOne service:
   ```bat
   sc stop PatchOneServer
   ```
2. Replace the database file:
   ```bat
   copy patchone_backup_<timestamp>.db server\patchone.db
   ```
3. Restart the service:
   ```bat
   sc start PatchOneServer
   ```

## Restore (cloud / Docker)

1. Stop the server container:
   ```bash
   docker compose stop patchone-server
   ```
2. Restore the PostgreSQL dump:
   ```bash
   docker compose exec patchone-postgres pg_restore \
     -U patchone -d patchone /backups/patchone_backup_<timestamp>.dump
   ```
3. Restart:
   ```bash
   docker compose start patchone-server
   ```

## Backup storage location

| Mode | Backup directory |
|---|---|
| On-premises | `server\backups\` |
| Cloud | `patchone-backups` Docker volume |

## Backup API

Backups can also be managed via the [Backup API](/docs/api/backup) for automation (e.g., scripted download to off-site storage).
