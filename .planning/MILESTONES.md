# Milestones

## v1.0 scaffold-shipped (Shipped: 2026-05-12)

**Delivered:** A content-agnostic Slidev workshop scaffold, themed Claude-adjacent, deployed to Vercel as a public URL — ready for v1.1 to author lessons against.

**Phases completed:** 2 fully shipped (Phase 1, Phase 2) + 1 partial (Phase 4 — 4 of 5 plans landed; verification plan 04-05 aborted).
**Plans:** 11 across the milestone (10 complete, 1 aborted).
**Quick tasks:** 1 (e98-top-progress-bar — `global-top.vue` progress bar overlay).
**Timeline:** 2026-05-08 → 2026-05-12 (5 days).
**Production URL:** <https://syai-claude-workshop-1dy20oqcv-kaleb-nims-projects.vercel.app>

### Key accomplishments

1. **Phase 1 — Scaffold & Deploy** (2 plans, complete 2026-05-09)
   - Slidev `^52.15.1` scaffolded on Bun (`bun create slidev`), Node ≥ 20.12 floor honored.
   - Vercel `vercel.json` with SPA rewrite + Bun build pins (`installCommand: bun install`, `buildCommand: bunx slidev build`, `outputDirectory: dist`). Auto-deploy on push verified; production URL public; deep-linked slide routes load on hard refresh.

2. **Phase 2 — Theme & Visual Identity** (4 plans, complete 2026-05-09)
   - Dark theme contract in `slides.md` head matter: `colorSchema: dark`, Inter + JetBrains Mono fonts, Shiki `vitesse-dark` with pinned langs.
   - D-01 warm near-black palette (`#1A1714`, `#14110E`, `#F4ECE0`, `#CC785C` rust accent) encoded as UnoCSS shortcuts in `uno.config.ts` and CSS variables in `style.css`.
   - All custom CSS scoped under `.slidev-layout` — presenter chrome stays default. Contrast verified 13.07:1 on code panel. Human visual review approved Claude-adjacent identity 2026-05-09.

3. **Phase 4 — Workshop Content Draft** (4 of 5 plans landed; intentionally retired)
   - `slides.md` restructured as a thin orchestrator pulling chapters via `src:` includes. Five chapter files drafted (00-intro, 01-hooks, 02-subagents-sdk, 03-commands-skills-plugins, 99-outro).
   - Hooks chapter: 13 slides, PreToolUse `rm -rf /` + `.env` BEFORE/AFTER arc, settings.json wiring, PostToolUse logger exercise.
   - Subagents/SDK chapter: 12 slides, Task tool + `.claude/agents/*.md` shape, user-vs-Claude-invoked distinction, code-reviewer exercise, 9-line `@anthropic-ai/claude-agent-sdk` snippet.
   - Slash Commands + Skills + Plugins chapter: 13 slides, `.claude/commands/<name>.md`, `.claude/skills/<name>/SKILL.md` progressive disclosure, plugins as distribution layer, `/standup` exercise.
   - Plan 04-05 (build/PDF/human-verify gate) ran Tasks 1 + 2 (`bunx slidev build` + PDF export) cleanly, then was aborted before Task 3 because the drafted chapter content is being retired for re-authoring in v1.1.

4. **Quick task e98 — top-of-viewport progress bar**
   - `global-top.vue` at repo root using Slidev's `global-top` auto-injection convention. Drives a 3px rust bar from `useNav().currentPage / total`, transitions smoothly, references `var(--accent)` so it tracks the Phase 2 palette.

### Known deferred items at close

| Category | Item | Status |
|----------|------|--------|
| phase | Phase 3 — Components & Persistent UI (COMP-01..05) | Deferred 2026-05-09. Copy button + persistent sidebar are not the workshop's critical path. Revive only if dry-run friction surfaces. |
| plan | 04-05 — Phase 4 quality gates (QUAL-01, QUAL-02) | Aborted 2026-05-12. Build + PDF export passed mechanically; human-verify checkpoint skipped because v1.0 chapter content is being retired. QUAL-01/QUAL-02 carry forward as recurring CI-style gates under v1.1. |
| requirements | COMP-01..05, CONT-03, CONT-05, QUAL-01..04 | Not satisfied this milestone. COMP-* deferred to a future revive of Phase 3; CONT-03/05 + QUAL-* are re-derived under v1.1's authoring approach. |
| quick_task | 260511-e98-top-progress-bar | False-positive in pre-close audit — SUMMARY exists with `status: complete` at the quick-task filename pattern. Work is genuinely complete (commit `99434b6`). |

See `.planning/STATE.md` `## Deferred Items` for the same list with audit metadata.

### Sources

- Roadmap archive: `.planning/milestones/v1.0-ROADMAP.md`
- Requirements archive: `.planning/milestones/v1.0-REQUIREMENTS.md`
- Phase artifacts: `.planning/phases/01-scaffold-deploy/`, `.planning/phases/02-theme-visual-identity/`, `.planning/phases/04-workshop-content-draft/`
- Quick task: `.planning/quick/260511-e98-top-progress-bar/`
- Git range: `568fdb5` (Phase 2 plan) … `6d60ceb` (content reset)

---
