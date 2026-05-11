---
id: gravityzone
title: GravityZone / AV Coexistence
sidebar_position: 1
---

# GravityZone / AV Coexistence

PatchOne is designed to work alongside Bitdefender GravityZone and Windows Defender. This page explains potential conflicts and how to resolve them.

## Why PyInstaller binaries trigger AV

`PatchPilotAgent.exe` is built with PyInstaller `--onefile` mode. On every service start, PyInstaller extracts a temporary Python environment to `%TEMP%\MEI<random>`. Behavioral AV engines — including GravityZone — may flag this because:

- A binary writes executable files to `%TEMP%` and runs them
- The extracted files are unsigned
- The pattern resembles malware unpacking behavior

This is a false positive. The agent does not contain malware.

## Solution 1 — Code-signing (recommended long-term)

Sign `PatchPilotAgent.exe` with an EV (Extended Validation) certificate. Most AV engines whitelist EV-signed binaries automatically.

```bat
signtool.exe sign /fd SHA256 ^
  /tr http://timestamp.digicert.com /td SHA256 ^
  /f PatchOne.pfx /p <password> ^
  dist\PatchPilotAgent.exe
```

EV certificates are issued by DigiCert, Sectigo, and other CAs. Cost: approximately $300–500 per year.

## Solution 2 — Windows Defender exclusions

Run as Administrator on each machine (or deploy via GPO):

```powershell
# Exclude install directory
Add-MpPreference -ExclusionPath "C:\Program Files\PatchOne\"

# Exclude the process
Add-MpPreference -ExclusionProcess "PatchPilotAgent.exe"

# Exclude PyInstaller temp directory
Add-MpPreference -ExclusionPath "$env:TEMP\MEI*"
```

Deploy via GPO:
`Computer Configuration → Preferences → Windows Settings → Registry`

## Solution 3 — GravityZone exclusion (Control Center)

1. Open GravityZone Control Center
2. Navigate to: **Policies → Antimalware → On-Access → Custom Exclusions**
3. Add exclusions:
   - **Path:** `C:\Program Files\PatchOne\`
   - **Process:** `PatchPilotAgent.exe`
4. Apply the policy to the target machine groups

## Solution 4 — GravityZone REST API exclusion

If you have GravityZone API access, add exclusions programmatically:

```python
import requests

headers = {"Authorization": f"Bearer {api_key}"}
payload = {
    "params": {
        "policyId": "<your-policy-id>",
        "settings": {
            "antimalware": {
                "onAccess": {
                    "exclusions": [
                        {"path": r"C:\Program Files\PatchOne\", "type": "path"},
                        {"process": "PatchPilotAgent.exe", "type": "process"}
                    ]
                }
            }
        }
    }
}
requests.post(
    f"{gz_url}/api/v1.0/jsonrpc/policies",
    json=payload,
    headers=headers
)
```

## Automated exclusion script

The repo includes a pre-built PowerShell script that handles both Windows Defender and provides instructions for GravityZone:

```bat
deploy\register_av_exclusion.ps1
```

Run this as Administrator on each machine before deploying the agent, or deploy it via GPO.

## Post-MVP: --onedir packaging

The MVP ships with `--onefile` for simplicity. A future version will switch to `--onedir` packaging, which eliminates the `%TEMP%` extraction entirely:

| Mode | Extraction | AV friction |
|---|---|---|
| `--onefile` (current) | Extracts to `%TEMP%\MEI*` on each start | High without exclusions |
| `--onedir` (planned) | Fixed install directory, no extraction | Low — stable path exclusion |

The `--onedir` migration will bundle with Inno Setup or NSIS to produce a proper `PatchOneAgent_Setup.exe` installer.

## Winget subprocess calls

The agent invokes `winget` as a subprocess. GravityZone may intercept subprocess execution. Ensure `winget.exe` and its install path are not blocked by Application Control policies.

winget is located at:
```
C:\Users\<user>\AppData\Local\Microsoft\WindowsApps\winget.exe
```

Or system-wide at:
```
C:\Program Files\WindowsApps\Microsoft.DesktopAppInstaller_*\winget.exe
```
