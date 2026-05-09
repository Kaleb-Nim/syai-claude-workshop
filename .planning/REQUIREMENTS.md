# Requirements: syai-claude-workshop

**Defined:** 2026-05-08
**Core Value:** Participants can follow the workshop live and return to the same URL afterward to step through the material at their own pace — without losing place, formatting, or copyable code.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Scaffold

- [x] **SCAF-01**: Repository initialised via `bun create slidev` with Slidev `^52.15` and Bun pinned via `packageManager` in `package.json` — Slidev 52.15.1, bun@1.3.5
- [x] **SCAF-02**: `bun install` followed by `bunx slidev` starts a working local dev server with the default deck visible at `http://localhost:3030/` — HTTP 200 confirmed
- [x] **SCAF-03**: `bunx slidev build` produces a static SPA in `dist/` that runs cleanly via `bun run preview` — dist/index.html produced
- [x] **SCAF-04**: Repository contains a top-level `README.md` with setup, dev, build, deploy, and contributor instructions (path must not contain spaces) — partial (deploy placeholder; finalized in Plan 02)
- [x] **SCAF-05**: `.gitignore` excludes `node_modules/`, `dist/`, `.vercel/`, and `bun` artifacts that should not be committed — verified

### Deploy

- [x] **DEPL-01**: Project is connected to Vercel with preview deployments triggered on every push and production deployments on `main`
- [x] **DEPL-02**: `vercel.json` includes a SPA rewrite (`/(.*) → /index.html`) so any deep-linked slide URL (e.g. `/14`) loads correctly on hard-refresh
- [x] **DEPL-03**: Vercel project explicitly configured with `installCommand: bun install`, `buildCommand: bunx slidev build`, `outputDirectory: dist`
- [x] **DEPL-04**: A non-root slide URL (e.g. `<preview>/3`) loads successfully on a fresh browser tab without 404
- [x] **DEPL-05**: Production URL is documented in README and accessible publicly

### Theme

- [x] **THEM-01**: Deck uses `@slidev/theme-default` with `colorSchema: dark` set in headmatter
- [x] **THEM-02**: UnoCSS shortcuts (`bg-main`, `text-accent`, etc.) defined in `uno.config.ts` provide tokens for backgrounds, text, accents, and code surfaces
- [x] **THEM-03**: Font stack is monospace-forward (e.g. JetBrains Mono for code, Inter or system-sans for headings) configured via Slidev `fonts:` headmatter
- [x] **THEM-04**: Shiki code theme selected and verified ≥4.5:1 contrast on dark background; explicit Shiki language list pinned (ts, tsx, bash, json, md, yaml at minimum)
- [x] **THEM-05**: All custom CSS selectors are scoped under `.slidev-layout` so styles do not leak into presenter mode chrome — verified 02-04 presenter check PASS
- [x] **THEM-06**: Visual identity reads as Claude/Anthropic-adjacent (dark, monospace, minimal) without infringing branding — human visual approval 2026-05-09

### Components

- [ ] **COMP-01**: `components/CopyButton.vue` provides a copy-to-clipboard control for code blocks; works in dev AND in `bun run preview` build output
- [ ] **COMP-02**: Copy button shows transient confirmation feedback ("Copied" or icon swap) on click and recovers within 2s
- [ ] **COMP-03**: `global-bottom.vue` (or equivalent) renders a persistent sidebar/progress indicator across every slide using `useNav()`
- [ ] **COMP-04**: Sidebar shows current slide position and section headings; participants can click a section to jump
- [ ] **COMP-05**: Sidebar is visible in both audience mode and self-paced mode but does not break presenter mode

### Content Slots

- [x] **CONT-01**: `slides.md` is a thin orchestrator that includes chapter files via `src:` directives — instructor never edits a single 5,000-line file
- [x] **CONT-02**: `pages/` directory contains placeholder chapter files for the planned workshop topics: intro, subagents, hooks, MCP, slash commands, skills, plugins, agent SDK, outro
- [ ] **CONT-03**: Each placeholder includes a level-1 section header slide demonstrating the section convention so the instructor sees the expected pattern
- [ ] **CONT-04**: Section grouping convention (frontmatter or layout choice) is documented in the authoring guide
- [ ] **CONT-05**: Authoring guide in README (≤150 lines) shows: how to add a slide, how to add a code block, the 5 stock layouts to use, the 60-char-per-line rule, and the magic-move budget rule

### Quality & Handoff

- [ ] **QUAL-01**: Presenter mode (`/presenter/`) renders cleanly with no styling artifacts on any placeholder slide
- [ ] **QUAL-02**: PDF export via `bunx slidev export` produces a readable PDF of the full deck
- [ ] **QUAL-03**: README documents pre-workshop dry-run checklist (projector contrast, font size, line length)
- [ ] **QUAL-04**: Repository handed off in a state where instructor can author content using only markdown and the documented authoring guide — no Vue/component editing required for content work

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Authoring Polish

- **AUTH-01**: Custom `<Cmd>` Vue component for shell/CLI command blocks with separate prompt + output styling
- **AUTH-02**: Worked Shiki Magic Move example demonstrating CLI flag/config evolution (≤10 magic-move blocks total budget)
- **AUTH-03**: Mermaid diagram example slide demonstrating diagram authoring conventions

### Participant UX

- **PUXX-01**: Per-slide share-link button (copies deep link to clipboard)
- **PUXX-02**: Slide-resume on reload via `localStorage` so async participants return to last viewed slide
- **PUXX-03**: OG image and favicon for social-share previews

### Misc

- **MISC-01**: Pagefind search across slide content
- **MISC-02**: Twoslash-enabled TypeScript code blocks for type-aware annotations

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Authoring the actual workshop lesson content | Instructor will write content after scaffold handoff — out of scope for this project |
| In-browser code sandbox / live REPL | Misleading — Claude Code is a real CLI; participants run commands on their laptops, not in browser |
| Live polling, Q&A, audience interaction widgets | Out of v1 scope; workshop is presenter-led + async takeaway, no live participation infrastructure |
| Hands-on exercise checkpoint UI components | Slidev plain slides are sufficient for marking exercises; custom UI is unproven design work |
| Speaker accounts / authentication / participant accounts | Public URL is sufficient for the workshop format |
| Analytics / participant tracking | Not needed for the workshop format |
| Multi-deck / module index landing page | Single deck only for v1; multi-deck adds router complexity without proven need |
| Workshop session recording embed | Recordings (if any) are hosted externally; no embedding work for v1 |
| Internationalisation / i18n | Single-language workshop; no i18n needed |
| Cloning content or design from claudecode.sg | Referenced for concept inspiration only; original content and design |
| Custom Slidev `vite.config.ts` | Avoided in v1 to sidestep Slidev issue #2043 (Bun + custom vite.config silently drops config); use headmatter and `setup/` instead |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SCAF-01 | Phase 1 | Pending |
| SCAF-02 | Phase 1 | Pending |
| SCAF-03 | Phase 1 | Pending |
| SCAF-04 | Phase 1 | Pending |
| SCAF-05 | Phase 1 | Pending |
| DEPL-01 | Phase 1 | Complete |
| DEPL-02 | Phase 1 | Complete |
| DEPL-03 | Phase 1 | Complete |
| DEPL-04 | Phase 1 | Complete |
| DEPL-05 | Phase 1 | Complete |
| THEM-01 | Phase 2 | Complete |
| THEM-02 | Phase 2 | Complete |
| THEM-03 | Phase 2 | Complete |
| THEM-04 | Phase 2 | Complete |
| THEM-05 | Phase 2 | Complete |
| THEM-06 | Phase 2 | Complete |
| COMP-01 | Phase 3 | Pending |
| COMP-02 | Phase 3 | Pending |
| COMP-03 | Phase 3 | Pending |
| COMP-04 | Phase 3 | Pending |
| COMP-05 | Phase 3 | Pending |
| CONT-01 | Phase 4 | Complete — 04-01 |
| CONT-02 | Phase 4 | Complete — 04-01 |
| CONT-03 | Phase 4 | Pending |
| CONT-04 | Phase 4 | Pending |
| CONT-05 | Phase 4 | Pending |
| QUAL-01 | Phase 4 | Pending |
| QUAL-02 | Phase 4 | Pending |
| QUAL-03 | Phase 4 | Pending |
| QUAL-04 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 30 total
- Mapped to phases: 30 (100%) ✓
- Unmapped: 0
- Duplicates: 0

---
*Requirements defined: 2026-05-08*
*Last updated: 2026-05-08 after roadmap creation*
