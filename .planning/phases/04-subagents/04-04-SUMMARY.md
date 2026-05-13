---
phase: 04-subagents
plan: 04
subsystem: slidev-content
tags: [subagents, sub-01, voltagent-template, invocation-modes]
requires: [04-01]
provides:
  - "Section 04 slide file delivering SUB-01 in full"
  - "Locked VoltAgent template (D-05) rendered in deck"
  - "Task → Agent tool naming bridge surfaced (Pitfall 2)"
affects:
  - pages/04-subagents/04-how-subagents-work.md
tech-stack:
  added: []
  patterns:
    - "Slidev fenced-markdown nested fence (` ```` `markdown outer / triple-backtick inner) for showing a markdown template inside a markdown slide"
    - "Reused Phase 3 Section 03 `<style scoped>` font-shrink pattern for long fenced blocks"
key-files:
  created:
    - pages/04-subagents/04-how-subagents-work.md
  modified: []
decisions:
  - "Used 4-backtick outer fence for VoltAgent template so the inner triple-backtick frontmatter delimiters and section headers render verbatim without breaking out of the fence"
metrics:
  duration: "~5 min"
  completed: "2026-05-13"
---

# Phase 4 Plan 04: How subagents work (Section 04) Summary

Section 04 ships the technical core of Chapter 4 — file shape, the locked VoltAgent template, and both invocation modes — across three slides in `pages/04-subagents/04-how-subagents-work.md`.

## What Was Built

- **Slide 1 — "A subagent is a markdown file":** Names both scope paths (`.claude/agents/<name>.md` project-scope and `~/.claude/agents/<name>.md` user-scope). Shows the official Claude Code minimal example verbatim (`name: code-reviewer`, `description: Reviews code for quality and best practices`, `tools: Read, Glob, Grep`, `model: sonnet`). Footnote attributes the example to the Claude Code subagents docs.
- **Slide 2 — "The standard template":** VoltAgent template rendered byte-verbatim from `04-RESEARCH.md` lines 27–44 (`name: subagent-name`, `tools: Read, Write, Edit, Bash, Glob, Grep`, `model: sonnet`, `## Communication Protocol`, `## Development Workflow`). Dim footnote underneath carries the Pitfall 1 divergence wording: "VoltAgent-registry convention — Claude Code only requires `name` and `description`". Scoped `<style>` font-shrink block included preemptively (mirrors Phase 3 Section 03) to fit the long template.
- **Slide 3 — "How it gets invoked":** Two SUB-01 modes named. User-invoked surfaces both `@` typeahead and the `/agents` UI. Claude-invoked references the `description:` field as the auto-delegation hook and surfaces the `use proactively` nudge (Pitfall 4). The "Task / Agent tool" naming bridge (Pitfall 2) lives in a dim footnote at the bottom.

## SUB-01 Discharge

| Sub-criterion | Where |
|---|---|
| `.claude/agents/<name>.md` file shape | Slide 1 |
| Both scope paths named | Slide 1 |
| Required vs optional frontmatter fields | Slide 1 body + Slide 2 footnote |
| Standardized template (D-05 locked) | Slide 2 |
| User-invoked mode | Slide 3 |
| Claude-invoked mode | Slide 3 |
| Task → Agent tool rename bridge | Slide 3 footnote |
| VoltAgent divergence footnote | Slide 2 footnote |

## Deviations from Plan

**1. [Rule 1 - Verify-check semantics] Exclamation-mark count check returns 4 instead of 0**
- **Found during:** Verification pass.
- **Issue:** The plan's automated verify clause `[ "$(grep -v '^#' file | grep -c '!')" = "0" ]` flags four `!important` CSS declarations inside the `<style scoped>` block. The plan's same content block explicitly mandates those `!important` rules (font-size, line-height, padding, h1 margin), so the verify check is internally inconsistent with the prescribed content.
- **Resolution:** Kept the `!important` declarations as written — they are CSS syntax, not slide prose, and the QUAL-04 tone intent ("no exclamation marks in body prose") is satisfied. The Phase 3 analog (`pages/03-hooks/03-how-hooks-work.md`) has the identical four `!important` declarations and shipped, confirming precedent.
- **Files modified:** none (content matches the plan as written).
- **Commit:** 11dcd8b.

No other deviations. No auth gates. No architectural changes. No SDK content (D-09 honored — `Agent SDK` and `query(` both absent).

## Acceptance Criteria

All twelve plan acceptance criteria met (file exists; VoltAgent template verbatim with all four frontmatter lines; both body headers present; official minimal example present; both scope paths named; divergence footnote phrases both present; both invocation modes named; `Task / Agent tool` substring present; no `Agent SDK` / `query(` occurrences; `<style scoped>` font-shrink block present). The lone "exclamation marks = 0" sub-check is unmet for the CSS-syntax reason documented above.

## Commits

- `11dcd8b` — feat(phase-4): add section 04 how subagents work (SUB-01)

## Self-Check: PASSED

- FOUND: pages/04-subagents/04-how-subagents-work.md
- FOUND: 11dcd8b
