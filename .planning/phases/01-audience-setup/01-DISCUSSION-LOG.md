# Phase 1: Audience + Setup - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-12
**Phase:** 1-audience-setup
**Areas discussed:** The two wins (exact shape), Section breakdown for the chapter, Audience + what's-covered framing, Claude files primer (project-local)

---

## The Two Wins — Exact Shape

### Win 1: `/statusline`

| Option | Description | Selected |
|--------|-------------|----------|
| Run /statusline, pick a preset | Interactive picker, pick preset, check = terminal status visible | ✓ |
| Run /statusline + show resulting settings.json | Same plus reveal `statusLine` JSON block to teach "slash commands write config" mental model | |
| Write a custom statusline shell script | Skip the preset; write a 3-line script wired via settings.json | |

**User's choice:** Run /statusline, pick a preset.
**Notes:** Lowest-friction win; immediate visual feedback at the bottom of the terminal. Defers the "slash commands are just config writers" mental model to later chapters.

### Win 2: `CLAUDE.md`

Original options proposed: 'add bun-not-npm rule', 'add project-fact line', 'show both kinds in one slide'. User rejected the framing and provided the actual rule they wanted: `When in plan mode, always ask clarifying questions before you start planning.`

Re-asked with three demo-shape options:

| Option | Description | Selected |
|--------|-------------|----------|
| Before/after with plan mode | Live demo: vague task in plan mode without the rule (Claude plans), add rule, restart, same vague task (Claude asks first) | |
| Just write the rule + explain why | One slide writes the rule; next slide explains CLAUDE.md is loaded into every session's system prompt | ✓ |
| Global vs project side-by-side | Teach `~/.claude/CLAUDE.md` vs `./CLAUDE.md` precedence with the plan-mode rule as the global example | |

**User's choice:** Just write the rule + explain why it works.
**Notes:** Rule text is exact verbatim from user. Before/after demo rejected — would require entering plan mode + fresh session mid-workshop. The "why it works" framing carries the conceptual load instead. Global-vs-project precedence intentionally deferred to later chapters.

---

## Section Breakdown for the Chapter

| Option | Description | Selected |
|--------|-------------|----------|
| 6 sections (recommended) | cover · who · what's-covered · files-primer · win-statusline · win-claude-md + closing build plan | ✓ |
| 5 sections (lean) | Fold cover into who-for, or files-primer into what's-covered | |
| 7 sections (split sync-check) | Add dedicated 07-sync-check before the build plan | |

**User's choice:** 6 sections.
**Notes:** SET-02 (sync-check) folds into Section 06's closing `✓ Check` rather than getting its own section file. Each section is its own `gsd-plan-phase 1` plan; QUAL-01 build is plan 07.

---

## Audience + What's-Covered Framing

### Section 02: Who this is for

| Option | Description | Selected |
|--------|-------------|----------|
| Tight prose paragraph | 2-3 line magazine-intro paragraph | |
| Assumed-skills checklist | Bulleted "we assume / we do NOT assume" groups | ✓ |
| Two-column you-are / you're-not-yet | Side-by-side baseline vs gap framing | |

**User's choice:** Assumed-skills checklist.
**Notes:** The "we do NOT assume" half is doing the real work — it names the workshop's actual delta (hooks, skills, subagents).

### Section 03: What's covered

| Option | Description | Selected |
|--------|-------------|----------|
| Name the 4 chapters only | Clean enumeration, no exclusions list | ✓ |
| 4 chapters + explicit exclusions | Also names slash commands, plugins, MCP as out-of-scope | |
| 4 chapters + "why this set" | One-liner rationale for the chapter slice | |

**User's choice:** Name the 4 chapters only.
**Notes:** Trade-off accepted: some participants may wait for a slash-commands chapter that never comes. Presenter handles out-of-band rather than eating slide real estate on exclusions.

---

## Claude Files Primer (Project-Local)

First-pass question proposed three depth levels for showing BOTH `~/.claude/` and `./.claude/`. User clarified: project-local only for now; global vs project diff is taught in later chapters where it bites.

Re-asked with three project-local-only options:

| Option | Description | Selected |
|--------|-------------|----------|
| Only what later chapters touch | Tight tree: settings.json, skills/, agents/, CLAUDE.md | |
| Tight tree + one annotated file | Same tree plus a real settings.json skeleton | |
| Full project layout (including non-taught dirs) | All of `./.claude/` including commands/, settings.local.json, projects/ with "We'll teach the bold 3" closing | ✓ |

**User's choice:** Full project layout including non-taught dirs.
**Notes:** Map-first approach — participants see the whole project surface even though only 3 entries get full chapters. The bolded-3 closing handles expectation-setting without a separate exclusions list.

---

## Claude's Discretion

- Exact cover-slide one-liner (Section 01).
- Number of slides per section (1–3 typical).
- Whether Section 04 uses `<v-clicks>` for tree row-by-row reveal vs all-at-once.
- Whether `✓ Check` callouts use a Vue component or styled fenced block (defer to v1.0 pattern; researcher verifies).
- Exact `/statusline` preset name shown in Section 05 — depends on current preset list at research time.

## Deferred Ideas

- Global vs project precedence/merge teaching — deferred to a later chapter (likely Hooks).
- Before/after live demo of the plan-mode rule firing — rejected on pacing grounds.
- `<Cmd>` Vue component for terminal blocks — v1.0 AUTH-01 carry-over.
- Two-column you-are / you're-not-yet framing for Section 02 — option not selected, revivable in v1.2.
- Slash commands chapter — dropped from v1.1 workshop scope (REQUIREMENTS.md Out of Scope).
- Plugins chapter — same.
