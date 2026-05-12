# syai-claude-workshop

## What This Is

A content-agnostic Slidev workshop scaffold for a half-day, advanced Claude Code workshop. Deployed at a public Vercel URL as the live presentation vehicle and the post-workshop takeaway reference. v1.0 shipped the scaffold + theme + deployment; v1.0's drafted chapter content was retired before shipping so v1.1 can re-author lessons with finer per-section control.

## Core Value

Participants can follow the workshop live and return to the same URL afterward to step through the material at their own pace — without losing place, formatting, or copyable code.

## Current State (after v1.0)

- **Production deployment:** <https://syai-claude-workshop-1dy20oqcv-kaleb-nims-projects.vercel.app> (Vercel, auto-deployed from `main`).
- **Tech stack:** Slidev `^52.15.1`, Bun `^1.3.5`, Vercel hosting, Node ≥ 20.12.
- **Visual identity:** Dark theme, JetBrains Mono + Inter, D-01 warm near-black palette with rust accent (`#cc785c`). All custom CSS scoped under `.slidev-layout` (presenter chrome stays default Slidev).
- **Deck structure:** `slides.md` is a thin orchestrator (head matter + cover slide stub). `pages/` is empty — v1.1 re-authors chapters from scratch.
- **Auxiliary UI:** `global-top.vue` renders a 3px rust progress bar tracking `useNav().currentPage / total`.

## Next Milestone Goals

**v1.1** — Re-author the three anchor workshop chapters (Hooks, Subagents & Agent SDK, Slash Commands + Skills + Plugins) with fine-grained per-section authoring control. Style, theme, deployment, and `slides.md` orchestrator pattern from v1.0 are **locked** — only the chapter authoring approach changes.

Goals to be refined via `/gsd-new-milestone` → questioning → requirements → roadmap.

## Requirements

### Validated (shipped in v1.0)

- ✓ **Scaffold (SCAF-01..05)** — v1.0 — Slidev on Bun, dev server, build, README + .gitignore.
- ✓ **Deploy (DEPL-01..05)** — v1.0 — Vercel auto-deploy, SPA rewrite, deep-link routing, production URL public.
- ✓ **Theme (THEM-01..06)** — v1.0 — dark color schema, UnoCSS tokens, mono fonts, Shiki vitesse-dark, `.slidev-layout` scoping, Claude-adjacent identity human-approved.
- ✓ **Content scaffolding (CONT-01, CONT-02, CONT-04)** — v1.0 — `slides.md` `src:` orchestrator pattern + section grouping convention. (Chapter content itself retired; the *pattern* is validated.)

### Active (v1.1)

- [ ] Re-author Hooks chapter with finer per-section authoring control
- [ ] Re-author Subagents & Agent SDK chapter with finer per-section authoring control
- [ ] Re-author Slash Commands + Skills + Plugins chapter with finer per-section authoring control
- [ ] Define what "fine-grained per-section control" means concretely (decided during `/gsd-new-milestone`)

### Carried forward (re-derive in v1.1)

- **QUAL-01, QUAL-02** (presenter mode clean, PDF export readable) — v1.0 closed these mechanically against retired content; they carry forward as recurring gates against the v1.1 chapters.
- **CONT-03, CONT-05** (section-header convention demo + authoring guide) — v1.0 partially addressed via patterns embedded in drafted chapters; re-derive once v1.1 stabilizes its authoring approach.

### Out of Scope

| Feature | Reason |
|---------|--------|
| Authoring lesson content outside the workshop deck | Out of scope; the deck IS the deliverable. |
| In-browser code sandbox / live REPL | Misleading — Claude Code is a real CLI; participants run commands on their laptops. |
| Live polling, Q&A, audience interaction widgets | Out of scope; workshop is presenter-led + async takeaway. |
| Copy-to-clipboard button (COMP-01..02) | Deferred — chrome polish is not the critical path. Revive if dry-run friction surfaces. |
| Persistent sidebar with section nav (COMP-03..05) | Deferred — same reason. `global-top.vue` progress bar covers the position-feedback need for now. |
| Custom presenter mode customizations | Slidev defaults are sufficient; `.slidev-layout` scoping prevents leaks. |
| PDF export feature work | Slidev provides this out of the box; gate it in CI, not as a feature. |
| Multi-deck / module index landing page | Single deck only. |
| Authentication / participant accounts / progress sync | Public URL is sufficient. |
| Analytics / participant tracking | Not needed for the format. |
| Custom `vite.config.ts` | Avoided per Slidev issue #2043 (Bun + custom vite.config silently drops config); use head matter + `setup/` instead. |
| Cloning content or design from claudecode.sg | Reference concept only; original throughout. |
| Internationalisation | Single-language workshop. |

## Context

**Audience:** Developers under 35, comfortable with Git and Node.js, bringing laptops to a live workshop. Comfortable in terminals.

**Workshop topic:** Advanced Claude Code — hooks, subagents, Agent SDK, slash commands, skills, plugins. Hands-on, code-heavy.

**Format:** Live presenter walkthrough during the session; same URL becomes the takeaway reference afterward.

**Local environment:** macOS (Apple M4 Max). Bun is the package manager (not npm/node). Slidev runs cleanly on Bun via `bunx`.

## Constraints

- **Tech stack:** Slidev `^52.15` (Vue 3 + Vite under the hood) — locked.
- **Package manager:** Bun `^1.3.x` — locked.
- **Hosting:** Vercel — locked (project linked, auto-deploy on push).
- **Visual identity:** Dark theme, monospace, minimal, Claude/Anthropic-adjacent — locked in Phase 2 design system.
- **Content ownership:** Scaffold is content-agnostic; chapter authoring happens in `pages/*.md` and is the v1.1 deliverable.

## Key Decisions

| Decision | Source | Rationale | Outcome |
|----------|--------|-----------|---------|
| Slidev `^52.15` on Bun (PM only, Node ≥ 20.12 for Vite) | `research/STACK.md` | Officially supported via `bun create slidev`; Bun is the local env standard. | ✓ Good — shipped on this stack. |
| `@slidev/theme-default` + custom CSS/UnoCSS (no fork) | `research/STACK.md`, PITFALLS #10 | Customize tokens, not layouts — keeps authoring contract to plain markdown. | ✓ Good — Phase 2 delivered clean theming without touching theme internals. |
| Multi-file deck (`pages/*.md` via `src:`) | `research/ARCHITECTURE.md` | Avoids monolithic `slides.md`; chapters are independently authorable. | ✓ Good — pattern survives v1.0 → v1.1 reset; carried forward as locked architecture. |
| No custom `vite.config.ts` for v1 | `research/PITFALLS.md` (#2043) | Sidesteps Bun + Slidev type-resolution edge case. | ✓ Good — never needed; head matter + `setup/` sufficed. |
| `vercel.json` SPA rewrite mandatory | `research/PITFALLS.md` (#1) | Direct slide-URL 404s would break the takeaway promise. | ✓ Good — DEPL-04 verified on `/3`. |
| D-01 warm near-black palette with rust accent | Phase 2 design system | Claude/Anthropic-adjacent without infringing. | ✓ Good — human visual review approved 2026-05-09. |
| `.slidev-layout` scoping for all custom CSS | Phase 2 (D-14/D-15) | Presenter chrome must stay default Slidev. | ✓ Good — verified clean. |
| `vitesse-dark` Shiki theme | Phase 2 verification | Contrast 13.07:1 on `#14110E` panel. | ✓ Good. |
| Combine Scaffold + Deploy into Phase 1 | ROADMAP.md (coarse granularity) | Same outcome (verifiable live URL), pure plumbing. | ✓ Good — shipped together in 1 day. |
| Defer Phase 3 (Components & Persistent UI) 2026-05-09 | `e94e528` commit | Chrome polish is not the workshop's critical path. | ⚠ Revisit — revive if dry-run friction surfaces in v1.1. |
| Retire v1.0 chapter drafts for v1.1 re-authoring | 2026-05-12 user decision | User wants finer per-section authoring control in v1.1; v1.0 drafts were end-to-end-written and hard to iterate on per-section. | — Pending — v1.1 must define the per-section control mechanism. |
| `global-top.vue` for progress bar (Slidev `global-top` slot) | Quick task e98 | Canonical Slidev mechanism; auto-excludes presenter chrome. | ✓ Good — committed `99434b6`, carries forward to v1.1. |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-12 after v1.0 milestone close*
