---
id: data-model
title: Database Schema
sidebar_position: 2
---

# Database Schema

PatchOne uses SQLAlchemy Core with Alembic migrations. All queries work against both SQLite (on-prem) and PostgreSQL (cloud).

## Tables

### `tenants`

Used in cloud mode only. On-premises mode uses an implicit `'default'` tenant.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `name` | TEXT | Tenant display name |
| `created_at` | TIMESTAMP | Row creation time |

---

### `admins`

| Column | Type | Notes |
|---|---|---|
| `id` | INTEGER | Primary key (auto-increment) |
| `username` | TEXT | Unique per tenant |
| `password_hash` | TEXT | bcrypt hash |
| `tenant_id` | TEXT | Foreign key → `tenants.id` (or `'default'`) |
| `created_at` | TIMESTAMP | — |

---

### `machines`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | SMBIOS UUID — primary key |
| `hostname` | TEXT | Windows hostname |
| `os` | TEXT | Windows version string |
| `agent_version` | TEXT | Running agent version |
| `status` | TEXT | `online` \| `offline` \| `deleted` |
| `last_seen` | TIMESTAMP | Last heartbeat timestamp |
| `tags` | JSON | Admin-assigned labels (array of strings) |
| `notes` | TEXT | Free-text admin notes |
| `tenant_id` | TEXT | Tenant scope |

---

### `software_snapshots`

Latest installed software per machine. Replaced entirely on each heartbeat.

| Column | Type | Notes |
|---|---|---|
| `id` | INTEGER | Auto-increment |
| `machine_id` | UUID | FK → `machines.id` |
| `name` | TEXT | Software display name |
| `version` | TEXT | Installed version |
| `publisher` | TEXT | Publisher name |
| `install_date` | DATE | Installation date (from registry) |
| `snapshot_at` | TIMESTAMP | Heartbeat time |

---

### `software_history`

Append-only log of software changes. Never updated or deleted.

| Column | Type | Notes |
|---|---|---|
| `id` | INTEGER | Auto-increment |
| `machine_id` | UUID | FK → `machines.id` |
| `name` | TEXT | Software name |
| `version` | TEXT | Version string |
| `event` | TEXT | `installed` \| `updated` \| `removed` |
| `detected_at` | TIMESTAMP | When the change was detected |

---

### `catalog_items`

| Column | Type | Notes |
|---|---|---|
| `id` | INTEGER | Auto-increment |
| `name` | TEXT | Display name |
| `winget_id` | TEXT | Package identifier for winget |
| `category` | TEXT | Category label |
| `publisher` | TEXT | Publisher name |
| `builtin` | BOOLEAN | Pre-loaded entries cannot be deleted |
| `deleted_at` | TIMESTAMP | Soft-delete timestamp (NULL = active) |
| `tenant_id` | TEXT | Tenant scope |

---

### `deploy_jobs`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `machine_id` | UUID | FK → `machines.id` |
| `catalog_item_id` | INTEGER | FK → `catalog_items.id` |
| `batch_id` | UUID | Groups jobs from the same deploy operation |
| `status` | TEXT | `queued` \| `in_progress` \| `completed` \| `failed` |
| `result` | TEXT | winget output summary (populated on completion) |
| `created_at` | TIMESTAMP | — |
| `updated_at` | TIMESTAMP | Last state-change time |
| `tenant_id` | TEXT | Tenant scope |

**Unique constraint:** `(machine_id, catalog_item_id)` where `status IN ('queued', 'in_progress')` — prevents duplicate active jobs.

---

### `notifications`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `type` | TEXT | Notification type (see [Notifications](/docs/dashboard/notifications)) |
| `message` | TEXT | Human-readable notification text |
| `read` | BOOLEAN | Whether the admin has dismissed it |
| `created_at` | TIMESTAMP | — |
| `tenant_id` | TEXT | Tenant scope |

---

### `audit_entries`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `timestamp` | TIMESTAMP | UTC event time |
| `event_type` | TEXT | Event type string |
| `actor` | TEXT | Admin username |
| `target` | TEXT | Affected resource identifier |
| `detail` | JSON | Additional context |
| `ip_address` | TEXT | Admin's remote IP |
| `tenant_id` | TEXT | Tenant scope |

No `UPDATE` or `DELETE` API routes exist for this table.

---

### `backups`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `filename` | TEXT | Archive filename |
| `size_bytes` | INTEGER | File size |
| `type` | TEXT | `scheduled` \| `manual` |
| `created_at` | TIMESTAMP | — |
| `tenant_id` | TEXT | Tenant scope |

## Entity relationships

```
tenants ──< admins
tenants ──< machines ──< software_snapshots
                      ──< software_history
                      ──< deploy_jobs >── catalog_items
tenants ──< notifications
tenants ──< audit_entries
tenants ──< backups
```

## Migrations

Alembic manages all schema changes. Migration files live in `server/alembic/versions/`.

Apply pending migrations:

```bat
alembic -c server\alembic.ini upgrade head
```

Roll back one step:

```bat
alembic -c server\alembic.ini downgrade -1
```
