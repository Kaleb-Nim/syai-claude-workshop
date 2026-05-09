# Roadmap: syai-claude-workshop

**Created:** 2026-05-08
**Granularity:** coarse
**Phases:** 4
**Coverage:** 30/30 v1 requirements mapped

## Core Value

Participants can follow the workshop live and return to the same URL afterward to step through the material at their own pace — without losing place, formatting, or copyable code.

## Strategic Notes

- **Content-agnostic scaffold.** This project ships *structure*, not lessons. The instructor authors workshop content (subagents, hooks, MCP, etc.) AFTER handoff using the documented authoring guide. No lesson content is written in any phase.
- **No cloning of claudecode.sg.** Per PROJECT.md, the reference is concept-only — original design and original (placeholder) content throughout.
- **Verifiable live URL early.** Phase 1 ends with a public Vercel URL serving the default Slidev deck. The "takeaway URL" promise is testable from day one, not deferred to the end.
- **Hard build-order dependency:** theme tokens (Phase 2) → components consuming tokens (Phase 3) → content using components (Phase 4). Reversing causes rework.

## Phases

- [x] **Phase 1: Scaffold & Deploy** — Bun-Slidev project initialised and live on Vercel with deep-link routing verified — COMPLETE 2026-05-09
- [x] **Phase 2: Theme & Visual Identity** — Dark, monospace, Claude-adjacent token system applied without leaking into presenter chrome — COMPLETE 2026-05-09
- [ ] **Phase 3: Components & Persistent UI** — Copy-to-clipboard control and persistent sidebar/progress indicator working in dev and built output
- [ ] **Phase 4: Content Slots, Authoring & Handoff** — Empty chapter scaffolding plus authoring guide and handoff verification (presenter mode, PDF, projector readiness)

## Phase Details

### Phase 1: Scaffold & Deploy
**Goal:** Instructor (and Claude) can run the project locally, push to a branch, and see a live preview Vercel URL whose deep-linked slide routes load on hard refresh.
**Depends on:** Nothing (first phase)
**Requirements:** SCAF-01, SCAF-02, SCAF-03, SCAF-04, SCAF-05, DEPL-01, DEPL-02, DEPL-03, DEPL-04, DEPL-05
**Success Criteria** (what must be TRUE):
  1. A fresh clone followed by `bun install && bunx slidev` brings up the default deck at `http://localhost:3030/` with no manual fixups.
  2. `bunx slidev build` produces `dist/` and `bun run preview` serves it cleanly with no console errors.
  3. Pushing a branch creates a Vercel preview deployment; merging to `main` updates production — both auto-triggered without manual deploy steps.
  4. Visiting a non-root slide URL (e.g. `<preview>/3`) on a fresh browser tab loads slide 3 without a 404 (SPA rewrite verified).
  5. README documents setup, dev, build, deploy, and the public production URL; `.gitignore` excludes `node_modules/`, `dist/`, `.vercel/`, and Bun artifacts.
**Plans:** 2 plans
- [x] 01.1-bun-slidev-scaffold-PLAN.md — Scaffold Slidev via bun create slidev, pin Bun + Slidev versions, trim to 3-slide placeholder deck, write .gitignore + README skeleton (SCAF-01..05) — COMPLETE 2026-05-09
- [x] 01.2-vercel-deploy-PLAN.md — vercel.json with SPA rewrite + Bun build pins, vercel link + first preview/prod deploy, attempt vercel git connect with documented fallback, verify deep-link on /3, finalize README Deploy section (DEPL-01..05) — COMPLETE 2026-05-09

### Phase 2: Theme & Visual Identity
**Goal:** A reviewer opening the deck immediately reads it as Claude/Anthropic-adjacent (dark, monospace, minimal) with code blocks readable on a projector and zero styling artifacts in presenter mode.
**Depends on:** Phase 1
**Requirements:** THEM-01, THEM-02, THEM-03, THEM-04, THEM-05, THEM-06
**Success Criteria** (what must be TRUE):
  1. Deck loads with a dark color scheme via `colorSchema: dark`; backgrounds, text, and accents pull from named UnoCSS shortcuts (`bg-main`, `text-accent`, etc.) — no scattered hex literals across slides.
  2. Headings render in a sans (Inter or system-sans); body code renders in JetBrains Mono via Slidev `fonts:` headmatter — verified in dev and in `bun run preview` output.
  3. A code sample on a placeholder slide is readable with ≥4.5:1 contrast against the dark background, with an explicit Shiki language list pinned (ts, tsx, bash, json, md, yaml minimum).
  4. Opening `/presenter/` on any placeholder slide shows the presenter chrome intact — no global selectors leaking into thumbnails or sidebar (all custom CSS scoped under `.slidev-layout`).
  5. A clean visual review confirms Claude-adjacent identity (dark, monospace, minimal chrome) without copying or infringing Anthropic branding.
**Plans:** 4/4 plans executed
**UI hint:** yes
- [x] 02-01-PLAN.md — slides.md headmatter (colorSchema dark, Inter+JetBrains Mono fonts, Shiki vitesse-dark, pinned langs) — THEM-01, THEM-03, THEM-04
- [x] 02-02-PLAN.md — uno.config.ts shortcut tokens (bg-main, bg-surface-code, text-main, text-dim, text-accent, border-accent) — THEM-02
- [x] 02-03-PLAN.md — style.css with :root variables and .slidev-layout-scoped code-block frame + inline-code pill — THEM-04, THEM-05 — COMPLETE 2026-05-09
- [x] 02-04-PLAN.md — verification ladder: build, preview, contrast ≥4.5:1, presenter scoping, Vercel preview review — THEM-04, THEM-05, THEM-06 — COMPLETE 2026-05-09

### Phase 3: Components & Persistent UI — **DEFERRED (2026-05-09)**
**Status:** Deferred. Chrome polish (copy button, persistent sidebar) is not the workshop's critical path — content + engagement is. Revisit only if friction surfaces during dry-run.
**Goal (preserved for future revival):** Participants in both live and self-paced modes can copy any code block in one click and always see where they are in the deck via a persistent navigation/progress indicator that does not break presenter mode.
**Depends on:** Phase 2
**Requirements:** COMP-01, COMP-02, COMP-03, COMP-04, COMP-05 — deferred to v2.
**Success Criteria** (preserved): hover-to-copy on code blocks; works in dev + preview; persistent sidebar via `global-bottom.vue` + `useNav()`; section-jump nav; presenter mode unaffected.
**Plans:** none — deferred.

### Phase 4: Content Slots, Authoring & Handoff
**Goal:** The repository is in a state where the workshop instructor can author lesson content using only markdown and the documented authoring guide — never editing Vue, components, or theme files — and a pre-workshop dry-run produces clean presenter mode and a usable PDF.
**Depends on:** Phase 3
**Requirements:** CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, QUAL-01, QUAL-02, QUAL-03, QUAL-04
**Success Criteria** (what must be TRUE):
  1. `slides.md` is a thin orchestrator that includes chapter files via `src:` directives; placeholder files exist in `pages/` for each planned topic (intro, subagents, hooks, MCP, slash commands, skills, plugins, agent SDK, outro) — none contain actual lesson content beyond a level-1 section header demonstrating the convention.
  2. The README authoring guide (≤150 lines) shows the instructor how to add a slide, add a code block, choose between the 5 stock layouts, follow the 60-char line cap, and respect the magic-move budget rule — and documents the section grouping convention (frontmatter or layout choice).
  3. Presenter mode (`/presenter/`) renders cleanly across every placeholder slide with no styling artifacts.
  4. `bunx slidev export` produces a complete, readable PDF of the full deck.
  5. README documents the pre-workshop dry-run checklist (projector contrast, font size, line length) and the production URL; the repository is verifiably ready for instructor handoff with no Vue or component editing required to author content.
**Plans:** TBD

## Phase Ordering Rationale

- **Phase 1 (Scaffold + Deploy combined):** Operational pitfalls (`vercel.json` SPA rewrite, `--base`, Bun + Slidev config, addon dev-vs-dist) are cheapest to surface against an empty deck. Combining scaffold and deploy in one phase under coarse granularity is justified because both serve the same outcome — a known-good baseline with a verifiable live URL — and both are pure plumbing with no UI work.
- **Phase 2 (Theme) before Phase 3 (Components):** Hard architectural dependency — components reference theme tokens (`bg-main`, `text-accent`, mono stack). Building components against unstable tokens guarantees rework.
- **Phase 3 (Components) before Phase 4 (Content slots):** The authoring guide documents how the instructor uses components (copy button, sidebar behaviour); writing the guide before components are stable means rewriting it.
- **Phase 4 absorbs Polish & Handoff:** Under coarse granularity, content slot creation, the authoring guide, presenter-mode/PDF verification, and the dry-run checklist all serve the single outcome "instructor can take ownership." Splitting them adds ceremony without clarity.

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Scaffold & Deploy | 2/2 | Complete | 2026-05-09 |
| 2. Theme & Visual Identity | 4/4 | Complete | 2026-05-09 |
| 3. Components & Persistent UI | 0/0 | Not started | — |
| 4. Content Slots, Authoring & Handoff | 0/0 | Not started | — |

## Coverage Summary

| Category | Requirements | Phase |
|----------|--------------|-------|
| Scaffold | SCAF-01..05 (5) | Phase 1 |
| Deploy | DEPL-01..05 (5) | Phase 1 |
| Theme | THEM-01..06 (6) | Phase 2 |
| Components | COMP-01..05 (5) | Phase 3 |
| Content Slots | CONT-01..05 (5) | Phase 4 |
| Quality & Handoff | QUAL-01..04 (4) | Phase 4 |

**Total mapped:** 30/30 ✓
**Orphaned:** 0
**Duplicates:** 0

---
*Roadmap created: 2026-05-08*
