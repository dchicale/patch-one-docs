---
id: overview
title: How PatchOne Works
sidebar_position: 1
---

# How PatchOne Works

PatchOne has two main components that communicate securely over HTTPS.

## Components

### Dashboard (admin interface)

A web application your IT administrators use to manage the fleet. Runs on the PatchOne server and is accessible from any browser on your network.

### Agent (client software)

A lightweight Windows Service installed on each managed machine. The agent **always initiates** the connection — the server never connects to machines directly. This means:

- No inbound firewall rules needed on client machines
- Works behind NAT, corporate proxies, and VPNs
- The server cannot push arbitrary commands to machines

## Communication model

```mermaid
flowchart TB
    admin["🖥️ IT Admin\n(browser · HTTPS)"]
    server["⚙️ PatchOne Server"]
    a1["💻 Agent · Machine A"]
    a2["💻 Agent · Machine B"]
    a3["💻 Agent · Machine N"]

    admin -->|"manages fleet"| server
    a1 -->|"periodic check-in · HTTPS"| server
    a2 -->|"periodic check-in · HTTPS"| server
    a3 -->|"periodic check-in · HTTPS"| server

    style server fill:#161A22,stroke:#3F4B62,color:#ECE9E2
    style admin fill:#1C2230,stroke:#3F4B62,color:#9FB3D2
    style a1 fill:#1C2230,stroke:#2A323F,color:#98A0AC
    style a2 fill:#1C2230,stroke:#2A323F,color:#98A0AC
    style a3 fill:#1C2230,stroke:#2A323F,color:#98A0AC
```

The agent checks in periodically, reports the machine's software inventory, and picks up any pending update jobs from the server. This pull model ensures the server acts as a trusted hub, not a remote-command executor.

## Deployment modes

| Mode | Description |
|---|---|
| **On-premises** | Single Windows Server on your LAN. No internet dependency after setup. |
| **Cloud** | Hosted behind a domain with TLS. Supports multiple client organisations. |

Both modes run the same software. Your choice depends on your network constraints and whether you need multi-tenant isolation.
