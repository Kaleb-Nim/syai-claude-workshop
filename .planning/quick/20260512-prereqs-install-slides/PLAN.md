---
slug: prereqs-install-slides
status: in-progress
created: 2026-05-12
---

# Quick Task: Prereqs install slides

Add a prerequisites/install starter slide section to Phase 1 (audience-setup) for super-beginner participants who will be given an Anthropic API key on the day.

## Decisions
- Placement: Insert as new section `02-prereqs-install.md`; shift existing 02→03 ... 06→07.
- Detail level: API-key flow (not OAuth); 2 slides — (1) what you need, (2) install + set key + verify.
- Install path: `npm install -g @anthropic-ai/claude-code` (Anthropic's documented install). Project CLAUDE.md prefers bun for repo work, but Claude Code itself is installed globally via npm per Anthropic docs.

## Steps
1. Rename existing `pages/01-audience-setup/0{2..6}-*.md` → `0{3..7}-*.md`.
2. Create new `pages/01-audience-setup/02-prereqs-install.md` with 2 slides.
3. Update `pages/01-audience-setup.md` to include the new section and reflect renames.
4. Verify build (`bunx slidev build`) optional — content-only change.
5. Commit atomically.
