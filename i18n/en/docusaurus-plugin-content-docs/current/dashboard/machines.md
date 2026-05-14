---
id: machines
title: Fleet Management (Machines)
sidebar_position: 2
---

# Fleet Management

The **Machines** page shows every registered machine and its current status.

## Machine list

| Field | Description |
|---|---|
| **Hostname** | Windows hostname |
| **Status** | Online / Offline badge |
| **OS** | Windows version string |
| **Agent version** | Running agent version |
| **Last seen** | Most recent heartbeat timestamp |
| **Pending updates** | Number of available updates |
| **Tags** | Admin-assigned labels |

## Machine detail

- **Software inventory** — full list of installed software
- **Pending updates** — titles with available updates highlighted
- **Tags and notes** — labels for grouping; free-text notes field

## Soft-delete

Deleting marks the machine as inactive. If the same machine checks in again, it is automatically restored.

## Offline alerting

When a machine misses heartbeats past the timeout, a notification is generated and the badge turns **Offline**.
