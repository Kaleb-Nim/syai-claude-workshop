---
slug: resources-page
status: complete
completed: 2026-05-13
---

# Summary — Resources Page

Added final Resources chapter listing the five references that informed the workshop.

## Changes

- `pages/99-resources/01-resources.md` — single slide, two-column grid (Deep dives / Repos & talks), external links open in new tab, dim-styled source labels.
- `pages/99-resources.md` — chapter orchestrator with `src:` include.
- `slides.md` — appended `src: ./pages/99-resources.md` after the hooks chapter.

## Verification

- `bunx slidev build` succeeds (989 ms, no errors).
