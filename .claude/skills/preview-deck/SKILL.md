---
name: preview-deck
description: |
  Start the Slidev dev server so the user can preview the workshop deck in
  their browser after a change. Use when the user says "preview", "show me
  the deck", "run the dev server", "let me see it", "open the slides", or
  any variant of wanting to view the live deck after edits. Runs
  `bunx slidev` in the background on http://localhost:3030 and reports the
  URL. Does not block — Slidev hot-reloads subsequent edits.
---

# preview-deck

Start the Slidev dev server in the background so the user can see deck changes
in their browser.

## When to use

Trigger on any phrasing that implies "let me see the deck":
- "preview"
- "show me / let me see the slides"
- "run the dev server"
- "open the deck"
- "spin up slidev"

Also offer proactively after making a non-trivial slide change if the dev
server isn't already running.

## How to run

1. Check if a Slidev process is already running:
   ```bash
   lsof -i :3030 -sTCP:LISTEN -t 2>/dev/null
   ```
   If a PID is returned, tell the user it's already running at
   http://localhost:3030 and stop — do not start a second one.

2. Otherwise launch it in the background via the Bash tool:
   ```bash
   bunx slidev --open
   ```
   Set `run_in_background: true`. Do NOT use `&` — let the harness manage it.

3. Tell the user:
   > Dev server starting on http://localhost:3030 — Slidev hot-reloads on save.

## Notes

- Always use `bunx`, never `npx` or `npm` (per project CLAUDE.md).
- Slidev runs on port 3030 by default. If the user wants a different port,
  pass `--port <n>`.
- The `--open` flag auto-opens the browser tab on first start.
- Do not run `bunx slidev build` for previewing — that produces the static
  SPA output for Vercel, not a hot-reloading dev server.
- Background process keeps running across turns. Stop it with the
  KillShell tool or by killing the PID from `lsof -i :3030`.
