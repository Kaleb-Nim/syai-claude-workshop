---
phase: 04-subagents
plan: 06
subsystem: slidev-content
tags: [subagents, hands-on, slash-command, SUB-03]
requires: [04-01]
provides: [SUB-03-wire]
affects: [pages/04-subagents/]
tech-stack:
  added: []
  patterns: [hands-on-build-slide]
key-files:
  created:
    - pages/04-subagents/06-hands-on-build.md
  modified: []
decisions:
  - "Hands-on uses /agents tabbed UI flow per current docs, not manual mkdir"
  - "Personal scope explicitly recommended on slide (Pitfall 3 mitigation)"
  - "commit-message-writer chosen as hands-on subagent (researcher recommendation)"
  - "Walkthrough is text-only ordered list — no screenshots (QUAL-04)"
metrics:
  duration: "~3min"
  completed: 2026-05-13
  tasks_completed: 1
  files_changed: 1
---

# Phase 4 Plan 06: Hands-on Build (Section 06) Summary

Authored `pages/04-subagents/06-hands-on-build.md` — a two-slide hands-on that walks participants through `/agents` in Claude Code to build a `commit-message-writer` subagent end-to-end, no manual file creation.

## What Shipped

- **Slide 1 — "Build it: run /agents"**: condensed 8-step walkthrough of the tabbed `/agents` UI flow (Library tab → Create new agent → Personal scope → Generate with Claude → describe → tools=Bash+Read → model=Sonnet → color/memory/save). Dim footnote reinforces Pitfall 5 (no session restart needed).
- **Slide 2 — "What just landed on disk"**: shows `~/.claude/agents/commit-message-writer.md` as the resulting artifact, with a one-line forward-pointer to Section 07.

## Key Decisions

- **`/agents` tabbed UI flow over older flat-menu YouTube flow** (D-07 + research): canonical sequence collapsed from 13 steps to 8 (color/memory/save folded into one step).
- **Personal scope explicit on slide** (Pitfall 3): "Pick Project only if you want it scoped to one repo."
- **Generate-with-Claude path named explicitly**: avoids manual-configure detour.
- **Tools locked to Bash + Read; model Sonnet**: matches Example 6 reference frontmatter from research.
- **A1 uncommitted-change setup deferred to Section 07**: this section only builds the subagent. Fire step owns the `echo >> README.md` step zero.

## Verification

All automated checks from PLAN passed:
- File exists; `/agents`, `Library`, `Personal`, `Generate with Claude`, `commit-message-writer`, `Bash`, `Sonnet`, `~/.claude/agents/commit-message-writer.md` all present.
- `!` count in body = 0 (QUAL-04 tone).
- No `Agent SDK` / `query(` (D-09 SDK exclusion).
- No `screenshot` / `.png` / `.jpg` (QUAL-04).

## Commits

- `9effc5f` — feat(phase-4): add section 06 hands-on build via /agents (SUB-03 wire)

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- FOUND: pages/04-subagents/06-hands-on-build.md
- FOUND: commit 9effc5f
