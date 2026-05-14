---
id: agent-deployment
title: Agent Deployment
sidebar_position: 3
---

# Agent Deployment

`PatchPilotAgent.exe` is a self-contained Windows binary (no Python runtime required). Deploy it as a Windows Service on each machine you want to manage.

## Before you start

```powershell title="Register AV exclusions (run as Administrator)"
deploy\register_av_exclusion.ps1
```

## config.ini

```ini title="config.ini" {2,3}
[server]
SERVER_URL=https://your-patchone-server
API_KEY=<your-api-key>
TENANT_ID=default
HEARTBEAT_INTERVAL=300

[agent]
LOG_LEVEL=INFO
```

## Method 1 — GPO Startup Script (recommended)

1. Copy files to a network share: `\\server\sysvol\PatchOne\`
2. Create a GPO: `Computer Configuration → Windows Settings → Scripts → Startup`
3. Script: `\\server\sysvol\PatchOne\PatchPilotAgent.exe`, Parameters: `install`
4. Link GPO to the target OU

```bat title="Check service status on a target machine"
sc query PatchOneAgent
```

## Method 2 — WinRM / PowerShell remoting

```powershell title="Bulk deploy via WinRM" showLineNumbers
$hosts = Get-Content hosts.txt
foreach ($h in $hosts) {
    $session = New-PSSession -ComputerName $h
    Copy-Item PatchPilotAgent.exe -Destination "C:\Program Files\PatchOne\" -ToSession $session
    Copy-Item config.ini          -Destination "C:\Program Files\PatchOne\" -ToSession $session
    Invoke-Command -Session $session -ScriptBlock {
        & "C:\Program Files\PatchOne\PatchPilotAgent.exe" install
        Start-Service PatchOneAgent
    }
    Remove-PSSession $session
}
```

## Method 3 — Mass deploy script (PsExec)

```bat title="Deploy by host list"
python deploy\deploy_agents.py --hosts hosts.txt --server-url https://your-patchone-server --api-key <key>
```

## Method 4 — Manual install

```bat title="Manual install (run as Administrator)"
xcopy /Y PatchPilotAgent.exe "C:\Program Files\PatchOne\"
xcopy /Y config.ini          "C:\Program Files\PatchOne\"
"C:\Program Files\PatchOne\PatchPilotAgent.exe" install
sc start PatchOneAgent
```

## Agent service management

| Action | Command |
|---|---|
| Start | `sc start PatchOneAgent` |
| Stop | `sc stop PatchOneAgent` |
| Uninstall | `PatchPilotAgent.exe remove` |
| Status | `sc query PatchOneAgent` |
