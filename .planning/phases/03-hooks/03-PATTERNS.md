# Phase 3: Hooks — Pattern Map

**Mapped:** 2026-05-12
**Files analyzed:** 7 (1 modify + 6 new)
**Analogs found:** 7 / 7 (every Phase 3 file has an exact Phase 1 analog now shipped under `pages/01-audience-setup/`)

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `slides.md` (MODIFY — append only) | orchestrator (root) | static-include | `slides.md` itself (lines 28-30 — existing Phase 1 `src:` block) | self-analog (exact) |
| `pages/03-hooks.md` (NEW) | orchestrator (chapter) | static-include | `pages/01-audience-setup.md` (full file, 21 lines) | exact |
| `pages/03-hooks/01-cover.md` (NEW) | section (cover) | static-render | `pages/01-audience-setup/01-cover.md` | exact |
| `pages/03-hooks/02-why-hooks.md` (NEW) | section (multi-slide prose + blockquotes) | static-render | `pages/01-audience-setup/02-prereqs-install.md` (multi-slide via `---`) + `07-win-claude-md.md` (blockquote framing) | exact (multi-slide) |
| `pages/03-hooks/03-how-hooks-work.md` (NEW) | section (single slide, fenced JSON + dim notes) | static-render | `pages/01-audience-setup/06-win-statusline.md` (single-slide demo with fenced blocks) | exact (single-slide demo) |
| `pages/03-hooks/04-hands-on-build.md` (NEW) | section (single slide, larger fenced JSON) | static-render | `pages/01-audience-setup/05-claude-files-primer.md` (large fenced block + optional `<style scoped>` shrink) | exact (large-block variant) |
| `pages/03-hooks/05-hands-on-fire.md` (NEW) | section (steps + two ✓ Check blockquotes) | static-render | `pages/01-audience-setup/06-win-statusline.md` + `07-win-claude-md.md` (✓ Check shape) | exact |

**Note on analog quality:** Unlike Phase 1 (greenfield, no `pages/` existed), Phase 3 has direct, shipped, byte-exact analogs for every file. Planner should **copy-paste Phase 1 file shapes and substitute Hook content**.

## Pattern Assignments

### `slides.md` (MODIFY — orchestrator, append-only)

**Analog:** `slides.md` itself, lines 28-30 (the existing Phase 1 include block).

**Headmatter — DO NOT TOUCH** (lines 1-18):
```yaml
---
title: syai-claude-workshop
info: |
  Advanced Claude Code workshop scaffold.
  Phase 1 placeholder deck.
class: text-center
drawings:
  persist: false
mdc: true
colorSchema: dark
fonts:
  sans: 'Inter'
  mono: 'JetBrains Mono'
highlighter: shiki
shiki:
  theme: 'vitesse-dark'
  langs: ['ts', 'tsx', 'bash', 'json', 'md', 'yaml']
---
```

**Cover slide — DO NOT TOUCH** (lines 20-26).

**Existing Phase 1 include — DO NOT TOUCH** (lines 28-30):
```markdown
---
src: ./pages/01-audience-setup.md
---
```

**Append pattern — the only edit** (append at EOF, after line 30):
```markdown
---
src: ./pages/03-hooks.md
---
```

Diff contract: lines 1-30 stay byte-identical. Only addition is a 3-line frontmatter-only slide-block at file end. Mirrors RESEARCH Pitfall 7 (carries forward Phase 1 Pitfall 6).

---

### `pages/03-hooks.md` (orchestrator, static-include)

**Analog:** `pages/01-audience-setup.md` (existing, 21 lines, ships).

**Full Phase 1 analog (verbatim, lines 1-22):**
```markdown
---
src: ./01-audience-setup/01-cover.md
---
---
src: ./01-audience-setup/02-prereqs-install.md
---
---
src: ./01-audience-setup/03-who-this-is-for.md
---
---
src: ./01-audience-setup/04-whats-covered.md
---
---
src: ./01-audience-setup/05-claude-files-primer.md
---
---
src: ./01-audience-setup/06-win-statusline.md
---
---
src: ./01-audience-setup/07-win-claude-md.md
---
```

**Phase 3 whole-file pattern** (substitute paths; 5 includes instead of 7):
```markdown
---
src: ./03-hooks/01-cover.md
---
---
src: ./03-hooks/02-why-hooks.md
---
---
src: ./03-hooks/03-how-hooks-work.md
---
---
src: ./03-hooks/04-hands-on-build.md
---
---
src: ./03-hooks/05-hands-on-fire.md
---
```

**Conventions carried (load-bearing):**
- **No leading frontmatter.** First line is `---` opening the first slide-block. (Verified against Phase 1 file: line 1 is `---`, no deck headmatter.)
- **Pure `src:`-only.** Zero inline content. Each block has exactly two `---` lines and one `src:` key.
- **Path is relative to `pages/`** (the importing file's directory): `./03-hooks/01-cover.md`, NOT `./pages/03-hooks/01-cover.md`. (Phase 1 Pitfall 3, still applies.)
- **Trailing newline after the final `---`.** Phase 1 file ends with `---\n`.

---

### `pages/03-hooks/01-cover.md` (section, cover)

**Analog:** `pages/01-audience-setup/01-cover.md` (12 lines, ships).

**Phase 1 analog verbatim (whole file):**
```markdown
---
layout: center
---

# Chapter 1 — Audience + Setup

before the deep chapters: who you are, what's coming, two quick wins

<div class="text-sm opacity-60 mt-8">
  who this is for · what's covered · two wins before chapter 2
</div>
```

**Load-bearing conventions to copy:**
- **Frontmatter:** `layout: center` (and only that key) — three-line frontmatter block.
- **H1:** `# Chapter N — <Title>` (em-dash, not hyphen). Phase 3 → `# Chapter 3 — Hooks`.
- **One-line provocation:** plain lowercase prose immediately under H1. No `!`. (Planner's discretion per CONTEXT.)
- **Dim subtitle div:** `<div class="text-sm opacity-60 mt-8">` with content using ` · ` (middle-dot) as separator. Phase 3 candidate: `why hooks · how they work · one chime you'll wire live`.
- **No trailing whitespace.** File ends with the closing `</div>` line + newline.

---

### `pages/03-hooks/02-why-hooks.md` (section, multi-slide prose + blockquotes)

**Analog (multi-slide pattern):** `pages/01-audience-setup/02-prereqs-install.md` (42 lines, 2 slides separated by mid-file `---`).
**Analog (blockquote-as-callout):** `pages/01-audience-setup/07-win-claude-md.md` line 35 (`> ✓ Check: …`).

**Multi-slide separator pattern (lines 17-19 of `02-prereqs-install.md`):**
```markdown
</div>

---

# Install Claude Code — 3 commands
```

The mid-file `---` is flanked by **blank lines on both sides**. No frontmatter precedes the second slide — default layout inherits.

**Dim helper variants seen in Phase 1** (use either, consistent within slide):
```html
<!-- Form 1 — explicit utilities (matches slides.md line 24 + 01-cover.md line 9) -->
<div class="text-sm opacity-60 mt-8">…</div>

<!-- Form 2 — text-dim shortcut (matches 02-prereqs-install.md line 14, 04-whats-covered.md line 8) -->
<div class="text-dim text-sm mt-6">…</div>
```

**Bold list pattern** (`02-prereqs-install.md` lines 3-8):
```markdown
**On your laptop:**

- macOS, Linux, or Windows (WSL recommended on Windows)
- a terminal you're comfortable in
```

**Phase 3 Section 02 shape (5 slides, locked content per D-02/D-03):**
- Slide 1 — IFTTT framing: H1 + bold list of three `IF → THEN` rows (mirror bold-list pattern above).
- Slide 2 — "THEN is just a shell command": H1 + 2-3 short prose lines.
- Slide 3 — Quote 1 (verbatim): H1 + markdown blockquote `> "…"`.
- Slide 4 — Quote 2 (verbatim) + Phase 1 callback: H1 + blockquote + dim-helper div referencing `~/.claude/CLAUDE.md` (RESEARCH Pitfall 6: path must be byte-exact).
- Slide 5 — Quote 3 (verbatim): H1 + blockquote.

**Callback dim helper pattern for Slide 4** (matches `02-prereqs-install.md` `text-dim` form):
```html
<div class="text-dim text-sm mt-6">
  the rule you put in <code>~/.claude/CLAUDE.md</code> in Chapter 1 — that's the imperfect version of a hook
</div>
```

**Blockquote rendering** — Phase 1 uses bare `>` blockquotes; default theme renders them legibly against the locked palette. No custom component.

---

### `pages/03-hooks/03-how-hooks-work.md` (section, single-slide demo)

**Analog:** `pages/01-audience-setup/06-win-statusline.md` (19 lines, single slide, two fenced ` ```bash ` blocks + blockquote).

**Phase 1 analog verbatim (whole file):**
```markdown
# Win 1: Custom statusline in 30 seconds

Inside Claude Code, type:

```bash
> /statusline show model, repo, and context percentage as a progress bar
```

Claude generates a script in `~/.claude/statusline.sh` and wires it into `~/.claude/settings.json`. You'll see:

```bash
✓ Wrote ~/.claude/statusline.sh
✓ Updated ~/.claude/settings.json
```

> ✓ Check: a status bar now sits at the bottom of your Claude Code window —
> showing the model, your folder, and a context-usage bar. Exact bar style
> depends on your model + session.
```

**Load-bearing conventions to copy:**
- **No frontmatter.** File starts directly with `# H1`.
- **Fenced blocks use bare language tag** (` ```bash `, ` ```json `, ` ```text `) — no Shiki `{1,3-4}` line-highlighting flags used anywhere in Phase 1. Plain fences only.
- **Prose between code blocks** is plain markdown — short, terse sentences with inline `<code>` for paths (` `~/.claude/settings.json` `).
- **Code-block CSS contract is automatic** — `style.css` `.slidev-layout pre[class*="shiki"]` already applies the tinted panel + 2px rust left rule. No per-slide style needed.

**Phase 3 substitutions:**
- H1 → `# How hooks work`.
- Two bold bullet event lines (`**Stop**` / `**Notification**`) per RESEARCH Pattern 4.
- One fenced ` ```json ` block (Stop-only minimal shape per CONTEXT D-06, verified canonical in RESEARCH).
- Cross-OS notes rendered as a **dim helper div with inline `<code>` tags** OUTSIDE the JSON fence (Pitfall 2 — no comments in JSON):
  ```html
  <div class="text-dim text-sm mt-4">

  - Linux / WSL → swap `afplay` for `aplay /usr/share/sounds/alsa/Front_Center.wav`
  - Native Windows → easiest path today is to run Claude Code inside WSL so afplay/aplay and shell paths work

  </div>
  ```
- Trailing "more exist" line as a smaller dim helper (`text-dim text-xs mt-4`) with inline-coded event names.

**Critical:** JSON fence is ` ```json `, NOT ` ```bash `. Shiki has `json` registered in `slides.md` line 17 `langs:` list.

---

### `pages/03-hooks/04-hands-on-build.md` (section, single-slide large-block paste)

**Analog:** `pages/01-audience-setup/05-claude-files-primer.md` (47 lines — large fenced ` ```text ` block + `<style scoped>` font-shrink).

**Phase 1 analog — the load-bearing `<style scoped>` font-shrink pattern (lines 36-47):**
```html
<style scoped>
pre, code {
  font-size: 0.7rem !important;
  line-height: 1.15 !important;
}
.slidev-code {
  padding: 0.6em 0.9em !important;
}
h1 {
  margin-bottom: 0.4em !important;
}
</style>
```

**When to apply:** Only if the rendered block visually overflows at presenter resolution. Phase 1 used this for a 27-line file tree. Phase 3 Section 04's JSON is ~22 lines — **draft WITHOUT first**, retrofit only at Plan 06 spot-check (RESEARCH Open Question 3).

**H1 with caption pattern** (`05-claude-files-primer.md` lines 1-3):
```markdown
# Where Claude reads from in your project

<div class="text-dim text-sm -mt-2 mb-2">your typical Next.js stack — Claude touchpoints flagged ◀</div>
```

Note the `-mt-2 mb-2` micro-spacing utility — used when the dim caption sits immediately under H1 (vs `mt-6`/`mt-8` for trailing helpers).

**Phase 3 substitutions:**
- H1 → `# Wire it: paste this into ~/.claude/settings.json` (or similar; planner discretion).
- One short prose line before fence: *"Notification has the same shape — we just repeat it."* (per CONTEXT D-08).
- Single fenced ` ```json ` block with full Stop+Notification structure (RESEARCH Code Example, ~22 lines).
- Trailing dim helper div with Linux/WSL substitution note.

---

### `pages/03-hooks/05-hands-on-fire.md` (section, steps + ✓ Check blockquotes)

**Analog:** `pages/01-audience-setup/06-win-statusline.md` (✓ Check shape) + `pages/01-audience-setup/07-win-claude-md.md` (✓ Check shape, lines 33-35).

**Phase 1 ✓ Check patterns — both shipped variants:**

*Single-line variant* (`07-win-claude-md.md` line 35):
```markdown
> ✓ Check: `grep -c 'When in plan mode' ~/.claude/CLAUDE.md` returns `1`.
```

*Wrapped multi-line variant* (`06-win-statusline.md` lines 16-18):
```markdown
> ✓ Check: a status bar now sits at the bottom of your Claude Code window —
> showing the model, your folder, and a context-usage bar. Exact bar style
> depends on your model + session.
```

**Load-bearing conventions:**
- **`✓` is a literal Unicode check** (U+2713), not `✓` or `&check;`. Phase 1 uses the bare glyph.
- **Prefix is exactly `> ✓ Check: `** (space-colon-space after `Check`).
- **Continuation lines repeat `> `** for multi-line wrap (standard markdown blockquote).
- **Inline `<code>` (backticks) inside the blockquote** is supported and renders correctly.
- **Italics inside ✓ Check** — use markdown `*different*` for emphasis (RESEARCH Pattern 6 example).

**Bold-step inline prose pattern** (carry from `02-prereqs-install.md` bold-paragraph style):
```markdown
**Step 1 — Trigger `Stop`:** run `claude`, ask a quick thing, wait for it to finish.

> ✓ Check: you hear a chime when Claude finishes.

**Step 2 — Trigger `Notification`:** ask Claude to run something it needs permission for (e.g. `run rm -rf /tmp/foo`).

> ✓ Check: you hear a *different* chime when Claude asks for input.
```

**Closing dim line** (matches `04-whats-covered.md` line 8 `text-dim mt-6` form):
```html
<div class="text-dim mt-6">
  Two events, same shape. Add more later — that's the whole pattern.
</div>
```

---

## Shared Patterns

### Pattern A — Frontmatter Convention

**Source:** Phase 1 actual files (all 7 inspected).

**Apply to:** All Phase 3 section files.

**Rule:** Per-slide frontmatter only when overriding layout. Phase 1 uses frontmatter in ONE file only: `01-cover.md` (`layout: center`). Every other section file (6 of 7) has **zero frontmatter** and starts with `# H1` on line 1.

```yaml
# Phase 3 application
# - 01-cover.md           → frontmatter `layout: center` (3 lines)
# - 02-why-hooks.md       → no frontmatter, starts with `# IF this, THEN that`
# - 03-how-hooks-work.md  → no frontmatter, starts with `# How hooks work`
# - 04-hands-on-build.md  → no frontmatter, starts with `# Wire it: …`
# - 05-hands-on-fire.md   → no frontmatter, starts with `# Fire it`
```

### Pattern B — Fenced Code Block Style (Verbatim from Phase 1)

**Source:** `slides.md` line 17 (`langs: ['ts', 'tsx', 'bash', 'json', 'md', 'yaml']`) + Phase 1 actual fence usage.

**Apply to:** All fenced blocks in Phase 3.

**Fence language inventory (Phase 1 actual usage):**
- ` ```bash ` — terminal commands and output (e.g., `02-prereqs-install.md`, `06-win-statusline.md`).
- ` ```text ` — prose-as-code and ASCII diagrams (e.g., `05-claude-files-primer.md` file tree, `07-win-claude-md.md` rule line + flow diagram).

**Phase 3 adds:**
- ` ```json ` — Sections 03 and 04. `json` is already in `slides.md` `langs:` list. **Confirmed via Phase 1 RESEARCH — no Shiki headmatter edit needed.**

**No Shiki annotations used in Phase 1:** No `{1,3}` line-highlighting, no `[!code highlight]`, no `[!code ++]`/`[!code --]`. Phase 3 follows suit — bare fence + language tag only.

**Auto-styling contract:** `.slidev-layout pre[class*="shiki"]` in `style.css` applies tinted panel + 2px rust left rule. **Do not override** with per-slide `<style>` blocks except for the documented font-shrink case (see Pattern G).

### Pattern C — ✓ Check Callout (Markdown Blockquote)

**Source:** `06-win-statusline.md` lines 16-18 (wrapped) + `07-win-claude-md.md` line 35 (single-line).

**Apply to:** Section 05 (two ✓ Checks, one per step).

**Rules:**
- Literal `✓` Unicode glyph (U+2713).
- Prefix exactly `> ✓ Check: `.
- Wrapped continuations repeat `> `.
- No `<Check>` Vue component — bare blockquote.

### Pattern D — Dim Helper Text (Three Variants Seen in Phase 1)

**Source:** Phase 1 files (multiple).

**Apply to:** Subtitles, footnotes, callbacks, captions.

**Variant 1 — Cover subtitle** (`01-cover.md` line 9, mirrors `slides.md` line 24):
```html
<div class="text-sm opacity-60 mt-8">…</div>
```

**Variant 2 — Below-content footer** (`02-prereqs-install.md` line 14, `03-who-this-is-for.md` style, `04-whats-covered.md` line 8):
```html
<div class="text-dim text-sm mt-6">…</div>
<!-- or just text-dim with mt-6 -->
<div class="text-dim mt-6">…</div>
```

**Variant 3 — Tight caption under H1** (`05-claude-files-primer.md` line 3):
```html
<div class="text-dim text-sm -mt-2 mb-2">…</div>
```

**Phase 3 mapping:**
- Section 01 cover subtitle → Variant 1 (mirror `01-cover.md`).
- Section 02 Slide 4 callback → Variant 2.
- Section 03 cross-OS notes → Variant 2.
- Section 03 "more exist" line → Variant 2 with `text-xs` (tiny).
- Section 04 trailing footnote → Variant 2.
- Section 05 closing line → Variant 2 with bare `text-dim`.

### Pattern E — Multi-Slide File via Mid-file `---`

**Source:** `02-prereqs-install.md` lines 17-19 (only multi-slide section file shipped in Phase 1) and `07-win-claude-md.md` mid-file `<div class="mt-10" />` (not a slide separator — single slide).

**Apply to:** Section 02 (5 slides in one file).

**Rule:** Mid-file `---` separator flanked by **blank lines on both sides**. No frontmatter precedes subsequent slides (default layout inherits per-slide). Each slide begins with `# H1`.

```markdown
… end of slide 1 content …

---

# Slide 2 H1
```

### Pattern F — Bold Inline Step Prefix

**Source:** `02-prereqs-install.md` lines 3, 10 (`**On your laptop:**`, `**From us (today only):**`).

**Apply to:** Section 05 Step 1 / Step 2 labels.

```markdown
**Step 1 — Trigger `Stop`:** prose continues on same line…
```

Note: bold label is **inline at start of paragraph**, NOT a heading. Period after the label is replaced with `:` or em-dash.

### Pattern G — `<style scoped>` Font Shrink (Conditional)

**Source:** `05-claude-files-primer.md` lines 36-47.

**Apply to:** Section 04 ONLY IF the full Stop+Notification JSON visually overflows at presenter resolution.

```html
<style scoped>
pre, code {
  font-size: 0.7rem !important;
  line-height: 1.15 !important;
}
.slidev-code {
  padding: 0.6em 0.9em !important;
}
h1 {
  margin-bottom: 0.4em !important;
}
</style>
```

**Decision policy:** Draft Section 04 WITHOUT this block. Plan 06 (build + presenter spot-check) decides whether to retrofit. RESEARCH Open Question 3.

### Pattern H — Tone Discipline

**Source:** CONTEXT D-13 / QUAL-04; verified across all 7 Phase 1 section files — zero `!` in body, zero hype words.

**Apply to:** Every Phase 3 section file body.

**Rules (carried verbatim from Phase 1):**
- No `!` in body text (headings: terse statements, no `!`).
- No hype ("amazing", "magic", "powerful", "supercharge").
- No screenshots — terminal output as fenced ` ```bash ` blocks only.
- Lowercase prose under H1s is fine and idiomatic (see `01-cover.md` line 7).
- Em-dashes ` — ` (not hyphens) for asides; middle-dots ` · ` in subtitle separators.

---

## No Analog Found

None. Every Phase 3 file has a direct, shipped, byte-exact Phase 1 analog. RESEARCH confirms no new components, no new CSS, no new patterns required.

| File | Status |
|------|--------|
| All 7 Phase 3 files | Direct analog in `pages/01-audience-setup/` |

---

## Critical Content-Accuracy Overrides (Planner MUST Honor)

These overlay the structural patterns above. Carried from RESEARCH Pitfalls.

1. **Section 02 quotes are verbatim, no edits** (D-03 + Pitfall 6). Blockquote text matches CONTEXT D-03 byte-for-byte. No "fixing" capitalization or punctuation.
2. **Section 02 Slide 4 callback uses exact path `~/.claude/CLAUDE.md`** (Pitfall 6 — load-bearing). Not `./CLAUDE.md`, not `claude.md`.
3. **Section 03 JSON shape is byte-identical to canonical** (RESEARCH §HOOK-02 + State of the Art). No `"matcher"`, no `"name"`, no `"version"` fields.
4. **NO comments inside any ` ```json ` fence** (Pitfall 2). Cross-OS notes go in `<div class="text-dim …">` OUTSIDE the fence.
5. **Section 03 Windows wording softened** (Pitfall 1) — frame WSL as practical recommendation for *this hands-on*, not as a Claude Code requirement.
6. **Section 03/04 Linux path is `/usr/share/sounds/alsa/Front_Center.wav`** (Pitfall 4). Never `.oga` with `aplay`.
7. **Section 04 Notification block omits `"matcher"`** (Pitfall 3). Catches all notification subtypes.
8. **Section 05 ✓ Checks use literal `✓` glyph + `> ` blockquote prefix** (Phase 1 actual rendering).
9. **`slides.md` edit is append-only at EOF** (Pitfall 7). Lines 1-30 stay byte-identical.
10. **Nested `src:` paths are relative to importing file's directory** (Phase 1 Pitfall 3). `./03-hooks/01-cover.md`, NOT `./pages/03-hooks/01-cover.md`.

---

## Metadata

**Analog search scope:**
- `slides.md` (orchestrator headmatter + cover + Phase 1 include)
- `pages/01-audience-setup.md` (chapter orchestrator)
- `pages/01-audience-setup/*.md` (all 7 section files: `01-cover`, `02-prereqs-install`, `03-who-this-is-for`, `04-whats-covered`, `05-claude-files-primer`, `06-win-statusline`, `07-win-claude-md`)
- `.planning/phases/01-audience-setup/01-PATTERNS.md` (Phase 1 pattern map — direct precedent)
- `style.css` reference (auto-applied code-block contract; not re-read here, already documented in Phase 1 PATTERNS)

**Files scanned:** 11

**Pattern extraction date:** 2026-05-12

**Confidence:** HIGH. Every pattern sourced from a shipped, in-repo Phase 1 file. Zero speculation. RESEARCH-verified content accuracy overlays the structural patterns.
