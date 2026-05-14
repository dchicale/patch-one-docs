---
id: overview
title: How the Agent Works
sidebar_position: 1
---

# How the Agent Works

`PatchPilotAgent.exe` is a self-contained Windows binary that runs as a Windows Service. It operates on a **pull model**: the agent always initiates connections to the server. No inbound ports are needed on client machines.

## What the agent does

On each check-in cycle, the agent:

1. Reads the machine's installed software inventory
2. Detects which installed applications have pending updates available
3. Sends a heartbeat to the server with this information
4. Checks whether the server has queued any update jobs for this machine
5. Runs any queued update jobs silently in the background
6. Reports the result back to the server

End users are not interrupted. Updates install silently with no prompts.

## Machine identification

Each machine is identified by a stable hardware identifier that persists across hostname changes and typical hardware configurations. This identifier is used to track the machine across check-ins and in the audit log.

## Pull model rationale

Because the agent always connects outbound to the server:

- No inbound firewall rules are needed on client machines
- The setup works behind NAT and corporate proxies
- The server cannot initiate arbitrary commands on client machines

## GravityZone compatibility

The agent uses Windows-native APIs and the system package manager. It does not open listening ports or inject into other processes.

See [GravityZone coexistence](/docs/security/gravityzone) for AV exclusion setup.
