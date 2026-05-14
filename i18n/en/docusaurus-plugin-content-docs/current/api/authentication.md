---
id: authentication
title: Authentication
sidebar_position: 2
---

# Authentication

PatchOne uses cookie-based session authentication for the admin API.

## Login

**`POST /api/admin/login`**

```json
{"username": "your-username", "password": "your-password"}
```

Success (200): Sets session cookie. Returns admin profile.

## Logout

**`POST /api/admin/logout`** — Clears the session cookie.

## Current session

**`GET /api/admin/me`** — Returns your admin profile. Returns 401 if expired.

## Using the API from scripts

```python
import requests
session = requests.Session()
session.post("https://your-server/api/admin/login", json={"username": "admin", "password": "your-password"})
machines = session.get("https://your-server/api/machines").json()
```
