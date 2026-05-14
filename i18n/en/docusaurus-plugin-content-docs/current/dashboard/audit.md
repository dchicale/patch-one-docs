---
id: audit
title: Audit Log
sidebar_position: 6
---

# Audit Log

The **Audit** page provides an immutable record of every significant action. Designed for compliance reporting and incident investigation.

## What is logged

| Event type | Triggered by |
|---|---|
| `admin_login` | Successful admin login |
| `admin_logout` | Admin logout |
| `admin_login_failed` | Failed login attempt |
| `machine_registered` | New machine first check-in |
| `machine_deleted` | Admin soft-deletes a machine |
| `deploy_queued` | Admin queues a deploy job |
| `deploy_completed` | Agent reports job success |
| `deploy_failed` | Agent reports job failure |
| `backup_created` | Backup completes |

## Tamper protection

Audit entries cannot be edited or deleted through any API endpoint or UI action.

## CSV export

Click **Export CSV** to download the filtered log.
