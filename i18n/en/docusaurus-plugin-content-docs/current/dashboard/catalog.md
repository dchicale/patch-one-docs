---
id: catalog
title: Software Catalog
sidebar_position: 5
---

# Software Catalog

The **Catalog** page manages the list of software titles available for deployment.

## Pre-loaded titles

PatchOne ships with 50+ curated titles. Each entry contains: Name, Winget ID, Category, Publisher, Built-in flag.

## Adding a custom entry

Click **Add Software**. Required: Name, Winget ID, Category.

:::tip Finding winget IDs
Run `winget search <name>` on any Windows 10+ machine to find the exact package identifier.
:::

## Deleting a custom entry

Soft-delete: hidden from the deploy dropdown but retained in job history.
