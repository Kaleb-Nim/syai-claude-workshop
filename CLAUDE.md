<!-- GSD:project-start source:PROJECT.md -->
## Project

**syai-claude-workshop**

A slide-deck website for a half-day, advanced Claude Code workshop. It serves as the **vehicle** for live presentation and as a takeaway reference participants revisit afterward — the lesson content itself will be authored separately by the workshop instructor.

**Core Value:** Participants can follow the workshop live and return to the same URL afterward to step through the material at their own pace — without losing place, formatting, or copyable code.

### Constraints

- **Tech stack:** Slidev (Vue-based, markdown-driven slide framework) — chosen for built-in dev-friendly features (code blocks, syntax highlighting, presenter mode, PDF export, SPA build).
- **Package manager:** Bun (`bun` / `bunx`) — per local environment standard. No npm/yarn.
- **Hosting:** Vercel — public URL with preview deployments per PR.
- **Visual identity:** Dark theme, monospace, minimal — must read as Claude/Anthropic-adjacent without infringing branding.
- **Content ownership:** Scaffold must be content-agnostic. Instructor will add slides as plain markdown after handoff.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Core Technologies
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Slidev | `@slidev/cli` ^52.15 (latest stable: 52.15.1, May 2026) | Markdown-driven slide framework (Vue 3 + Vite under the hood) | Project constraint. Built-in code highlighting (Shiki), presenter mode, PDF export, SPA build, hot-reload. No competitor matches the dev-DX. |
| Node.js | ≥ 20.12.0 (Slidev's documented minimum) | Required runtime for Slidev's Vite build pipeline | Hard requirement per Slidev install docs. Bun's runtime is **not** required (and not recommended as a runtime here — Slidev uses Vite + native Node tooling). Bun is used only as the package manager / script runner. |
| Bun | ^1.3.x (latest stable line) | Package manager + script runner (`bun install`, `bunx slidev`) | Project constraint (local env standard). Slidev officially supports Bun via `bun create slidev`. Faster installs than npm. **Use Bun for install/run; let Slidev's internal Vite use Node.** |
| Vue 3 | bundled by Slidev | Component layer for custom slide components | Slidev is built on Vue 3 — no choice, but worth noting that custom components live in `components/*.vue`. |
| Shiki | bundled (Slidev default highlighter) | Syntax highlighting (server-side, accurate TextMate grammars) | Default since Slidev v0.48+. Matches VS Code highlighting. Supports per-line highlighting, twoslash, transformers. |
| Vercel | hosted | Static SPA hosting | Project constraint. Free tier covers workshop traffic. Per-PR previews are first-class. |
### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@slidev/theme-default` | bundled | Built-in default theme (Inter + JetBrains Mono–style) | Starting point — fastest to ship. Override via `themeConfig.primary` + custom CSS in `style.css`. |
| `@slidev/theme-seriph` | npm | Built-in elegant serif theme | **Not recommended** for this project (serif clashes with monospace/code-heavy aesthetic). |
| `@shikijs/transformers` | latest (auto with Slidev) | Code-block transformers: notation diff, focus, error highlighting, line numbers | Enables `[!code highlight]`, `[!code ++]`, `[!code --]` annotations inside fenced code blocks. |
| `@shikijs/twoslash` | bundled when `twoslash: true` in frontmatter | Inline TS type info on hover | Enable for any slide showing TypeScript type-system points (hooks/MCP type signatures, agent SDK types). |
| `unplugin-icons` | bundled by Slidev | Icon access via `<carbon-logo-github />`-style components | Use for nav/sidebar icons, social links. No npm install needed — works out of the box. |
| `monaco-editor` | bundled (lazy) | Live-editable runnable code blocks (`{monaco-run}`) | Optional. Useful for "try it live" cells in workshop, but heavy — keep off by default (`monaco: false`) and enable per-deck if needed. |
### Development Tools
| Tool | Purpose | Notes |
|------|---------|-------|
| `bunx slidev` | Dev server (hot reload) | Starts on http://localhost:3030. |
| `bunx slidev build` | Production SPA build | Outputs to `dist/`. Pass `--base /` for Vercel root domain (default). |
| `bunx slidev export` | PDF/PNG export | Requires Playwright Chromium: `bunx playwright install chromium` first. |
| TypeScript | Type-checking custom components/setup files | Slidev scaffold ships with `tsconfig.json`. Use TS for `setup/*.ts` (shiki, routes, head). Markdown slides remain plain `.md`. |
| ESLint (optional) | Lint custom Vue components | Slidev's official starter does **not** ship ESLint — add only if instructor wants linting on custom components. |
## Installation
# Scaffold a new Slidev project (Bun-native, officially supported)
# Install deps (re-run after editing package.json)
# Start dev server
# Production build (outputs dist/)
# (optional) Install Playwright for PDF export
- `framework: null` selects "Other" (no preset). Slidev is not a Vercel framework preset, so we configure manually.
- Vercel auto-detects Bun in 2026 when `bun.lockb` is present, but pinning `installCommand` makes it explicit.
- Output is a pure static SPA — no serverless functions, no rewrites needed for the deck itself. If using Slidev's `routerMode: history` (default), add a SPA fallback:
## Theme Recommendation
- Default theme is light-on-dark capable (`colorSchema: 'dark'` in frontmatter forces dark).
- Anthropic's visual identity is minimal, monospace-forward, warm-neutral palette — easier to approximate via CSS variables on the default theme than to fight a community theme's opinions.
- Set `fonts.mono: 'JetBrains Mono'` (or `'Fira Code'` / `'IBM Plex Mono'`) and a sans like `'Inter'`.
- Override `themeConfig.primary` for accent color (`#cc785c`-ish warm rust matches Anthropic's accent without infringing).
| Theme | Why Not |
|-------|---------|
| `slidev-theme-purplin` | Purple-heavy, decorative — mismatches minimal aesthetic. |
| `slidev-theme-ktym4a` (Catppuccin) | Pastel — too soft for an Anthropic-adjacent feel. |
| `slidev-theme-seriph` (built-in) | Serif typography — explicitly off-brief. |
| `slidev-theme-excali-slide` | Hand-drawn/Excalidraw aesthetic — too playful. |
## Code-Block Enhancements
| Feature | How | Built-in? |
|---------|-----|-----------|
| Syntax highlighting | Fenced ` ```ts ` blocks | YES (Shiki) |
| Line highlighting | `{2,4-6}` after lang: ` ```ts {2,4-6} ` | YES |
| Step-through line highlights (per click) | ` ```ts {2|4-6|all} ` | YES |
| Diff annotations | `// [!code ++]` / `// [!code --]` inline | YES (Shiki transformers) |
| Highlight notation | `// [!code highlight]` | YES |
| Line numbers | `lineNumbers: true` in frontmatter | YES |
| TypeScript hover info | ` ```ts twoslash ` | YES |
| Live-editable + runnable | ` ```ts {monaco-run} ` | YES (opt-in) |
| **Copy-to-clipboard button** | **Not built-in** — add via custom CSS + small Vue component, OR use a Vite plugin | **NO** — see below |
## Navigation / Progress
- Slidev ships a navbar (bottom-right by default) with: prev/next, slide counter, fullscreen, presenter, drawing, dark-mode toggle, menu.
- The slide menu (overview grid) doubles as a sidebar for self-paced participants. Reachable via menu icon or `o` key.
- Progress indicator: bottom progress bar is auto-generated.
## TypeScript vs JavaScript for Addons/Components
- `setup/shiki.ts` (highlighter config) — uses `defineShikiSetup` from `@slidev/types`.
- `setup/main.ts` (Vue plugins) — typed `defineAppSetup`.
- Custom Vue components in `components/*.vue` — use `<script setup lang="ts">`.
- All slides (`slides.md`, `pages/*.md`) — no TS involved.
## Alternatives Considered
| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Slidev | Reveal.js | Project constraint forbids — but if Slidev DX issues block, Reveal has more raw flexibility. |
| Slidev | Marp | Markdown-driven and lighter, but no presenter mode parity, no Vite HMR, no Vue components. Not for code-heavy decks. |
| Default theme + custom CSS | Fork a community theme | Only if a community theme matches 90%+ of the design intent — none do here. |
| Bun (PM only) | pnpm | If Bun install ever breaks on a CI env. Slidev's npm scripts don't depend on Bun-specific behavior. |
| Vercel | Netlify / Cloudflare Pages | Equivalent for static SPAs; project constraint picks Vercel. |
| Shiki | Prism.js | Slidev removed Prism support in v0.48+. Shiki is the only supported highlighter now. Don't fight it. |
## What NOT to Use
| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `npm` / `npx` / `yarn` | Local env is Bun-only per CLAUDE.md | `bun` / `bunx` |
| `slidev-theme-seriph` | Serif clashes with monospace/code-heavy brief | `@slidev/theme-default` + custom CSS |
| Prism.js highlighter | Removed from Slidev | Shiki (default) |
| Vercel "Vue" framework preset | Slidev outputs a Vite SPA, not a Vue CLI / Nuxt project | `framework: null` with explicit `buildCommand` |
| Monaco editor on every code block | Heavy bundle (~3MB), slows initial load | Keep `monaco: false` globally; opt-in per slide via `{monaco-run}` |
| Custom build server / SSR | Slidev is SPA-only post-build | Static SPA → Vercel CDN |
| `@slidev/cli` < 52.x | Misses named animation presets, package-manager auto-detection, comark migration | Pin `^52.15` in package.json |
## Stack Patterns by Variant
- Enable `monaco: true` and use ` ```ts {monaco-run} ` blocks.
- Adds ~3MB to bundle — acceptable for workshop audience.
- Build with `bunx slidev build --base /workshop/`.
- Set `routerMode: 'hash'` in frontmatter to avoid Vercel rewrite gymnastics.
- Move to a monorepo with Bun workspaces; one deck per package; share a custom theme package.
- Out of scope for v1 per PROJECT.md.
## Version Compatibility
| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| `@slidev/cli@^52.15` | Node ≥ 20.12 | Hard floor. Bun ≥ 1.3 has been used to drive Slidev installs without reported issues as of May 2026. |
| `@slidev/cli@^52.x` | Vue 3.x (bundled) | Don't install Vue separately. |
| `@slidev/cli@^52.x` | Shiki (bundled) | Don't install Shiki separately unless writing transformers. |
| Vercel build runner | Bun (auto-detected via `bun.lockb`) | Pin `installCommand: "bun install"` in `vercel.json` for safety. |
## Confidence Per Decision
| Decision | Confidence | Source |
|----------|------------|--------|
| Slidev 52.15.x as the version pin | HIGH | GitHub releases (slidevjs/slidev), Context7 `/websites/sli_dev` |
| Bun officially supported via `bun create slidev` | HIGH | Context7 — Slidev install docs explicitly list `bun create slidev` |
| Vercel config (`framework: null`, `buildCommand`, `dist` output) | HIGH | Slidev hosting docs (sli.dev/guide/hosting) + Vercel `vercel.json` reference |
| `routerMode: history` needs SPA rewrite on Vercel | MEDIUM | Inferred from Vercel SPA conventions; verify on first deploy. |
| Default theme + custom CSS over community theme | MEDIUM | Taste-based; reviewed top community themes against brief. |
| Copy-to-clipboard not built-in | HIGH | Verified absence in Slidev features docs (no built-in directive). |
| Built-in nav sufficient for v1 | HIGH | Slidev features docs — navbar, overview, progress all built-in. |
| TypeScript for setup files | HIGH | Official starter ships TS; `@slidev/types` is the documented API. |
## Sources
- Context7 `/websites/sli_dev` — install, hosting/build, themes, frontmatter config, Shiki/twoslash/Monaco features, scaffold commands (HIGH)
- [Slidev Hosting Guide](https://sli.dev/guide/hosting) — `slidev build`, `dist` output, `--base` flag (HIGH)
- [Slidev Builtin CLI](https://sli.dev/builtin/cli) — full `slidev build` flag list (HIGH)
- [Slidev Customizations](https://sli.dev/custom/) — frontmatter options including `routerMode`, `colorSchema`, `lineNumbers`, `twoslash`, `monaco`, `fonts`, `themeConfig` (HIGH)
- [Slidev GitHub Releases](https://github.com/slidevjs/slidev/releases) — v52.15.1 (May 2026) latest stable; v52.14 renamed `mdc` → `comark` (HIGH)
- [Slidev Themes Repo](https://github.com/slidevjs/themes) — official `default` and `seriph` themes (HIGH)
- [Slidev Theme Gallery](https://sli.dev/resources/theme-gallery) — community themes surveyed (MEDIUM)
- [Vercel `vercel.json` reference](https://vercel.com/docs/project-configuration/vercel-json) — `framework`, `buildCommand`, `outputDirectory`, `installCommand`, `rewrites` (HIGH)
- [Vercel Configure a Build](https://vercel.com/docs/builds/configure-a-build) — `framework: null` for "Other" preset (HIGH)
- [Bun installation](https://bun.com/docs/installation) — `bunx`, `bun create` semantics (HIGH)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
