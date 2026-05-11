# PatchOne Documentation

Docusaurus 3 site for the PatchOne product.

## Setup

Requires Node 20 (not 22 — V8 JIT crash on WSL2 with Node 22).

```bash
nvm use 20
npm install
```

## Development

```bash
npm start
```

Opens http://localhost:3000.

## Build

```bash
npm run build
```

Static output in `build/`.

## Content

| Directory | Contents |
|---|---|
| `docs/getting-started/` | Quick start and requirements |
| `docs/installation/` | On-prem, cloud, and agent deployment guides |
| `docs/dashboard/` | Dashboard page walkthroughs |
| `docs/agent/` | Agent architecture and configuration |
| `docs/api/` | Full REST API reference |
| `docs/security/` | AV coexistence and access control |
| `docs/architecture/` | System overview and data model |
