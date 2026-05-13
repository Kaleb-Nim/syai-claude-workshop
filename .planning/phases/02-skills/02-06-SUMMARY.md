---
phase: 02-skills
plan: 06
subsystem: slides
tags: [skills, hands-on, fire, auto-invocation]
requires: [03-01]
provides:
  - "Section 05 hands-on fire slide (SKL-03 fire half)"
affects:
  - pages/02-skills/05-hands-on-fire.md
tech-stack:
  added: []
  patterns:
    - "Plain `> ✓ Check:` blockquote (Phase 1 analog)"
    - "Single-slide file, no `---` separators"
    - "```text fenced prompts for copyable trigger/control"
key-files:
  created:
    - pages/02-skills/05-hands-on-fire.md
  modified: []
decisions:
  - "Trigger prompt locked to 'Explain hooks in pirate-mode.' (matches D-06 description)"
  - "Control prompt locked to 'What's a git rebase?' (neutral — research Pitfall 2)"
  - "Both ✓ Check texts and closing line are byte-exact per D-10"
metrics:
  duration: "~2 min"
  completed: "2026-05-12"
  tasks: 1
  files: 1
---

# Phase 03 Plan 06: Section 05 Hands-on Fire Summary

Authored Section 05 of Chapter 2 — the wow moment where Claude self-invokes the pirate-mode skill on a plain-English trigger, then deliberately does NOT invoke on a neutral control prompt. Single slide, two micro-steps, two locked `> ✓ Check:` blockquotes, locked closing line.

## What Was Built

A single Slidev page `pages/02-skills/05-hands-on-fire.md`:

- **Step 1 (trigger):** `Explain hooks in pirate-mode.` → ✓ Check on locked signature (`"Ahoy ye sigma"` open + `"— per pirate-mode"` close + `"never typed a slash command"`).
- **Step 2 (control):** `What's a git rebase?` → ✓ Check confirms non-invocation (no Ahoy, no signature, description didn't match).
- **Closing line:** `Two prompts, one skill. Claude chose when to use it — that's the whole point.` rendered inside `<div class="text-dim text-sm mt-6">`.

## Verification

All 9 automated assertions passed in a single chained check:
- File exists, H1 matches `# Fire it`, zero `^---$` separators
- Trigger + control prompts present verbatim
- Both ✓ Check bodies byte-exact (U+2713 glyph, U+2014 em-dash)
- Closing line byte-exact
- Exactly 2 `✓ Check:` occurrences
- Zero `!` in non-heading lines (QUAL-04)

## Deviations from Plan

None — plan executed exactly as written.

## Commits

- `8fd9079` feat(phase-2): section 05 hands-on-fire

## Requirements Touched

- SKL-03 (fire half)
- QUAL-02 (atomic commit)
- QUAL-04 (no exclamation marks)

## Self-Check: PASSED

- FOUND: pages/02-skills/05-hands-on-fire.md
- FOUND: 8fd9079
