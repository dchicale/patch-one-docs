---
id: overview
title: API Overview
sidebar_position: 1
---

# API Overview

PatchOne exposes a REST API at the same base URL as the dashboard.

## Authentication

All API requests require a valid admin session. See [Authentication](/docs/api/authentication) for details.

## HTTP status codes

| Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Created |
| 401 | Not authenticated |
| 403 | Forbidden |
| 404 | Not found |
| 409 | Conflict |
| 429 | Rate limited |

## Available API sections

| Section | Purpose |
|---|---|
| [Authentication](/docs/api/authentication) | Login, logout, session management |
| [Machines](/docs/api/machines) | Fleet inventory and machine management |
| [Deploy](/docs/api/deploy) | Queue and monitor update deployments |
| [Catalog](/docs/api/catalog) | Manage the software catalog |
| [Notifications](/docs/api/notifications) | Read and dismiss notifications |
| [Audit](/docs/api/audit) | Query the immutable audit log |
| [Backup](/docs/api/backup) | Trigger and download database backups |
