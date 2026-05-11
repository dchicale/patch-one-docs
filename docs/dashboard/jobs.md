---
id: jobs
title: Job Monitoring
sidebar_position: 4
---

# Job Monitoring

The **Jobs** page shows all deploy jobs and their current status.

## Job lifecycle

```
queued → in_progress → completed
                    → failed
```

| State | Meaning |
|---|---|
| `queued` | Job created, waiting for the agent to pick it up on the next heartbeat |
| `in_progress` | Agent has started the winget install |
| `completed` | winget exited with code 0; software installed successfully |
| `failed` | winget exited with a non-zero code; see result message |

## Job list

Each row shows:

| Column | Description |
|---|---|
| **Machine** | Hostname of the target machine |
| **Software** | Display name from the catalog |
| **Status** | Current job state with colour badge |
| **Result** | winget output summary (populated on completion or failure) |
| **Created** | Timestamp when the job was queued |
| **Updated** | Timestamp of the most recent state change |

## Batch grouping

Jobs deployed in the same operation share a `batch_id`. Batch rows are grouped in the list with a collapsible header showing overall progress (e.g., *8 / 10 completed*).

## Filters

Filter by:
- **Status** — show only `queued`, `in_progress`, `completed`, or `failed` jobs
- **Machine** — filter to a specific machine

## Cancel a queued job

You can cancel a job that is still in `queued` state by clicking the cancel icon. Jobs already in `in_progress` cannot be cancelled — they complete on the agent side.

## Failed jobs

When a job fails, the result message contains the winget exit code and stderr output. Common failure reasons:

| Cause | Typical result message |
|---|---|
| winget package not found | `No applicable upgrade found` |
| Network unavailable on client | `Failed to connect to the source` |
| Installer blocked by AV | `The process was terminated` |
| Already up to date | `No applicable upgrade found` |

For AV-related failures, see [GravityZone coexistence](/docs/security/gravityzone).

## Auto-refresh

The Jobs page polls for updates every 10 seconds while open, so you can watch progress in real time without manually refreshing.
