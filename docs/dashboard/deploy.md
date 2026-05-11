---
id: deploy
title: Software Deployment
sidebar_position: 3
---

# Software Deployment

The **Deploy** page lets you push software updates to one machine or the entire fleet.

## Deploy form

1. **Select machines** — pick one or more machines from the list. Use the **Select All** toggle for a fleet-wide push.
2. **Select software** — choose a title from the catalog dropdown. You can search by name or browse by category.
3. **Click Deploy** — jobs are queued immediately.

## How deployment works

1. The dashboard calls `POST /api/deploy` with the selected machine IDs and catalog item ID.
2. The server creates a `deploy_job` row in state `queued` for each machine.
3. On the next heartbeat, each agent picks up its pending jobs.
4. The agent runs `winget upgrade --silent --scope machine <winget-id>`.
5. The agent reports the result back via `POST /api/agent/jobs/{id}/done`.
6. The job transitions to `completed` or `failed`.

## Silent installation

All deployments use `winget upgrade --silent --scope machine`. This means:
- No UAC prompt
- No installer UI
- No restart request (unless the package explicitly requires it)
- The install runs in the background while the user works normally

## Batch deploy

When you deploy to multiple machines, all jobs share a `batch_id`. The **Jobs** page groups them by batch so you can track fleet-wide progress at a glance.

## Duplicate protection

If you try to queue the same software for a machine that already has a `queued` or `in_progress` job for that title, the server returns HTTP 409 and skips the duplicate. This prevents double-deploy races.

## Deploy from machine detail

You can also initiate a deploy from the **Machine Detail** page. The target machine is pre-selected. Useful when you want to push a specific update to a single machine without navigating to the Deploy page.

## Catalog

The software catalog contains 50+ pre-loaded titles across categories (browsers, productivity, developer tools, etc.). You can also add custom entries. See [Software Catalog](/docs/dashboard/catalog).
