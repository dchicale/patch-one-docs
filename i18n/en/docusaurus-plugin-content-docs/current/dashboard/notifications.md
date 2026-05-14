---
id: notifications
title: Notifications
sidebar_position: 8
---

# Notifications

The notification bell shows real-time alerts about fleet events.

## Notification types

| Type | Trigger |
|---|---|
| `machine_registered` | New machine checks in for the first time |
| `machine_offline` | Machine misses heartbeats past the timeout |
| `job_completed` | Deploy job finishes successfully |
| `job_failed` | Deploy job fails |
| `updates_available` | Machine reports pending updates |
| `daily_summary` | 8 AM automated fleet health briefing |

## Daily summary

Includes: machines online/offline, pending updates count, jobs completed/failed in last 24 hours.
