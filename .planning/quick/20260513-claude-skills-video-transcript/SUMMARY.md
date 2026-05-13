---
type: quick
slug: claude-skills-video-transcript
created: 2026-05-13
completed: 2026-05-13
status: complete
---

# Summary: Claude "What are skills?" video transcript

## What shipped

- Pulled YouTube auto-captions for https://www.youtube.com/watch?v=bjdBVZa66oU via `yt-dlp --write-auto-subs --sub-lang en` (VTT).
- Cleaned VTT karaoke duplicates + timing tags into a plain-prose transcript.
- Saved transcript with frontmatter (source URL, title, channel, duration, pulled date) and a "Key claims" table mapping each line to the chapter-2 slide that can cite it.

## Files

- `.planning/phases/02-skills/02-VIDEO-TRANSCRIPT-what-are-skills.md` — the transcript + citation map.
- `.planning/quick/20260513-claude-skills-video-transcript/PLAN.md` — quick-task plan.
- `.planning/quick/20260513-claude-skills-video-transcript/SUMMARY.md` — this file.
- `.planning/STATE.md` — added row to "Quick Tasks Completed".

## Notes

- ASR mis-hears "claude.md" as "claw.md" in one spot; preserved with an inline `[ASR: …]` flag rather than silently rewritten.
- Storage is third-party content under YouTube's ToS — quote with attribution, do not redistribute the full body downstream.
