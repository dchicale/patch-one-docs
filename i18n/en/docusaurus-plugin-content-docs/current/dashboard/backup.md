---
id: backup
title: Backup & Restore
sidebar_position: 7
---

# Backup & Restore

## Backup types

| Type | Trigger | Schedule |
|---|---|---|
| **Scheduled** | Automatic | Daily |
| **Manual** | Admin clicks "Trigger Backup" | On demand |

## Triggering a manual backup

Click **Trigger Backup**. The backup appears in the list within seconds.

## Downloading a backup

Click **Download** next to any backup. Store backups off-server for disaster recovery.

## Retention policy

Backups older than `BACKUP_RETENTION_DAYS` (default: 7) are automatically deleted.
