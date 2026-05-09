# syai-claude-workshop

A Slidev-based slide deck for a half-day, advanced Claude Code workshop. Serves as both the live presentation vehicle and a self-paced takeaway reference.

## Prerequisites

- [Bun](https://bun.com) `^1.3.x`
- Node.js `>=20.12` (Slidev's internal Vite uses Node)

## Setup

```bash
bun install
```

## Development

```bash
bunx slidev
```

Opens the deck at <http://localhost:3030/>. Hot-reload is enabled.

## Build

```bash
bunx slidev build
```

Outputs a static SPA to `dist/`.

## Preview built output

```bash
bun run preview
```

Serves `dist/` locally with SPA fallback at <http://localhost:4173/>. Use this to verify the build before deploying.

## Deploy

The deck is hosted on [Vercel](https://vercel.com) as a static SPA.

**Production URL:** https://syai-claude-workshop.vercel.app

### Initial setup

```bash
# 1. Authenticate the Vercel CLI (one-time)
bunx vercel login

# 2. Link this repo to a Vercel project
bunx vercel link --yes

# 3. First production deploy
bunx vercel deploy --prod
```

### Auto-deploy on push

Pushes to any branch produce a preview deployment; merges to `main` update production.
This requires a one-time GitHub connection: open the [Vercel project settings](https://vercel.com/dashboard) → **Settings → Git → Connect Git Repository**, choose this repo, then click **Save**. After connecting, future pushes auto-deploy.

### Manual deploy

```bash
bunx vercel deploy        # preview
bunx vercel deploy --prod # production
```

### Configuration

Build pins live in [`vercel.json`](./vercel.json):

- `framework: null` (Vite SPA, not a Vue/Nuxt preset)
- `installCommand: "bun install"`
- `buildCommand: "bunx slidev build"`
- `outputDirectory: "dist"`
- SPA rewrite `/(.*) → /index.html` so deep-linked slide URLs (e.g. `/3`) load on hard refresh.

## Project structure

```
slides.md           # Phase 1 flat 3-slide placeholder; replaced with chapter orchestrator in Phase 4
package.json        # Slidev + Bun pins
.gitignore
README.md           # this file
```

## License

Internal workshop materials — license TBD before public release.
