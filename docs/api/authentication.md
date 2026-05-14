---
id: authentication
title: Authentication
sidebar_position: 2
---

# Authentication

PatchOne uses cookie-based session authentication for the admin API. After logging in, the session cookie is automatically included in subsequent requests by the browser or your HTTP client.

## Login

**`POST /api/admin/login`**

**Request body:**

```json
{
  "username": "your-username",
  "password": "your-password"
}
```

**Success (200):** Sets a session cookie and returns your admin profile:

```json
{
  "id": 1,
  "username": "admin",
  "tenant_id": "your-org"
}
```

**Error responses:**

| Code | Cause |
|---|---|
| 401 | Invalid credentials |
| 429 | Too many failed attempts — wait before retrying |

---

## Logout

**`POST /api/admin/logout`**

Clears the session cookie. The logout event is written to the audit log.

---

## Current session

**`GET /api/admin/me`**

Returns your admin profile for the current session. Returns 401 if the session has expired.

## Session expiry

Sessions expire after a period of inactivity. After expiry, protected API calls return 401 and the browser redirects to the login page.

## Using the API from scripts

Use an HTTP client that supports cookies. Log in once to obtain the session cookie, then include it in subsequent requests:

```python
import requests

session = requests.Session()
session.post("https://your-server/api/admin/login", json={
    "username": "admin",
    "password": "your-password"
})

# Session cookie is now stored — subsequent requests include it automatically
machines = session.get("https://your-server/api/machines").json()
```
