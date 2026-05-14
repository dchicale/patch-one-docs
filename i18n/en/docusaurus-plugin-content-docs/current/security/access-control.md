---
id: access-control
title: Access Control
sidebar_position: 2
---

# Access Control

## Authentication

| Actor | Mechanism |
|---|---|
| Admin (dashboard) | Session cookie, set at login and cleared at logout |
| Agent (Windows Service) | Shared API key configured during deployment |

Admin sessions expire automatically after a period of inactivity (default: 8 hours).

## Password storage

Admin passwords are stored using a strong one-way hash. Plaintext passwords are never stored.

## Brute-force protection

Login attempts are rate-limited per IP address. Repeated failures result in a temporary lockout.

## API key security

- Store it only in the agent configuration file and the server configuration
- Restrict file permissions so only the service account can read it
- Rotate the key if an agent machine is decommissioned or compromised

## Tenant isolation (cloud mode)

Each admin's session is bound to their organisation. Cross-tenant access is not possible.

## Audit trail

| Event | When |
|---|---|
| Successful login | Admin signs in |
| Failed login attempt | Wrong credentials (source IP recorded) |
| Logout | Admin signs out |

## Recommendations for production

- Use HTTPS/TLS — mandatory for cloud, strongly recommended for on-premises
- Rotate the agent API key when decommissioning machines
- Apply minimum-privilege file permissions to server and agent configuration files
