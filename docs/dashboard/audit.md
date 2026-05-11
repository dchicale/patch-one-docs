---
id: audit
title: Audit Log
sidebar_position: 6
---

# Audit Log

The **Audit** page provides an immutable record of every significant action performed in PatchOne. It is designed for compliance reporting and incident investigation.

## What is logged

Every state-changing operation generates an audit entry. This is enforced at the middleware layer — there is no way to perform an action without it appearing in the log.

| Event type | Triggered by |
|---|---|
| `admin_login` | Successful admin login |
| `admin_logout` | Admin logout |
| `admin_login_failed` | Failed login attempt |
| `machine_registered` | New machine checks in for the first time |
| `machine_deleted` | Admin soft-deletes a machine |
| `machine_updated` | Admin edits tags or notes |
| `deploy_queued` | Admin queues a deploy job |
| `deploy_completed` | Agent reports job success |
| `deploy_failed` | Agent reports job failure |
| `catalog_created` | Admin creates a custom catalog entry |
| `catalog_updated` | Admin edits a catalog entry |
| `catalog_deleted` | Admin soft-deletes a catalog entry |
| `backup_created` | Manual or scheduled backup completes |
| `backup_deleted` | Admin deletes a backup file |
| `config_changed` | Server configuration updated |

## Audit log fields

| Field | Description |
|---|---|
| **Timestamp** | UTC timestamp of the event |
| **Event type** | One of the event types above |
| **Actor** | Admin username that triggered the event |
| **Target** | Affected resource (machine hostname, catalog name, job ID, etc.) |
| **Detail** | JSON blob with additional context |
| **IP address** | Remote IP of the admin's browser |

## Filtering

Filter the log by:
- **Event type** — select one or more from the dropdown
- **Date range** — from / to date pickers
- **Actor** — filter to a specific admin username

## CSV export

Click **Export CSV** to download a filtered or full log as a CSV file. The export respects the current filters.

The CSV columns match the log fields above, with the `detail` JSON column flattened to a readable string.

## Tamper protection

Audit entries cannot be edited or deleted through any API endpoint or UI action. The underlying database table has no `UPDATE` or `DELETE` routes. In on-premises mode, protect the SQLite file with OS-level file permissions (`icacls`).

## Retention

Audit entries are retained indefinitely by default. There is no automatic purge policy in v1.0. If disk space is a concern, export and archive old entries before the database grows beyond the server's capacity.
