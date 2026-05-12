# PatchOne Docs

Docusaurus 3.5 documentation site for the PatchOne platform.

## Live Site

**https://patch-one.com/docs**

Hosted on GitHub Pages (`dchicale/patch-one-docs`). Deployed automatically via GitHub Actions on every push to `main`.

## Tech Stack

- **Framework**: Docusaurus 3.5 (React 18, Node 20)
- **Hosting**: GitHub Pages with custom domain `patch-one.com`
- **CI/CD**: GitHub Actions → `.github/workflows/deploy.yml`
- **DNS**: Cloudflare (CNAME `@` → `dchicale.github.io`, grey cloud / DNS only)

## Commands

```bash
npm install          # Install dependencies
npm start            # Dev server on http://localhost:3000 (live reload)
npm run build        # Production build → build/
npm run serve        # Serve the production build locally
npm run clear        # Clear Docusaurus cache (fixes most build issues)
```

## Project Structure

```text
docs/                # Markdown content (mirrors sidebar order)
  intro.md
  getting-started/
  installation/
  dashboard/
  agent/
  api/
  security/
  architecture/
src/
  css/custom.css     # Global CSS overrides and theme variables
  pages/index.js     # Landing page
static/
  CNAME              # Custom domain — do not delete (breaks GitHub Pages)
  img/               # Logos, favicons, social images
sidebars.js          # Sidebar structure — update when adding/removing pages
docusaurus.config.js # Site config, navbar, footer
.github/
  workflows/
    deploy.yml       # GitHub Actions deploy pipeline
```

## Adding a New Page

1. Create a `.md` or `.mdx` file under `docs/` in the appropriate subfolder.
2. Add it to `sidebars.js` in the correct position.
3. Push to `main` — the site redeploys automatically.

Each doc file must start with a front-matter title:

```md
---
title: My Page Title
---
```

## Deployment

Pushes to `main` trigger the workflow automatically. The pipeline:
1. Runs `npm ci`
2. Runs `npm run build` (fails on broken links — fix before merging)
3. Deploys `build/` to GitHub Pages via `actions/deploy-pages`

To redeploy without a content change, trigger the workflow manually from the Actions tab.

## Domain & DNS

| Record | Type | Name | Target | Proxy |
|--------|------|------|--------|-------|
| Docs subdomain | CNAME | `@` | `dchicale.github.io` | DNS only (grey) |

The `static/CNAME` file contains `patch-one.com`. It must stay in sync with the GitHub Pages custom domain setting and the `url` field in `docusaurus.config.js`. Do not delete it — GitHub Pages loses the custom domain on every deploy without it.

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
