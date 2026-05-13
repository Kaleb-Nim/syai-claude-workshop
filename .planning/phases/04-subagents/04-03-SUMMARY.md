---
phase: 04-subagents
plan: 03
subsystem: slidev-content
tags: [slides, subagents, context-preservation]
requires: [04-01]
provides: ["Why subagents — context preservation framing"]
affects: [pages/04-subagents/03-why-subagents.md]
tech-stack:
  added: []
  patterns: [per-slide-separator, dim-callout-div]
key-files:
  created: [pages/04-subagents/03-why-subagents.md]
  modified: []
decisions:
  - "D-04 honored: 'isolated context window' and 'context bloat' both present verbatim"
  - "Four-slide structure: problem (bloat) → mechanism (own window) → payoffs (3 examples) → trade (forward to Sec 04)"
metrics:
  duration: "~2 min"
  completed: 2026-05-13
requirements_satisfied: [QUAL-02, QUAL-04]
---

# Phase 4 Plan 03: Section 03 — Why Subagents Summary

Context-preservation framing slide section for Chapter 4: four-slide arc anchored on isolated context windows preventing main-chat context bloat, with three concrete payoff examples (code review, research synthesis, log/diff analysis) and an explicit trade-off close that forward-references Section 04.

## What Shipped

`pages/04-subagents/03-why-subagents.md` — new file, 4 slides separated by `---`:

1. **Your main chat is finite** — names context bloat as the failure mode (chat fills, Claude forgets, quality drops).
2. **Subagents get their own window** — drops the locked D-04 phrase `isolated context window`; states only the final summary returns.
3. **Where this pays off** — three concrete examples: code review across many files, research synthesis across many docs, log/diff analysis.
4. **The trade** — explicit tradeoff (lose live visibility, gain clean main chat) and forward pointer to Section 04.

## Verification

Acceptance criteria, all passing:

| Check | Result |
| --- | --- |
| File exists | yes |
| `isolated context window` count | 1 |
| `context bloat` count | 1 |
| `Code review across many files` present | yes |
| `---` per-slide separators | 3 (= 4 slides) |
| Exclamation marks in body | 0 |
| `SDK` / `query(` matches | 0 |

## Deviations from Plan

None — plan executed exactly as written. The plan's `<action>` block contained the full file contents; written verbatim.

## Key Decisions

- **D-04 mandatory phrases honored verbatim:** `isolated context window` (Slide 2), `context bloat` (Slide 1). The Slide-2 phrase also echoes the Section-02 locked dev.to quote about isolated context — deliberate cross-section reinforcement.
- **Tone discipline (QUAL-04):** Zero exclamation marks in body. No marketing language. Terse close ("That's the deal.") matches Phase 3 voice.
- **D-09 honored:** No SDK or `query()` references anywhere.

## Commits

- `4535bf7` — feat(phase-4): add section 03 why-subagents context preservation

## Self-Check: PASSED

- FOUND: pages/04-subagents/03-why-subagents.md
- FOUND: commit 4535bf7
