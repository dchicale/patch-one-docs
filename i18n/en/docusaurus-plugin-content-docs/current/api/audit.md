---
id: audit
title: Audit API
sidebar_position: 7
---

# Audit API

Read the immutable audit log. No write or delete operations available.

## List audit entries — `GET /api/audit`

Query params: `event_type`, `from`, `to`, `actor`, `limit`, `offset`

## Export as CSV — `GET /api/audit/export.csv`

Returns `Content-Type: text/csv`.

Columns: `timestamp,event_type,actor,target,detail,ip_address`

## Tamper protection

No POST, PUT, PATCH, or DELETE operations. Append-only at the database level.
