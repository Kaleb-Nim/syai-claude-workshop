---
name: verify-slide
description: |
  After creating or substantially editing a Slidev slide, drive a headless
  Chromium via Playwright CLI to load the deck and capture any browser
  console errors / page errors / failed requests. Run this proactively
  after every new slide file is added or a slide's structure changes.
  Reports a clean PASS or a list of errors with the offending slide.
---

# verify-slide

Headless browser verification for new/changed Slidev slides. Catches runtime
errors that Vite's compile-time checks miss (Vue template typos, bad
component references, broken layouts, missing assets).

## When to use

Run automatically after:
- Creating a new slide file in `pages/**/*.md`
- Adding a new `src:` entry to a chapter index
- Changing layout, components, or `<style scoped>` blocks
- Any change the user explicitly asks to "verify in the browser"

Do NOT run for trivial text-only tweaks (typo fixes, copy changes).

## How to run

1. Ensure dev server is running on port 3030:
   ```bash
   lsof -i :3030 -sTCP:LISTEN -t 2>/dev/null
   ```
   If empty, start it first via the `preview-deck` skill and wait ~3s for
   Vite to be ready.

2. Run the verifier script with the slide number to check (1-indexed
   global slide number — Slidev numbers across the whole deck, not per
   chapter):
   ```bash
   bunx playwright install chromium  # only if not already installed
   bun run .claude/skills/verify-slide/check.ts <slide-number>
   ```
   Omit the slide number to scan every slide in the deck.

3. The script exits 0 on success and prints `PASS: slide N`. On failure it
   exits non-zero and prints each captured error with the slide URL.

4. If the slide number is unknown, count `src:` entries up to the new file
   across `slides.md` → chapter files. For a multi-slide single file, each
   `---` separator inside also increments the number.

## Notes

- Always use bundled Chromium (`bunx playwright install chromium`), never
  system Chrome — per global rules.
- Playwright MCP is NOT used here; this is the Playwright CLI/SDK path.
- The script captures: `console.error`, uncaught `pageerror`, and any HTTP
  request that returned >=400.
- Slidev hot-reloads, so no rebuild needed between runs.
- If the dev server was just started, give it ~3 seconds before the first
  navigation (Vite initial compile).
