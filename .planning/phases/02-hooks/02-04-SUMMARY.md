---
phase: 02-hooks
plan: 04
subsystem: ui
tags: [slidev, markdown, hooks, settings-json, claude-code, hands-on]

requires:
  - phase: 02-hooks
    provides: canonical Stop-only ~/.claude/settings.json JSON shape established (plan 02-03)
provides:
  - Section 04 single-slide hands-on paste-target file
  - Full byte-exact Stop + Notification ~/.claude/settings.json JSON (no matchers, no comments)
  - Reconcile prose line bridging Section 03 (Stop) and Section 04 (both events) per D-08
  - Linux/WSL footnote outside the fence (Variant 2 dim helper)
affects: [02-hooks plan 05 hands-on-fire, 02-hooks plan 06 build verify]

tech-stack:
  added: []
  patterns:
    - "Two-event JSON paste-target extends Section 03's shape symmetrically (structural repetition over re-teaching)"
    - "Reconcile prose appears BEFORE the JSON fence to set the 'same shape, repeated' expectation"
    - "Linux/WSL helper outside the fence (Pitfall 2 — no JSON comments)"

key-files:
  created:
    - pages/02-hooks/04-hands-on-build.md
  modified: []

key-decisions:
  - "Plan-supplied content used verbatim (byte-exact Stop+Notification JSON, no matchers per Pitfall 3, Linux/WSL footnote as dim helper)"
  - "No <style scoped> font-shrink block — decision deferred to Plan 06 spot-check per RESEARCH Open Question 3"

patterns-established:
  - "Hands-on paste-target pattern: reconcile prose + fenced JSON (≤25 lines) + dim helper footnote"
  - "Notification entry mirrors Stop entry shape exactly — no matcher field (catches all subtypes including permission_prompt)"

requirements-completed: [HOOK-03, QUAL-02, QUAL-04]

duration: 1min
completed: 2026-05-12
---

# Phase 2 Plan 04: Hands-on build — Summary

**Single-slide Section 04 with byte-exact Stop + Notification `~/.claude/settings.json` paste-target JSON (no matchers, no comments), preceded by the D-08 reconcile prose and followed by a dim Linux/WSL footnote — participants paste this one block to wire both event chimes.**

## Performance

- **Duration:** ~1 min
- **Started:** 2026-05-12T13:30:02Z
- **Completed:** 2026-05-12T13:30:38Z
- **Tasks:** 1
- **Files modified:** 1 (created)

## Accomplishments

- Authored `pages/02-hooks/04-hands-on-build.md` exactly per plan spec
- JSON carries BOTH events with the canonical nested `hooks` shape and no `matcher` field (Pitfall 3 — omitting catches `permission_prompt` for Section 05)
- Reconcile prose appears verbatim per D-08: `Notification has the same shape — we just repeat it.`
- Stop command: `afplay /System/Library/Sounds/Glass.aiff`; Notification command: `afplay /System/Library/Sounds/Ping.aiff`
- Linux/WSL footnote rendered OUTSIDE the JSON fence (Pitfall 2 — no JSON comments) using Variant 2 `text-dim text-sm mt-4`
- JSON block at 26 lines including fences (24 JSON content lines) — well within the D-11 ≤25-content-line rule
- No `<style scoped>` font-shrink (deferred to Plan 06)
- Zero `!` characters anywhere in the file (QUAL-04)

## Task Commits

1. **Task 1: Author Section 04** — `ff273ac` (feat)

## Files Created/Modified

- `pages/02-hooks/04-hands-on-build.md` — New section 04 slide (paste-target JSON + reconcile prose + Linux/WSL footnote)

## Decisions Made

None — plan-supplied content used verbatim. All 10 inline acceptance checks passed on first verification run.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## Self-Check: PASSED

- File `pages/02-hooks/04-hands-on-build.md` — FOUND
- Commit `ff273ac` — FOUND in `git log --oneline --all`
- Plan verification script (all 10 inline acceptance checks combined) exited 0

## User Setup Required

None — no external service configuration required. (Participants edit their own `~/.claude/settings.json` during Section 05; that is workshop-runtime, not a repo change.)

## Next Phase Readiness

- Section 04 paste-target in place; plan 02-05 (hands-on-fire) can drive participants to trigger Stop + Notification and ✓-check chimes
- No blockers

---
*Phase: 02-hooks*
*Completed: 2026-05-12*
