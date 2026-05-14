---
id: notifications
title: Notifications API
sidebar_position: 6
---

# Notifications API

## List notifications — `GET /api/notifications`

Query param: `unread_only` (boolean)

## Mark as read — `PATCH /api/notifications/{id}/read`

Response: `{"id": "...", "read": true}`

## Mark all as read — `PATCH /api/notifications/read-all`

Response: `{"marked_read": 5}`
