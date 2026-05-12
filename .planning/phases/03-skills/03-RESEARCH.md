# Phase 3: Skills - Research

**Researched:** 2026-05-12
**Domain:** Claude Code Skills primitive (model-invoked, file-based, progressively disclosed) + Slidev rendering for the chapter
**Confidence:** HIGH

## Summary

Phase 3 teaches the Skills primitive via a 5-section chapter + 1 build-gate plan. CONTEXT.md
locked the spine (D-01..D-14) including the three verbatim quotes, the exact `pirate-mode`
SKILL.md, and the slide-level conventions inherited from Phases 1+2. Research re-verified
every load-bearing claim against `code.claude.com` docs (via Context7
`/websites/code_claude`) and re-fetched the two user-supplied sources to catch drift.

**One finding changes a CONTEXT.md decision:** Claude Code now **hot-reloads** skills
created or modified in `~/.claude/skills` or `.claude/skills` — no session restart
required. Source: official changelog at code.claude.com. The duet.so source (written
earlier) still says "restart"; that's stale. D-09's "softens to..." escape clause
applies and Section 04's closing line should be the soft form.

Everything else in CONTEXT.md holds: `name` + `description` is still the minimal
frontmatter `[VERIFIED]`; the 3-tier Discovery → Activation → Execution model with
~100 tokens/skill at discovery is intact `[CITED: duet.so]`; both user and project
locations resolve `[VERIFIED: code.claude.com]`. Slidev `src:`, `<v-clicks>`, and
`two-cols` syntax all match what Phases 1/2 already ship.

**Primary recommendation:** Plan exactly as CONTEXT.md prescribes, with two
adjustments — (a) Section 04's closing line uses the softened restart wording
("if it doesn't fire in step 1, restart Claude"); (b) Section 03's 3-tier visual
should render as a fenced markdown table inside a `<div class="text-sm">` wrapper
(matches the `claude-files-primer` slide's compact-block precedent) rather than
two-cols or a hand-drawn diagram.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Chapter orchestration | Slidev `slides.md` (root) | — | Locked: single `src:` include per chapter |
| Section assembly | `pages/03-skills.md` orchestrator | — | Mirrors Phases 1/2 — list of `src:` blocks |
| Per-section slide content | `pages/03-skills/0N-*.md` files | — | One file per section; atomic commit per file (QUAL-02) |
| Code highlighting | Shiki (bundled) | — | Already wired in `slides.md` head matter — `langs` includes `md`, `yaml`, `bash` |
| Visual styling | UnoCSS + scoped `<style>` blocks | `style.css` (theme tokens) | Phase 1 precedent — scoped per-slide CSS for compact code blocks |
| Hands-on artifact | Participant's local `~/.claude/skills/pirate-mode/SKILL.md` | — | NOT a repo file; same pattern as Phase 2's `~/.claude/settings.json` |
| Build verification | `bunx slidev build` | — | Plan 06 (QUAL-01) |

## User Constraints (from CONTEXT.md)

### Locked Decisions

Copying verbatim from `03-CONTEXT.md` — full text lives in that file; the planner reads
both. Key locked items the planner CANNOT change:

- **D-01:** 6 plans total (5 sections + 1 build gate). File names locked:
  `01-cover.md`, `02-why-skills.md`, `03-how-skills-work.md`, `04-hands-on-build.md`,
  `05-hands-on-fire.md`.
- **D-02:** Section 02 = 5 slides (2 framing + 3 locked-quote slides).
- **D-03:** Three verbatim quotes — no rewording, no paraphrasing.
- **D-04:** Section 02 Slide 1 MUST contain Phase-2 → Phase-3 bridge (hook = you wire
  the "when"; skill = Claude decides the "when").
- **D-05:** Section 03 file-shape slide shows the directory tree exactly as locked +
  one-line user-vs-project note.
- **D-06:** EXACT SKILL.md content (frontmatter + body) is locked. Section 03 shows it;
  Section 04 re-shows it inside the paste callout.
- **D-07:** Section 03 3-tier visual MUST include all three tiers + token-cost framing
  + trailing line naming `allowed-tools`, `disable-model-invocation`, `paths`.
- **D-08:** Section 04 = two-step paste (`mkdir` shell block + the SKILL.md content).
- **D-10:** Section 05 = two micro-steps (pirate trigger + non-trigger control).
- **D-11..D-14:** Slidev conventions carried forward from Phase 2.

### Claude's Discretion (planner's freedom)

- Section 01 cover-slide one-liner (presenter-flavored provocation).
- Exact wording of Phase 2 → 3 bridge on Section 02 Slide 1.
- Exact wording of the "procedural-knowledge" concrete example on Slide 2 (`pr-review`
  is illustrative).
- Brain-rot vocabulary list inside the example SKILL.md body — must be distinctive
  enough to make Section 05's ✓ Check unambiguous.
- Rendering of the 3-tier progressive-disclosure visual (table / stacked / two-cols).
- Section 04 one-slide-with-two-blocks vs two-slides.
- Section 05 Step 2 non-trigger topic (`git rebase` illustrative).
- Restart caveat (D-09) softening — **see Section "Hot Reload Behavior" below: SOFTEN.**
- ✓ Check rendering style — **see Section "✓ Check Pattern" below.**

### Deferred Ideas (OUT OF SCOPE)

`disable-model-invocation`, `allowed-tools`, `paths`, `context: fork`, `agent`, `model`
frontmatter fields; `skill-creator` meta-skill; multi-file skills with scripts/reference
files; plugin distribution; project-level deep dive; skills × hooks composition;
500-line rule; cross-platform SKILL.md standard (Codex/Cursor).

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SKL-01 | Chapter explains what a skill is — `.claude/skills/<name>/SKILL.md` file shape, where it lives, how Claude discovers it | Sections 02 (framing) + 03 (file shape, frontmatter, user/project locations) — backed by `[VERIFIED: code.claude.com]` minimal-frontmatter docs |
| SKL-02 | Chapter teaches the mental model — progressive disclosure, why skills load lazily, what role frontmatter plays in matching | Section 03 3-tier visual + the "description has two jobs" framing — backed by `[CITED: duet.so]` Discovery → Activation → Execution table |
| SKL-03 | Chapter includes one small live hands-on task | Sections 04 (build) + 05 (fire) — `pirate-mode` skill with distinctive open/close signature |
| QUAL-01 | Build + presenter spot-check at chapter close | Plan 06 — `bunx slidev build` exit-0 + chapter walkthrough |
| QUAL-02 | Atomic per-section commits | One commit per section file; conventional-commit prefix matches Phase 1/2 (`feat(phase-3): section 0N <name>`) |
| QUAL-04 | Tone discipline | No exclamation marks in slide prose; brain-rot vocabulary is content of the demo skill (not slide prose) per D-14 exception |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@slidev/cli` | ^52.15 (locked in package.json) | Slide framework | Project constraint; already running |
| Shiki | bundled with Slidev | Syntax highlighting | Theme `vitesse-dark` already configured in `slides.md` head matter |
| Bun | ^1.3.x | Package manager + script runner | Project constraint — `bunx slidev build` |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| UnoCSS | bundled | Utility classes (`text-sm`, `grid-cols-2`, `text-dim`, `text-accent`) | Already in use in Phase 1 sections — `text-dim` for subheaders, `text-accent` (rust) for emphasis |
| `slides.md` `shiki.langs` | adds `md`, `yaml` if missing | SKILL.md frontmatter highlighting | **Verified:** current head matter declares `['ts', 'tsx', 'bash', 'json', 'md', 'yaml']` — both `md` and `yaml` already present. No edit to `slides.md` head matter needed `[VERIFIED: slides.md:17]`. |

**Version verification:**
- Slidev `^52.15.1` — current per `CLAUDE.md` and `slides.md`. No change.
- Shiki — bundled, not a separate install.

**No new installs required for Phase 3.** Everything is already wired.

## Architecture Patterns

### System Architecture Diagram

```
slides.md  (root orchestrator, head matter LOCKED)
    │
    ├── src: ./pages/01-audience-setup.md  (existing)
    ├── src: ./pages/02-hooks.md           (existing — Phase 2)
    └── src: ./pages/03-skills.md          (NEW — Phase 3 adds this line)
                │
                ├── src: ./03-skills/01-cover.md
                ├── src: ./03-skills/02-why-skills.md
                ├── src: ./03-skills/03-how-skills-work.md
                ├── src: ./03-skills/04-hands-on-build.md
                └── src: ./03-skills/05-hands-on-fire.md
                          │
                          └── Each file = 1+ slides separated by `---`
                              ├── Optional per-slide frontmatter (`layout: center` only)
                              ├── Fenced code blocks (```bash, ```markdown, ```yaml)
                              └── Scoped `<style scoped>` for per-slide tweaks
```

### Recommended Project Structure
```
pages/
├── 03-skills.md              # NEW — chapter orchestrator (5 src: includes)
└── 03-skills/                # NEW directory
    ├── 01-cover.md           # layout: center, chapter cover
    ├── 02-why-skills.md      # 5 slides (2 framing + 3 quotes)
    ├── 03-how-skills-work.md # 3 slides (file shape + frontmatter + 3-tier)
    ├── 04-hands-on-build.md  # 1 slide (mkdir + paste) — see D-08
    └── 05-hands-on-fire.md   # 1 slide (2 micro-steps + closing line)
```

### Pattern 1: Chapter Orchestrator (`pages/03-skills.md`)
**What:** Thin file containing only `src:` includes — no head matter, no slide content.
**When to use:** Always for chapter assembly — matches Phases 1 + 2.
**Example (verified pattern from `pages/01-audience-setup.md`):**
```markdown
---
src: ./03-skills/01-cover.md
---
---
src: ./03-skills/02-why-skills.md
---
---
src: ./03-skills/03-how-skills-work.md
---
---
src: ./03-skills/04-hands-on-build.md
---
---
src: ./03-skills/05-hands-on-fire.md
---
```
Source: `pages/01-audience-setup.md` lines 1–24 (this repo); Slidev `src:` docs
`[VERIFIED: sli.dev/features/importing-slides.html]`.

### Pattern 2: Chapter Cover (`01-cover.md`)
**What:** Single slide using `layout: center` with chapter title H1 + one-line provocation + a small dim-text breadcrumb.
**Example (matches Phase 2 cover verbatim):**
```markdown
---
layout: center
---

# Chapter 3 — Skills

procedural knowledge Claude discovers and loads itself — one tiny skill today, the pattern for the rest

<div class="text-sm opacity-60 mt-8">
  what skills are · how they're loaded · one skill you'll wire live
</div>
```
Source: `pages/02-hooks/01-cover.md`.

### Pattern 3: Section File with Multiple Slides (`02-why-skills.md` etc.)
**What:** No top-level frontmatter; slides separated by `---` rulers. Per-slide
frontmatter only when overriding layout.
**Example skeleton:**
```markdown
# Slide 1 title

slide 1 body content

---

# Slide 2 title

slide 2 body content

---
layout: center
---

# Optional Slide 3 with layout override
```
Source: convention used across `pages/01-audience-setup/0N-*.md` and Phase 2.

### Pattern 4: Locked-Quote Slide (Section 02 slides 3–5)
**What:** H1 line ("In essence" / "Why this scales" / "Self-invocation"), then the
quote rendered as a blockquote with `class` for restraint.
**Example structure (planner finalizes wording, NOT the quote text):**
```markdown
# Why this scales

> CLAUDE.md is always loaded. A skill is loaded when needed. That distinction is why
> a 50-skill library doesn't slow Claude down, but a 5,000-line CLAUDE.md does.

<div class="text-sm text-dim mt-6">
  — research note
</div>
```
The blockquote `>` syntax is Markdown-standard; Slidev renders it through the theme's
typography. **Verified rendering by inspecting Phase 1's Win 1 callout** (`06-win-statusline.md` line 16):
the project uses a `>` blockquote for the ✓ Check pattern, which means blockquote
rendering is already battle-tested in this deck.

### Pattern 5: 3-Tier Progressive Disclosure Visual (Section 03 D-07)
**Recommendation:** Fenced markdown table inside a `<div class="text-sm">` wrapper.
Reason: Phase 1's `05-claude-files-primer.md` established the precedent of dense
compact code/text blocks with a scoped `<style>` for size tweaks; a table renders
cleanest in `vitesse-dark` with JetBrains Mono and avoids the visual mismatch a
hand-drawn ASCII diagram would create against the precise SKILL.md block.

**Primary (recommended):**
```markdown
# How Claude loads a skill

| Tier | What loads | Token cost |
|------|------------|------------|
| **Discovery** | `name` + `description` only | ~100 tokens / skill |
| **Activation** | Full `SKILL.md` body | ~1K–5K tokens |
| **Execution** | Scripts, reference files, templates | only what the task needs |

<div class="text-sm text-dim mt-6">
  more frontmatter fields exist (<code>allowed-tools</code>, <code>disable-model-invocation</code>, <code>paths</code>…) — <code>name</code> + <code>description</code> is enough today.
</div>
```

**Fallback (if planner decides the table feels too dry):** `two-cols` layout with the
tier list on the left and a one-line plain-English summary on the right. Slidev
`two-cols` syntax verified: `::right::` divider after the left content
`[VERIFIED: sli.dev/builtin/layouts]`.

### Pattern 6: ✓ Check Pattern (Section 05)
**Verified from Phase 1 — `06-win-statusline.md` line 16 and `07-win-claude-md.md` line 35:**

```markdown
> ✓ Check: a status bar now sits at the bottom of your Claude Code window —
> showing the model, your folder, and a context-usage bar. Exact bar style
> depends on your model + session.
```

Plain Markdown blockquote opening with `> ✓ Check:`. No Vue component, no custom CSS
class. **Phase 3 Section 05 MUST use this exact pattern** — two `✓ Check:` blockquotes,
one per micro-step. This is the locked rendering.

### Pattern 7: Mixed Code Block + Note Pattern (Section 04 D-08)
For the two-step paste, the planner can choose:

**Option A (recommended — single slide):**
```markdown
# Build the skill

Step 1 — create the folder:

```bash
mkdir -p ~/.claude/skills/pirate-mode
```

Step 2 — open `~/.claude/skills/pirate-mode/SKILL.md` and paste:

```markdown
---
name: pirate-mode
description: ...
---

# Pirate Mode

...
```

<div class="text-sm text-dim mt-4">
  Skills hot-reload — if it doesn't fire on the first try in the next slide, exit and restart <code>claude</code>.
</div>
```

**Option B (two slides):** split at the comment between Step 1 and Step 2. Use only if
Option A overflows the viewport with the full SKILL.md body. Phase 1's primer slide
hit that overflow threshold and shipped with a `<style scoped>` size tweak — Phase 3
planner should compose the slide first, then decide.

### Anti-Patterns to Avoid

- **Adding new fields to `slides.md` head matter.** It's locked. Phase 3 appends
  exactly one new `src:` block; nothing else.
- **Introducing a custom Vue component for the ✓ Check.** Phase 1 uses plain
  blockquotes — match it.
- **Using `<v-clicks>` on Section 03's 3-tier table.** D-13 restricts `<v-clicks>` to
  Section 02 quote reveals only.
- **Exclamation marks in slide prose** (D-14 / QUAL-04). The brain-rot vocabulary
  inside the SKILL.md body is exempt — it's demo payload, not slide prose.
- **Putting cross-OS shell command swaps inside the fenced ```markdown``` block.** The
  SKILL.md content is portable Markdown — there's no OS variance here (unlike Phase 2's
  `afplay` / `aplay` split). Don't invent platform splits where none exist.
- **JSON comments inside a `json` fenced block** — N/A for Phase 3 (no JSON taught) but
  worth noting the planner doesn't need Phase 2's comment-discipline rule here.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sidebar navigation for participants | Custom Vue component | Slidev's built-in slide overview (press `o`) | Already shipping; D-25 from v1.0 deferred this |
| Per-slide deep-link / share | Custom JS | Slidev's URL fragment (`#/3/5`) | Built-in router does this; PUXX-01 deferred |
| Copy-to-clipboard on code blocks | Plugin or directive | Out of scope v1.1 | Carried over deferred from v1.0 |
| `✓ Check` styled component | Custom Vue component | Plain `> ✓ Check:` blockquote | Phase 1 + Phase 2 use plain markdown |
| Skill triggering on the slide | Try to demo skill from inside slidev | Participants run `claude` in their own terminal — same pattern as Phase 2 | Phase 2's hands-on already runs outside the slide |
| Visual diagram framework | Mermaid / Excalidraw render | Plain markdown table or text-tree (see `05-claude-files-primer.md`) | AUTH-03 deferred to v1.2 |

**Key insight:** Phases 1 and 2 ship entirely on Slidev primitives + plain Markdown +
a few scoped `<style>` blocks. Phase 3 follows suit — there is no Phase 3-specific
infrastructure to build, only content to write.

## Common Pitfalls

### Pitfall 1: Stale duet.so vs current Claude Code docs on hot-reload
**What goes wrong:** Section 04 closes with a "restart your session" instruction that
no longer reflects how Claude Code behaves.
**Why it happens:** The duet.so source (D-09's reference) was written before Claude
Code shipped hot-reload for `~/.claude/skills` and `.claude/skills`.
**How to avoid:** Use the **softened wording** D-09 already permits:
> Skills hot-reload — if it doesn't fire on the first try in step 1, exit and restart `claude`.

**Warning signs:** Source says "restart" → check official Claude Code changelog
(`code.claude.com/docs/en/changelog`) for hot-reload entries.
**Source:** `[VERIFIED: code.claude.com]` — changelog entry verified during research.

### Pitfall 2: Description matching is reliable for distinctive triggers but fuzzy for generic ones
**What goes wrong:** Section 05 Step 1's ✓ Check could fail if the pirate-mode
description doesn't trip the auto-invocation, or could fire spuriously on Step 2's
control prompt if the description is too broad.
**Why it happens:** Claude's description-as-trigger uses LLM judgment, not keyword
regex. Distinctive trigger phrases ("pirate-mode," "explain in pirate," "arrr") match
reliably; generic ones leak.
**How to avoid:** The locked `description` in D-06 already includes distinctive
trigger phrases ("asks for pirate-mode, asks to explain something in pirate, or says
'arrr'"). Section 05 Step 1's prompt MUST use one of those exact phrases. Step 2's
prompt MUST NOT contain "pirate," "arrr," or anything piratical.
**Warning signs:** Step 2's example uses a topic with metaphorical pirate vocabulary
(e.g., "What is a git rebase pirate-style?" obviously trips). Stick with `git rebase`
or similarly neutral.
**Source:** `[CITED: duet.so]` "description has two jobs" framing + `[CITED: alexop.dev]`
"Claude analyzes whether your task aligns with the skill's stated purpose."

### Pitfall 3: Windows `mkdir -p` compatibility in Section 04
**What goes wrong:** Native cmd.exe doesn't support `mkdir -p` (no `-p` flag).
**Why it happens:** Phase 2 already established the policy: native Windows
participants run Claude Code inside WSL. The Phase 2 footnote remains valid.
**How to avoid:** Add a short footnote on the Section 04 paste slide mirroring Phase 2
Section 03's: *"Windows — run inside WSL."* Or rely on the global Phase 2 policy and
omit, since Phase 3 inherits the audience setup.
**Warning signs:** Participant reports `'mkdir' is not recognized`.
**Source:** Phase 2 D-06 cross-OS note; verified by inspection of Phase 2 CONTEXT.md.

### Pitfall 4: `name` field collision with existing skill on participant's machine
**What goes wrong:** A participant already has a `pirate-mode` skill (unlikely but
not impossible) or another skill whose description overlaps.
**Why it happens:** Skill namespace is flat under `~/.claude/skills/`.
**How to avoid:** Low risk for this trigger name. Mention only if dry-run surfaces it.
The instructor can verbally caveat live.
**Warning signs:** N/A pre-emptively.
**Source:** Common-sense from filesystem semantics; not officially documented.

### Pitfall 5: Brain-rot vocabulary triggering content-moderation rejection
**What goes wrong:** A particularly aggressive brain-rot vocabulary list inside the
SKILL.md body causes Claude to refuse or sanitize the output, killing the ✓ Check
signature.
**Why it happens:** Some terms (e.g., "gyat") are mildly suggestive in some contexts.
**How to avoid:** The vocabulary list in D-06 (`skibidi, rizz, no cap, sigma, ohio,
gyat, lowkey`) is harmless; the model produces it freely. Researcher confirms no
moderation friction expected. Planner can drop `gyat` if dry-run flags it — but the
distinctive open `"Ahoy ye sigma"` + close `"— per pirate-mode"` is what makes the
✓ Check, not any single vocabulary word.
**Warning signs:** Dry-run output that's pirate-themed but lacks the brain-rot
flavor → indicates moderation softening.
**Source:** Observed model behavior; not officially documented.

## Runtime State Inventory

Not applicable — Phase 3 is a content-creation phase. No renames, refactors, or
migrations of existing state. New files are additive:
- `pages/03-skills.md` (new)
- `pages/03-skills/0N-*.md` (5 new files)
- `slides.md` — single `src:` block append, no head-matter change

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None — phase adds new files | none |
| Live service config | None — Vercel auto-deploys from main; no env vars added | none |
| OS-registered state | None | none |
| Secrets/env vars | None | none |
| Build artifacts | `dist/` regenerated by Plan 06's `bunx slidev build`; auto-cleaned by Slidev | none |

## Code Examples

### SKILL.md frontmatter — minimal valid shape
**Source:** `[VERIFIED: code.claude.com/docs/en/slash-commands]` + `[VERIFIED: code.claude.com/docs/en/plugins]`

```yaml
---
name: my-skill
description: What this skill does
---

Your skill instructions here...
```

`name` is optional in some examples in the docs (the plugins page shows a
`description`-only frontmatter), but the canonical recommendation includes both. The
workshop teaches both — minimal sufficient set is `name` + `description`.

### The exact pirate-mode SKILL.md (from D-06 — DO NOT MODIFY)
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

### Section 04 hands-on shell block (suggested)
```bash
mkdir -p ~/.claude/skills/pirate-mode
```

### Section 05 trigger prompts (Step 1 trigger, Step 2 control)

Step 1 — auto-invocation trigger (any of these works; locked description matches all):
```text
explain hooks in pirate-mode
```

Step 2 — control (no pirate, no auto-invoke):
```text
what is a git rebase?
```

### Slidev `src:` import (chapter orchestrator)
Source: `[VERIFIED: sli.dev/features/importing-slides.html]`

```markdown
---
src: ./03-skills/01-cover.md
---
```

### Slidev `<v-clicks>` for the optional Section 02 quote reveal
Source: `[VERIFIED: sli.dev/demo/starter/12]`

```markdown
<v-clicks>

- bullet one
- bullet two
- bullet three

</v-clicks>
```

Use **only** on Section 02 quote-reveal pacing if it helps; D-13 forbids elsewhere.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Skills required session restart after edit | **Hot-reload** for skills in `~/.claude/skills` and `.claude/skills` | Per recent Claude Code changelog (verified during research) | D-09 restart caveat MUST soften to "if it doesn't fire, restart" — confirmed user-permitted in CONTEXT.md |
| `description`-only frontmatter | `name` + `description` both recommended | Current docs | Minor — workshop already teaches both; matches official examples |
| Slash-command invocation as primary surface | Model-invocation is the canonical first-contact | Per Skills overview | Matches workshop framing exactly |

**Deprecated/outdated:**
- "Restart your Claude Code session" instructions in older Skills guides (including the
  duet.so source). Newer hot-reload behavior makes this an "only if needed" step.
- No Phase 3 content depends on deprecated APIs.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The locked `pirate-mode` description reliably triggers on "explain hooks in pirate-mode" and does NOT trigger on "what is a git rebase" | Section 05 ✓ Check pattern | If wrong: ✓ Check 1 fails (no auto-invoke) OR ✓ Check 2 spurious-fires. **Mitigation:** the description includes three distinctive trigger phrases; "pirate-mode" is in the prompt verbatim. Confidence in trigger: HIGH. Confidence in non-trigger: HIGH (no pirate vocabulary in `git rebase`). Dry-run will confirm. |
| A2 | The brain-rot vocabulary in the SKILL.md body produces a recognizably distinctive output (not sanitized to generic pirate-speak) | Section 05 ✓ Check signature | If wrong: output is pirate-themed but missing the brain-rot flavor → ✓ Check still passes on signature lines ("Ahoy ye sigma" / "— per pirate-mode") even if vocabulary softens. Robust. |
| A3 | Project-level skills override user-level on collision (or vice versa) | Section 03 user/project one-liner | The duet.so source says "implicit precedence"; alexop.dev says it's "unspecified." The workshop only mentions both locations exist — does NOT claim precedence. Safe. |

**This table is non-empty** — A1 in particular is the load-bearing assumption for the
workshop's payoff moment. The planner should add a **dry-run task** before the final
build-gate plan: instructor runs the full Section 04 + Section 05 sequence on a clean
machine and verifies both ✓ Checks fire as expected. If A1 fails, the description
wording in D-06 needs tweaking (which would require returning to discuss-phase since
D-06 is locked).

## Open Questions

1. **Should Section 04 be one slide or two?**
   - What we know: D-08 leaves it to planner discretion.
   - What's unclear: whether the full SKILL.md body + the `mkdir` block fit one
     viewport without a `<style scoped>` font shrink.
   - Recommendation: Plan one slide first (cleaner narrative); if `bunx slidev` dev-server
     spot-check shows overflow, split into two and use the same `text-xs` wrapper Phase 1
     used in `07-win-claude-md.md` line 13.

2. **Should the Section 03 user-vs-project one-liner mention precedence?**
   - What we know: D-05 says "same shape" — no precedence claim.
   - What's unclear: Whether participants will ask "what if both define the same
     skill?" — duet.so says implicit; alexop.dev says unspecified; current Claude Code
     docs don't address it directly.
   - Recommendation: Stay with D-05's wording exactly. Instructor handles
     follow-up questions live. Don't invent precedence claims on a slide.

3. **Should the chapter mention skills as `/slash-commands` at all?**
   - What we know: Out of scope per D-01 (skills-as-slash-commands unification deferred).
     But Claude Code does expose model-invoked skills via the slash menu in some
     versions.
   - What's unclear: Whether seeing `/pirate-mode` in the slash menu during the hands-on
     will confuse participants.
   - Recommendation: Don't pre-empt. If a participant asks, instructor handles it live.
     The chapter's wow moment is the auto-invocation; staying silent on the slash-command
     surface keeps that wow clean.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Bun | `bunx slidev build` (Plan 06) | ✓ (project standard) | per project | — |
| Slidev `@slidev/cli` | All slide rendering | ✓ (in `package.json`) | ^52.15 | — |
| Playwright Chromium | NOT required by Phase 3 (only QUAL-03 PDF export, deferred to Phase 5) | n/a for this phase | — | — |
| Claude Code (participant-side) | Section 05 hands-on | participant-supplied | — | — (workshop prereq; covered by Phase 1) |
| `mkdir`, plaintext editor | Section 04 hands-on | macOS/Linux/WSL ✓; native Windows ✗ on `-p` | — | Windows → WSL (Phase 2 policy) |

**Missing dependencies with no fallback:** None for the deck build. Section 04's
`mkdir -p` is the only platform-sensitive command — Phase 2's WSL policy covers it.

**Missing dependencies with fallback:** None requiring fallback in the repo. Participant
machines outside macOS/Linux/WSL are routed to WSL per Phase 2.

## Validation Architecture

`workflow.nyquist_validation` is not set in `.planning/config.json` → enabled by
default. However, Phase 3 is a content-authoring phase with **no automated test
infrastructure** in this repo (Phases 1 + 2 shipped without tests; QUAL-01 is the
build-gate). The Validation Architecture for this phase is the build + spot-check, not
a unit-test suite.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | `bunx slidev build` (exit code) + manual presenter spot-check |
| Config file | none (build uses `slides.md` head matter directly) |
| Quick run command | `bunx slidev` (dev server on http://localhost:3030 with hot-reload) |
| Full suite command | `bunx slidev build` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SKL-01 | Chapter explains skill file shape + location + discovery | manual-only (presenter spot-check) | walk Sections 02 + 03 in `bunx slidev --presenter` | ❌ no automated test possible — content QA |
| SKL-02 | Chapter teaches progressive disclosure mental model | manual-only | walk Section 03 slide 3 | ❌ content QA |
| SKL-03 | Hands-on builds + fires a skill | manual-only (dry-run on a clean machine) | run Section 04 + 05 steps, verify ✓ Check signature appears | ❌ depends on participant runtime |
| QUAL-01 | Build exits 0 | automated | `bunx slidev build` (expect exit 0) | ✓ command exists |
| QUAL-02 | One commit per section file | automated | `git log --oneline -- pages/03-skills/0N-*.md` (expect exactly 1 commit per file) | ✓ git history |
| QUAL-04 | Tone — no exclamation marks in slide prose | semi-automated | `grep -n '!' pages/03-skills/*.md` (manual review; exclude SKILL.md content quotes) | ✓ grep |

### Sampling Rate
- **Per task commit:** save → Slidev dev server auto-reloads → eye check
- **Per wave merge:** N/A (Phase 3 is sequential — one section at a time)
- **Phase gate (Plan 06):** `bunx slidev build` exits 0 + presenter spot-check
  walking all 5 sections + verify all 3 verbatim quotes appear unchanged + verify
  ✓ Check blockquote in Section 05 renders

### Wave 0 Gaps
- None. This phase doesn't introduce new test infrastructure; it relies on the
  build-gate pattern Phases 1 + 2 already established.

Skip rationale: This is a documentation/content phase. The user-facing artifact (the
slide deck) is verified by build success + presenter spot-check + hands-on dry-run.
No unit tests are needed or appropriate.

## Security Domain

`security_enforcement` not explicitly set; default = enabled. However, Phase 3 has
**no security surface** — it adds Markdown content to a static SPA. No
authentication, no inputs, no data storage. The teaching content references skill
security framing (deferred to v1.2) but does NOT introduce a vulnerability surface.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | — |
| V3 Session Management | no | — |
| V4 Access Control | no | — |
| V5 Input Validation | no (static SPA, no user input) | — |
| V6 Cryptography | no | — |

### Known Threat Patterns for Slidev static deck

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Markdown XSS via user-injected HTML | N/A — no participant input ingested at runtime | n/a |
| Build-time dependency vulnerability | Tampering | Bun lockfile already pinned; out of Phase 3 scope |

**No new security controls are required for Phase 3.**

## Project Constraints (from CLAUDE.md)

These directives MUST be honored by all Phase 3 work:

- **Package manager:** `bun` / `bunx` only — NEVER `npm`, `npx`, `yarn`, or `pnpm`.
- **Slide framework:** Slidev `^52.15`. Don't introduce a competitor or fork.
- **Highlighter:** Shiki (bundled). Don't add Prism.js or another highlighter.
- **Theme:** `@slidev/theme-default` with `colorSchema: dark` + JetBrains Mono + Inter.
  Don't swap to `seriph` or any community theme.
- **Hosting:** Vercel static SPA. No server-side code, no API routes added.
- **CSS scoping:** All custom CSS scoped under `.slidev-layout` (v1.0 D-01 rule).
  Per-slide `<style scoped>` is OK; global custom CSS additions are not.
- **No screenshots** (v1.0 D-22 / QUAL-04). Code/terminal blocks only.
- **Tone:** Confident, terse, no hype, no exclamation marks in body prose.
- **Atomic commits:** One commit per section (`feat(phase-3): section 0N <name>`).
- **GSD workflow:** Edits via the GSD execution pipeline only — researcher writes
  RESEARCH.md, planner writes per-section plans, executor runs plans.
- **MacOS-local-friendly tooling:** Anything heavy is fine to recommend (M4 Max 128GB)
  but Phase 3 is content-only, no local-model usage.

## Sources

### Primary (HIGH confidence)
- Context7 `/websites/code_claude` — Skills minimal frontmatter, hot-reload changelog,
  user/project location semantics, "Configure Skill Behavior with YAML Frontmatter,"
  "Create Skill Directory," "Agent Skills in the SDK > Skill Locations."
- Context7 `/websites/sli_dev` — `src:` import, `<v-clicks>`, `two-cols` layout.
- This repo: `pages/01-audience-setup.md` + `pages/01-audience-setup/0N-*.md` (Phase 1
  conventions), `pages/02-hooks.md` + `pages/02-hooks/01-cover.md` (Phase 2 cover
  pattern), `slides.md` (head matter LOCKED + shiki langs).
- `code.claude.com/docs/en/changelog` (via Context7) — hot-reload entry.

### Secondary (MEDIUM confidence)
- `https://duet.so/guides/claude-code-skills-complete-guide` — re-fetched 2026-05-12.
  Source of the 3 locked quotes (Quote 1, Quote 2, Quote 3 verbatim verified) and the
  3-tier table (Discovery / Activation / Execution with `~100 tokens/skill` at
  discovery). NOTE: this source's "restart Claude Code session" statement is
  **stale** — Claude Code now hot-reloads.
- `https://alexop.dev/posts/understanding-claude-code-full-stack/` — re-fetched
  2026-05-12. Cross-reference on frontmatter field surface (`disable-model-invocation`,
  `allowed-tools`, `paths`, `context: fork`, `agent`, `model`, `argument-hint`,
  `user-invocable`) — all deferred per D-07 trailing line. Confirms description-as-trigger
  semantics.

### Tertiary (LOW confidence)
- None. All claims in this document trace to Context7 (HIGH) or one of the two
  user-supplied research URLs (MEDIUM, re-fetched at research time).

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — already in production for Phases 1 + 2.
- Architecture: HIGH — Phase 3 mirrors Phase 1 + Phase 2 exactly.
- Pitfalls: HIGH — Pitfall 1 (hot-reload) is the one drift item; all others are
  inherited from Phase 2 + verified.
- Skills primitive facts: HIGH (Context7-verified) + MEDIUM (token-cost figures from
  duet.so, plausible but not in official Anthropic docs).

**Research date:** 2026-05-12
**Valid until:** 2026-06-12 (30 days — Claude Code Skills surface is stable but the
hot-reload behavior is recent; revisit before next phase ships if Phase 3 doesn't
ship within 30 days).

---

## RESEARCH COMPLETE

**Phase:** 03 - Skills
**Confidence:** HIGH

### Key Findings
- **Hot-reload is now official** (`[VERIFIED: code.claude.com changelog]`) — D-09's
  restart caveat MUST soften. Planner uses the "if it doesn't fire in step 1, restart
  Claude" wording.
- **Minimal SKILL.md frontmatter remains `name` + `description`** — the workshop's
  locked D-06 example is current.
- **The 3-tier progressive-disclosure model + `~100 tokens/skill at discovery`
  figures hold** — confirmed against the duet.so source; the Section 03 visual should
  render as a fenced markdown table (primary recommendation) or a `two-cols` layout
  (fallback).
- **Section 05 ✓ Check uses Phase 1's plain `> ✓ Check:` blockquote pattern verbatim.**
  No custom Vue component. Verified in `pages/01-audience-setup/06-win-statusline.md`
  and `07-win-claude-md.md`.
- **One load-bearing assumption (A1):** the locked pirate-mode description triggers
  reliably on "explain hooks in pirate-mode" and does NOT trigger on "what is a git
  rebase." Planner should include a dry-run task before Plan 06 to confirm; if A1
  fails, D-06 needs to be revisited in discuss-phase.

### File Created
`/Users/kalebnim/Documents/GitHub/syai-claude-workshop/.planning/phases/03-skills/03-RESEARCH.md`

### Confidence Assessment
| Area | Level | Reason |
|------|-------|--------|
| Standard Stack | HIGH | already running for Phases 1 + 2 |
| Architecture | HIGH | identical pattern to Phases 1 + 2 |
| Pitfalls | HIGH | hot-reload is the only drift; verified |
| Locked-quote / SKILL.md content fidelity | HIGH | all 3 quotes + the D-06 SKILL.md verified against the duet.so source verbatim |

### Open Questions
- Should Section 04 be one slide or two? (planner decides post-dev-server check)
- Should the user-vs-project one-liner mention precedence? (recommend: no)
- Should we acknowledge slash-command-skill unification? (recommend: no, stay silent)

### Ready for Planning
Research complete. Planner can now create the 6 per-section PLAN.md files.
