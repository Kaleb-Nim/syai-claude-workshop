---
phase: 02-hooks
plan: 02
subsystem: workshop-content
tags: [slidev, content, phase-2, section-02, hooks, ifttt, determinism]
requires:
  - pages/02-hooks.md (chapter orchestrator from 02-01, `src:` include for `02-why-hooks.md`)
  - .planning/phases/02-hooks/02-CONTEXT.md (D-02, D-03, D-04, D-12)
provides:
  - pages/02-hooks/02-why-hooks.md (Section 02 — Why hooks: IFTTT framing + 3 locked determinism quotes)
affects:
  - Chapter 2 narrative arc: HOOK-01 framing complete; Section 03 (how hooks work) can build on the IFTTT + determinism foundation
  - Phase 1 → Phase 2 bridge live on Slide 4 (`~/.claude/CLAUDE.md` callback to Win 2)
tech_stack_added: []
patterns_used:
  - Pattern A — no per-section frontmatter (file starts with H1)
  - Pattern E — multi-slide section, mid-file `---` separators blank-line-flanked
  - Pattern D — Variant 2 dim helper (`text-dim text-sm mt-6` with inline `<code>`)
  - Bare `> ` markdown blockquote (no `<Quote>` component)
key_files_created:
  - pages/02-hooks/02-why-hooks.md
key_files_modified: []
decisions: []
metrics:
  duration_minutes: 1
  completed_date: 2026-05-12
  tasks_completed: 1
  files_changed: 1
requirements_completed: [HOOK-01, QUAL-02, QUAL-04]
---

# Phase 2 Plan 2: Section 02 — Why hooks Summary

Authored Section 02 of Chapter 2: a 5-slide arc that frames why hooks exist — IFTTT framing for the non-technical participant (Slides 1-2), then three USER-LOCKED determinism quotes verbatim (Slides 3-5). Slide 4 carries the Phase 1 → Phase 2 bridge by calling back to the `~/.claude/CLAUDE.md` rule from Win 2 and framing it as the imperfect version of a hook. Single atomic commit per QUAL-02.

## What Was Built

- **pages/02-hooks/02-why-hooks.md** (NEW, 35 lines): One section file, no frontmatter, five slides separated by four mid-file `---` lines (each flanked by blank lines).
  - **Slide 1 — `# IF this, THEN that`** — Three IF→THEN bullets with bold inline labels and U+2192 arrows.
  - **Slide 2 — `# The "THEN" is just a shell command`** — Two-line teaching prose ending on "Today we make the 'THEN' a sound."
  - **Slide 3 — `# What makes hooks different`** — Quote 1 (D-03 locked) as a bare `> ` blockquote, byte-for-byte.
  - **Slide 4 — `# Why use hooks`** — Quote 2 (D-03 locked) blockquote, followed by a Variant 2 dim helper `<div class="text-dim text-sm mt-6">` containing the Phase 1 callback with inline `<code>~/.claude/CLAUDE.md</code>`.
  - **Slide 5 — `# In essence`** — Quote 3 (D-03 locked) blockquote.

## Commits

| Task | Hash    | Message                                                                       |
| ---- | ------- | ----------------------------------------------------------------------------- |
| 1    | 734de98 | feat(phase-2): section 02 why-hooks (IFTTT + locked determinism quotes)        |

## Verification

Plan's automated verification command passed (`VERIFY: PASSED`). All acceptance criteria confirmed:

- `pages/02-hooks/02-why-hooks.md` exists.
- `grep -c '^---$'` = 4 (five slides).
- Line 1 is `# IF this, THEN that` (no frontmatter).
- All three D-03 locked quotes present byte-for-byte via `grep -Fxq` against the exact blockquote lines.
- `grep -c '~/.claude/CLAUDE.md'` = 1 (Slide 4 callback path, byte-exact per Pitfall 6).
- `grep -c 'text-dim text-sm mt-6'` = 1 (Slide 4 dim helper).
- `grep -c '!'` = 0 (QUAL-04 — no exclamation marks anywhere in file).
- `grep -c '<v-clicks>'` = 0 (D-12 default skip).

## Must-Haves Truths

All plan frontmatter `must_haves.truths` confirmed:

- Section 02 file contains 5 slides separated by mid-file `---` blank-line-flanked separators — TRUE.
- Slides 1-2 establish the IFTTT framing — TRUE.
- Slides 3, 4, 5 each carry exactly one of the three D-03 locked quotes verbatim — TRUE (byte-for-byte `grep -Fxq`).
- Slide 4 includes a callback to Phase 1 Win 2 referencing `~/.claude/CLAUDE.md` — TRUE (inside dim helper div).
- No exclamation marks in body (QUAL-04) — TRUE (`grep -c '!'` = 0).
- D-12: drafted output contains zero `<v-clicks>` directives — TRUE.

## Deviations from Plan

None — plan executed exactly as written. The locked quotes, dim-helper class, and callback path were all transcribed byte-for-byte from the plan's `<action>` block.

## Requirements Satisfied

- **HOOK-01** — Chapter 2 frames why hooks exist via IFTTT framing + three determinism quotes; Phase 1 bridge present on Slide 4.
- **QUAL-02** — Single atomic commit (`734de98`) scoped to one section file.
- **QUAL-04** — Zero exclamation marks in body; tone is terse and confident; no hype.

## Self-Check: PASSED

- File `pages/02-hooks/02-why-hooks.md` — FOUND.
- Commit `734de98` — FOUND in `git log --oneline`.
