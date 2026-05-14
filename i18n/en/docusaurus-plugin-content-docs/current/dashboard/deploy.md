---
id: deploy
title: Software Deployment
sidebar_position: 3
---

# Software Deployment

The **Deploy** page lets you push software updates to one machine or the entire fleet.

## Deploy form

1. **Select machines** — pick one or more from the list
2. **Select software** — choose a title from the catalog
3. **Click Deploy** — jobs are queued immediately

## Silent installation

All deployments run silently with no UAC prompt, no installer UI, and no end-user interruption.

## Batch deploy

When deploying to multiple machines, all jobs share a `batch_id` for grouped tracking.

## Duplicate protection

If a queued or in-progress job already exists for a machine+software pair, the server skips the duplicate (HTTP 409).
