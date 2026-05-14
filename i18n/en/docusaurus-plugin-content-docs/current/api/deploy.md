---
id: deploy
title: Deploy & Jobs API
sidebar_position: 4
---

# Deploy & Jobs API

## Queue a deploy job — `POST /api/deploy`

```json
{"machine_ids": ["uuid1", "uuid2"], "catalog_item_id": 42}
```

Response 201: `{batch_id, jobs[]}`. Returns 409 for duplicate active jobs.

## List jobs — `GET /api/jobs`

Query params: `status`, `machine_id`, `batch_id`

## Get job detail — `GET /api/jobs/{job_id}`

## Cancel queued job — `DELETE /api/jobs/{job_id}`

Response 204. Returns 409 if in_progress or completed.

## Job lifecycle

```
queued → in_progress → completed
                    → failed
```
