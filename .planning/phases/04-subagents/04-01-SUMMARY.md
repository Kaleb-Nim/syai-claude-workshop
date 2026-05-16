---
phase: 04-subagents
plan: 01
subsystem: deck-scaffolding
tags: [slidev, chapter-orchestrator, scaffolding, phase-4]
requires:
  - pages/03-hooks.md (Phase 3 chapter-orchestrator precedent)
  - pages/03-hooks/01-cover.md (cover-slide byte-template)
provides:
  - slides.md src include for Phase 4 (positioned between Phase 3 and Phase 99)
  - pages/04-subagents.md chapter orchestrator with 7 section includes (D-01 order)
  - pages/04-subagents/01-cover.md chapter cover slide (Section 01)
  - Wave 2 unblock: Plans 02-07 may now author the remaining 6 section files in parallel
affects:
  - slides.md (deck root — Phase 4 chapter wired into render order)
tech-stack:
  added: []
  patterns:
    - chapter-orchestrator (pure src:-include file, no inline content)
    - em-dash chapter title + middle-dot dim subtitle (mirrors Phase 3)
key-files:
  created:
    - pages/04-subagents.md
    - pages/04-subagents/01-cover.md
  modified:
    - slides.md
decisions:
  - "D-01 honored: orchestrator carries exactly 7 src: includes in locked order (01-cover → 07-hands-on-fire)"
  - "D-09 honored: zero SDK / query() / Agent SDK references in any artifact; chapter titled 'Subagents' (no '+ Agent SDK')"
  - "Cover one-liner anchored on D-04 context-preservation framing: 'isolated workers Claude can delegate to — own context, own tools, one summary back to you'"
  - "Subtitle 3-beat structure surfaces Sections 02/03 and the 06/07 hands-on pair via /agents"
metrics:
  duration: ~5min
  completed: 2026-05-13T11:11:48Z
  tasks_completed: 3
  tasks_total: 3
  files_created: 2
  files_modified: 1
  commits: 3
---

# Phase 4 Plan 01: Chapter 4 Scaffolding + Cover Summary

Scaffolded Chapter 4 (Subagents) by wiring `pages/04-subagents.md` into `slides.md` between Phase 3 and Phase 99, creating the 7-include chapter orchestrator, and authoring Section 01's cover slide — unblocking Wave 2 (Plans 02–07) to author the remaining 6 section files in parallel without shared writes.

## Tasks Completed

| Task | Name                                       | Commit  | Files                                     |
| ---- | ------------------------------------------ | ------- | ----------------------------------------- |
| 1    | Insert Phase 4 src include into slides.md  | b63f0a5 | slides.md                                 |
| 2    | Create pages/04-subagents.md orchestrator  | 1780f2b | pages/04-subagents.md                     |
| 3    | Create pages/04-subagents/01-cover.md      | 6a946b6 | pages/04-subagents/01-cover.md            |

## What Changed

**`slides.md`** — Inserted a 3-line `src:` block for `./pages/04-subagents.md` between the existing Phase 3 include and the Phase 99 resources include. Final chapter order in the deck: `01-audience-setup → 02-skills → 03-hooks → 04-subagents → 99-resources`. Deck headmatter (lines 1-19) and cover slide block unchanged. (The pre-commit formatter ran on the file; the resulting include-ordering invariant is preserved per re-verification.)

**`pages/04-subagents.md`** (new) — Pure chapter orchestrator: 7 `src:`-only blocks pointing at the 7 section files in the D-01 locked order. No deck headmatter, no inline content. Paths use the `./04-subagents/<file>.md` form (relative to `pages/`), mirroring the Phase 3 orchestrator pattern.

**`pages/04-subagents/01-cover.md`** (new) — Chapter cover slide with `layout: center` frontmatter, em-dash H1 (`# Chapter 4 — Subagents` using U+2014), context-preservation one-liner, and a 3-beat dim subtitle div (`text-sm opacity-60 mt-8` + middle-dot U+00B7 separators). Zero exclamation marks; zero SDK references.

## Decisions Made

- **Cover one-liner wording (Claude's discretion per D-04 framing):** "isolated workers Claude can delegate to — own context, own tools, one summary back to you" — surfaces context isolation as the structural payoff without naming SDK and without marketing tone.
- **Subtitle 3-beat structure:** "skills vs subagents · why isolate context · build one live with /agents" — maps to Sections 02, 03, and the 06/07 hands-on pair, telegraphing the chapter arc on the cover.
- **Include position in `slides.md`:** Phase 4 sits between Phase 3 and Phase 99 (not appended to tail), preserving the constraint that the Resources page closes the deck.

## Deviations from Plan

None — plan executed exactly as written. The pre-commit formatter touched `slides.md` (adjusting non-content whitespace), but the locked include-ordering invariant was re-verified post-commit and remains correct.

## Verification

- `grep -c "src: ./pages/04-subagents.md" slides.md` → `1` (single include, correct path).
- Chapter include order: `['01-audience-setup', '02-skills', '03-hooks', '04-subagents', '99-resources']` (verified post-commit).
- `pages/04-subagents.md`: 7 `^src: \./04-subagents/` lines; first line is `---`.
- `pages/04-subagents/01-cover.md`: contains `layout: center`, `# Chapter 4 — Subagents` (em-dash), `opacity-60 mt-8`, middle-dot ` · ` separator; zero non-header `!` characters; zero matches for `SDK` or `query(`.

`bunx slidev build` is **expected to fail** at this commit because the orchestrator references 6 section files that Wave 2 plans will author — this is by design per the plan's `<success_criteria>`. The build gate runs in Plan 09.

## Self-Check: PASSED

- FOUND: slides.md
- FOUND: pages/04-subagents.md
- FOUND: pages/04-subagents/01-cover.md
- FOUND: commit b63f0a5
- FOUND: commit 1780f2b
- FOUND: commit 6a946b6
