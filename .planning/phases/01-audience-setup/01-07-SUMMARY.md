---
phase: 01-audience-setup
plan: 07
subsystem: slides
tags: [win-2, claude-md, sync-check]
requirements: [SET-01, SET-02]
provides:
  - "Section 06 — Win 2 (~/.claude/CLAUDE.md rule) + Why-it-sticks slide with SET-02 sync-check folded in"
key-files:
  created: [pages/01-audience-setup/06-win-claude-md.md]
key-decisions:
  - "Used RESEARCH-corrected wording ('message attached to your conversation', not 'system prompt') — Pitfall 4"
  - "✓ Check uses grep -c (Pitfall 5) and IS the SET-02 chapter sync-check (D-13)"
---

# Plan 01-07 Summary — Win 2 + Sync Check

Two-slide file: rule line in `text` fence on Slide 1; "Why it sticks" + grep-based ✓ Check on Slide 2.

## Commit

- `feat(phase-1): section 06 win-claude-md` (0af6f30)
