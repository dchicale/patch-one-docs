---
id: catalog
title: Software Catalog
sidebar_position: 5
---

# Software Catalog

The **Catalog** page manages the list of software titles available for deployment.

## Pre-loaded titles

PatchOne ships with 50+ curated software titles. Each entry contains:

| Field | Description |
|---|---|
| **Name** | Display name (e.g., *Google Chrome*) |
| **Winget ID** | Package identifier used to invoke winget (e.g., `Google.Chrome`) |
| **Category** | Grouping for filtering (e.g., `browser`, `productivity`, `developer`) |
| **Publisher** | Software publisher name |
| **Built-in** | Whether the entry was pre-loaded (cannot be deleted by admins) |

## Browsing and searching

The catalog page provides:
- **Search bar** — filter by name or publisher in real time
- **Category filter** — show only titles in a selected category

## Categories

Pre-loaded categories include:

- Browsers
- Productivity
- Communication
- Developer Tools
- Security
- Utilities
- Media

## Adding a custom entry

Click **Add Software** to create a custom catalog entry. Required fields:

| Field | Notes |
|---|---|
| **Name** | Display name shown in the deploy dropdown |
| **Winget ID** | Must match a valid `winget show <id>` package |
| **Category** | Select from the existing list or type a new one |

:::tip Finding winget IDs
Run `winget search <name>` on any Windows 10+ machine to find the exact package identifier.
:::

## Editing a custom entry

Admins can edit only their own custom entries. Built-in entries cannot be edited or deleted.

## Deleting a custom entry

Soft-delete: the entry is hidden from the deploy dropdown but remains in the audit log and is retained in historical job records.

## Catalog in the deploy workflow

The catalog drives the software dropdown in the **Deploy** page. When you select a title, the deploy job uses the stored `winget_id` to invoke `winget upgrade` on the target machine.
