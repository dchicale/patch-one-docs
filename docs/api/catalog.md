---
id: catalog
title: Catalog API
sidebar_position: 5
---

# Catalog API

Manage the software catalog used in deploy operations.

## Endpoints

### List catalog items

```
GET /api/catalog
```

**Auth:** Required

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `category` | string | Filter by category (exact match, case-insensitive) |
| `search` | string | Filter by name or publisher (partial match) |

**Response (200):**

```json
[
  {
    "id": 1,
    "name": "Google Chrome",
    "winget_id": "Google.Chrome",
    "category": "browser",
    "publisher": "Google LLC",
    "builtin": true
  },
  {
    "id": 51,
    "name": "My Custom App",
    "winget_id": "MyOrg.CustomApp",
    "category": "internal",
    "publisher": "My Organisation",
    "builtin": false
  }
]
```

---

### Create a custom catalog entry

```
POST /api/catalog
```

**Auth:** Required

**Request body:**

```json
{
  "name": "My Custom App",
  "winget_id": "MyOrg.CustomApp",
  "category": "internal",
  "publisher": "My Organisation"
}
```

**Response (201):** The created catalog item object.

**Audit:** Logged as `catalog_created`.

---

### Update a catalog entry

```
PATCH /api/catalog/{catalog_item_id}
```

**Auth:** Required

**Restriction:** Admins can only update their own custom entries. Built-in entries (`builtin: true`) cannot be updated.

**Request body** (all fields optional):

```json
{
  "name": "My Custom App v2",
  "category": "productivity"
}
```

**Response (200):** Updated catalog item object.

**Audit:** Logged as `catalog_updated`.

---

### Delete a catalog entry

```
DELETE /api/catalog/{catalog_item_id}
```

**Auth:** Required

**Restriction:** Custom entries only. Built-in entries cannot be deleted.

**Response (204):** No content. The entry is soft-deleted (hidden from lists, retained in job history).

**Error responses:**

| Code | Cause |
|---|---|
| 403 | Attempt to delete a built-in entry |
| 404 | Catalog item not found |

**Audit:** Logged as `catalog_deleted`.
