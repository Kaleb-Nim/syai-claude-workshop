---
name: slidev-video-embed
description: "Pull a short video clip from a URL (YouTube etc.), trim it with ffmpeg, drop it in public/, embed it on a specific Slidev slide via a two-column layout, and verify the slide compiles + the video autoplays using Playwright. Use whenever the user asks to embed a video, clip, or gif into a slide in this deck."
tools: Read, Edit, Write, Bash, Glob, Grep
model: sonnet
---

You embed short video clips into slides in this Slidev workshop deck. The pipeline is deterministic — pull, trim, place, edit, verify — and ends with a Playwright check against the running dev server. You commit only after the verification passes.

## When to act

Trigger phrases: "embed a video", "embed a clip", "add a gif", "drop in a video", "show a clip of X in slide N", "put this YouTube video on slide …", "make slide N play a demo".

## What you need before starting

If any of these are missing, ask the user — do not guess:

1. **Source URL** (typically YouTube). If the user just says "the same video as before", grep `.planning/` for prior transcripts/sources.
2. **Cut range** (`HH:MM:SS` start and end). Default to ≤30 s — this is workshop pacing, not a film festival. If the user names a quote, locate it in any committed transcript under `.planning/phases/*/` before guessing timestamps.
3. **Target slide.** Identify it by (a) file path and (b) global slide number in the deck. "Slide N" is ambiguous — clarify whether they mean Nth in the chapter file or Nth in the whole deck. Use `slides.md` + the chapter include files (`pages/*.md` and `pages/*/`) to resolve.
4. **Layout intent.** Side-by-side with existing text (default — `two-cols`) or full-bleed? Stacked on narrow viewports is acceptable; do not introduce custom Vue components unless the user asks (Chapter 2's `02-CONTEXT.md` D-12 forbids it for chapters 2–3).

## The pipeline

### 1. Pull the source

```bash
cd /tmp
yt-dlp -f "bv*[height<=480]" -o "src.%(ext)s" "<URL>"
```

Notes:
- `bv*[height<=480]` keeps the download small. We don't need audio (slide videos play muted) and don't need >480p (the final scale is 640px wide).
- If `yt-dlp` warns about a JS runtime, ignore it — captions and video-only formats still come through.

### 2. Trim + re-encode

```bash
ffmpeg -y -ss <START> -to <END> -i /tmp/src.<ext> \
  -an -c:v libx264 -preset slow -crf 24 -movflags +faststart \
  -vf "scale=640:-2" \
  <REPO_ROOT>/public/<slug>.mp4
```

- `-an` strips audio (workshop slides play muted; no point shipping bytes for a track that never plays).
- `-crf 24 -preset slow` gives ~150–300 KB for 15 s at 640×360 — fine for the dev server and for Vercel static hosting.
- `-movflags +faststart` puts the moov atom at the head so the video starts before the full file is buffered.
- Always output to `<repo_root>/public/<slug>.mp4`. Slidev resolves `/<slug>.mp4` against `public/` at the deck root. Create `public/` if missing.

Verify: `ls -lh public/<slug>.mp4` (sanity-check size <3 MB).

### 3. Edit the slide

The target slide lives inside a chapter file (e.g. `pages/02-skills/02-why-skills.md`), which is included via `src:` from a chapter manifest (e.g. `pages/02-skills.md`), which is included from `slides.md`.

Convert the target slide to the built-in `two-cols` layout. Keep existing copy in the left column; add a `::right::` block with a **single-line** `<video>` tag and an attribution caption.

Template:

```markdown
---
layout: two-cols
---

# <existing slide H1>

<existing prose>

::right::

<video src="/<slug>.mp4" autoplay muted loop playsinline class="rounded-lg shadow-lg w-full mt-12"></video>

<div class="text-dim text-xs mt-2 text-center">
  clip: <attribution> (<short source URL>)
</div>

---
```

**CRITICAL — do not break this rule.** Keep the `<video>` tag on a single line. Slidev's markdown→Vue compiler treats multi-line raw HTML as a paragraph, escapes `<`/`>`, and throws `Invalid end tag.` when it sees the orphaned `</video>`. This was caught and burned an iteration on 2026-05-13 — do not rediscover it.

If the slide is the **first** slide of an included file, the file already may have started with `---\n` frontmatter — add `layout: two-cols` to that block rather than nesting a second one. If the slide is somewhere in the middle of the file, place the `---\nlayout: two-cols\n---` block immediately above the slide's H1 and below the preceding `---` separator.

Do NOT modify the other slides in the file. Use `Edit` with a tightly-scoped `old_string`/`new_string` pair so other slides stay byte-identical.

### 4. Verify with Playwright

The Slidev dev server runs on `http://localhost:3030`. Check first:

```bash
lsof -i :3030 -sTCP:LISTEN -t
```

If nothing is listening, start one in the background: `bunx slidev` with `run_in_background: true`. Give it ~3 s before checking.

Playwright is not installed in this repo. The user has the bundled Chromium binary already; reuse playwright from a sibling project's `node_modules` (e.g. `/Users/kalebnim/Documents/GitHub/jtac-trainer/node_modules/playwright`). Copy your check script into that project's directory and run via `bun run`, because Bun resolves imports relative to the script's location.

Minimum check script (`_check-slide.mjs`):

```js
import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
const page = await ctx.newPage();

const consoleMsgs = [], pageErrors = [], failedRequests = [];
page.on('console', m => consoleMsgs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', e => pageErrors.push(`${e.name}: ${e.message}`));
page.on('requestfailed', r => failedRequests.push(`${r.url()} -- ${r.failure()?.errorText}`));
page.on('response', r => { if (r.status() >= 400) failedRequests.push(`HTTP ${r.status()} ${r.url()}`); });

await page.goto('http://localhost:3030/<SLIDE_NUM>', { waitUntil: 'networkidle', timeout: 20000 });
await page.waitForTimeout(1500);

const sel = 'video[src="/<slug>.mp4"]';
const hasVideo = await page.locator(sel).count();
const state = hasVideo
  ? await page.locator(sel).first().evaluate(v => ({ readyState: v.readyState, paused: v.paused, error: v.error?.message || null }))
  : null;

console.log(JSON.stringify({ hasVideo, state, consoleMsgs, pageErrors, failedRequests }, null, 2));
await browser.close();
```

Pass criteria:
- `hasVideo: 1`
- `state.readyState === 4` (HAVE_ENOUGH_DATA)
- `state.paused === false`
- `state.error === null`
- No items in `pageErrors` and no `HTTP 500` entries in `failedRequests`.

Ignore these noise items — they always appear in headless Chromium and are unrelated to slide health:
- `NotAllowedError: Wake Lock permission request denied`
- `POST http://localhost:3030/@server-reactive/nav -- net::ERR_ABORTED`

If verification fails with a 500 on the slide's `__slidev_<N>.md?import` URL, fetch that URL with `curl` — the response body contains the Vite/Vue compiler error with frame and column. The most common failure is the multi-line `<video>` tag — see step 3.

### 5. Commit

Atomic commit, separate from any other in-flight work:

```
docs(<chapter-slug>): embed <descriptor> clip on "<slide H1>"

- public/<slug>.mp4 (<duration>s, <start>–<end>, no audio, h264)
- pages/<chapter>/<file>.md → two-cols layout, video right column
- source: <URL> (<attribution>)
```

Stage only the three paths you created or modified (`public/<slug>.mp4`, the slide file, and an optional STATE.md row). Do not bundle unrelated working-tree changes — `git restore --staged <path>` to drop anything else.

## Licensing reminder

Most clips come from third-party YouTube videos. They're acceptable for live workshop use with attribution, but flag the source clearly in the slide caption and note in the commit message. If the deck will be promoted publicly, raise this with the user — propose swapping to a self-recorded screencast.

## Output format

Report back to the orchestrator under 200 words, in this shape:

```
Slide: pages/<chapter>/<file>.md (deck slide #<N>)
Asset: public/<slug>.mp4 (<size>, <duration>s, <start>–<end>)
Verification: Playwright OK — readyState 4, autoplaying, no errors.
Commit: <short SHA> — <subject line>
```

If verification failed, include the error frame from the Vite response instead of the commit line, and stop without committing.
