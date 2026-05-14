---
id: gravityzone
title: GravityZone / AV Coexistence
sidebar_position: 1
---

# GravityZone / AV Coexistence

PatchOne is designed to work alongside Bitdefender GravityZone and Windows Defender. Some AV engines may flag the agent binary on first deployment — this is a false positive that requires adding exclusions.

## Solution 1 — Code-signing (recommended)

Sign `PatchPilotAgent.exe` with an EV (Extended Validation) code-signing certificate.

## Solution 2 — Windows Defender exclusions

```powershell title="Add exclusions (run as Administrator)"
Add-MpPreference -ExclusionPath "C:\Program Files\PatchOne\"
Add-MpPreference -ExclusionProcess "PatchPilotAgent.exe"
```

## Solution 3 — GravityZone exclusion (Control Center)

**Policies → Antimalware → On-Access → Custom Exclusions**
- Path: `C:\Program Files\PatchOne\`
- Process: `PatchPilotAgent.exe`

## Automated exclusion script

```bat title="Run as Administrator — or deploy via GPO"
deploy\register_av_exclusion.ps1
```
