---
id: catalog
title: Catalog API
sidebar_position: 5
---

# Catalog API

## List catalog items — `GET /api/catalog`

Query params: `category`, `search`

## Create custom entry — `POST /api/catalog`

```json
{"name": "My App", "winget_id": "MyOrg.App", "category": "internal", "publisher": "My Org"}
```

Audit: `catalog_created`

## Update entry — `PATCH /api/catalog/{id}`

Custom entries only. Audit: `catalog_updated`

## Delete entry — `DELETE /api/catalog/{id}`

Custom entries only (soft-delete). Returns 403 for built-in entries. Audit: `catalog_deleted`
