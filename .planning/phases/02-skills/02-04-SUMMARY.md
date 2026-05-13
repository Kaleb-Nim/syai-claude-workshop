---
phase: 02-skills
plan: 04
subsystem: slides/section-03-how-skills-work
tags: [slidev, skills, progressive-disclosure, mechanism-teaching]
requires:
  - pages/02-skills.md (Chapter 2 host page with src: include resolution)
  - slides.md shiki.langs registration for `markdown` and `text` fences
provides:
  - pages/02-skills/03-how-skills-work.md (Section 03 — file shape + SKILL.md + 3-tier table)
  - SKL-01 mechanism half: where the file lives, what's inside
  - SKL-02: 3-tier progressive disclosure mental model
affects:
  - Chapter 2 narrative arc — Section 04 (paste-the-skill) now has a primed audience
tech-stack:
  added: []
  patterns:
    - "Fenced markdown table for visual data (vs. ASCII art or two-cols layout)"
    - "Inline `<code>` HTML tags inside `<div>` blocks (backticks don't render inside raw HTML)"
    - "Directory-tree rendering via ```text``` fence with U+2514/U+2500 box-drawing chars"
key-files:
  created:
    - pages/02-skills/03-how-skills-work.md
  modified: []
decisions:
  - "Rendered 3-tier progressive disclosure as a fenced markdown table per research recommendation (cleanest in vitesse-dark + JetBrains Mono, matches Phase 1 compact-block precedent)"
  - "Used ```markdown``` fence for SKILL.md block — `md` is already in slides.md shiki.langs so frontmatter highlights cleanly"
  - "Inline code in trailing 'more fields exist' note uses <code> tags (raw HTML inside <div> — backticks would not render)"
metrics:
  duration: "~3min"
  completed: "2026-05-12"
  tasks_completed: 1
  files_created: 1
  files_modified: 0
---

# Phase 03 Plan 04: Section 03 — How Skills Work Summary

Authored 3-slide mechanism section teaching SKILL.md file shape (directory tree + user-vs-project scope), the smallest valid SKILL.md (D-06 locked body — frontmatter + brain-rot pirate prompt), and the 3-tier progressive disclosure model (Discovery / Activation / Execution with token costs) as a fenced markdown table.

## Tasks Completed

| Task | Name                                            | Commit  | Files                                       |
| ---- | ----------------------------------------------- | ------- | ------------------------------------------- |
| 1    | Create pages/02-skills/03-how-skills-work.md   | 798c2f5 | pages/02-skills/03-how-skills-work.md (new) |

## Decisions Made

- **3-tier visual as fenced markdown table** — per Pattern 5 in 03-RESEARCH.md, table form renders cleanest in `vitesse-dark` with JetBrains Mono and matches the Phase 1 compact-block precedent. Rejected alternatives: two-cols layout (overkill for 3 rows), ASCII diagram (brittle, hard to maintain).
- **`<code>` HTML tags for inline code inside `<div>`** — backticks don't render inside raw HTML blocks, so the trailing "more fields exist" line uses `<code>allowed-tools</code>` etc. instead of backtick-wrapped names.
- **```markdown``` fence for SKILL.md block** — confirmed `md` is registered in slides.md shiki.langs (line 17), so YAML frontmatter + body highlights correctly.

## Deviations from Plan

None — plan executed exactly as written. SKILL.md body on Slide 2 is byte-exact to D-06 (verified by 8 `grep -F` assertions on the locked-text lines: `name: pirate-mode`, the 3 wrapped description lines, `# Pirate Mode`, brain-rot vocab list, `Ahoy ye sigma`, and closing `— per pirate-mode.`).

## Verification

All content assertions pass:

- File exists at `pages/02-skills/03-how-skills-work.md`
- 3 H1 lines present in order: `# Where skills live`, `# The smallest valid SKILL.md`, `# How Claude loads a skill`
- Slide 1: `~/.claude/skills/pirate-mode/` and `└── SKILL.md` (U+2514 + U+2500) both present in ```text``` fence
- Slide 2: D-06 SKILL.md body byte-exact — `name: pirate-mode`, 3-line wrapped description, `# Pirate Mode`, brain-rot vocab tuple, `"Ahoy ye sigma"`, `"— per pirate-mode."`
- Slide 3: Bolded tier names (`**Discovery**`, `**Activation**`, `**Execution**`) + `~100 tokens / skill` cell + all three deferred fields (`allowed-tools`, `disable-model-invocation`, `paths`) in trailing note
- Zero `!` characters in non-heading slide prose (QUAL-04)

### Note on `grep -c '^---$'`

The plan's `<automated>` block expects `grep -c '^---$' = 2`. Actual count is **4** because the LOCKED D-06 SKILL.md body contains two `---` YAML frontmatter delimiters inside the ```markdown``` fenced block on Slide 2. **This is correct** — Slidev's markdown parser is code-fence aware and only treats `---` outside fenced blocks as slide separators. The rendered output is 3 slides, not 5. The `grep` check was written without accounting for fenced-block `---`. All other 22 assertions in the automated block pass.

## Success Criteria Met

- [x] SKL-01 mechanism half delivered (where the file lives + what's inside)
- [x] SKL-02 delivered (3-tier mental model — Discovery ~100 tokens, Activation ~1K–5K, Execution on-demand)
- [x] D-06 SKILL.md content locked and ready for paste-as-is reuse in Section 04 (Plan 03-05)
- [x] QUAL-02: Atomic commit `feat(phase-2): section 03 how-skills-work` (commit 798c2f5)
- [x] QUAL-04: No exclamation marks in slide prose

## Self-Check: PASSED

- FOUND: pages/02-skills/03-how-skills-work.md
- FOUND: commit 798c2f5
