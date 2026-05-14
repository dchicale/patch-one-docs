---
id: access-control
title: Access Control
sidebar_position: 2
---

# Access Control

## Authentication

PatchOne uses two separate authentication mechanisms:

| Actor | Mechanism |
|---|---|
| Admin (dashboard) | Session cookie, set at login and cleared at logout |
| Agent (Windows Service) | Shared API key configured during deployment |

Admin sessions expire automatically after a period of inactivity (default: 8 hours). After expiry, the browser redirects to the login page.

## Password storage

Admin passwords are stored using a strong one-way hash. Plaintext passwords are never stored. The initial admin password is set during server installation.

## Brute-force protection

Login attempts are rate-limited per IP address. Repeated failures result in a temporary lockout to prevent automated attacks.

## API key security

The API key shared between the server and agents should be treated as a secret:

- Store it only in the agent configuration file and the server configuration
- Restrict file permissions so only the service account can read it
- Rotate the key if an agent machine is decommissioned or believed to be compromised

## Tenant isolation (cloud mode)

In cloud mode, each admin's session is bound to their organisation. It is not possible to access another organisation's data with your credentials, regardless of what is in the request.

## Audit trail

Every authentication event is logged immutably:

| Event | When |
|---|---|
| Successful login | Admin signs in |
| Failed login attempt | Wrong credentials (source IP recorded) |
| Logout | Admin signs out |

## Recommendations for production

- Use a long, randomly generated secret key for signing sessions
- Use HTTPS/TLS — mandatory for cloud, strongly recommended for on-premises
- Rotate the agent API key when decommissioning machines
- Restrict network access to the PatchOne server to trusted subnets
- Apply minimum-privilege file permissions to server and agent configuration files
