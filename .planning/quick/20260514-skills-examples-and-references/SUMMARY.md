---
status: complete
date: 2026-05-14
---

# Skills chapter — real-world examples slide

## What changed

- Added `pages/02-skills/07-real-skills.md` — new final slide for Chapter 2
- Wired it into `pages/02-skills.md` after `05-hands-on-fire.md`

## Content

Two concrete skill examples (two-col layout, matching deck idiom):

1. **`frontend-design`** — UI replication from screenshots (Tailwind + React)
2. **`webapp-testing`** — Playwright-driven user-flow verification ("user lighting test case" → UI testing)

Footer reference strip:
- github.com/anthropics/skills (official)
- docs.claude.com Agent Skills overview
- obra/superpowers (community)

## Files touched

- `pages/02-skills/07-real-skills.md` (new)
- `pages/02-skills.md` (include order)

## Verification

Slide uses the existing `two-cols` layout already used by `06-where-skills-live.md` — same template syntax, no new components. Visual verification deferred to user via dev server (Slidev hot-reloads).
