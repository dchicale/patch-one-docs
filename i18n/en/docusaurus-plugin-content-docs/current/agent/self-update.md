---
id: self-update
title: Agent Self-Update
sidebar_position: 3
---

# Agent Self-Update

The agent updates itself automatically when the server publishes a new version. No manual intervention is required on client machines.

## How it works

1. Downloads the new agent binary from the server
2. Stops itself, replaces its own executable, and restarts as a service
3. Reports the new running version on the next check-in

## Rollback

If the updated agent fails to start, the previous version is preserved as a backup file in the installation directory.

## AV considerations

Ensure the agent installation directory and process are excluded from AV real-time scanning. See [GravityZone coexistence](/docs/security/gravityzone).
