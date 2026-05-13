---
type: quick
slug: claude-skills-video-transcript
created: 2026-05-13
status: in-progress
---

# Quick Task: Claude "What are skills?" video transcript

## Description

Extract transcript from the official Claude tutorial video on skills (https://www.youtube.com/watch?v=bjdBVZa66oU) and save it as a markdown reference alongside the existing Chapter 2 (Skills) GSD plans, so it can be cited as a primary source during slide authoring and review.

## Source

- URL: https://www.youtube.com/watch?v=bjdBVZa66oU
- Title: "What are skills?"
- Channel: Claude
- Duration: 2m 54s (174s)
- Uploaded: 2026-02-27

## Destination

`.planning/phases/02-skills/02-VIDEO-TRANSCRIPT-what-are-skills.md` — sits beside `02-RESEARCH.md`, `02-CONTEXT.md`, and the per-section plans/summaries so future planners can grep it.

## Tasks

1. Pull captions via `yt-dlp --write-auto-subs --sub-lang en` (VTT format).
2. Strip VTT timing tags + karaoke-style dup lines into a single clean paragraph stream.
3. Write transcript file with frontmatter (source URL, title, duration, date pulled) and the cleaned body, lightly broken into paragraphs.
4. Update `.planning/STATE.md` "Quick Tasks Completed" table.
5. Atomic commit.

## Verification

- File exists at the destination path.
- Frontmatter parses (yaml) and includes the YouTube URL.
- Body contains the key phrase from the video: "A skill is a markdown file that teaches Claude how to do something once".
- STATE.md row added with today's date.
