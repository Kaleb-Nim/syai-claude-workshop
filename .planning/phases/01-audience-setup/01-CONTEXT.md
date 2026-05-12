# Phase 1: Audience + Setup - Context

**Gathered:** 2026-05-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Chapter 1 of the v1.1 workshop deck. Opens the workshop, establishes the target participant, names the four upcoming chapters, gives a project-local Claude file-layout primer, and delivers two immediate hands-on Claude wins so participants leave Chapter 1 with Claude already working better for them than when they walked in. The chapter ends synced — every participant has the `~/.claude/CLAUDE.md` rule saved before Chapter 2 (Hooks) starts.

Phase 1 ends when:
- `pages/01-audience-setup.md` is a `src:`-style chapter orchestrator including 6 section files under `pages/01-audience-setup/` (`01-cover.md` … `06-win-claude-md.md`).
- `slides.md` `src:`-includes `pages/01-audience-setup.md`.
- `bunx slidev build` exits 0 and the chapter renders clean in presenter mode (QUAL-01 closing plan).

**In scope:** AUD-01, AUD-02, SET-01 (the two wins), SET-02 (sync-check folded into Section 06's closing `✓ Check`), QUAL-01 closing build plan, QUAL-02 atomic section commits, QUAL-04 tone discipline.

**Out of scope this phase:**
- Global vs project precedence/merge teaching for `~/.claude/` and `./.claude/` — Section 04 is project-local only. Global `~/.claude/CLAUDE.md` appears in Section 06's win but is not formally taught; full global-vs-project diff is deferred to later chapters where it matters (Hooks chapter most likely).
- Slash commands and plugins — dropped from v1.1 workshop scope; NOT named on the what's-covered slide.
- MCP, Plan Mode deep-dive, copy-to-clipboard, persistent sidebar — all deferred.

</domain>

<decisions>
## Implementation Decisions

### Section Breakdown (D-01 .. D-04)
- **D-01:** Chapter 1 splits into 6 sections + 1 closing build plan = 7 plans for `/gsd-plan-phase 1`:
  - `pages/01-audience-setup/01-cover.md` — chapter cover slide (one-line provocation).
  - `pages/01-audience-setup/02-who-this-is-for.md` — assumed-skills checklist (AUD-01).
  - `pages/01-audience-setup/03-whats-covered.md` — 4-chapter enumeration (AUD-02).
  - `pages/01-audience-setup/04-claude-files-primer.md` — project-local file layout primer.
  - `pages/01-audience-setup/05-win-statusline.md` — Win 1 (SET-01).
  - `pages/01-audience-setup/06-win-claude-md.md` — Win 2 (SET-01) + closing sync-check (SET-02).
  - **Plan 07:** `bunx slidev build` + presenter spot-check (QUAL-01).
- **D-02:** `pages/01-audience-setup.md` is the chapter-level orchestrator file (referenced from `slides.md` via `src:`). It contains the chapter title slide and `src:` includes for each section file under `pages/01-audience-setup/`. Mirrors the v1.0 `slides.md` pattern one level down. Researcher should verify Slidev supports nested `src:` includes before planning; if not, alternative is concatenation in `pages/01-audience-setup.md` or each section included directly from `slides.md`.
- **D-03:** Each section file is its own `gsd-plan-phase 1` plan. Atomic section-scoped commits per QUAL-02 (one commit per section file).
- **D-04:** Review checkpoint between each section plan — instructor reviews the rendered section in presenter mode before the next section plan starts.

### The Two Wins (D-05 .. D-08)
- **D-05 (Win 1 — `/statusline`):** Section 05 demos running `/statusline` inside Claude Code and picking a preset from the interactive picker. No custom shell script, no settings.json reveal. `✓ Check`: "bottom of your terminal now shows `~/repo · 142k/200k`" (or similar preset-dependent output). Pure copy-paste-compare check on a terminal-style block; no screenshots per QUAL-04.
- **D-06 (Win 2 — `CLAUDE.md` rule):** Section 06 has participants add the rule `When in plan mode, always ask clarifying questions before you start planning.` to `~/.claude/CLAUDE.md`. NO before/after live demo of the rule firing — that would require entering plan mode + a fresh session mid-workshop and is too long. Instead: one slide writes the rule, the next slide explains WHY (CLAUDE.md is loaded into every session's system prompt; behavioural rules stick across sessions). `✓ Check`: "file saved" — participant runs `cat ~/.claude/CLAUDE.md` and sees the line present.
- **D-07:** Win order = `/statusline` (Section 05) FIRST, `CLAUDE.md` rule (Section 06) SECOND. Reasoning: `/statusline` is faster, more visceral (immediate visual feedback), and lower-stakes — warms participants up for the more abstract CLAUDE.md win.
- **D-08:** Both wins use terminal-style fenced blocks for commands and expected output. No screenshots anywhere in Chapter 1 (QUAL-04).

### Section 02 — Who-this-is-for framing (D-09)
- **D-09:** Bulleted assumed-skills checklist. Two sub-bullet groups:
  - **We assume you can:** use git from the terminal · read a JSON config · follow a chat-LLM session · have installed Claude Code (run it at least once).
  - **We do NOT assume you've:** wired a hook · written a skill · spawned a subagent.
  - Carries forward v1.0 D-01 (audience profile) and v1.0 D-03 (TS/JS familiarity assumed) but renders the bar explicitly. The "we do NOT assume" half is doing the real work — it tells the audience the workshop's actual delta.

### Section 03 — What's-covered framing (D-10 .. D-11)
- **D-10:** Single tight slide enumerating the 4 upcoming chapters in order: `1. Hooks  2. Skills  3. Subagents  4. Agent SDK` with "(in that order)" as a closing line.
- **D-11:** Do NOT name slash commands, plugins, or MCP as explicit exclusions. Clean enumeration only. The reasoning: if a participant asks "what about slash commands?" the presenter answers live; we don't want a "what's excluded" list eating slide real estate on the chapter's opening. Trade-off accepted: some participants may wait for a chapter that never comes — presenter can address out-of-band.

### Section 04 — Project-local file primer (D-12)
- **D-12:** Single slide showing the FULL `./.claude/` project-local tree, with annotations on which chapter fills in which file. Show ALL items even though only 3 are taught today:
  ```
  ./CLAUDE.md
  ./.claude/
    settings.json          → Hooks
    settings.local.json    (gitignored)
    skills/                → Skills
    agents/                → Subagents
    commands/              (not today)
    projects/              (auto-generated)
  ```
  Closing line: "We'll teach the bold 3." (`settings.json`, `skills/`, `agents/` rendered bold.) Global `~/.claude/` is NOT introduced on this slide; it appears for the first time in Section 06's win without formal framing.

### Sync-check / SET-02 (D-13)
- **D-13:** SET-02 (end-of-chapter sync-check) folds into Section 06's closing `✓ Check`. After the participant has saved the CLAUDE.md rule, the slide's check is also the chapter's sync-check: "everyone has `~/.claude/CLAUDE.md` containing the rule? Show of hands / paste output." No separate Section 07 sync-check slide.

### Slide-level shape carried forward from v1.0 (D-14 .. D-17)
- **D-14:** Each section uses Slidev's per-slide `---` separator with minimal per-slide frontmatter. No `layout: section` slides at section boundaries within Chapter 1 — section-grade rest spots only between chapters, not within. (Defer to researcher if Slidev convention argues otherwise.)
- **D-15:** Code blocks ≤25 lines per slide. Terminal-style blocks rendered via plain fenced ` ```bash ` / ` ```sh ` blocks — no custom `<Cmd>` Vue component (deferred to v1.2 per AUTH-01).
- **D-16:** `<v-clicks>` used sparingly — only on Section 04's file tree if the annotated reveal genuinely helps pacing, and on neither of the wins (they're already short).
- **D-17:** Tone discipline (QUAL-04): confident, terse, no hype, no exclamation marks in body, no screenshots. Reuse v1.0 D-23 wording standards.

### Claude's Discretion
- Exact cover-slide one-liner (Section 01) — a tight provocation; presenter-flavored.
- Number of slides per section (1–3 typical; Section 04 may need 2 for tree + annotations).
- Whether Section 04 uses `<v-clicks>` to reveal the file tree row-by-row vs all-at-once.
- Whether the `✓ Check` callouts use a Vue component or a styled fenced block — defer to the v1.0 pattern (researcher verifies).
- Exact preset name shown in the Section 05 statusline `✓ Check` block — depends on the current `/statusline` preset list at research time.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project anchors (this repo)
- `CLAUDE.md` — project value, Slidev stack, "What NOT to Use," tone constraints.
- `.planning/PROJECT.md` — v1.1 framing, locked-from-v1.0 stack/theme constraints.
- `.planning/REQUIREMENTS.md` — Phase 1 requirements: AUD-01, AUD-02, SET-01, SET-02, QUAL-01, QUAL-02, QUAL-04.
- `.planning/ROADMAP.md` — Phase 1 goal + dependencies + per-phase research policy.
- `slides.md` — existing chapter orchestrator (preserve headmatter; add `src:` include for `pages/01-audience-setup.md`).

### v1.0 phase artifacts (carried forward)
- `.planning/milestones/v1.0-phases/04-workshop-content-draft/04-CONTEXT.md` — D-01 (audience profile), D-08 (chapter inner shape), D-11 (`✓ Check` sync mechanism), D-13 (chapter file under `pages/`, `slides.md` is orchestrator), D-22 (no screenshots), D-23 (tone). v1.1 retires D-04 .. D-07 (workshop duration + topic-set + ordering) — re-derived by the v1.1 roadmap.
- `.planning/milestones/v1.0-phases/02-theme-visual-identity/02-CONTEXT.md` — locked D-01 warm near-black palette + rust accent, `.slidev-layout` CSS scoping. Section content must NOT introduce new colors or break scoping.
- `.planning/milestones/v1.0-phases/01-scaffold-deploy/01-01-SUMMARY.md` — current `slides.md` state and Vercel deploy wiring.

### External specs (Slidev — verify with Context7 at research time)
- [Slidev — Multiple slides via `src:`](https://sli.dev/guide/syntax#importing-slides) — the `src:` include pattern; researcher verifies nested `src:` (chapter orchestrator → section files) works.
- [Slidev — Slide layouts](https://sli.dev/builtin/layouts) — `default`, `section`, `two-cols` for Section 04's tree-plus-annotation layout if used.
- [Slidev — Click animations](https://sli.dev/guide/animations#click-animations) — `<v-clicks>` for the optional Section 04 row-by-row tree reveal.
- [Slidev — `bunx slidev build`](https://sli.dev/builtin/cli) — QUAL-01 build plan exit-0 verification.
- [Slidev — `bunx slidev export`](https://sli.dev/guide/exporting) — milestone-end PDF gate (Phase 5, not this phase).

### Claude Code references (for content accuracy)
- Claude Code official docs — `/statusline` slash command behaviour and preset list (Section 05). Researcher MUST verify the current preset names against live docs at plan-research time; preset list changes between releases.
- Claude Code official docs — `CLAUDE.md` precedence and loading semantics (Section 06's "why it works" slide). The claim "loaded into every session's system prompt" must be verified against current docs.
- Claude Code official docs — `./.claude/` directory layout (Section 04 file primer). Verify `commands/`, `projects/`, `settings.local.json` are still the canonical names at research time.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `slides.md` — has v1.0 head matter (theme, fonts, Shiki, colorSchema). Phase 1 appends a `src:`-include line for `pages/01-audience-setup.md`. Does NOT modify head matter.
- `style.css`, `uno.config.ts` — v1.0 theme tokens. Phase 1 sections use these; do NOT add new colors. All custom CSS scoped under `.slidev-layout`.
- `components/global-top.vue` — 3px rust progress bar already wired. Phase 1 doesn't touch it; it Just Works as the chapter progresses.

### Established Patterns
- **Chapter-file pattern (locked from v1.0):** chapter content lives under `pages/`, included via `src:` from `slides.md`. v1.1 extends one level: `slides.md` → `pages/01-audience-setup.md` → `pages/01-audience-setup/0N-*.md`.
- **Atomic section commits (QUAL-02):** one git commit per section file, scoped commit message (`feat(phase-1): section 02 who-this-is-for`).
- **Tone discipline (QUAL-04):** confident + terse + no hype + no exclamation marks in body + no screenshots. v1.0 D-23 standard.

### Integration Points
- `slides.md` — Phase 1 adds a single `---\nsrc: ./pages/01-audience-setup.md\n---` block. Existing 3-line cover stub stays untouched (it's the v1.1 cover; Section 01 is the *chapter* cover, distinct).
- `pages/01-audience-setup.md` — NEW file; chapter orchestrator with `src:` includes for each section.
- `pages/01-audience-setup/` — NEW directory; 6 section files.

</code_context>

<specifics>
## Specific Ideas

- **Win 1 preview shape (user-approved):** terminal block showing `$ claude` → `> /statusline` → preset picker → check line "bottom of your terminal now shows `~/repo · 142k/200k`". Researcher confirms the exact preset name to use ("context + cwd" or current equivalent).
- **Win 2 rule text (user-supplied, exact wording):** `When in plan mode, always ask clarifying questions before you start planning.` This is the user's actual personal rule; preserve verbatim in the slide.
- **Section 04 tree layout (user-approved):** full project-local layout including non-taught dirs (`commands/`, `projects/`, `settings.local.json`), with "We'll teach the bold 3" closing line bolding `settings.json`, `skills/`, `agents/`.
- **Section 02 checklist (user-approved):** assumed-skills bullet list with both "We assume you can:" and "We do NOT assume you've:" groups. The "do NOT" group is the more important half.
- **Section 03 enumeration (user-approved):** clean 4-chapter list with "(in that order)" as the closing line. NO exclusions list on this slide.

</specifics>

<deferred>
## Deferred Ideas

- **Global vs project precedence/merge teaching** — proper coverage of `~/.claude/` vs `./.claude/` precedence (settings.json overrides; CLAUDE.md composes) is deferred to a later chapter where it bites. Likely surfaces in the Hooks chapter (where `settings.json` scope matters) or as a v1.2 polish slide. Section 04 stays project-local-only.
- **Slash commands chapter** — dropped from v1.1 workshop scope per REQUIREMENTS.md "Out of Scope". Not mentioned on the what's-covered slide.
- **Plugins chapter** — same.
- **Before/after live demo of the plan-mode rule firing** — considered for Section 06 but rejected (would require fresh session mid-workshop, breaks pacing). The "why it works" slide carries the load instead.
- **`<Cmd>` Vue component for styled terminal blocks** — carried over from v1.0 AUTH-01 deferral. v1.1 uses plain fenced bash blocks.
- **Two-column "you are / you're not yet" framing for Section 02** — considered, lost to the checklist option. Could revive in a v1.2 polish pass if the checklist tests poorly with live audiences.

</deferred>

---

*Phase: 1-Audience + Setup*
*Context gathered: 2026-05-12*
