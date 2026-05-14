---
id: backup
title: Backup API
sidebar_position: 8
---

# Backup API

## List backups — `GET /api/backup`

## Trigger manual backup — `POST /api/backup`

Response 201. Audit: `backup_created`

## Download backup — `GET /api/backup/{id}/download`

Binary file download.

## Delete backup — `DELETE /api/backup/{id}`

Response 204. Audit: `backup_deleted`
