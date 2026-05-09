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

### Phase 4: Workshop Content — Draft
**Goal:** A teachable 1.5-hour hands-on workshop deck exists in the repository — engineers who've tried Claude Code briefly can follow along to learn three power-user topics (Hooks, Subagents & Agent SDK, Slash Commands + Skills + Plugins) with exact commands, exercise prompts, and checkpoints. Content lives in chapter files under `pages/` and is rendered as slides via `src:` includes in `slides.md`.
**Depends on:** Phase 2
**Requirements:** CONT-01, CONT-02, CONT-04 (chapter file structure + `src:` includes), QUAL-01 (presenter mode clean across new content), QUAL-02 (PDF export works on full deck). Deferred to v2: CONT-03, CONT-05 (formal authoring guide), QUAL-03, QUAL-04 (full handoff polish).
**Success Criteria** (what must be TRUE):
  1. `slides.md` includes chapter files via `src: ./pages/<chapter>.md` directives (or equivalent); chapter files live under `pages/`.
  2. Three lesson chapters exist with full draft content suitable for a hands-on workshop: `pages/01-hooks.md`, `pages/02-subagents-sdk.md`, `pages/03-commands-skills-plugins.md`. Each is ~25–30 minutes of teachable material — concept slides + exact commands + 1–2 hands-on exercises per chapter.
  3. An intro chapter (`pages/00-intro.md`) sets expectations (audience, what we'll cover, what we won't, setup verification step) and an outro chapter (`pages/99-outro.md`) recaps + points to docs.
  4. Audience assumption: engineers who've tried Claude Code briefly — comfortable with terminals + LLM chat, haven't pushed past chat. No CC primer needed; no glossary slide required.
  5. Delivery mode: hands-on follow-along. Slides include exact commands, exercise prompts, and "✓ Check:" callouts so participants know they're synced. Live demo cues kept minimal — text density is OK because participants are typing along.
  6. Presenter mode (`/presenter/`) renders cleanly across every chapter with no styling artifacts. `bunx slidev export` produces a readable PDF of the full deck.
**Plans:** 3/5 plans executed
- [x] 04-01-PLAN.md — slides.md orchestrator + intro/outro chapters (CONT-01, CONT-02) — COMPLETE 2026-05-09
- [x] 04-02-PLAN.md — Hooks chapter `pages/01-hooks.md` (CONT-04)
- [x] 04-03-PLAN.md — Subagents & Agent SDK chapter `pages/02-subagents-sdk.md` (CONT-04)
- [x] 04-04-PLAN.md — Commands + Skills + Plugins chapter `pages/03-commands-skills-plugins.md` (CONT-04)
- [ ] 04-05-PLAN.md — verification: build, presenter, PDF export, human visual review (QUAL-01, QUAL-02)

> **Phase 4 scope is content drafting, not authoring infrastructure.** The Phase 4 (old) "instructor authoring guide" outcome — README walkthrough + 5 stock layouts + line-cap conventions — is intentionally deferred. The instructor IS Claude in this codebase; we draft directly. A future Phase 5 can capture the authoring guide once content patterns stabilize.

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
| 4. Workshop Content — Draft | 3/5 | In Progress|  |

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
