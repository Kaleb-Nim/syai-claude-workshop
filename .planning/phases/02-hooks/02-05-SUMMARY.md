---
phase: 02-hooks
plan: 05
subsystem: ui
tags: [slidev, markdown, hooks, hands-on, claude-code, fire]

requires:
  - phase: 02-hooks
    provides: Stop + Notification ~/.claude/settings.json paste-target wired (plan 02-04)
provides:
  - Section 05 single-slide hands-on fire content
  - Two micro-steps (Step 1 Stop trigger, Step 2 Notification trigger via permission-prompt scenario)
  - Two `> ✓ Check:` blockquotes with literal U+2713 glyph
  - Closing D-09 dim sign-off line ("Two events, same shape. Add more later — that's the whole pattern.")
affects: [02-hooks plan 06 build verify]

tech-stack:
  added: []
  patterns:
    - "Bold inline step prefix (Pattern F): `**Step N — Trigger \\`Event\\`:**` em-dash separator + inline-coded event name"
    - "✓ Check blockquote (Pattern C): `> ✓ Check: …` — literal U+2713 glyph, single-line variant + italic-emphasis variant"
    - "Closing dim helper line via `<div class=\"text-dim mt-6\">` (Variant 2)"
    - "Notification trigger via permission-prompt scenario (RESEARCH Pattern 6 — most deterministic 30s trigger; works because Section 04 JSON omits matcher)"

key-files:
  created:
    - pages/02-hooks/05-hands-on-fire.md
  modified: []

key-decisions:
  - "Plan-supplied content used verbatim — no deviations"
  - "Notification trigger example uses `rm -rf /tmp/foo` (disposable path, deterministic permission prompt, reads as obviously safe in workshop room)"

patterns-established:
  - "Hands-on fire pattern: bold step prefix → terse prose with inline-coded command → ✓ Check blockquote → repeat → dim closing line"
  - "Italic emphasis inside ✓ Check (`*different*`) to draw ear-attention to the second chime contrast"

requirements-completed: [HOOK-03, QUAL-02, QUAL-04]

duration: 1min
completed: 2026-05-12
---

# Phase 2 Plan 05: Hands-on fire — Summary

**Single-slide Section 05 delivering the audible payoff: two bold-prefixed micro-steps that trigger Stop (run `claude`, ask a quick thing) and Notification (run a permission-gated command), each followed by a literal-glyph `> ✓ Check:` blockquote, closing with the D-09 dim sign-off — participants hear two chimes, ✓ each, chapter content complete.**

## Performance

- **Duration:** ~1 min
- **Started:** 2026-05-12T13:31:30Z
- **Completed:** 2026-05-12T13:32:35Z
- **Tasks:** 1
- **Files modified:** 1 (created)

## Accomplishments

- Authored `pages/02-hooks/05-hands-on-fire.md` exactly per plan spec
- H1 `# Fire it` — clipped imperative matching Phase 1 style
- Step 1 bold prefix `**Step 1 — Trigger \`Stop\`:**` with terse `claude`-runnable prose
- Step 2 bold prefix `**Step 2 — Trigger \`Notification\`:**` with `rm -rf /tmp/foo` permission-prompt example
- Two `> ✓ Check:` blockquotes with literal U+2713 glyph (single-line + italic-emphasis variants)
- Closing dim line via `<div class="text-dim mt-6">` carries D-09 verbatim
- Zero exclamation marks (QUAL-04), zero custom Vue components, zero screenshots

## Deviations from Plan

None — plan executed exactly as written.

## Verification

- Automated verify command (12-clause grep) passed
- `# Fire it` H1 present, no frontmatter
- Two `> ✓ Check: ` blockquote lines, both verbatim per spec
- Both bold step prefixes present with correct em-dash + inline-coded event names
- Closing line verbatim
- `grep -c "!"` = 0 (QUAL-04)
- Atomic single-task commit (QUAL-02): `edf3584`

## Commits

- `edf3584` feat(phase-2): section 05 hands-on fire (trigger Stop + Notification, ✓ checks)

## Files

**Created:**
- `pages/02-hooks/05-hands-on-fire.md` (13 lines)

## Self-Check: PASSED

- FOUND: pages/02-hooks/05-hands-on-fire.md
- FOUND commit: edf3584
