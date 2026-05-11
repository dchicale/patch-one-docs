---
id: machines
title: Fleet Management (Machines)
sidebar_position: 2
---

# Fleet Management

The **Machines** page is the primary fleet view. It shows every registered machine and its current status.

## Machine list

Each row displays:

| Field | Description |
|---|---|
| **Hostname** | Windows hostname of the machine |
| **Status** | Online / Offline badge |
| **OS** | Windows version string |
| **Agent version** | Running version of `PatchPilotAgent.exe` |
| **Last seen** | Timestamp of the most recent heartbeat |
| **Pending updates** | Number of available winget updates |
| **Tags** | Admin-assigned labels |

## Search and filter

The search bar filters machines by hostname or tag in real time. The status filter lets you show only **Online** or **Offline** machines.

## Machine detail

Click any machine to open its detail page. The detail page shows:

### Software inventory

A full list of installed software, sourced from the Windows registry via `Win32_Product`. Updated every heartbeat (every 5 minutes).

Columns: **Name**, **Version**, **Publisher**, **Install date**

### Pending updates

Software titles with available winget updates are highlighted. These badges drive the update count shown in the machine list.

### Tags and notes

- **Tags** — comma-separated labels for grouping machines (e.g. `office`, `warehouse`, `priority`)
- **Notes** — free-text field for admin notes (e.g. asset tag, location)

Tags and notes are saved immediately on edit.

### Deploy from detail

You can initiate a deploy directly from the machine detail page. The machine is pre-selected.

## Soft-delete

Deleting a machine from the UI marks it as inactive (`status = deleted`) rather than removing the row. The machine is hidden from the default fleet view but remains in the audit log. If the same physical machine checks in again, it is automatically restored.

## Machine registration

Machines are identified by their **SMBIOS UUID** (read from the Windows registry). This UUID persists across renames and OS reinstalls to the same hardware. When an agent sends its first heartbeat, the server creates a machine record automatically — no manual enrollment required.

## Offline alerting

When a machine misses heartbeats for longer than `HEARTBEAT_TIMEOUT_MINUTES` (default: 30 minutes), a notification is generated and the machine's badge turns **Offline**. See [Notifications](/docs/dashboard/notifications).
