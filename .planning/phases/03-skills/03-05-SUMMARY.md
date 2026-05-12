---
phase: 03-skills
plan: 05
subsystem: slides/03-skills
tags: [slides, skills, hands-on, paste-block]
requires:
  - pages/03-skills/03-how-skills-work.md (D-06 SKILL.md reference content)
provides:
  - "Section 04 — hands-on build (SKL-03 wire half)"
  - "Single slide with mkdir + verbatim SKILL.md paste + softened hot-reload caveat"
affects:
  - pages/03-skills.md (will include via src: ./03-skills/04-hands-on-build.md once wired in Plan 03-07)
tech-stack:
  added: []
  patterns:
    - "Two-block paste shape (D-08): bash mkdir → markdown SKILL.md"
    - "Reconcile note pattern (mirrors Phase 2 hands-on-build dim helper)"
    - "Softened hot-reload caveat (D-09) — research-verified, no mandatory restart"
key-files:
  created:
    - pages/03-skills/04-hands-on-build.md
  modified: []
decisions:
  - "Kept single-slide form (Pattern 7 Option A) — overflow retrofit deferred to Plan 03-07"
  - "Used triple-backtick fences for both blocks (matches existing 03-how-skills-work.md pattern)"
metrics:
  duration: "<5min"
  completed: "2026-05-12"
requirements: [SKL-03, QUAL-02, QUAL-04]
---

# Phase 03 Plan 05: Section 04 Hands-On Build Summary

Single slide guiding participants to `mkdir` the skill folder and paste the byte-exact D-06 SKILL.md, with a softened hot-reload caveat replacing any mandatory restart step.

## What Shipped

- `pages/03-skills/04-hands-on-build.md` — single Slidev slide:
  - H1: `# Build the skill`
  - Step 1 prose + ```bash``` block: `mkdir -p ~/.claude/skills/pirate-mode`
  - Step 2 prose with inline-code path + ```markdown``` block containing the exact D-06 SKILL.md (frontmatter + body, byte-identical to `03-how-skills-work.md` Slide 2)
  - Closing `<div class="text-dim text-sm mt-4">` merging two concerns: reconcile note ("same SKILL.md from the last slide — paste it as-is") and softened hot-reload caveat ("Skills hot-reload — if it doesn't fire on the first try in the next slide, exit and restart `claude`")

## Verification

| Check | Result |
| --- | --- |
| File exists | PASS |
| H1 exactly `# Build the skill` | PASS |
| `mkdir -p ~/.claude/skills/pirate-mode` present verbatim | PASS |
| D-06 SKILL.md byte-exact (6 grep -F assertions: name, three description lines, H2, brain-rot list, signature) | PASS |
| Reconcile note present verbatim | PASS |
| Softened hot-reload caveat present verbatim | PASS |
| `<code>claude</code>` inline-code tag present | PASS |
| Zero `!` characters in non-heading prose (QUAL-04) | PASS |
| Atomic commit `feat(phase-3): section 04 hands-on-build` (QUAL-02) | PASS (4a3e91a) |

## Deviations from Plan

### Verify-Script False Negative (not a deviation, documented)

The plan's `<automated>` check asserts `[ "$(grep -c '^---$' …)" = "0" ]` to confirm the file is a single-slide file (zero slide separators). The actual file contains two `^---$` lines on lines 12 and 17 — **but those are inside the ```markdown``` fenced block** (the SKILL.md frontmatter delimiters), not Slidev slide separators. The semantic intent (zero slide separators outside fenced code) is satisfied. Fence positions confirmed via `grep -n '^---$\|^\`\`\`'`:

```
5:```bash
7:```
11:```markdown
12:---       ← inside markdown fence (SKILL.md frontmatter open)
17:---       ← inside markdown fence (SKILL.md frontmatter close)
24:```
```

No code change needed — the plan author's `<automated>` regex can't differentiate content from separators, but the file is correct. Acceptance criterion "Single-slide file: zero `^---$` slide separators" is satisfied in spirit.

### Other Deviations

None — plan executed as written.

## Commits

| Commit | Message |
| --- | --- |
| 4a3e91a | `feat(phase-3): section 04 hands-on-build` |

## Next

- Plan 03-06: SKL-03 fire half (auto-invocation demo slide)
- Plan 03-07: wire `pages/03-skills.md` to include sections + optional overflow retrofit

## Self-Check: PASSED

- pages/03-skills/04-hands-on-build.md: FOUND
- Commit 4a3e91a: FOUND
