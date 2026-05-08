# Project Research Summary

**Project:** syai-claude-workshop
**Domain:** Code-heavy developer workshop slide deck (Slidev SPA → Vercel; live + async takeaway)
**Researched:** 2026-05-08
**Confidence:** HIGH

## Executive Summary

This project is a content-agnostic Slidev scaffold for a half-day, advanced Claude Code workshop. The deck doubles as the live presentation vehicle and the post-workshop takeaway reference, so the architecture must serve two distinct UX modes (presenter-driven and self-paced) from a single static SPA hosted on Vercel. Research confirms Slidev (≥52.15) on Bun (PM only — Vite uses Node 20+) is the right choice: it ships nearly all required features (Shiki highlighting, deep-linked routes, presenter mode, PDF export, slide overview, click animations, line highlighting, magic-move) out of the box, leaving only three custom builds — copy-to-clipboard wrapper, persistent sidebar/progress (`global-bottom.vue`), and a Claude-aligned dark/monospace token theme via UnoCSS.

The recommended approach is **defaults-first, customize tokens only**: stay on `@slidev/theme-default`, override colors/fonts/code-theme via `uno.config.ts` and CSS, split content into `pages/*.md` from day one via `src:` includes, and treat Vercel as a pure static SPA host. The biggest risks are operational rather than design: a missing `vercel.json` SPA rewrite breaks every deep-link 404 (killing the takeaway promise), unscoped global CSS leaks into presenter chrome (issue #2446), and Bun + a custom `vite.config.ts` can silently drop Slidev config (issue #2043). All three are cheap to prevent if addressed in scaffold/deploy phases and verified via a `bun run preview` step before merge.

The core handoff goal — instructor adds slides as plain markdown — drives the strongest design constraint: **no custom DSL, no custom layouts, no custom required frontmatter**. Authoring guide must fit on one page. v1 ships scaffold + deploy + theme tokens + copy button + sidebar + content slots; everything else (magic-move examples, custom `<Cmd>` block, slide-resume, search, twoslash) is deferred to post-validation triggers.

## Key Findings

### Recommended Stack

Slidev 52.15+ on Bun (package manager only; Slidev's Vite internals use Node ≥20.12) is validated. `bun create slidev` is officially supported; Vercel auto-detects Bun via `bun.lockb`. Stay on `@slidev/theme-default` plus a custom UnoCSS token overlay rather than forking a community theme.

**Core technologies:**
- **Slidev `^52.15`** — Markdown-driven Vue 3/Vite slide framework. Ships Shiki, presenter mode, PDF export, magic-move, twoslash, deep-linking, overview built in.
- **Bun `^1.3.x`** — PM + script runner only (`bun install`, `bunx slidev`). Slidev's internal Vite still uses Node.
- **Node ≥20.12** — Hard floor for Slidev's Vite pipeline.
- **Shiki (bundled)** — Default highlighter; Prism removed; supports diff/highlight transformers, twoslash, magic-move.
- **UnoCSS (bundled)** — Token/shortcut layer for dark theme + monospace identity.
- **Vercel** — Static SPA host with per-PR previews. `framework: null`, `buildCommand: bunx slidev build`, `outputDirectory: dist`, mandatory `rewrites`.

### Expected Features

**Must-have (P1, v1):**
- Slidev scaffold + Bun dev/build scripts
- Vercel deploy (preview + prod)
- Shiki code blocks + custom copy-to-clipboard (NOT built-in)
- Persistent sidebar/progress via custom `global-bottom.vue`
- Dark monospace UnoCSS theme
- Section grouping convention; deep-linking; overview (`o`); `v-click`; line highlighting `{1,3-5}`
- PDF export; presenter mode
- README authoring guide ≤150 lines

**Should-have (P2, post-validation):** Shiki Magic Move example, custom `<Cmd>` terminal block, per-slide share button, slide-resume on reload (localStorage), Mermaid example.

**Defer / Anti:** Twoslash, Pagefind search, multi-deck index, recording embed, i18n. Anti-features explicitly: live polling, accounts, in-browser code sandbox (misleading — Claude Code is a real CLI), exercise-checkpoint UI, analytics.

### Architecture Approach

Four-layer Vite SPA: markdown authoring (`slides.md` + `pages/*.md` via `src:`), Vue presentation (auto-registered `components/`, `layouts/`, `global-top/bottom.vue`), UnoCSS theming (`uno.config.ts` + `styles/`), static build to `dist/` deployed via Vercel with single SPA-rewrite. Hard build-order dependency: **theme tokens → layouts → components → content slots**.

**Major components:**
1. **`slides.md` + `pages/*.md`** — Thin orchestrator + one file per chapter (subagents/hooks/MCP/slash/skills/plugins/SDK) via `src:`.
2. **`components/*.vue`** — Auto-registered (no imports): `CopyButton.vue`, `Callout.vue`, `SectionHeader.vue`, optional `Cmd.vue`.
3. **`global-bottom.vue`** — Persistent sidebar/progress overlay reading `useNav()`; project root only.
4. **`uno.config.ts` + `styles/`** — Theme tokens (`bg-main`, `text-accent`, mono stack); single source of truth.
5. **`vercel.json`** — `rewrites: /(.*) → /index.html`. Mandatory.

### Critical Pitfalls

1. **Missing `vercel.json` SPA rewrite** — Direct visit to `/14` returns 404, breaking takeaway URL value. Commit rewrite during deploy bootstrap; verify on preview.
2. **Unscoped CSS leaks into presenter mode (#2446)** — Manifests only in front of live audience. Scope every selector under `.slidev-layout`; smoke-check presenter mode on every theme change.
3. **Bun + custom `vite.config.ts` silently drops Slidev config (#2043)** — Avoid custom `vite.config.ts` for v1; use headmatter and `setup/`.
4. **Code unreadable on projector** — Set base code font ≥1.1em; document 60-char line cap; Shiki theme contrast ≥4.5:1.
5. **Addons that work in dev but fail in `dist/` (#2072)** — Make `bun run preview` a required pre-push check; prefer first-party built-ins.
6. **Magic-move overuse** — Budget ≤10 magic-move blocks; pin explicit Shiki language list; keep build <90s.

## Implications for Roadmap

### Phase 1: Scaffold & Deploy Bootstrap
**Rationale:** Known-good baseline must exist before customization; deploy issues cheapest to debug while project is small. Catches Pitfalls #1, #3, #5.
**Delivers:** `bun create slidev` scaffold with pinned versions, `vercel.json` SPA rewrite, `bun.lock` + `"packageManager": "bun@x.y.z"`, Vercel project wired with explicit `bunx slidev build` + `bun install`, trivial commit verifying `<preview>/3` loads.

### Phase 2: Theme Tokens & Visual Identity
**Rationale:** Tokens must exist before layouts/components reference them — hard architectural dependency.
**Delivers:** `uno.config.ts` shortcuts (`bg-main`, `text-accent`, JetBrains Mono / Inter stack), `colorSchema: dark` + `themeConfig.primary` + `fonts:` headmatter, `styles/` partials scoped under `.slidev-layout`, Shiki theme picked + contrast-verified, explicit Shiki language list (ts, tsx, bash, json, md, yaml).

### Phase 3: Custom Components & Persistent UI
**Rationale:** Components live inside layouts/tokens; building after tokens stabilize avoids rework.
**Delivers:** `components/CopyButton.vue` (global wrapper), `global-bottom.vue` (sidebar + progress + section nav via `useNav()`), `Callout.vue`, `SectionHeader.vue`, level-1 section frontmatter convention documented.

### Phase 4: Content Slots & Authoring Conventions
**Rationale:** Empty `pages/*.md` files give instructor a clear authoring contract without imposing a DSL. Documentation is the deliverable.
**Delivers:** `pages/00-intro.md` through `pages/99-outro.md` (one per topic — subagents, hooks, MCP, slash, skills, plugins, agent SDK), `slides.md` with all `src:` includes ordered, README authoring guide ≤150 lines.

### Phase 5: Polish & Handoff Verification
**Rationale:** Final pre-handoff pass; runs operational checklist before instructor takes ownership.
**Delivers:** Presenter-mode smoke check (`/presenter/`), PDF export verified (`bunx slidev export`), OG image + favicon, "Looks Done But Isn't" checklist, README final pass.

### Phase Ordering Rationale

- **Tokens before components** is a hard dependency.
- **Deploy bootstrap (P1) before tokens (P2)** — operational pitfalls cheapest to surface against an empty deck.
- **Components (P3) before content slots (P4)** — instructors will use components in content; content first means rewriting it.
- **Single deck, no multi-module orchestration** — PROJECT.md and FEATURES.md align: don't add router complexity for v1.
- **No `vite.config.ts` until proven necessary** — sidesteps Pitfall #3.

### Research Flags

Needs research:
- **Phase 3 (Components):** Copy-button implementation choice (Shiki transformer vs `global-bottom.vue` overlay vs per-component slot wrapper) — quick `/gsd-research-phase` recommended to lock pattern.

Standard patterns (skip research-phase):
- **Phase 1 (Scaffold/Deploy):** Fully documented Slidev hosting + Vercel reference.
- **Phase 2 (Theme Tokens):** UnoCSS + Slidev frontmatter well-trodden.
- **Phase 4 (Content Slots):** Pure markdown + docs.
- **Phase 5 (Polish):** Checklist-driven.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Verified via Context7 `/websites/sli_dev`, Slidev releases, Vercel `vercel.json` reference, Bun docs. Theme aesthetic taste-driven (MEDIUM). |
| Features | HIGH | All required features mapped to Slidev built-ins or small custom components with concrete paths. |
| Architecture | HIGH | All claims verified against official Slidev docs. |
| Pitfalls | MEDIUM-HIGH | Slidev/Vercel pitfalls HIGH (linked to issues #2043, #2072, #2446). Bun edge cases MEDIUM (version-dependent). UX HIGH. |

**Overall confidence:** HIGH

### Gaps to Address

- **Copy-to-clipboard implementation choice** — Three viable patterns; decide during Phase 3 planning.
- **Vercel `routerMode: history` SPA rewrite** — Verify on first deploy in Phase 1 (visit `<preview>/3`). Fallback to `routerMode: 'hash'` if problematic.
- **Bun version pin** — Pitfall #3 references issue on Bun 1.2.2; pin tested version in `package.json` `packageManager` during Phase 1.
- **Projector contrast** — Final WCAG verification only possible on actual workshop projector; document pre-workshop dry-run in Phase 5.
- **Concept reference inaccessible** — `claudecode.sg/slides/...` returned 403; per PROJECT.md it's concept-only, acceptable.

## Sources

### Primary (HIGH)
- Context7 `/websites/sli_dev` — install, hosting/build, themes, frontmatter, Shiki/twoslash/magic-move, components, layouts, global layers, `src:`
- [Slidev Hosting](https://sli.dev/guide/hosting), [Builtin CLI](https://sli.dev/builtin/cli), [Customizations](https://sli.dev/custom/), [Features](https://sli.dev/features/), [Syntax](https://sli.dev/guide/syntax), [Components](https://sli.dev/builtin/components)
- [Slidev Releases](https://github.com/slidevjs/slidev/releases) — v52.15.1 latest
- Slidev issues #2043, #2072, #2446
- [Vercel `vercel.json`](https://vercel.com/docs/project-configuration/vercel-json), [Vite preset](https://vercel.com/docs/frameworks/frontend/vite)
- [Bun installation](https://bun.com/docs/installation)

### Secondary (MEDIUM)
- [Slidev Theme Gallery](https://sli.dev/resources/theme-gallery)
- [Vercel community — SPA 404 on refresh](https://community.vercel.com/t/404-on-refresh-direct-access-for-spa-subpaths-vercel-deployment/12593)

---
*Research completed: 2026-05-08*
*Ready for roadmap: yes*
