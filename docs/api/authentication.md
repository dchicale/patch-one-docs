---
id: authentication
title: Authentication API
sidebar_position: 2
---

# Authentication API

## Overview

PatchOne uses cookie-based JWT authentication for the admin dashboard. Sessions are stored in an HttpOnly cookie (`access_token`) to prevent XSS access.

## Endpoints

### Login

```
POST /api/admin/login
```

**Auth:** None

**Request body:**

```json
{
  "username": "admin",
  "password": "your-password"
}
```

**Response (200):** Sets `access_token` HttpOnly cookie. Returns admin profile:

```json
{
  "id": 1,
  "username": "admin",
  "tenant_id": "default"
}
```

**Error responses:**

| Code | Cause |
|---|---|
| 401 | Invalid username or password |
| 429 | Too many failed login attempts |

**Notes:**
- Passwords are verified with bcrypt
- Login events are written to the audit log
- The session cookie expires after `SESSION_TIMEOUT_HOURS` (default: 8 hours)

---

### Logout

```
POST /api/admin/logout
```

**Auth:** Required (`access_token` cookie)

**Response (200):** Clears the `access_token` cookie:

```json
{"message": "logged out"}
```

**Notes:** The logout event is written to the audit log.

---

### Current admin profile

```
GET /api/admin/me
```

**Auth:** Required

**Response (200):**

```json
{
  "id": 1,
  "username": "admin",
  "tenant_id": "default"
}
```

**Error responses:**

| Code | Cause |
|---|---|
| 401 | Missing or expired session cookie |

## Using the cookie in API clients

When calling protected endpoints from a script or API client, include the session cookie from a prior login:

```python
import requests

session = requests.Session()

# Login
resp = session.post("http://server:8000/api/admin/login", json={
    "username": "admin",
    "password": "password"
})
resp.raise_for_status()

# The session cookie is now stored in session.cookies
# Subsequent requests automatically include it
machines = session.get("http://server:8000/api/machines").json()
```

## Session expiry

Sessions expire after `SESSION_TIMEOUT_HOURS` (default: 8) of inactivity. After expiry, the next request to a protected endpoint returns HTTP 401, and the browser redirects to the Login page.
