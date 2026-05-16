---
phase: 04-subagents
plan: 02
subsystem: slide-content
tags: [slidev, subagents, skills, framing, locked-quotes]
requires:
  - pages/04-subagents/01-cover.md (preceding section in chapter)
  - .planning/phases/04-subagents/04-RESEARCH.md (locked verbatim quotes — Section 2)
provides:
  - pages/04-subagents/02-skills-vs-subagents.md (cookbook/sous-chef framing slides)
affects:
  - pages/04-subagents.md (will src:-include this section in Plan 04-08 chapter orchestrator)
tech-stack:
  added: []
  patterns:
    - locked-verbatim-quote slides (mirror of Phase 3 Section 02)
    - cross-chapter callback in body prose (Chapter 2 → Chapter 4)
key-files:
  created:
    - pages/04-subagents/02-skills-vs-subagents.md
  modified: []
decisions:
  - Used Path A from research recommendation — verbatim table-row blockquote for Quote 2 (preserves verbatim discipline; matches Phase 3 pattern)
  - Used Path A for Quote 3 — article's "Start with a skill unless…" wording verbatim (positive default beats negative seed framing)
  - Comparison table is the article's 4 rows verbatim, no added planner columns (tightness over breadth)
  - 4-slide layout per plan's literal content block (one framing + table + context contrast + default heuristic)
metrics:
  duration: ~3 minutes
  completed: 2026-05-13
  tasks-completed: 1
  files-changed: 1
---

# Phase 4 Plan 02: Skills vs Subagents Framing Summary

Authored `pages/04-subagents/02-skills-vs-subagents.md` — Chapter 4's mental-model anchor: cookbook/sous-chef contrast plus the article's 4-row comparison table plus three LOCKED verbatim dev.to quotes plus a Chapter 2 callback. Mirrors the Phase 3 Section 02 locked-quote pattern.

## What Shipped

4 slides in one section file:

1. **Cookbook · sous chef** — H1 with middle-dot, Chapter 2 callback prose, Quote 1 verbatim (two-line cookbook/sous-chef one-liner), inline source citation.
2. **The quick version** — markdown comparison table verbatim from the dev.to "Quick Version" table (Aspect / Skills / Subagents columns, 4 data rows: what-it-is, when-Claude-uses-it, best-for, context).
3. **Where context lives** — Quote 2 verbatim (the context-row contrast with middle-dot separators), pointer prose to Section 03.
4. **Default to the lighter tool** — Quote 3 verbatim ("Start with a skill unless you specifically need subagent features…"), source citation footer.

## Verbatim Quotes Confirmed (D-03)

All three locked quotes from `04-RESEARCH.md` placed byte-for-byte:

- Quote 1: `Skill = giving Claude a cookbook` / `Subagent = hiring a sous chef` (two-line blockquote shape)
- Quote 2: `Context — Skills: Shares your main chat context · Subagents: Gets its own isolated context window`
- Quote 3: `Start with a skill unless you specifically need subagent features. Skills are simpler, faster, and easier to maintain.`

Source URL cited inline: `dev.to / nunc — claude-code-skills-vs-subagents-when-to-use-what` (appears twice).

## Deviations from Plan

None — plan executed exactly as written. The plan's literal markdown block was copied verbatim into the file. The acceptance-criteria note about "5 slides / 4 separators" was inconsistent with the plan's literal 4-slide content block; followed the literal content (authoritative per plan's "EXACTLY these contents" directive). All other acceptance criteria pass cleanly.

## Verification

Automated verify command (from plan task 1) passed: file exists, all 3 verbatim quote substrings present, comparison table header present, Chapter 2 callback present, source citation present, zero exclamation marks outside H1s and blockquotes.

Manual checks:
- No `SDK`, `Agent SDK`, or `query(` strings present (D-09 honored).
- Em-dashes used throughout (no hyphens-as-dashes); middle-dot `·` (U+00B7) in slide 1 H1 and slide 3 blockquote.
- Per-slide separators: 3 standalone `---` lines splitting 4 slides (matches plan's literal content).

## Commits

- `367f240` — feat(phase-4): add section 02 skills-vs-subagents framing

## Self-Check: PASSED

- pages/04-subagents/02-skills-vs-subagents.md — FOUND
- commit 367f240 — FOUND in git log
