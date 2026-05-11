---
id: notifications
title: Notifications
sidebar_position: 8
---

# Notifications

The notification bell in the top-right corner of the dashboard shows real-time alerts about fleet events.

## Notification types

| Type | Trigger | Severity |
|---|---|---|
| `machine_registered` | New machine checks in for the first time | Info |
| `machine_offline` | Machine misses heartbeats for > `HEARTBEAT_TIMEOUT_MINUTES` | Warning |
| `job_completed` | A deploy job finishes successfully | Info |
| `job_failed` | A deploy job fails | Error |
| `updates_available` | Machine reports pending winget updates | Info |
| `daily_summary` | 8 AM automated fleet health briefing | Info |

## Notification bell

The bell icon shows a badge with the count of unread notifications. Clicking the bell expands a dropdown panel showing the most recent notifications.

Each notification in the panel shows:

- **Icon** — colour-coded by type (green info, yellow warning, red error)
- **Message** — summary text (e.g., *"Machine DESKTOP-ABC01 came online"*)
- **Timestamp** — relative time (e.g., *"3 minutes ago"*)
- **Dismiss button** — mark as read and hide

## Mark all as read

Click **Mark all as read** in the notification panel header to clear the unread count.

## Daily summary

The daily summary notification (generated at 8:00 AM) includes:

- **Machines online** — count currently checking in
- **Machines offline** — count that have missed their heartbeat window
- **Pending updates** — total machines with at least one available winget update
- **Jobs completed** — deploy jobs that succeeded in the last 24 hours
- **Jobs failed** — deploy jobs that failed in the last 24 hours

## Notification API

Notifications can be read and marked as read via the [Notifications API](/docs/api/notifications). This is useful for integrating PatchOne alerts into external monitoring systems (e.g., Slack webhooks, ITSM tools).

## Configuration

The offline-alert threshold is set by `HEARTBEAT_TIMEOUT_MINUTES` in `server/.env` (default: 30 minutes). The daily summary time is fixed at 8:00 AM server local time in v1.0.
