---
id: machines
title: Machines API
sidebar_position: 3
---

# Machines API

## List machines — `GET /api/machines`

Query params: `status` (online|offline), `search` (hostname/tag)

## Get machine detail — `GET /api/machines/{machine_id}`

## Update tags/notes — `PATCH /api/machines/{machine_id}`

```json
{"tags": ["office"], "notes": "Finance dept"}
```

## Delete (soft-delete) — `DELETE /api/machines/{machine_id}`

Response 204. Logged as `machine_deleted`.
