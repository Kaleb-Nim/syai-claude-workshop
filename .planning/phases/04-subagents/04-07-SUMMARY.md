---
phase: 04-subagents
plan: 07
subsystem: slidev-chapter-authoring
tags: [phase-4, subagents, hands-on, SUB-03, fire-it]
requires: [04-01, 04-06]
provides: [section-07-fire-it]
affects:
  - pages/04-subagents/07-hands-on-fire.md
tech-stack:
  added: []
  patterns:
    - phase-3-section-05-template
    - two-bold-prefixed-steps
    - blockquote-check-glyph
    - dim-closing-footnote
key-files:
  created:
    - pages/04-subagents/07-hands-on-fire.md
  modified: []
decisions:
  - D-08: invoke + two ✓ checks; isolated context payoff
  - Pitfall 4 mitigation: use @-mention for guaranteed invocation
  - A1 mitigation: Step 0 produces an uncommitted change for any participant repo
metrics:
  duration: ~3min
  completed: 2026-05-13
  tasks: 1
  files: 1
---

# Phase 4 Plan 07: Hands-on Fire Summary

Authored Section 07 of Chapter 4 — participants invoke `@commit-message-writer` and observe the isolated-context payoff promised in Section 03. Two ✓ checks satisfy D-08: subagent visible in `/agents` Library tab, then invoked subagent returns a one-line conventional commit while the `git diff` stays inside the subagent's window.

## What Shipped

- `pages/04-subagents/07-hands-on-fire.md` — single slide mirroring the Phase 3 Section 05 "Fire it" rhythm:
  - **Step 0** — `echo "test" >> README.md` (A1 mitigation; any participant repo works).
  - **Step 1** — `/agents` → Library tab; ✓ Check #1: `commit-message-writer` listed.
  - **Step 2** — `@`-mention from typeahead or explicit `@agent-commit-message-writer`; ✓ Check #2: one conventional-commit line returns to main chat, diff stays in subagent window.
  - Dim footnote names Pitfall 4 lesson: auto-delegation heuristic, `@`-mention guaranteed.
  - Closing dim line mirrors Phase 3 Section 05's rhythm: "One subagent, one window, one summary back. Add more later — same pattern."

## Verification

All automated checks passed:
- File exists; Step 0 + literal `echo "test" >> README.md` command present.
- `@commit-message-writer` and `@agent-commit-message-writer` both named.
- Exactly two `✓ Check` blockquotes (literal U+2713 glyph).
- `/agents` and `Library` tab referenced.
- `isolated context window` phrase present (Section 03 verbatim callback).
- `guarantees` present (Pitfall 4 lesson surfaced).
- Zero `!` in body (QUAL-04).
- Zero `Agent SDK` / `query(` substrings (D-09).

## Deviations from Plan

None — plan executed exactly as written.

## Commits

- `6aaefb7` — `feat(phase-4): add section 07 hands-on fire (SUB-03 fire)`

## Self-Check: PASSED

- FOUND: pages/04-subagents/07-hands-on-fire.md
- FOUND: commit 6aaefb7
