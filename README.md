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

<!-- Deploy section is finalized in Phase 1 / Plan 02 -->

_Vercel deployment instructions and the public production URL are added in the deploy plan._

## Project structure

```
slides.md           # Phase 1 flat 3-slide placeholder; replaced with chapter orchestrator in Phase 4
package.json        # Slidev + Bun pins
.gitignore
README.md           # this file
```

## License

Internal workshop materials — license TBD before public release.
