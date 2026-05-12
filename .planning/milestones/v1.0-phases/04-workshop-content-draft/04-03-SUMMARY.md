---
phase: 04-workshop-content-draft
plan: "03"
subsystem: content
tags: [slidev, subagents, claude-agent-sdk, workshop, markdown]

requires:
  - phase: 04-01
    provides: slides.md orchestrator with src: include for pages/02-subagents-sdk.md

provides:
  - pages/02-subagents-sdk.md — Subagents & Agent SDK chapter (~30 min hands-on)

affects: [04-04, 04-05, wave-3-verify]

tech-stack:
  added: []
  patterns:
    - "D-08 chapter shape: title → why → model → walkthrough → exercise → recap"
    - "VERIFY comments on unconfirmed API fields (agent frontmatter keys, SDK message discriminant)"

key-files:
  created:
    - pages/02-subagents-sdk.md
  modified: []

key-decisions:
  - "Two ✓ Check: callouts placed at live-walkthrough and exercise slides for synchronization"
  - "SDK snippet kept to 9 lines (well under 15-line D-19 limit) — async iterator over streamed messages"
  - "VERIFY markers added for agent frontmatter keys (name/description/tools) and message.type discriminant"

patterns-established:
  - "VERIFY comment pattern: <!-- VERIFY: field or behavior to spot-check -->"

requirements-completed: [CONT-04]

duration: 1min
completed: "2026-05-09"
---

# Phase 04 Plan 03: Subagents & Agent SDK Chapter Summary

**12-slide subagents chapter covering Task tool, `.claude/agents/<name>.md` shape, user-vs-Claude-invoked distinction, code-reviewer exercise, and a 9-line `@anthropic-ai/claude-agent-sdk` programmatic invocation snippet.**

## Performance

- **Duration:** ~1 min
- **Started:** 2026-05-09T05:46:25Z
- **Completed:** 2026-05-09T05:47:42Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Created `pages/02-subagents-sdk.md` with 12 slides, 17 `---` separators, following D-08 shape exactly
- Exercise slide walks participants through writing `code-reviewer.md` and invoking via Task tool
- SDK bridge section demonstrates the same primitive used programmatically outside Claude Code
- All automated verification checks pass (slide count, code block lengths, no hype/screenshots/hex)

## Task Commits

1. **Task 1: Draft pages/02-subagents-sdk.md** — `2cee3d7` (feat)

## Files Created/Modified

- `pages/02-subagents-sdk.md` — Full subagents & agent SDK chapter, 12 slides

## Decisions Made

- SDK snippet uses async iterator pattern (`for await`) — cleanest way to show streaming without adding complexity; kept to 9 lines
- Exercise step 2 uses a plain-English prompt rather than a slash-command invocation to work regardless of whether participants have slash commands set up yet
- `✓ Check:` callouts placed at two points: after the listing walkthrough (verify directories exist) and after the exercise (verify Task tool fires and verdict appears)

## VERIFY Markers

Two `<!-- VERIFY -->` markers left for instructor spot-check:

| Location | Marker | What to confirm |
|----------|--------|-----------------|
| Slide 4 (agent definition) | `<!-- VERIFY: exact frontmatter keys (name, description, tools) -->` | Confirm Claude Code agent file accepts exactly `name`, `description`, `tools` — no additional required keys, no key renames |
| Slide 10 (SDK snippet) | `<!-- VERIFY: exact message.type discriminant for final result -->` | Confirm `@anthropic-ai/claude-agent-sdk` streaming yields `{ type: "result", result: string }` for final output — or adjust discriminant accordingly |

## SDK Snippet Details

- File: `pages/02-subagents-sdk.md`, slide 10
- Language fence: ` ```ts `
- Line count: **9 lines** (limit: 15 per D-19)
- Pattern: `import { query }` → `query({ prompt })` → `for await` loop → `message.type === "result"` check

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## Next Phase Readiness

- `pages/02-subagents-sdk.md` is ready; `slides.md` src: include was wired in plan 04-01
- Wave 3 verification (build + presenter + PDF export) covers this chapter
- Instructor should spot-check the two VERIFY markers before going live

---
*Phase: 04-workshop-content-draft*
*Completed: 2026-05-09*
