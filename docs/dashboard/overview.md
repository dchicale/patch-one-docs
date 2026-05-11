---
id: overview
title: Dashboard Overview
sidebar_position: 1
---

# Dashboard Overview

The PatchOne dashboard is a React SPA served at the root URL of the server. It provides full fleet management without requiring any additional tools.

## Navigation

The left sidebar contains the main sections:

| Section | Purpose |
|---|---|
| **Machines** | Fleet view — all registered machines and their status |
| **Deploy** | Push software updates to one or more machines |
| **Jobs** | Monitor the status and results of deploy jobs |
| **Catalog** | Browse and manage the software catalog |
| **Audit** | Immutable log of all admin actions |
| **Backup** | Database backup management |

## Top bar

The top navigation bar contains:

- **PatchOne logo** — links to the Machines page
- **Notification bell** — shows unread notification count; click to expand
- **Admin username** — click to log out

## Daily briefing

At 8:00 AM each day, an automated **Daily Summary** notification appears in the notification panel. It includes:

- Total machines online / offline
- Number of machines with pending updates
- Number of jobs completed / failed in the last 24 hours

## Status badges

Machines display a status badge:

| Badge | Meaning |
|---|---|
| **Online** | Last heartbeat within the configured timeout (default 30 min) |
| **Offline** | No heartbeat for longer than the timeout |

## Authentication

The dashboard uses cookie-based JWT authentication. Sessions expire after 8 hours (configurable via `SESSION_TIMEOUT_HOURS` in `.env`). After expiry, the browser redirects to the Login page.

## Keyboard shortcuts

The dashboard is optimised for mouse navigation. No custom keyboard shortcuts are defined in v1.0.

## Browser compatibility

Any modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+) is supported. JavaScript must be enabled.
