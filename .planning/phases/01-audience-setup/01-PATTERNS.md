# Phase 1: Audience + Setup — Pattern Map

**Mapped:** 2026-05-12
**Files analyzed:** 8 (1 modify + 7 new)
**Analogs found:** 8 / 8 (note: codebase is greenfield for `pages/` — primary analog is `slides.md` headmatter + Phase 2 CSS contract; rest are RESEARCH-supplied canonical patterns since no prior section files exist)

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `slides.md` (MODIFY — append only) | orchestrator (root) | static-include | `slides.md` itself (existing structure) | self-analog |
| `pages/01-audience-setup.md` (NEW) | orchestrator (chapter) | static-include | `slides.md` `src:` pattern + RESEARCH Pattern 1 | role-match (one level down) |
| `pages/01-audience-setup/01-cover.md` (NEW) | section (cover) | static-render | `slides.md` cover slide (lines 19-26) | role-match |
| `pages/01-audience-setup/02-who-this-is-for.md` (NEW) | section (checklist) | static-render | RESEARCH Pattern 2 (section file shape) | no-prior-analog → use research |
| `pages/01-audience-setup/03-whats-covered.md` (NEW) | section (enumeration) | static-render | RESEARCH Pattern 2 | no-prior-analog → use research |
| `pages/01-audience-setup/04-claude-files-primer.md` (NEW) | section (file-tree, optional `<v-clicks>`) | static-render w/ reveal | RESEARCH Pattern 2 + Code Example "`<v-clicks>` for Section 04" | no-prior-analog → use research |
| `pages/01-audience-setup/05-win-statusline.md` (NEW) | section (terminal demo) | static-render | RESEARCH "Section 05 Win 1 demo block" + Phase 2 `style.css` lines 48-57 | no-prior-analog → use research |
| `pages/01-audience-setup/06-win-claude-md.md` (NEW) | section (terminal demo + ✓ Check) | static-render | RESEARCH Pattern 2 (two-slide shape) + "Inline rule line in a section file (Win 2)" | no-prior-analog → use research |

**Note on analog scarcity:** The repo currently has no `pages/` directory and no section markdown files. The only existing `.md` slide artifact is `slides.md`. Therefore the canonical patterns for new section files are sourced from (a) `slides.md`'s headmatter + cover-slide conventions, (b) Phase 2's `style.css` contract (which dictates how fenced code blocks render), and (c) RESEARCH.md's "Code Examples" section which captures verified Slidev syntax. Planner should treat the RESEARCH excerpts as the section-file template and `slides.md` as the orchestrator template.

## Pattern Assignments

### `slides.md` (MODIFY — orchestrator, static-include)

**Analog:** `slides.md` itself (the file we are modifying — append-only contract).

**Headmatter pattern — DO NOT TOUCH** (`slides.md` lines 1-18):
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

**Cover slide — DO NOT TOUCH** (`slides.md` lines 19-26):
```markdown
# syai-claude-workshop

advanced Claude Code workshop

<div class="text-sm opacity-60 mt-8">
  workshop content for v1.1 will be authored as <code>pages/*.md</code> chapters and re-linked via <code>src:</code> includes here
</div>
```

**Append pattern — the only edit** (append at EOF, after line 26):
```markdown
---
src: ./pages/01-audience-setup.md
---
```

Diff contract: first 26 lines remain byte-identical. Only addition is the 3-line frontmatter-only slide-block at file end (see RESEARCH Pitfall 6).

---

### `pages/01-audience-setup.md` (orchestrator, static-include)

**Analog:** `slides.md`'s implicit `src:` orchestration pattern, one level down. RESEARCH Pattern 1.

**Whole-file pattern (pure includes, no inline content)** — RESEARCH Pattern 1, Open Question 1 Option (a):
```markdown
---
src: ./01-audience-setup/01-cover.md
---
---
src: ./01-audience-setup/02-who-this-is-for.md
---
---
src: ./01-audience-setup/03-whats-covered.md
---
---
src: ./01-audience-setup/04-claude-files-primer.md
---
---
src: ./01-audience-setup/05-win-statusline.md
---
---
src: ./01-audience-setup/06-win-claude-md.md
---
```

**Path-resolution rule (RESEARCH Pitfall 3):** Relative `src:` resolves from `dirname(slide.filepath)`, i.e., from `pages/`. Use `./01-audience-setup/0N-*.md` — NOT `./pages/01-audience-setup/0N-*.md`.

**No headmatter:** Orchestrator file has zero leading frontmatter — the first `---` opens the first slide-block. (Slidev convention: a markdown file used purely as a slide source skips deck-level headmatter, which lives in `slides.md`.)

---

### `pages/01-audience-setup/01-cover.md` (section, cover)

**Analog:** `slides.md` cover slide (lines 19-26) — same role: terse heading + one-line subtitle + optional dim helper text.

**Frontmatter pattern** (RESEARCH Open Question 3 recommendation — `layout: center` since this is slide N, not slide 1):
```yaml
---
layout: center
---
```

**Body pattern** (mirrors `slides.md` cover composition: H1 + one-line provocation + optional dim subtitle):
```markdown
# Chapter 1 — Audience + Setup

<one-line provocation here>

<div class="text-sm opacity-60 mt-8">
  who this is for · what's covered · two wins before chapter 2
</div>
```

Style note: `text-sm opacity-60 mt-8` mirrors the dim-helper class composition from `slides.md` line 24. UnoCSS shortcut `text-dim` is also available (`uno.config.ts` line 24) — either is acceptable per Phase 2 D-08.

---

### `pages/01-audience-setup/02-who-this-is-for.md` (section, checklist)

**Analog:** No prior section file. Use RESEARCH Pattern 2 (section file with multiple slides) shape, single-slide variant.

**Whole-file pattern** (no per-slide frontmatter — default layout per CONTEXT D-14):
```markdown
# Who this is for

**We assume you can:**

- use git from the terminal
- read a JSON config
- follow a chat-LLM session
- have installed Claude Code (and run it at least once)

**We do NOT assume you've:**

- wired a hook
- written a skill
- spawned a subagent
```

**Tone rule (CONTEXT D-17 / QUAL-04):** No exclamation marks, no hype. Verbatim assumed-skills wording from CONTEXT D-09 and `specifics`.

---

### `pages/01-audience-setup/03-whats-covered.md` (section, enumeration)

**Analog:** No prior section file. Use RESEARCH Pattern 2, single-slide variant.

**Whole-file pattern:**
```markdown
# What's covered

1. **Hooks**
2. **Skills**
3. **Subagents**
4. **Agent SDK**

<div class="text-dim mt-6">in that order</div>
```

**Style note:** The `<div class="text-dim …">` uses the UnoCSS shortcut from `uno.config.ts` (line 24). Mirrors `slides.md` line 24's dim-helper composition. NO exclusions list per CONTEXT D-11.

---

### `pages/01-audience-setup/04-claude-files-primer.md` (section, file-tree)

**Analog:** No prior section file. Use RESEARCH Pattern 2 + Code Example "`<v-clicks>` for Section 04". RESEARCH Pitfall 2 + State of the Art correct CONTEXT D-12's tree.

**Frontmatter:** None (default layout).

**Body pattern — corrected tree (RESEARCH Pitfall 2):**
````markdown
# Where Claude reads from in your project

```text
./CLAUDE.md
./.claude/
  CLAUDE.md              (alternative location for project CLAUDE.md)
  settings.json          → Hooks (Chapter 2)
  settings.local.json    (gitignored; personal overrides)
  skills/                → Skills (Chapter 3)
  agents/                → Subagents (Chapter 4)
  commands/              (legacy — superseded by Skills)
  rules/                 (path-scoped; not today)
```

We'll teach the **bold 3**: `settings.json`, `skills/`, `agents/`.
````

**Critical correction (RESEARCH Pitfall 2):** `projects/` is REMOVED from the tree (it lives at `~/.claude/projects/`, not in the project-local layout). `commands/` carries the "(legacy — superseded by Skills)" footnote per RESEARCH State of the Art.

**Optional `<v-clicks>` variant** (RESEARCH Code Example, Open Question 2 — planner drafts WITHOUT first; retrofit only if pacing demands):
```html
<v-clicks>

- `./CLAUDE.md`
- `./.claude/settings.json` → Hooks
- `./.claude/settings.local.json` (gitignored)
- `./.claude/skills/` → Skills
- `./.claude/agents/` → Subagents
- `./.claude/commands/` (legacy — superseded by Skills)

</v-clicks>
```

Blank lines around the list are required (RESEARCH Code Example note: "Vue parsing").

---

### `pages/01-audience-setup/05-win-statusline.md` (section, terminal demo)

**Analog:** RESEARCH "Section 05 Win 1 demo block (re-shaped)" + `style.css` lines 48-57 (Shiki `<pre>` styling contract: tinted panel + 2px rust left rule already applied to any fenced block).

**Whole-file pattern (re-shaped per RESEARCH Pitfall 1 — NO preset picker):**
````markdown
# Win 1: Custom statusline in 30 seconds

Inside Claude Code, type:

```bash
> /statusline show model, repo, and context percentage as a progress bar
```

Claude generates a script in `~/.claude/statusline.sh` and wires it into
`~/.claude/settings.json`. You'll see:

```bash
✓ Wrote ~/.claude/statusline.sh
✓ Updated ~/.claude/settings.json
```

> ✓ Check: a status bar now sits at the bottom of your Claude Code window —
> showing the model, your folder, and a context-usage bar. Exact bar style
> depends on your model + session.
````

**Critical re-shape (RESEARCH Pitfall 1):** Section 05 must teach the natural-language `/statusline` flow, NOT a preset picker. CONTEXT D-05 wording about "picker" is overridden by RESEARCH Pitfall 1.

**Code-block style is inherited** from `style.css` lines 48-57 — no frontmatter needed to get the tinted panel + rust left rule. Block stays ≤25 lines per CONTEXT D-15.

---

### `pages/01-audience-setup/06-win-claude-md.md` (section, terminal demo + ✓ Check)

**Analog:** RESEARCH Pattern 2 (two-slide shape example, verbatim) + Code Example "Inline rule line in a section file (Win 2)".

**Two-slide pattern (slides separated by `---` mid-file):**
````markdown
# Win 2: Make Claude listen across sessions

Add this one line to `~/.claude/CLAUDE.md`:

```text
When in plan mode, always ask clarifying questions before you start planning.
```

Save and close.

---

# Why it sticks

Claude Code loads `~/.claude/CLAUDE.md` at the start of every session —
as a message attached to your conversation, not as enforced config.
Behavioral rules in there land in front of every prompt you send,
with no per-session ceremony.

> ✓ Check: `grep -c 'When in plan mode' ~/.claude/CLAUDE.md` returns `1`.
````

**Critical wording (RESEARCH Pitfall 4):** Slide 2 says "loads … as a message attached to your conversation, not as enforced config" — DO NOT say "system prompt." That phrasing is explicitly disclaimed by current Claude Code docs.

**Critical check (RESEARCH Pitfall 5):** Use `grep -c` NOT `cat` for the ✓ Check — survives whitespace + other-content variation.

**Rule wording is verbatim** from CONTEXT specifics: `When in plan mode, always ask clarifying questions before you start planning.` Use ` ```text ` not ` ```bash ` (it's prose, not a command).

**This section closes the chapter:** The Slide 2 ✓ Check IS the SET-02 sync-check per CONTEXT D-13. No separate Section 07 slide exists.

---

## Shared Patterns

### Pattern A: Frontmatter Convention Per Slide

**Source:** `slides.md` lines 1-18 (deck-level) + RESEARCH Pattern 2 (per-slide).

**Apply to:** All new section files.

**Rule:** Section files have minimal or zero per-slide frontmatter. The deck-level headmatter (theme, fonts, Shiki, `colorSchema: dark`) lives ONLY in `slides.md` and is never duplicated. Per-slide frontmatter is used sparingly — only when overriding layout (e.g., `layout: center` for `01-cover.md`).

```yaml
# Section-file slide frontmatter — only when layout override needed
---
layout: center
---
```

Most slides in this chapter need NO frontmatter (default layout).

---

### Pattern B: Fenced Code Block Style (Terminal + Prose)

**Source:** `style.css` lines 48-57 (the panel-styling contract — already wired, no edits) + `slides.md` headmatter `shiki.langs` (line 17).

**Apply to:** Sections 05 and 06 (terminal-style demos) and Section 04 (`text` tree).

**Available fence languages** (`slides.md` line 17): `ts`, `tsx`, `bash`, `json`, `md`, `yaml`. Plus implicit `text` for prose. Use:
- ` ```bash ` for commands and their output (Sections 05).
- ` ```text ` for prose rules (Section 06 slide 1 rule line).
- ` ```text ` for the file tree (Section 04).

**CSS contract** (auto-applied via `.slidev-layout pre[class*="shiki"]`):
```css
.slidev-layout pre[class*="shiki"] {
  background-color: var(--surface-code) !important;  /* #14110E */
  border-left: 2px solid var(--accent);              /* 2px rust rule */
  border-radius: 0;                                  /* sharp corners */
  border-top: 0; border-right: 0; border-bottom: 0;
  box-shadow: none;
  padding: 0.9rem 1.1rem;
}
```

**DO NOT** override this in section frontmatter or add new `<style>` blocks per section. CONTEXT code_context: "do NOT add new colors." Phase 2 CSS scoping is the source of truth.

**Block length cap:** ≤ 25 lines per CONTEXT D-15.

---

### Pattern C: `✓ Check` Callout (Markdown Blockquote, NOT a Component)

**Source:** RESEARCH "Don't Hand-Roll" table (last row) + Open Question A1.

**Apply to:** Section 05 (Win 1 check), Section 06 slide 2 (Win 2 check, doubles as SET-02 sync-check).

**Pattern** — single-line or wrapped blockquote prefixed with `✓ Check:`:
```markdown
> ✓ Check: `grep -c 'When in plan mode' ~/.claude/CLAUDE.md` returns `1`.
```

**Wrapped variant** (Section 05):
```markdown
> ✓ Check: a status bar now sits at the bottom of your Claude Code window —
> showing the model, your folder, and a context-usage bar. Exact bar style
> depends on your model + session.
```

**DO NOT** build a `<Check>` Vue component (RESEARCH "Don't Hand-Roll" — AUTH-01 deferred to v1.2). Default theme renders blockquotes legibly against the locked palette (Phase 2 D-01).

---

### Pattern D: Dim-Helper Text (Footer / Subtitle / "in that order" line)

**Source:** `slides.md` line 24 (`<div class="text-sm opacity-60 mt-8">…</div>`) + `uno.config.ts` line 24 (`text-dim` shortcut).

**Apply to:** Section 01 (cover subtitle), Section 03 ("in that order" closing line). Optional in Section 04 footnote.

**Two equivalent forms** (planner picks one consistently per section):
```html
<!-- Form 1: explicit UnoCSS classes (matches slides.md line 24) -->
<div class="text-sm opacity-60 mt-8">in that order</div>

<!-- Form 2: project shortcut (matches uno.config.ts line 24) -->
<div class="text-dim mt-6">in that order</div>
```

Either is acceptable per Phase 2 D-08 (every color flows through a shortcut OR through `slides.md`-style opacity utility — both are token-driven).

---

### Pattern E: `<v-clicks>` Reveal (Section 04 only, optional)

**Source:** RESEARCH Code Example "`<v-clicks>` for Section 04 file-tree" + Open Question 2.

**Apply to:** Section 04 ONLY, and ONLY if the planner/presenter wants row-by-row pacing. Default: skip.

**Pattern:**
```html
<v-clicks>

- item 1
- item 2

</v-clicks>
```

Blank lines around the inner list are mandatory (Vue parser requirement, RESEARCH Code Example note).

**DO NOT** use `<v-clicks>` in Sections 05 or 06 (CONTEXT D-16: "neither of the wins — they're already short").

---

### Pattern F: Tone Discipline (Body Text)

**Source:** CONTEXT D-17 / QUAL-04, mirrors v1.0 D-23.

**Apply to:** Every section file's body text.

**Rules:**
- No exclamation marks in body (headings allowed terse statements, no `!`).
- No hype words ("amazing", "magic", "powerful", "supercharge").
- No screenshots — terminal output rendered as fenced ` ```bash ` blocks only.
- Confident, terse, declarative.
- Sentence fragments fine where they aid scannability.

**Example violations to reject:**
- "Now Claude is supercharged!" → "Claude now reads the rule on every session."
- "Amazing! It works!" → no replacement — the slide doesn't need affirmation.

---

## No Analog Found

No section files exist in the repo. All section file patterns are sourced from RESEARCH.md's Code Examples + Pattern 1/2 templates (which are themselves verified against Slidev parser source and Claude Code docs). The orchestrator pattern is sourced from `slides.md`'s existing `src:`-readiness (its information block at line 4 explicitly anticipates this: "Phase 1 placeholder deck").

| File | Why no codebase analog | Substitute |
|------|------------------------|------------|
| All 6 section files | No `pages/` directory exists yet | RESEARCH Pattern 2 + Code Examples |
| `pages/01-audience-setup.md` orchestrator | First chapter file of v1.1 | RESEARCH Pattern 1 + `slides.md` `src:` convention |

## Metadata

**Analog search scope:**
- Repo root markdown: `slides.md`
- Existing components: `global-top.vue`
- Existing CSS: `style.css`
- Existing UnoCSS shortcuts: `uno.config.ts`
- `pages/`: does not exist
- `components/` subdirectory: empty (only root-level `global-top.vue`)

**Files scanned:** 5 (slides.md, style.css, global-top.vue, uno.config.ts, README.md not read but listed in tree)

**Pattern extraction date:** 2026-05-12

**Critical content-accuracy overrides (planner MUST honor):**
1. Section 05 — re-shape per RESEARCH Pitfall 1 (NL flow, NOT preset picker).
2. Section 04 — drop `projects/` from tree per RESEARCH Pitfall 2.
3. Section 06 slide 2 — use "message attached to your conversation, not enforced config" wording per RESEARCH Pitfall 4. Avoid "system prompt."
4. Section 06 ✓ Check — use `grep -c` not `cat` per RESEARCH Pitfall 5.
5. `slides.md` edit — append-only, do not touch lines 1-26 per RESEARCH Pitfall 6.
6. Nested `src:` path resolution — relative to importing file's dir per RESEARCH Pitfall 3.
