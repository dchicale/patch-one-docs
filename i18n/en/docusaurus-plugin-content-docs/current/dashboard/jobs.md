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

## Batch grouping

Jobs from the same operation share a `batch_id` and are grouped with an overall progress indicator.

## Cancel a queued job

Jobs in `queued` state can be cancelled. Jobs already `in_progress` cannot be cancelled.

## Auto-refresh

The Jobs page polls for updates every 10 seconds while open.
