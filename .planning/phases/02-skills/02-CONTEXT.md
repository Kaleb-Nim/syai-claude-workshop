# Phase 2: Skills - Context

**Gathered:** 2026-05-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Chapter 2 of the v1.1 workshop deck. Teaches **what a skill is** (`.claude/skills/<name>/SKILL.md` file shape, where it lives, how Claude discovers it), the **progressive-disclosure mental model** + **description-as-trigger** matching, and walks participants through **one small live hands-on task**: authoring a tiny `pirate-mode` skill (2026 brain-rot flavored) in `~/.claude/skills/pirate-mode/` and proving it self-invokes when triggered in plain English — no `/command` typed.

Phase 2 ends when:
- `pages/02-skills.md` is a `src:`-style chapter orchestrator including 5 section files under `pages/02-skills/` (`01-cover.md` … `05-hands-on-fire.md`).
- `slides.md` `src:`-includes `pages/02-skills.md` (appended after the Phase 3 include).
- `bunx slidev build` exits 0 and the chapter renders clean in presenter mode (QUAL-01 closing plan).

**In scope:** SKL-01, SKL-02, SKL-03, QUAL-01 closing build plan, QUAL-02 atomic section commits, QUAL-04 tone discipline.

**Out of scope this phase:**
- `disable-model-invocation`, `user-invocable`, `allowed-tools`, `paths`, `context: fork`, `agent`, `model` frontmatter fields — listed by name only on Section 03's frontmatter slide ("more fields exist — `name` + `description` is enough today"), not taught. (Section 03 mirrors Phase 3 D-05 pattern for non-taught events.)
- Skills-as-slash-commands unification / `/skill-name` invocation — deferred. Today's skill is model-invoked only; the wow moment depends on Claude choosing to load it.
- Plugin distribution (`.claude-plugin/plugin.json`, packaged skills) — deferred to a future "team distribution" topic.
- Project-level `.claude/skills/` — covered by mention only in Section 03 ("user-level today; project-level versions with the repo"). Hands-on is user-level only, mirroring Phase 3's `~/.claude/settings.json` pattern.
- `skill-creator` skill / Anthropic-provided meta-skills — not introduced; out of scope for the first contact with the primitive.
- Supporting files / scripts / reference-file references inside a SKILL.md folder — mentioned in Section 03's progressive-disclosure 3-tier diagram (Discovery → Activation → Execution) but the hands-on uses a single-file SKILL.md only.
- Cross-primitive composition (skills × hooks, skills × subagents) — deferred until after Phase 4 establishes subagents.
- The "500-line rule" / `SKILL.md` size discipline — too internal for chapter 3; instructor may mention live.
- Skill scoping by tool (`allowed-tools`) and the security framing around model-invocation — deferred.

</domain>

<decisions>
## Implementation Decisions

### Section Breakdown (D-01)
- **D-01:** Chapter 2 splits into 5 content sections + 1 closing build plan = **6 plans** for `/gsd-plan-phase 2`:
  - `pages/02-skills/01-cover.md` — chapter cover slide (one-line provocation).
  - `pages/02-skills/02-why-skills.md` — model-invoked framing + Phase 3 bridge + 3 locked verbatim quotes (SKL-01 framing half).
  - `pages/02-skills/03-how-skills-work.md` — `.claude/skills/<name>/SKILL.md` file shape + minimal frontmatter (`name` + `description`) + 3-tier progressive disclosure (SKL-01 mechanism half + SKL-02).
  - `pages/02-skills/04-hands-on-build.md` — participants `mkdir -p ~/.claude/skills/pirate-mode/` and paste a minimal SKILL.md (SKL-03 wire).
  - `pages/02-skills/05-hands-on-fire.md` — participants prompt Claude in plain English → skill auto-invokes → ✓ Check on the distinctive signature (SKL-03 fire).
  - **Plan 06:** `bunx slidev build` + presenter spot-check (QUAL-01).
- Mirrors Phase 3's 6-plan chapter shape (Phase 3 D-01) and Phase 1's chapter-orchestrator pattern.
- Atomic per-section commits per QUAL-02.

### Section 02 — Why skills (D-02, D-03, D-04)
- **D-02 (Section 02 shape):** 5 slides total. Model-invoked framing first (slides 1–2), then the 3 locked verbatim quotes (slides 3–5). Mirrors Phase 3 D-02 shape.
  - Slide 1 — The wow framing: in Chapter 3 you wired a hook — *you* told Claude exactly when to run something. A skill is the opposite end: *Claude* decides when to run it. (Phase 3 → 3 bridge per D-04.)
  - Slide 2 — Why this matters: "procedural knowledge — a reusable 'how we do XYZ here' — packaged in a format Claude can discover and load itself." Concrete example one-liner: "you write a `pr-review` skill once; the next time someone says 'review this PR,' Claude loads it without being told." (Exact wording at planner discretion; the concept is locked.)
  - Slide 3 — What skills are, in essence (Quote 1, locked verbatim).
  - Slide 4 — Why this scales (Quote 2, locked verbatim).
  - Slide 5 — The self-invocation moment (Quote 3, locked verbatim) — sets up the hands-on payoff in Section 05.
- **D-03 (LOCKED QUOTES — verbatim, no edits):** Three quotes are user-locked content (sourced from research, user-approved). Plans MUST place them verbatim with no rewording or paraphrasing:
  - Quote 1 (Slide 3): *"Skills are procedural knowledge — a reusable 'how we do XYZ here' — packaged in a format Claude can discover and load itself."*
  - Quote 2 (Slide 4): *"CLAUDE.md is always loaded. A skill is loaded when needed. That distinction is why a 50-skill library doesn't slow Claude down, but a 5,000-line CLAUDE.md does."*
  - Quote 3 (Slide 5): *"You didn't type a slash command. You didn't remind Claude of the format. The skill activated itself."*
- **D-04 (Phase 3 bridge on Slide 1):** Slide 1 of Section 02 MUST include an explicit callback to Phase 3's hook hands-on. Frame: *hook = you wire the exact "when" (deterministic THEN); skill = Claude decides the "when" (model-invoked HOW)*. Wording is at planner discretion but the bridge MUST be present. Reason: continuity with Chapter 3's last act + the model-invoked distinction is the load-bearing teaching, and contrast against hooks makes it land cleanly.

### Section 03 — How skills work (D-05, D-06, D-07)
- **D-05 (file shape, single slide):** One slide showing the directory layout:
  ```
  ~/.claude/skills/pirate-mode/
    └── SKILL.md
  ```
  Plain-text note BELOW the tree: *"User-level today. Project-level (`.claude/skills/` inside a repo) versions with the codebase — same shape."* This is the project-vs-user mention from the boundary, kept to one line.
- **D-06 (minimal frontmatter, single slide):** One slide showing the smallest valid SKILL.md in a fenced ```markdown``` (or ```yaml```/```md```) block — research/planner picks the highlighter that renders cleanest:
  ```markdown
  ---
  name: pirate-mode
  description: Use when the user asks for pirate-mode, asks to explain
    something in pirate, or says "arrr." Responds in 2026 brain-rot pirate
    voice — opens with "Ahoy" and signs every reply "— per pirate-mode."
  ---

  # Pirate Mode

  Respond in pirate-speak laced with 2026 internet brain-rot vocabulary
  (skibidi, rizz, no cap, sigma, ohio, gyat, lowkey). Open every response
  with "Ahoy ye sigma" and close with "— per pirate-mode."
  ```
  IMPORTANT: this is the EXACT SKILL.md participants paste in Section 04. Section 03 shows it; Section 04 re-shows it inside a "paste this" callout. The frontmatter `description` doubles as the trigger signal (per research's "description has two jobs" framing) and the body locks the distinctive signature so the ✓ Check in Section 05 is real (Claude wouldn't unprompted open with "Ahoy ye sigma" + close with "— per pirate-mode" — that signature is the proof the skill fired).
  - Brain-rot vocabulary list above is illustrative — exact words/count at planner discretion, but the list MUST include enough distinctive 2026 internet slang that the output reads unmistakably brain-rot-flavored and not generic pirate-speak.
- **D-07 (progressive disclosure 3-tier, single slide):** One slide showing the 3-tier loading model — Discovery (YAML only, ~100 tokens per skill) → Activation (full SKILL.md body, on prompt match) → Execution (scripts/reference files, on demand). Rendering choice (table, stacked diagram, callout list) at planner/researcher discretion, but the three tiers + their token-cost framing MUST be present — this IS the SKL-02 mental model. Single trailing line: *"more frontmatter fields exist (`allowed-tools`, `disable-model-invocation`, `paths` …) — `name` + `description` is enough today."* (Mirrors Phase 3 D-05 pattern: name them, don't teach them.)

### Section 04 — Hands-on build (D-08, D-09)
- **D-08 (paste shape):** Participants paste the EXACT SKILL.md from D-06 into a single new file. Two-step paste:
  - Step 1 — terminal: `mkdir -p ~/.claude/skills/pirate-mode`
  - Step 2 — open `~/.claude/skills/pirate-mode/SKILL.md` in any editor and paste the D-06 content verbatim.
  Slide includes one shell block (the `mkdir`) and one fenced ```markdown``` block (the SKILL.md content). Plain-text one-liner above the SKILL.md block: *"This is the same SKILL.md from the last slide — paste it as-is."* (Reduces "is this different?" friction; mirrors Phase 3 D-08 reconcile-note pattern.)
- **D-09 (restart caveat):** Section 04 ends with one plain-text line BELOW the paste blocks: *"If you have a `claude` session open, exit and restart it — skills load at session start."* Reason: skill discovery happens at session start (per research), and a participant with a stale session won't see the skill fire in Section 05. Researcher MUST verify this restart requirement against current Claude Code docs at research time — if Claude Code now hot-reloads skills, this line softens to "if it doesn't fire in step 1, restart Claude."

### Section 05 — Hands-on fire (D-10)
- **D-10 (trigger + ✓ check):** Two micro-steps inline on one slide:
  - Step 1 — Prove auto-invocation: run `claude`, ask in plain English: *"Explain hooks in pirate-mode."* (or any variant that hits the description trigger — "in pirate," "as a pirate," "arrr"). **✓ Check:** "Claude's response opens with 'Ahoy ye sigma' and ends with '— per pirate-mode.' You never typed a slash command."
  - Step 2 — Prove non-invocation: ask Claude a normal question (e.g., *"What's a `git rebase`?"*) — Claude responds normally, no pirate signature. **✓ Check:** "no 'Ahoy,' no '— per pirate-mode' — the skill didn't fire because nothing in your prompt matched its description."
  - Closing line: *"Two prompts, one skill. Claude chose when to use it — that's the whole point."* (closes the chapter on the model-invoked distinction rather than a new concept; mirrors Phase 3 D-09 closing-line shape.)
- ✓ Check style follows the Phase 1 D-08 / Phase 3 D-09 pattern (terminal-style or callout-style fenced block — exact rendering at planner/researcher discretion, but consistent with Phases 1–2).

### Slide-level shape carried forward from Phase 1 + Phase 3 (D-11..D-14)
- **D-11:** Section files use Slidev's per-slide `---` separator with minimal per-slide frontmatter. No `layout: section` slides at section boundaries within the chapter. (Carries Phase 3 D-10.)
- **D-12:** Code blocks ≤25 lines per slide. SKILL.md bodies in fenced ```markdown``` (or whichever highlighter renders frontmatter cleanest); shell snippets in ```bash``` blocks. No custom `<Cmd>` Vue component. (Carries Phase 3 D-11.)
- **D-13:** `<v-clicks>` used sparingly — only on Section 02 quote-reveal if pacing genuinely benefits, and on neither of the hands-on sections (they're already short). (Carries Phase 3 D-12.)
- **D-14:** Tone discipline (QUAL-04): confident, terse, no hype, no exclamation marks in body, no screenshots. Carries Phase 3 D-13. **Exception**: the brain-rot vocabulary inside the SKILL.md body (D-06) is deliberate content of the example skill and does NOT count as hype — it's the demo payload. Slide prose around it stays on-tone.

### Claude's Discretion
- Exact cover-slide one-liner (Section 01) — tight provocation; presenter-flavored.
- Exact wording of the Phase 3 callback line on Section 02 Slide 1 (D-04) — must contrast hook (you wire the "when") vs skill (Claude decides the "when"); exact phrasing open.
- Exact wording of the "concrete example" sentence on Section 02 Slide 2 (D-02) — `pr-review` is illustrative; planner may pick a different one-liner example if a cleaner one surfaces during research, as long as it lands the "skill = reusable how-we-do-XYZ" point.
- Exact brain-rot vocabulary list inside the example SKILL.md body (D-06) — must be unmistakably 2026-internet-flavored and distinctive enough that the ✓ Check in Section 05 is real; specific word choices open.
- Exact rendering of the 3-tier progressive-disclosure visual on Section 03 (D-07) — table, stacked diagram, or callout list — planner/researcher picks what reads cleanest in dark theme + JetBrains Mono.
- Whether Section 04's two-step paste is two slides or one slide with two blocks (D-08) — readability call at planning time.
- Whether the Section 05 non-invocation trigger (Step 2) uses `git rebase` or a different topic — any unrelated technical question works; planner picks one that's unambiguous.
- Whether the restart caveat (D-09) softens to "if it doesn't fire, restart" or stays as a mandatory pre-step — depends on research finding on current Claude Code skill-reload behavior.
- Whether the ✓ Check callouts use the same Vue component (if any) or a styled fenced block as Phases 1–2 — defer to Phases 1–2's actual rendering pattern.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project anchors (this repo)
- `CLAUDE.md` — project value, Slidev stack, "What NOT to Use," tone constraints.
- `.planning/PROJECT.md` — v1.1 framing, locked-from-v1.0 stack/theme constraints.
- `.planning/REQUIREMENTS.md` — Phase 2 requirements: SKL-01, SKL-02, SKL-03, QUAL-01, QUAL-02, QUAL-04.
- `.planning/ROADMAP.md` — Phase 2 goal + dependencies (depends on Phase 3) + per-phase research policy.
- `slides.md` — existing chapter orchestrator (preserve headmatter; add `src:` include for `pages/02-skills.md` AFTER the existing Phase 1 + Phase 3 includes).

### Phase 1 + Phase 3 artifacts (direct dependencies)
- `.planning/phases/01-audience-setup/01-CONTEXT.md` — chapter-orchestrator pattern, ✓ check shape, tone discipline, slide-level conventions D-14..D-17 (carried into Phase 3 D-10..D-13 → Phase 2 D-11..D-14).
- `.planning/phases/01-audience-setup/01-08-PLAN.md` — Phase 1 closing `bunx slidev build` plan; Phase 2's plan 06 mirrors its shape.
- `.planning/phases/03-hooks/02-CONTEXT.md` — chapter shape locked here (6 plans, locked-quotes pattern, IFTTT framing → quote reveals → hands-on build → hands-on fire). Phase 2 D-01..D-14 mirror Phase 3 D-01..D-13 with Skills-specific substitutions.
- `pages/01-audience-setup.md` and `pages/01-audience-setup/*.md` — Slidev frontmatter conventions, layout choices, ✓ check rendering. Phase 2 must visually match.
- `pages/03-hooks.md` and `pages/03-hooks/*.md` (once Phase 3 ships) — most-recent chapter-orchestrator + section-file reference; Phase 2 mirrors this exactly. **If Phase 3 has NOT shipped at Phase 2 plan time**, planner falls back to Phase 1's files and matches Phase 3's CONTEXT.md `D-10..D-13` conventions on faith.

### v1.0 phase artifacts (locked constraints)
- `.planning/milestones/v1.0-phases/02-theme-visual-identity/02-CONTEXT.md` — warm near-black palette + rust accent + `.slidev-layout` CSS scoping. Section content must NOT introduce new colors or break scoping.
- `.planning/milestones/v1.0-phases/04-workshop-content-draft/04-CONTEXT.md` — D-08 (chapter inner shape), D-11 (`✓ Check` sync mechanism), D-22 (no screenshots), D-23 (tone).

### External specs (Slidev — verify with Context7 at research time)
- [Slidev — Importing slides via `src:`](https://sli.dev/guide/syntax#importing-slides) — chapter orchestrator pattern.
- [Slidev — Slide layouts](https://sli.dev/builtin/layouts) — `default`, `section`, `two-cols` (if Section 03's 3-tier visual benefits from side-by-side framing — planner's call).
- [Slidev — Click animations](https://sli.dev/guide/animations#click-animations) — `<v-clicks>` for the optional Section 02 quote reveal.
- [Slidev — `bunx slidev build`](https://sli.dev/builtin/cli) — QUAL-01 build plan exit-0 verification.

### Skills research (user-supplied — load via WebFetch at research time)
**Both sources reviewed during /gsd-discuss-phase 2 and informed D-02..D-10. Researcher MUST re-fetch at plan time to catch any drift and to mine any sections this CONTEXT.md didn't pull through.**
- <https://duet.so/guides/claude-code-skills-complete-guide#what-is-a-claude-code-skill> — source of the 3 locked quotes (D-03), the 3-tier progressive disclosure model (D-07), the "description has two jobs" framing (D-06), and the user-vs-project scope distinction (D-05). Primary source for SKL-01 + SKL-02.
- <https://alexop.dev/posts/understanding-claude-code-full-stack/> — cross-reference on lazy-loading semantics + frontmatter field surface (most fields deferred per D-07 trailing line). Use for completeness checks on the "more fields exist" list.

### Claude Code references (for content accuracy — verify with Context7 at research time)
- Claude Code official docs — Skills reference. Specifically the **current canonical SKILL.md frontmatter schema** (confirm `name` + `description` are still sufficient for a minimal model-invoked skill), the **discovery-vs-activation token-cost figures** in D-07 (research's "~100 tokens per skill at discovery" — verify or update), and the **skill-reload behavior at session start** (D-09 restart caveat — confirm whether Claude Code now hot-reloads skills or still requires session restart).
- Claude Code official docs — Description-as-trigger semantics: how Claude matches a prompt against `description` fields. The ✓ Check in Section 05 depends on this matching being reliable; if the official docs describe a more nuanced matching algorithm (e.g., embeddings, keyword extraction), the Section 03 framing may need a one-line tweak.
- Claude Code official docs — User-level vs project-level resolution / precedence. The Section 03 one-line note in D-05 must match current guidance (e.g., if project-level skills override user-level on collision, that's worth a footnote — but only if it doesn't muddy the chapter).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `slides.md` — has v1.0 head matter (theme, fonts, Shiki, colorSchema) and `src:` includes for Phase 1 (Phase 3 will add another). Phase 2 appends one more `src:` line for `pages/02-skills.md`. Does NOT modify head matter.
- `pages/01-audience-setup.md` + `pages/03-hooks.md` (once shipped) — chapter orchestrator templates Phase 2 mirrors at `pages/02-skills.md`.
- `pages/01-audience-setup/0N-*.md` + `pages/03-hooks/0N-*.md` (once shipped) — section file templates Phase 2 mirrors at `pages/02-skills/0N-*.md` (same frontmatter conventions, slide-separator style, ✓ Check rendering).
- `style.css`, `uno.config.ts` — v1.0 theme tokens. Phase 2 sections use these only; do NOT add new colors. All custom CSS scoped under `.slidev-layout`.
- `components/global-top.vue` — 3px rust progress bar already wired. Phase 2 doesn't touch it; it Just Works.
- `.claude/skills/higgsfield-*` (project-local) — existing skill folders on disk. NOT used as the workshop example (Phase 2's example is a fresh `pirate-mode` skill at user-level), but their existence confirms the file-shape Section 03 teaches matches what's already in the repo. Researcher MAY peek at one of these as a sanity check that the frontmatter shape taught is current.

### Established Patterns
- **Chapter-file pattern (locked):** `slides.md` → `pages/02-skills.md` → `pages/02-skills/0N-*.md`. Identical to Phases 1 + 2.
- **Atomic section commits (QUAL-02):** one git commit per section file, scoped commit message (`feat(phase-2): section 02 why-skills`, etc.).
- **Tone discipline (QUAL-04):** confident + terse + no hype + no exclamation marks in body + no screenshots. v1.0 D-23 / Phase 1 D-17 / Phase 3 D-13 standard. (Brain-rot vocabulary inside the example SKILL.md body is content of the demo skill, NOT slide prose — see D-14 exception.)
- **✓ Check pattern:** Phase 1 Sections 05/06 + Phase 3 Section 05 use a copy-paste-compare check on a callout-style block. Phase 2 Section 05 mirrors this shape (text-signature check rather than audio-cue or visual-output but same callout style).
- **Locked-quotes pattern:** Phase 3 D-03 introduced the "3 verbatim quotes, no rewording" pattern. Phase 2 D-03 carries it forward with 3 different (skills-specific) quotes.

### Integration Points
- `slides.md` — Phase 2 adds a single `---\nsrc: ./pages/02-skills.md\n---` block AFTER the existing Phase 1 (and Phase 3, once shipped) includes. Cover slide stays untouched.
- `pages/02-skills.md` — NEW file; chapter orchestrator with `src:` includes for each section file.
- `pages/02-skills/` — NEW directory; 5 section files (`01-cover.md` through `05-hands-on-fire.md`).
- `~/.claude/skills/pirate-mode/SKILL.md` — NOT a repo file. Participants create this on their own machines during the hands-on; no repo change. (Same pattern as Phase 3's `~/.claude/settings.json` edit.)

</code_context>

<specifics>
## Specific Ideas

- **SKL-01 framing (user-approved):** model-invoked vs user-invoked is the wow framing. Bridge from Phase 3 (you wired a hook = exact "when"; skill = Claude decides "when") makes the distinction concrete. ELI5 tone — no jargon up front. The 3 locked quotes carry the load-bearing teaching.
- **LOCKED QUOTES (user-approved, sourced from duet.so research, exact wording, verbatim):**
  - *"Skills are procedural knowledge — a reusable 'how we do XYZ here' — packaged in a format Claude can discover and load itself."*
  - *"CLAUDE.md is always loaded. A skill is loaded when needed. That distinction is why a 50-skill library doesn't slow Claude down, but a 5,000-line CLAUDE.md does."*
  - *"You didn't type a slash command. You didn't remind Claude of the format. The skill activated itself."*
- **SKL-02 mental model (user-approved):** 3-tier progressive disclosure on a single slide. Discovery → Activation → Execution. Token-cost framing (~100 tokens/skill at discovery) makes the "50 skills barely slow you down" claim land.
- **SKL-02 frontmatter depth (user-approved):** `name` + `description` only on the taught slide. Other fields listed by name in a single trailing line ("more fields exist: `allowed-tools`, `disable-model-invocation`, `paths`…"). Tightest cognitive load; the hands-on uses exactly two fields.
- **SKL-03 hands-on (user-approved):** `pirate-mode` skill with **2026 brain-rot flavor**. User-level (`~/.claude/skills/pirate-mode/SKILL.md`). Single-file SKILL.md, no supporting files. Distinctive signature ("Ahoy ye sigma" open + "— per pirate-mode" close) makes the ✓ Check unambiguous — Claude wouldn't unprompted produce that signature, so its presence IS proof the skill self-invoked.
- **Phase 3 bridge:** Slide 1 of Section 02 must include the hook-vs-skill contrast — hook = you wire the deterministic "when"; skill = Claude decides the "when." Bridges to Phase 3's hands-on directly.
- **Restart caveat:** sessions started before the skill file existed won't see it. Section 04 ends with a one-line restart instruction; Section 05 assumes a fresh `claude` invocation. (Researcher verifies whether hot-reload now exists.)

</specifics>

<deferred>
## Deferred Ideas

- **`disable-model-invocation` + manual-only skills** (e.g., a `deploy` skill that participants invoke via `/deploy`) — interesting but undercuts the model-invoked wow moment. Candidate for v1.2 "advanced skills" chapter.
- **`allowed-tools` + skill security framing** — "skills can run arbitrary tools; restrict the surface" — instructor may say live; not a slide in v1.1. Deferred to v1.2 alongside the `disable-model-invocation` content.
- **`context: fork` / skills as subagent-launchers** — natural cross-chapter material once Phase 4 has established subagents. Defer to a post-Phase-4 cross-primitive section (or v1.2).
- **`paths` glob filtering** ("skill only activates inside `src/**/*.ts`") — niche, advanced. v1.2.
- **Plugin distribution (`.claude-plugin/plugin.json`)** — team-distribution angle. v1.2 or a separate "team adoption" mini-chapter.
- **Multi-file skills** (`SKILL.md` + reference files + scripts under `scripts/`) — mentioned implicitly in the 3-tier disclosure diagram's "Execution" tier (D-07) but not built. v1.2.
- **`skill-creator` meta-skill** — Anthropic's "skill that builds skills." Cute but recursive-confusing for first contact. v1.2.
- **Skills × hooks composition** — e.g., a hook that wires a `Stop` chime AND a skill that drafts the commit message Claude produces after stopping. Cross-primitive recipe. v1.2.
- **Project-level deep dive** (`.claude/skills/` versioned with repo, PR-reviewed skill changes) — covered by one line in D-05; full treatment deferred.
- **The "500-line rule" / SKILL.md size discipline** — too internal for first-contact chapter. v1.2 authoring-discipline aside.
- **Cross-platform skill standard** (research notes the SKILL.md format works in Claude.ai, OpenAI Codex, Cursor, etc.) — out of scope for this Claude-Code-focused workshop. Worth a one-liner in Phase 5 outro pointers if it earns the space.

</deferred>

---

*Phase: 02-skills*
*Context gathered: 2026-05-12 via /gsd-discuss-phase*
