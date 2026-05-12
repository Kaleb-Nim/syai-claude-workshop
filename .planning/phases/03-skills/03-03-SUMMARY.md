---
phase: 03-skills
plan: 03
subsystem: slides/section-02-why-skills
tags: [slides, skills, framing, locked-quotes]
requires: [03-01]
provides: [SKL-01-framing-half]
affects: [pages/03-skills.md]
tech-stack:
  added: []
  patterns: [slidev-multi-slide-section, locked-quote-blockquote]
key-files:
  created:
    - pages/03-skills/02-why-skills.md
  modified: []
decisions:
  - D-02 — Section 02 is a 5-slide shape (bridge + framing + 3 quotes)
  - D-03 — 3 LOCKED QUOTES rendered byte-exact as markdown blockquotes (no `<v-clicks>` wrapper; default-omit per D-13)
  - D-04 — Slide 1 carries the Phase 2 → Phase 3 bridge (hook = you wire the "when"; skill = Claude decides the "when")
metrics:
  duration: ~3min
  tasks: 1
  files: 1
  completed: 2026-05-12
---

# Phase 03 Plan 03: Section 02 "Why Skills" Summary

Authored `pages/03-skills/02-why-skills.md` — the 5-slide framing section for Chapter 3 that bridges from Phase 2 hooks, defines skills as reusable procedural knowledge, and seats the 3 user-locked quotes that anchor the section's voice.

## What Shipped

A single new file at `pages/03-skills/02-why-skills.md` containing exactly 5 slides separated by 4 `---` rulers:

1. **Hooks and skills are opposite ends** — Phase 2 → Phase 3 bridge. Bolded **you** vs **Claude** contrast in prose, distilled into a one-line dim helper: `hook = you wire the "when" · skill = Claude decides the "when"`.
2. **Why this matters** — Procedural-knowledge framing plus a concrete `pr-review` example: "You write a `pr-review` skill once. Next time someone says 'review this PR,' Claude loads it without being told."
3. **What skills are, in essence** — Blockquote with LOCKED QUOTE 1 byte-exact.
4. **Why this scales** — Blockquote with LOCKED QUOTE 2 byte-exact.
5. **The self-invocation moment** — Blockquote with LOCKED QUOTE 3 byte-exact, plus a dim forward-pointer to the hands-on payoff in two slides.

## Verification

All plan acceptance criteria pass (executed grep verification block):

- File exists at `pages/03-skills/02-why-skills.md`
- Exactly 4 `^---$` separators (5 slides)
- All 5 H1 lines present in the locked order
- LOCKED QUOTE 1 grep-matches byte-exact: `Skills are procedural knowledge — a reusable 'how we do XYZ here' — packaged in a format Claude can discover and load itself.`
- LOCKED QUOTE 2 grep-matches byte-exact: `CLAUDE.md is always loaded. A skill is loaded when needed. That distinction is why a 50-skill library doesn't slow Claude down, but a 5,000-line CLAUDE.md does.`
- LOCKED QUOTE 3 grep-matches byte-exact: `You didn't type a slash command. You didn't remind Claude of the format. The skill activated itself.`
- `grep -c '!'` returns `0` (QUAL-04 — no exclamation marks)
- Slide 1 contains both bridge phrases (`hook = you wire the "when"` AND `skill = Claude decides the "when"`)
- Slide 2 contains `pr-review` (concrete example)
- No `<v-clicks>` wrapper applied (D-13 default-omit)

## Key Decisions

- **No frontmatter on the section file.** Following the Phase 2 analog (`pages/02-hooks/02-why-hooks.md`), the first line is the first H1; default Slidev layout applies. The parent `pages/03-skills.md` is responsible for include resolution via `src:`.
- **Blockquotes (not styled callouts) for the 3 locked quotes.** Matches the Phase 2 pattern (`02-why-hooks.md` Slides 3-5). Keeps the visual treatment consistent across chapters and keeps the byte-exact grep stable.
- **`<v-clicks>` omitted by default.** D-13 says default to omit; can be added later if live pacing review requests it.
- **Em-dashes copied verbatim from plan.** U+2014 inside the quotes, not typed hyphens — grep -F verifies.

## Deviations from Plan

None — plan executed exactly as written.

## Requirements Touched

- **SKL-01** (framing half) — delivered. The mechanism half (file shape, frontmatter, location) is owned by Plan 03-04.
- **QUAL-02** — atomic commit `feat(phase-3): section 02 why-skills` (single file, single commit).
- **QUAL-04** — zero exclamation marks (grep -c '!' = 0).

## Commits

- `90097d6` — feat(phase-3): section 02 why-skills

## Files

- Created: `/Users/kalebnim/Documents/GitHub/syai-claude-workshop/pages/03-skills/02-why-skills.md`

## Self-Check: PASSED

- FOUND: `pages/03-skills/02-why-skills.md`
- FOUND: commit `90097d6`
- All 3 LOCKED QUOTES grep-verified byte-exact
- 4 slide separators present (5 slides total)
- 0 exclamation marks
