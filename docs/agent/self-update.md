---
id: self-update
title: Agent Self-Update
sidebar_position: 3
---

# Agent Self-Update

The agent updates itself automatically when the server publishes a new version. No manual action is required on individual machines.

## How it works

On each check-in, the server includes the latest available agent version in its response. If the agent detects it is running an older version, it:

1. Downloads the new agent binary from the server
2. Stops itself, replaces its own executable, and restarts as a service
3. Reports the new running version on the next check-in

The entire process is transparent to end users.

## Rollback

If the updated agent fails to start, the previous version is preserved as a backup file in the installation directory. Contact your system administrator to manually restore the previous binary if needed.

## AV considerations

During a self-update, the agent writes a new binary to a temporary location before moving it into place. If your AV software blocks this, the update will silently fail and the agent will continue running the current version.

Ensure the agent installation directory and process are excluded from AV real-time scanning. See [GravityZone coexistence](/docs/security/gravityzone).
