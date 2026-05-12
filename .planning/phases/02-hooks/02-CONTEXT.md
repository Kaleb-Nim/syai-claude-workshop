# Phase 2: Hooks - Context

**Gathered:** 2026-05-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Chapter 2 of the v1.1 workshop deck. Teaches **what hooks are**, **how they work mechanically** (lifecycle events + `~/.claude/settings.json` wiring), and walks participants through **one small live hands-on task**: wiring `Stop` + `Notification` hooks to `afplay` (macOS) / `aplay` (Linux/WSL) so they hear a chime when Claude finishes a turn or asks for input.

Phase 2 ends when:
- `pages/02-hooks.md` is a `src:`-style chapter orchestrator including 5 section files under `pages/02-hooks/` (`01-cover.md` … `05-hands-on-fire.md`).
- `slides.md` `src:`-includes `pages/02-hooks.md`.
- `bunx slidev build` exits 0 and the chapter renders clean in presenter mode (QUAL-01 closing plan).

**In scope:** HOOK-01, HOOK-02, HOOK-03, QUAL-01 closing build plan, QUAL-02 atomic section commits, QUAL-04 tone discipline.

**Out of scope this phase:**
- PreToolUse / PostToolUse / UserPromptSubmit / SessionStart / SessionEnd / SubagentStop / PreCompact — listed by name only on Section 03's events slide, not taught. (Stop + Notification get full mechanical treatment.)
- Hook input JSON / `$CLAUDE_PROJECT_DIR` / advanced matchers / hook output protocol (decision JSON, exit codes 0/2/other) — deferred. Today's hook is fire-and-forget shell.
- Project-level `.claude/settings.json` (vs `~/.claude/settings.json`) — Section 03 + hands-on use the global `~/.claude/settings.json` only. Project-level wiring deferred.
- Hook security/safety (the "hooks execute arbitrary commands" caveat) — instructor calls out live if useful; not on a slide in v1.1.
- Plan Mode / slash commands / plugins / MCP — out of v1.1 scope entirely.

</domain>

<decisions>
## Implementation Decisions

### Section Breakdown (D-01)
- **D-01:** Chapter 2 splits into 5 content sections + 1 closing build plan = **6 plans** for `/gsd-plan-phase 2`:
  - `pages/02-hooks/01-cover.md` — chapter cover slide (one-line provocation).
  - `pages/02-hooks/02-why-hooks.md` — IFTTT framing + 3 locked determinism quotes (HOOK-01).
  - `pages/02-hooks/03-how-hooks-work.md` — Stop + Notification events + minimal `settings.json` JSON shape (HOOK-02).
  - `pages/02-hooks/04-hands-on-build.md` — participants paste Stop+Notification JSON into `~/.claude/settings.json` (HOOK-03 wire).
  - `pages/02-hooks/05-hands-on-fire.md` — participants trigger Claude, hear chimes, ✓ check (HOOK-03 fire).
  - **Plan 06:** `bunx slidev build` + presenter spot-check (QUAL-01).
- Mirrors Phase 1's chapter-orchestrator pattern (D-02/D-03 from Phase 1).
- Atomic per-section commits per QUAL-02.

### Section 02 — Why hooks (D-02, D-03, D-04)
- **D-02 (Section 02 shape):** 5 slides total. IFTTT framing first (slides 1-2), then the 3 locked determinism quotes verbatim (slides 3-5).
  - Slide 1 — IF this, THEN that. Three IF→THEN examples: "IF Claude finishes → THEN play a sound", "IF Claude uses a tool → THEN log it", "IF you submit a prompt → THEN check it first".
  - Slide 2 — "The 'THEN' is just a shell command. Anything you can run in your terminal can be the 'THEN.' Today we make the 'THEN' a sound."
  - Slide 3 — What makes hooks different (Quote 1, locked verbatim).
  - Slide 4 — Why use hooks (Quote 2, locked verbatim). Add chapter-to-chapter bridge callback to Phase 1 Win 2: "the rule you wrote into `~/.claude/CLAUDE.md` in Chapter 1 — that's the imperfect version of a hook."
  - Slide 5 — In essence (Quote 3, locked verbatim).
- **D-03 (LOCKED QUOTES — verbatim, no edits):** These three quotes are user-locked content. Plans MUST place them verbatim with no rewording:
  - Quote 1 (Slide 3): *"The key diff between Hooks and everything else is that Hooks are deterministic, they always run"*
  - Quote 2 (Slide 4): *"We can tell claude in your claude.md file to ping us every time it needs an input from us. But it's not perfect. A hook makes it run every single time without exceptions"*
  - Quote 3 (Slide 5): *"If something needs to happen every single time, don't put it in a prompt, put it in a hook"*
- **D-04 (Phase 1 callback on Slide 4):** Slide 4 includes an explicit callback line referencing the `~/.claude/CLAUDE.md` rule wired in Phase 1 Section 06 (Win 2). Wording is at planner discretion but the bridge MUST be present. Reason: continuity with Chapter 1's last act; Quote 2 references `claude.md` directly so the callback is natural.

### Section 03 — How hooks work (D-05, D-06)
- **D-05 (events emphasised):** Section 03 teaches **Stop + Notification** only (one line each). All other lifecycle events listed by name in a single line — *"more exist: PreToolUse, PostToolUse, UserPromptSubmit, SessionStart — same shape"* — but not explained. Reason: lowest cognitive load; the hands-on uses exactly these two. (Researcher MUST verify event names against current Claude Code docs at research time — list may have evolved.)
- **D-06 (JSON shape + cross-OS):** Single slide. Minimal Stop-only JSON in a fenced ```json``` block, followed by plain-text cross-OS notes rendered OUTSIDE the JSON block (so copy-paste produces valid JSON). Exact block:
  ```json
  {
    "hooks": {
      "Stop": [
        {
          "hooks": [
            {
              "type": "command",
              "command": "afplay /System/Library/Sounds/Glass.aiff"
            }
          ]
        }
      ]
    }
  }
  ```
  Plain-text notes BELOW the JSON block on the same slide:
  - `Linux / WSL → swap afplay for aplay <a .wav path>`
  - `Native Windows → run Claude Code inside WSL (bash/jq/paths break otherwise)`

  IMPORTANT: JSON comments are NOT permitted inside the fenced JSON block — `settings.json` rejects them. Cross-OS notes are slide prose, not code-block content.

### Section 04 — Hands-on build (D-07, D-08)
- **D-07 (paste shape):** Participants paste the **full Stop + Notification JSON together** into `~/.claude/settings.json`. The hands-on JSON extends Section 03's shape by repeating the same structure for a second event:
  - `Stop` → `afplay /System/Library/Sounds/Glass.aiff` (macOS canonical)
  - `Notification` → `afplay /System/Library/Sounds/Ping.aiff` (macOS canonical)
- **D-08 (reconcile note):** Section 04's paste-slide includes one explanatory line before the JSON block: *"Notification has the same shape — we just repeat it."* This reconciles the visual gap between Section 03 (Stop only) and Section 04 (both events). Linux/WSL and Windows-WSL participants substitute `aplay <.wav>` / run in WSL per the Section 03 notes — restated as a brief footnote on the same slide.

### Section 05 — Hands-on fire (D-09)
- **D-09 (trigger + ✓ check):** Two micro-steps inline on one slide:
  - Step 1 — Trigger Stop: run `claude`, ask a quick thing (any short request), wait for it to stop. **✓ Check:** "you hear a chime when Claude finishes."
  - Step 2 — Trigger Notification: ask Claude to do something requiring permission (e.g. run a command outside the auto-allow list). **✓ Check:** "you hear a different chime when Claude needs your input."
  - Closing line: "Two events, same shape. Add more later — that's the whole pattern." (closes the chapter on the repeatability of the shape rather than a new concept.)
- ✓ Check style follows the Phase 1 D-08 pattern (terminal-style or callout-style fenced block — exact rendering at planner/researcher discretion, but consistent with Phase 1's wins).

### Slide-level shape carried forward from v1.0 + Phase 1 (D-10..D-13)
- **D-10:** Section files use Slidev's per-slide `---` separator with minimal per-slide frontmatter. No `layout: section` slides at section boundaries within the chapter. (Carries Phase 1 D-14.)
- **D-11:** Code blocks ≤25 lines per slide. JSON in fenced ```json``` blocks; shell snippets in ```bash``` blocks. No custom `<Cmd>` Vue component. (Carries Phase 1 D-15.)
- **D-12:** `<v-clicks>` used sparingly — only on Section 02 quote-reveal if pacing genuinely benefits, and on neither of the hands-on sections (they're already short). (Carries Phase 1 D-16.)
- **D-13:** Tone discipline (QUAL-04): confident, terse, no hype, no exclamation marks in body, no screenshots. Carries Phase 1 D-17 + v1.0 D-23.

### Claude's Discretion
- Exact cover-slide one-liner (Section 01) — tight provocation; presenter-flavored.
- Exact wording of the Phase 1 callback line on Slide 4 (D-04) — must reference `~/.claude/CLAUDE.md` and frame it as the imperfect-version-of-a-hook.
- Exact `.wav` path used in the Linux/WSL note (D-06) — researcher picks a path that ships on common WSL distros (e.g., `/usr/share/sounds/freedesktop/stereo/bell.oga` if reliable, or a more universally-present file).
- Whether the Notification trigger example in Section 05 uses a permission prompt or an idle-prompt scenario — both fire `Notification`. Researcher picks the one Claude Code currently emits most reliably.
- Whether Section 02 slides 1-2 (IFTTT) use any `<v-clicks>` to reveal the three IF→THEN examples row-by-row vs all-at-once.
- Whether the ✓ Check callouts use the same Vue component (if any) or a styled fenced block as Phase 1 — defer to Phase 1's actual rendering pattern.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project anchors (this repo)
- `CLAUDE.md` — project value, Slidev stack, "What NOT to Use," tone constraints.
- `.planning/PROJECT.md` — v1.1 framing, locked-from-v1.0 stack/theme constraints.
- `.planning/REQUIREMENTS.md` — Phase 2 requirements: HOOK-01, HOOK-02, HOOK-03, QUAL-01, QUAL-02, QUAL-04.
- `.planning/ROADMAP.md` — Phase 2 goal + dependencies + per-phase research policy.
- `slides.md` — existing chapter orchestrator (preserve headmatter; add `src:` include for `pages/02-hooks.md`).

### Phase 1 artifacts (direct dependency)
- `.planning/phases/01-audience-setup/01-CONTEXT.md` — chapter-orchestrator pattern, ✓ check shape, tone discipline, slide-level conventions D-14..D-17 (carried forward as Phase 2 D-10..D-13).
- `.planning/phases/01-audience-setup/01-07-PLAN.md` (or whichever plan implements Win 2) — exact `~/.claude/CLAUDE.md` rule wording for the Slide-4 callback (D-04). Planner reads this to phrase the bridge accurately.
- `.planning/phases/01-audience-setup/01-08-PLAN.md` — the Phase 1 closing `bunx slidev build` plan; Phase 2's plan 06 mirrors its shape.
- `pages/01-audience-setup.md` and `pages/01-audience-setup/*.md` — read at planning time to mirror Slidev frontmatter conventions, layout choices, and ✓ check rendering. Phase 2 must visually match.

### v1.0 phase artifacts (locked constraints)
- `.planning/milestones/v1.0-phases/02-theme-visual-identity/02-CONTEXT.md` — warm near-black palette + rust accent + `.slidev-layout` CSS scoping. Section content must NOT introduce new colors or break scoping.
- `.planning/milestones/v1.0-phases/04-workshop-content-draft/04-CONTEXT.md` — D-08 (chapter inner shape), D-11 (`✓ Check` sync mechanism), D-22 (no screenshots), D-23 (tone).

### External specs (Slidev — verify with Context7 at research time)
- [Slidev — Importing slides via `src:`](https://sli.dev/guide/syntax#importing-slides) — chapter orchestrator pattern.
- [Slidev — Slide layouts](https://sli.dev/builtin/layouts) — `default`, `section`, `two-cols` (if Section 03 needs side-by-side framing — Phase 2 currently does not).
- [Slidev — Click animations](https://sli.dev/guide/animations#click-animations) — `<v-clicks>` for the optional Section 02 quote reveal.
- [Slidev — `bunx slidev build`](https://sli.dev/builtin/cli) — QUAL-01 build plan exit-0 verification.

### Claude Code references (for content accuracy — verify with Context7 at research time)
- Claude Code official docs — Hooks reference. Specifically the **current canonical list of lifecycle events**, the **exact `settings.json` schema** for the `hooks` block (including the nested `hooks` array structure shown in D-06), and the **`type: "command"` shape**. Researcher MUST verify the JSON shape against live docs — the nested `hooks[].hooks[].type/command` structure has evolved across Claude Code versions and any error here breaks the hands-on for every participant.
- Claude Code official docs — `Stop` event semantics: when it fires, whether it fires on every assistant turn or only on `Stop`-tool stops (the hands-on relies on the chime firing reliably at end-of-turn).
- Claude Code official docs — `Notification` event semantics: what triggers it (permission prompt? idle? both?). Researcher picks the most reliable trigger for Section 05's "ask Claude something needing permission" step.
- Claude Code official docs — Windows / WSL support statement. The Section 03 footnote ("Native Windows → run Claude Code inside WSL") must match the current official guidance — if Native Windows is supported and bash/jq pain is no longer accurate, the footnote needs softening.
- macOS `afplay` man page — confirm `/System/Library/Sounds/Glass.aiff` and `Ping.aiff` exist on all supported macOS versions in the audience (they have shipped since macOS 10.x).
- Linux `aplay` — confirm a `.wav` path that reliably ships on common WSL Ubuntu distros.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `slides.md` — has v1.0 head matter (theme, fonts, Shiki, colorSchema) and a `src:` include for `pages/01-audience-setup.md`. Phase 2 appends one more `src:` line for `pages/02-hooks.md`. Does NOT modify head matter.
- `pages/01-audience-setup.md` — chapter orchestrator template Phase 2 mirrors at `pages/02-hooks.md`.
- `pages/01-audience-setup/0N-*.md` — section file templates Phase 2 mirrors at `pages/02-hooks/0N-*.md` (same frontmatter conventions, slide-separator style, ✓ Check rendering).
- `style.css`, `uno.config.ts` — v1.0 theme tokens. Phase 2 sections use these only; do NOT add new colors. All custom CSS scoped under `.slidev-layout`.
- `components/global-top.vue` — 3px rust progress bar already wired. Phase 2 doesn't touch it; it Just Works.

### Established Patterns
- **Chapter-file pattern (locked):** `slides.md` → `pages/02-hooks.md` → `pages/02-hooks/0N-*.md`. Identical to Phase 1.
- **Atomic section commits (QUAL-02):** one git commit per section file, scoped commit message (`feat(phase-2): section 02 why-hooks`, etc.).
- **Tone discipline (QUAL-04):** confident + terse + no hype + no exclamation marks in body + no screenshots. v1.0 D-23 / Phase 1 D-17 standard.
- **✓ Check pattern:** Phase 1 Sections 05/06 use a copy-paste-compare check on a terminal-style block. Phase 2 Section 05 mirrors this shape (audio-cue check rather than visual but same callout style).

### Integration Points
- `slides.md` — Phase 2 adds a single `---\nsrc: ./pages/02-hooks.md\n---` block AFTER the existing Phase 1 include. Cover slide stays untouched.
- `pages/02-hooks.md` — NEW file; chapter orchestrator with `src:` includes for each section file.
- `pages/02-hooks/` — NEW directory; 5 section files (`01-cover.md` through `05-hands-on-fire.md`).
- `~/.claude/settings.json` — NOT a repo file. Participants edit this on their own machines during the hands-on; no repo change.

</code_context>

<specifics>
## Specific Ideas

- **HOOK-01 framing (user-approved):** IFTTT framing + 3 locked determinism quotes. ELI5 tone — no jargon up front. The IF→THEN frame is the bridge for non-technical participants; the determinism quotes are the load-bearing teaching.
- **LOCKED QUOTES (user-supplied, exact wording, verbatim):**
  - *"The key diff between Hooks and everything else is that Hooks are deterministic, they always run"*
  - *"We can tell claude in your claude.md file to ping us every time it needs an input from us. But it's not perfect. A hook makes it run every single time without exceptions"*
  - *"If something needs to happen every single time, don't put it in a prompt, put it in a hook"*
- **HOOK-02 mechanical depth (user-approved):** Stop + Notification only on the events slide. Other events listed by name in a single trailing line. Tightest cognitive load; the hands-on uses exactly these two.
- **HOOK-02 JSON shape (user-approved):** Stop-only minimal JSON on the Section 03 slide; cross-OS notes rendered OUTSIDE the code block (JSON does not permit comments — copy-paste must produce valid `settings.json`).
- **HOOK-03 hands-on (user-approved):** Stop + Notification together from the start in Section 04; trigger each separately in Section 05 for two payoffs. macOS `afplay` canonical, Linux/WSL `aplay` swap, native Windows directed to WSL.
- **Phase 1 bridge:** Slide 4 of Section 02 (the Quote 2 slide) must include a callback line referencing the `~/.claude/CLAUDE.md` rule from Phase 1 Win 2 — framing it as the imperfect-version-of-a-hook. Quote 2 references `claude.md` directly; the bridge writes itself.

</specifics>

<deferred>
## Deferred Ideas

- **Project-local hooks** (`.claude/settings.json` vs `~/.claude/settings.json`) — covered by mention only ("for now, use the global one") if at all. Project-level wiring is a v1.2 candidate or instructor-live aside.
- **Hook security caveat** — "hooks execute arbitrary commands; review before pasting from the internet." Instructor may say live; not a slide in v1.1.
- **PreToolUse / PostToolUse / UserPromptSubmit deep dives** — listed by name in Section 03, not taught. Candidates for v1.2 advanced hooks chapter if the workshop returns.
- **Hook input JSON / `$CLAUDE_PROJECT_DIR` / decision JSON output / exit-code 0/2 semantics** — full hook protocol. Deferred; today's hook is fire-and-forget.
- **Custom matchers** — the `"matcher"` field on hook entries. The `Stop` event doesn't need matchers; `Notification` could benefit. Deferred for v1.2.
- **Pre/post relationship with skills + subagents** — how hooks interact with skill-loading and subagent lifecycles. Better placed after Chapter 3 (Skills) and Chapter 4 (Subagents) have established those primitives.

</deferred>

---

*Phase: 02-hooks*
*Context gathered: 2026-05-12 via /gsd-discuss-phase*
