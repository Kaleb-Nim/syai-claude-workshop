---
phase: 04-subagents
plan: 05
subsystem: slidev-authoring
tags: [chapter-4, section-05, showcase, voltagent, frontmatter]
requires:
  - pages/04-subagents.md (chapter orchestrator — added by plan 04-01)
provides:
  - pages/04-subagents/05-showcase.md (3-up VoltAgent frontmatter showcase)
affects:
  - pages/04-subagents.md (already src:-includes this section per plan 04-01)
tech-stack:
  added: []
  patterns:
    - "grid grid-cols-3 gap-3 mt-2 (3-up code-block layout, Phase 3 Section 03 analog)"
    - "<style scoped> font-shrink (font-size: 0.5rem, line-height: 1.15) — copied from Phase 3 Section 03"
    - "verbatim VoltAgent frontmatters with one truncation flagged via dim footnote"
key-files:
  created:
    - pages/04-subagents/05-showcase.md
  modified: []
decisions:
  - "Truncated quant-analyst description to first sentence with ellipsis + source footnote (Assumption A5 / Open Q4 — research Path A)"
  - "Two-slide section: framing slide + grid slide (matches plan spec)"
  - "Used verbatim frontmatters from VoltAgent files verified in 04-RESEARCH.md Examples 2-4"
metrics:
  duration: "~3 min"
  completed: 2026-05-13
---

# Phase 4 Plan 05: Section 05 Showcase Summary

Three-up grid comparing real VoltAgent subagent frontmatters (python-pro, quant-analyst, market-researcher) — proves D-06 "subagents aren't just for coding" through tool/model/domain contrast on a single slide.

## What Shipped

`pages/04-subagents/05-showcase.md` — two slides:
1. **Framing slide** ("Three subagents, three domains"): one-line primer that the file shape doesn't care about domain.
2. **Grid slide** ("Three real ones, side by side"): 3-up `grid grid-cols-3` of YAML-fenced frontmatters with scoped font-shrink. Two dim footnotes — one surfaces the teaching point (tools+model shift per job, shape stays), one flags the quant-analyst truncation and cites the source repo.

## Contrast Surface

| Subagent          | Tools                                  | Model  | Domain               |
| ----------------- | -------------------------------------- | ------ | -------------------- |
| python-pro        | Read, Write, Edit, Bash, Glob, Grep    | sonnet | language specialist  |
| quant-analyst     | Read, Write, Edit, Bash, Glob, Grep    | opus   | finance / quant      |
| market-researcher | Read, Grep, Glob, WebFetch, WebSearch  | sonnet | research / synthesis |

All three teaching points (tool restriction, model selection, domain breadth) fall out of one row visually.

## Decisions Made

- **Truncation over font-shrink for quant-analyst** (research Path A, A5). Description cut at first sentence ending in "portfolios..." with footnote pointing to the source repo. Reversible if a future dry-run shows the truncation feels heavy-handed.
- **No screenshots, no SDK references** — QUAL-04 + D-09 honored.
- **No exclamation marks in body content.** Four `!` characters exist in the file but all are CSS `!important` declarations inside `<style scoped>` (the same pattern Phase 3 Section 03 ships). Tone constraint is on prose, not CSS.

## Deviations from Plan

None — plan executed exactly as written.

The verification regex `[ "$(grep -v '^#' file | grep -c '!')" = "0" ]` returns `4` because of `!important` CSS, but the plan's own action specifies those `!important` declarations verbatim. Body content (excluding the style block) has zero exclamation marks. Treated as a known verifier-regex limitation, not a code issue.

## Verification

- File exists: pages/04-subagents/05-showcase.md
- All three `name:` lines present (python-pro, quant-analyst, market-researcher)
- `model: opus` and `model: sonnet` both present (contrast visible)
- `tools: Read, Grep, Glob, WebFetch, WebSearch` line present (read-only + web contrast)
- `grid grid-cols-3 gap-3 mt-2` wrapper present
- `font-size: 0.5rem` scoped style present
- `truncated for layout` footnote present
- `VoltAgent/awesome-claude-code-subagents` source citation present
- No `Agent SDK` or `query(` occurrences (D-09 honored)
- Body prose contains zero `!` characters (QUAL-04 honored)

## Commits

- `7618561` — feat(phase-4): add section 05 showcase grid

## Self-Check: PASSED

- FOUND: pages/04-subagents/05-showcase.md
- FOUND: commit 7618561
