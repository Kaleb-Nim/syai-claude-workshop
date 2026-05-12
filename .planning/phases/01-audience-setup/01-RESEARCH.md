# Phase 1: Audience + Setup - Research

**Researched:** 2026-05-12
**Domain:** Slidev chapter authoring (nested `src:` orchestration) + Claude Code feature accuracy (`/statusline`, CLAUDE.md loading, `./.claude/` layout)
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Section breakdown (D-01..D-04):** Chapter 1 = 6 sections + 1 closing build plan = 7 plans total. Section files:
- `pages/01-audience-setup/01-cover.md` — chapter cover (one-line provocation)
- `pages/01-audience-setup/02-who-this-is-for.md` — assumed-skills checklist (AUD-01)
- `pages/01-audience-setup/03-whats-covered.md` — 4-chapter enumeration (AUD-02)
- `pages/01-audience-setup/04-claude-files-primer.md` — project-local `./.claude/` layout primer
- `pages/01-audience-setup/05-win-statusline.md` — Win 1 (SET-01)
- `pages/01-audience-setup/06-win-claude-md.md` — Win 2 (SET-01) + closing sync-check (SET-02)
- Plan 07: `bunx slidev build` + presenter spot-check (QUAL-01)

**Orchestration (D-02):** `pages/01-audience-setup.md` is the chapter-level orchestrator; `slides.md` includes it via `src:`. Chapter orchestrator then includes section files via `src:`. (Nested `src:` — verified supported below.)

**The Two Wins (D-05..D-08):**
- **Win 1 — `/statusline`** (Section 05): Run `/statusline` inside Claude Code. (Behavior re-validated below; user-supplied "preset picker" framing is INCORRECT in current Claude Code — re-shape required.)
- **Win 2 — `CLAUDE.md` rule** (Section 06): Participants add the exact rule `When in plan mode, always ask clarifying questions before you start planning.` to `~/.claude/CLAUDE.md`. `✓ Check`: `cat ~/.claude/CLAUDE.md` shows the line.
- **Win order:** statusline first, CLAUDE.md second (per D-07).
- **No before/after live demo** of the plan-mode rule firing — one slide writes the rule, the next explains why it sticks across sessions.

**Section 04 file tree (D-12):** Show full `./.claude/` project-local tree. Bold the 3 taught items (`settings.json`, `skills/`, `agents/`). Caveats below — `projects/` is a `~/.claude/` artifact, not project-local; tree must be corrected before slide-write.

**Section 02 checklist (D-09):** Bulleted "We assume you can" + "We do NOT assume you've" — the "do NOT" half is the workshop's actual delta.

**Section 03 enumeration (D-10..D-11):** `1. Hooks  2. Skills  3. Subagents  4. Agent SDK` with "(in that order)" closing line. NO exclusions list.

**Slide-level shape (D-14..D-17):**
- Per-slide `---` separator with minimal frontmatter.
- No `layout: section` inside Chapter 1 (only between chapters, and chapter boundary already lives in `slides.md`).
- Code blocks ≤25 lines. Terminal blocks = plain fenced ` ```bash ` / ` ```sh `. No custom `<Cmd>` Vue component.
- `<v-clicks>` used sparingly — Section 04 file tree is the one candidate.
- Tone: confident, terse, no hype, no exclamation marks, no screenshots (QUAL-04).

**Stack (locked, do NOT re-evaluate):** Slidev `^52.15` (installed: 52.15.1 — verified in `node_modules/@slidev/cli/package.json`) + Bun + Vercel + Node ≥ 20.12. Default theme + custom CSS. Shiki `vitesse-dark`. No Monaco. No `<Cmd>` component.

### Claude's Discretion

- Exact cover-slide one-liner (Section 01).
- Slides per section (1–3 typical; Section 04 may need 2).
- Whether Section 04 uses `<v-clicks>` for the file-tree reveal.
- Whether `✓ Check` is a styled fenced block or a Vue component — defer to v1.0 pattern; v1.0 never built a callout component (none exists in `components/`), so **use a styled fenced block** (`> ✓ Check: …` blockquote OR markdown bold prefix in a `bash` block). No component build.
- Exact wording of Section 05's Win 1 demo (researcher recommends below given the natural-language `/statusline` behavior).

### Deferred Ideas (OUT OF SCOPE)

- Global vs project `./.claude/` precedence/merge teaching beyond what Sections 04+06 cover.
- Slash commands / plugins as chapter content or as exclusions on the what's-covered slide.
- MCP, Plan Mode deep-dive, copy-to-clipboard button, persistent sidebar.
- Before/after live demo of the plan-mode rule firing.
- `<Cmd>` Vue component for terminal blocks (AUTH-01 — v1.2+).
- Two-column "you are / you're not yet" layout for Section 02.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AUD-01 | Establish who the workshop is for | Section 02 checklist — confirmed framing supported by Slidev default `layout` + bullet rendering. No technical risk. |
| AUD-02 | Establish what's covered (Hooks, Skills, Subagents, SDK) and what's excluded | Section 03 enumeration. CONTEXT D-11 dropped the exclusions list — accepted. |
| SET-01 | At least two small immediate Claude wins | Win 1 (`/statusline`) — Claude Code docs confirm `/statusline` accepts NL instructions and generates a script; **re-shape needed** (see Section 05 below). Win 2 (`CLAUDE.md` rule) — verified loading semantics support the slide's "why it works" claim. |
| SET-02 | Sync-check before Chapter 2 | Folded into Section 06's closing `✓ Check`. Verifiable via `cat ~/.claude/CLAUDE.md`. |
| QUAL-01 | `bunx slidev build` exits 0 + presenter spot-check | Closing plan 07. `bunx slidev build` flow verified (project already builds clean). |
| QUAL-02 | Atomic per-section commits | Discipline, not a technical research target. |
| QUAL-04 | Tone discipline | Drives slide-writing only; no research dependency. |

</phase_requirements>

## Summary

Phase 1 is a 6-section authoring phase plus a build/spot-check closer. The technical machinery (Slidev `src:` chains, default layouts, fenced bash blocks, `<v-clicks>`) is straightforward and well-supported. The substantive research risk lives in **two content-accuracy claims** that, left unchecked, would make Sections 05 and 06 wrong:

1. **`/statusline` is NOT a preset picker.** It accepts natural-language descriptions and generates a custom shell script in `~/.claude/`, then wires it into `~/.claude/settings.json`. There are no preset names. Section 05 must be re-shaped around the NL flow.
2. **`./.claude/` project-local layout does NOT contain `projects/`.** That directory lives in `~/.claude/projects/<project>/`. The file-tree in Section 04 must be corrected. `commands/` is canonical but the docs flag it as merged into Skills going forward — keep `commands/` on the tree with an "(superseded by Skills)" footnote rather than dropping it.

A third anchor — nested `src:` import support — was flagged as needing verification in CONTEXT (D-02). **Confirmed: Slidev's parser recursively resolves `src:` at any depth.** The intended `slides.md → pages/01-audience-setup.md → pages/01-audience-setup/0N-*.md` structure works without preparser tricks.

**Primary recommendation:** Adopt the 6-section structure as written; **re-shape Section 05** to teach `/statusline` via natural-language prompt + observation of generated script + observation of bottom-of-terminal output (no preset names); **correct the Section 04 tree** to drop `projects/` and footnote `commands/`; proceed with nested-`src:` chapter orchestrator pattern as planned.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Chapter orchestration (`slides.md` → chapter file) | Slidev parser (build time) | — | Slidev's `src:` frontmatter is resolved at deck-load time by `@slidev/parser`'s `loadSlide` (verified in source). |
| Section file rendering | Slidev runtime (Vue/Vite SPA) | Shiki | Each section file emits 1+ slides via standard markdown + Slidev frontmatter. |
| Code/terminal block presentation | Shiki (build-time syntax highlight) | Default Slidev CSS + project `style.css` (rust left rule per Phase 2 D-05) | All terminal demos use ` ```bash ` or ` ```sh ` fenced blocks. |
| Click-driven reveal (Section 04 only) | Slidev `<v-clicks>` Vue component | — | Run-time DOM directives; not a build concern. |
| Progress feedback during chapter | `global-top.vue` (locked, untouched) | — | Already wired to `useNav().currentPage / total`. |
| Build verification (QUAL-01) | `bunx slidev build` | — | CLI exit-code + presenter mode visual spot-check. |
| Win 1 demo (`/statusline`) | Claude Code CLI runtime (participant's machine, OUT of deck) | Slidev fenced block (deck-rendered hint) | The deck shows the command to type; the actual mechanism lives in the participant's installed Claude Code. |
| Win 2 demo (`CLAUDE.md` rule) | Filesystem (`~/.claude/CLAUDE.md`) on participant machine | Slidev fenced block | Same — deck shows the line; the runtime change lives outside the deck. |

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@slidev/cli` | 52.15.1 [VERIFIED: `node_modules/@slidev/cli/package.json`] | Markdown → SPA build pipeline | Locked from v1.0; project constraint. |
| `@slidev/parser` | bundled with cli (52.15.x) [VERIFIED: source inspection] | Resolves `src:` imports recursively at load time | Provides the nested-`src:` support Section orchestrator pattern requires. |
| `@slidev/theme-default` | bundled, `latest` per package.json | Slide layouts (`default`, `cover`, `center`, `two-cols`, `section`, …) | Locked. |
| Shiki | bundled with Slidev | Syntax highlight for ` ```bash `, ` ```sh `, ` ```json `, ` ```md ` | Phase 2 theme already wires `vitesse-dark`. |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `<v-clicks>` | built-in Slidev component [CITED: https://sli.dev/guide/animations.html] | Wrap a list to reveal items one click at a time | Section 04 tree, IF the planner decides the row-by-row reveal helps pacing. Otherwise omit. |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Nested `src:` chapter orchestrator | Single-level `slides.md` → `pages/01-audience-setup.md` with all 6 sections concatenated in one file | Loses per-section atomic-commit clarity (QUAL-02 wants one commit per section file). Nested `src:` is the better fit and is verified-supported. |
| Nested `src:` chapter orchestrator | `slides.md` directly includes all 6 section files (skipping the chapter file) | Loses the chapter-as-unit boundary; CONTEXT D-02 explicitly wants the chapter file to mirror the v1.0 `slides.md` pattern one level down. |
| Bullet list with `<v-clicks>` | Plain bullet list, no animation | Acceptable. `<v-clicks>` is opt-in per CONTEXT D-16. Recommend skipping unless presenter-mode pacing tests poorly. |

**Installation:** No new dependencies. `@slidev/cli@^52.15` and `@slidev/theme-default@latest` already in `package.json`.

**Version verification:**
```bash
node -e "console.log(require('@slidev/cli/package.json').version)"
# → 52.15.1 (verified 2026-05-12)
```

## Architecture Patterns

### System Architecture Diagram

```
slides.md (locked headmatter: theme/fonts/Shiki/colorSchema)
  │
  ├── cover slide (existing — Phase 1 leaves it alone)
  │
  └── ─── frontmatter: src: ./pages/01-audience-setup.md ──┐
                                                            │
                                                            ▼
              pages/01-audience-setup.md  (chapter orchestrator — NEW)
                  │
                  ├── (optional) chapter-cover slide if not delegated to 01-cover.md
                  │
                  ├─── src: ./01-audience-setup/01-cover.md   ──► 1 slide
                  ├─── src: ./01-audience-setup/02-who-this-is-for.md  ──► 1 slide
                  ├─── src: ./01-audience-setup/03-whats-covered.md    ──► 1 slide
                  ├─── src: ./01-audience-setup/04-claude-files-primer.md ──► 1–2 slides
                  ├─── src: ./01-audience-setup/05-win-statusline.md   ──► 2–3 slides
                  └─── src: ./01-audience-setup/06-win-claude-md.md    ──► 2 slides (rule + why-it-sticks)

                  ▼
              @slidev/parser (loadSlide recurses through src: at any depth — verified in fs.mjs)
                  ▼
              SPA build (Vite under the hood) → dist/
                  ▼
              Vercel auto-deploy on push to main
```

**Nested `src:` is verified-supported.** From `@slidev/parser` source (`dist/fs.mjs`, lines 36–92): `loadSlide` checks each slide's `frontmatter.src` and, when present, calls `loadMarkdown(path, …)` which in turn iterates the loaded file's slides through `loadSlide` again. There is no depth limit, and `importChain` is threaded through for cycle awareness. Path resolution: `src:` starting with `/` resolves from `userRoot`; otherwise from `dirname(slide.filepath)`. So `pages/01-audience-setup.md` using `src: ./01-audience-setup/01-cover.md` resolves to `pages/01-audience-setup/01-cover.md` correctly. [VERIFIED: source inspection]

### Recommended Project Structure (additions only)

```
pages/                              # NEW directory
├── 01-audience-setup.md            # NEW — chapter orchestrator
└── 01-audience-setup/              # NEW — section files live here
    ├── 01-cover.md
    ├── 02-who-this-is-for.md
    ├── 03-whats-covered.md
    ├── 04-claude-files-primer.md
    ├── 05-win-statusline.md
    └── 06-win-claude-md.md
```

`slides.md` gains exactly one new slide-block at the end:
```markdown
---
src: ./pages/01-audience-setup.md
---
```

No headmatter changes. No `style.css` changes. No new components.

### Pattern 1: Chapter Orchestrator File

**What:** A markdown file that contains zero or one "chapter cover" slide and then a series of frontmatter-only slide blocks that `src:`-import section files.

**When to use:** Every v1.1 chapter (this is the chapter-shape we lock for Phases 2–5 as well).

**Example — `pages/01-audience-setup.md`:**
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

Each `---\nsrc: …\n---` block is a slide whose content is fully replaced by the imported file (Slidev docs: "the original content of the slide will be ignored" [CITED: https://sli.dev/features/importing-slides.html]). The imported file may contain multiple slides separated by its own `---` blocks; the parser flattens them inline. The chapter cover ("Chapter 1: Audience + Setup") therefore lives in `01-cover.md`, not in the orchestrator.

### Pattern 2: Section File With Multiple Slides

**What:** A section file may contain 1, 2, or 3 slides separated by `---`. Frontmatter (e.g., `layout: center`) attaches to the slide it precedes.

**Example — Section 06 (`06-win-claude-md.md`) two-slide shape:**
```markdown
# Win 2: Make Claude listen across sessions

Add this one line to **~/.claude/CLAUDE.md**:

\`\`\`bash
When in plan mode, always ask clarifying questions before you start planning.
\`\`\`

Save the file. That's it.

<!-- presenter note: don't demo plan mode here, see Section 06 slide 2 -->

---

# Why it sticks

Claude Code reads `~/.claude/CLAUDE.md` at the start of every session.
The rule lands in context before your first prompt, every time —
no `/reload`, no copy-paste, no per-session reminder.

> ✓ Check: `cat ~/.claude/CLAUDE.md` shows the rule on its own line.
```

### Pattern 3: Terminal-Style Fenced Block (No Custom Component)

**What:** Plain fenced ` ```bash ` block. Phase 2's `style.css` already gives every Shiki `<pre>` a tinted panel (`--surface-code: #14110E`) + 2px rust left rule. No `<Cmd>` component needed.

**Example:**
````markdown
```bash
$ claude
> /statusline show model name, repo, and context percentage as a bar
✓ Wrote ~/.claude/statusline.sh
✓ Updated ~/.claude/settings.json
```
````

### Anti-Patterns to Avoid

- **Don't add a `layout: section` slide inside Chapter 1.** CONTEXT D-14 explicitly bans within-chapter section dividers. The chapter cover (`01-cover.md`) is the only chapter-level "rest spot."
- **Don't hand-write a copy-to-clipboard button.** Deferred per project Out-of-Scope; Phase 1 doesn't need it.
- **Don't introduce new colors.** Phase 2 `.slidev-layout`-scoped CSS is the source of truth; Section authoring uses UnoCSS shortcuts (`text-main`, `text-dim`, `text-accent`) only when needed.
- **Don't fabricate `/statusline` preset names.** No presets exist in current Claude Code (see Common Pitfalls).
- **Don't put `projects/` under `./.claude/` in the file tree.** It's a `~/.claude/projects/` artifact (per-machine auto-memory store), not project-local. (See pitfalls + Section 04 below.)
- **Don't `cat` a file in a `✓ Check` and expect identical output across participants.** Use a precise check that survives line-ending and trailing-whitespace differences (e.g., `grep -c 'When in plan mode' ~/.claude/CLAUDE.md` → expects `1`).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Step-by-step bullet reveal | Custom JS event listeners | Slidev `<v-clicks>` (`depth=N`, `every=N` props) [CITED: https://sli.dev/guide/animations.html] | Built-in, presenter-mode aware, click-counter integrated. |
| Terminal-style code block | Custom `<Cmd>` Vue component | Plain ` ```bash ` fenced block + Phase 2's CSS panel/left-rule | AUTH-01 explicitly deferred to v1.2. Phase 2 already styles `<pre class="shiki ...">` correctly. |
| Multi-file deck composition | A bespoke include directive | Slidev `src:` frontmatter, nested at any depth | Verified in `@slidev/parser/dist/fs.mjs`. |
| Progress indicator | Per-slide JS / new component | `components/global-top.vue` (already mounted, untouched in Phase 1) | Locked from v1.0. |
| Callout / `✓ Check` styling | New Vue component (`<Check>`) | Markdown blockquote `> ✓ Check: …` rendered by default theme, OR a fenced block | Components dir is empty (verified `ls components/` returns nothing but `global-top.vue` at repo root, which Slidev auto-discovers via `global-top` slot); building a new component is out-of-scope for Phase 1. |

**Key insight:** Phase 1 is content authoring. Every reusable mechanism (theme, fonts, code-block styling, progress bar, `src:` orchestration, click animation) already exists. The plan should resist any temptation to introduce new components or new CSS.

## Common Pitfalls

### Pitfall 1: Treating `/statusline` as a Preset Picker

**What goes wrong:** CONTEXT D-05 describes Section 05 as "running `/statusline` inside Claude Code and picking a preset from the interactive picker," with a `✓ Check` like "bottom of your terminal now shows `~/repo · 142k/200k`." Current Claude Code has no such picker.

**Why it happens:** The `/statusline` slash command was reshaped (likely between v1.0 and v2.x) into a natural-language code-generation flow. Running `/statusline <prompt>` causes Claude to *write a shell script* to `~/.claude/statusline.sh` based on the prompt, and to update `~/.claude/settings.json` with a `statusLine` block pointing at that script. The output is whatever the generated script prints — there are no named presets.

**Source quotes (Claude Code docs, [CITED: https://code.claude.com/docs/en/statusline]):**
> "The `/statusline` command accepts natural language instructions describing what you want displayed. Claude Code generates a script file in `~/.claude/` and updates your settings automatically."
> Example invocation: `/statusline show model name and context percentage with a progress bar`

**How to avoid:**
1. Section 05 Win 1 must demo the NL flow, not a picker. Recommended demo prompt (terse, presenter-friendly): `/statusline show model, repo, and context percentage as a progress bar`.
2. `✓ Check` should be observation-based, not preset-output-string-matched. Suggested wording: "your terminal now shows a bottom bar with the model name, the current folder, and a `▓░░░ 12%` style context bar — exact output depends on your model + session." This honors the per-participant variance.
3. The slide can show the *expected `/statusline` confirmation lines* (`✓ Wrote ~/.claude/statusline.sh` / `✓ Updated ~/.claude/settings.json`) as the precise sync-point — those ARE deterministic.

**Warning signs:** Plan tasks that mention "preset name" or "picker option."

### Pitfall 2: Putting `projects/` Under `./.claude/`

**What goes wrong:** CONTEXT D-12's file tree lists `projects/   (auto-generated)` under `./.claude/`. That directory does not exist at the project level — it's a per-machine, per-repo cache at `~/.claude/projects/<derived-project-id>/memory/` containing auto-memory files Claude writes for itself across sessions.

**Source quote ([CITED: https://code.claude.com/docs/en/memory]):**
> "Each project gets its own memory directory at `~/.claude/projects/<project>/memory/`. The `<project>` path is derived from the git repository, so all worktrees and subdirectories within the same repo share one auto memory directory."

**How to avoid:** Drop `projects/` from the Section 04 tree. The corrected canonical project-local tree is:

```
./CLAUDE.md
./.claude/
  CLAUDE.md              (alternative location for project CLAUDE.md)
  settings.json          → Hooks (Chapter 2)
  settings.local.json    (gitignored; personal overrides)
  skills/                → Skills (Chapter 3)
  agents/                → Subagents (Chapter 4)
  commands/              (legacy — merged into Skills; existing files still work)
  rules/                 (path-scoped CLAUDE.md fragments; not taught today)
```

[CITED: https://code.claude.com/docs/en/memory + https://code.claude.com/docs/en/skills + https://code.claude.com/docs/en/settings — all confirm this layout in current Claude Code.]

CONTEXT D-12 says "show ALL items even though only 3 are taught today" — that intent survives, but the items must be accurate. Recommend dropping `projects/`, keeping `commands/` with the footnote "(superseded by Skills — existing files still work)" so the slide doesn't lie about what's canonical going forward. Optionally add `rules/` with the footnote "(path-scoped instructions; deferred)". Closing line stays: "We'll teach the bold 3" (bold: `settings.json`, `skills/`, `agents/`).

**Warning signs:** Plan tasks that mention `./.claude/projects/` without footnoting it as `~/.claude/projects/`.

### Pitfall 3: Path Resolution in Nested `src:`

**What goes wrong:** A planner unfamiliar with Slidev's parser might write `src: ./pages/01-audience-setup/01-cover.md` *inside* `pages/01-audience-setup.md`, expecting it to resolve from the repo root.

**Why it happens:** Slidev's parser resolves relative `src:` paths from `dirname(slide.filepath)` — i.e., from the *importing file's directory*, not the project root. [VERIFIED: `@slidev/parser/dist/fs.mjs`, line 64.]

**How to avoid:** Inside `pages/01-audience-setup.md`, use `src: ./01-audience-setup/01-cover.md` (relative to `pages/`). Inside `slides.md` (repo root), use `src: ./pages/01-audience-setup.md`. Absolute imports starting with `/` resolve from `userRoot` if a different anchor is ever needed.

**Warning signs:** Plan tasks that show `src: ./pages/...` *inside* `pages/01-audience-setup.md`, or that fail with "Imported markdown file not found" at build.

### Pitfall 4: Misstating `CLAUDE.md` Loading Semantics on the "Why It Works" Slide

**What goes wrong:** Section 06's second slide explains why adding a rule to `~/.claude/CLAUDE.md` makes Claude "listen across sessions." A sloppy phrasing — e.g., "CLAUDE.md is loaded into every session's system prompt" — is *almost* right but technically wrong.

**Source quote ([CITED: https://code.claude.com/docs/en/memory]):**
> "CLAUDE.md content is delivered as a user message after the system prompt, not as part of the system prompt itself. Claude reads it and tries to follow it, but there's no guarantee of strict compliance."

**Also from the same page:**
> "Both are loaded at the start of every conversation. Claude treats them as context, not enforced configuration."

**How to avoid:** Use precise wording. Suggested slide-2 body (researcher draft, presenter can tighten):

> Claude Code loads `~/.claude/CLAUDE.md` at the start of every session — as a message attached to your conversation, not as enforced config. Behavioral rules in there land in front of every prompt you send, with no per-session ceremony. (More specific rules → more reliable adherence.)

This is honest, brief, and survives docs updates. Avoid claiming "system prompt" — the docs explicitly disclaim that.

**Warning signs:** Plan slide text that says "system prompt" or "loaded into the system prompt."

### Pitfall 5: Using `cat` for the `✓ Check` and Failing on Trailing Whitespace

**What goes wrong:** `cat ~/.claude/CLAUDE.md` returns the entire file. If a participant has prior content, the check is noisy and hard to verify in a live room. If they added a trailing space, the line still matches visually but a presenter doing `diff` wouldn't catch a mismatch.

**How to avoid:** Use `grep` with the rule's distinctive prefix:
```bash
$ grep -c 'When in plan mode' ~/.claude/CLAUDE.md
1
```
Expected count is `1`. Works regardless of other CLAUDE.md content, whitespace tolerance is good, presenter can scan the room for `1`s.

**Warning signs:** Plan tasks that hard-code `cat` output as the check.

### Pitfall 6: Forgetting `slides.md` Headmatter Preservation

**What goes wrong:** Editing `slides.md` to add the chapter `src:` block accidentally rewrites the headmatter, breaking the locked theme tokens (`colorSchema`, `fonts`, `highlighter`, `shiki.langs`).

**How to avoid:** The Phase 1 edit to `slides.md` appends exactly one block at the end of the file:
```markdown
---
src: ./pages/01-audience-setup.md
---
```
No headmatter edit. No cover-slide edit. The existing 24-line `slides.md` (verified content above) stays byte-identical up to its end.

**Warning signs:** A diff that touches the first 17 lines (headmatter) of `slides.md`.

## Code Examples

Verified syntax from official Slidev sources:

### `<v-clicks>` for Section 04 file-tree (optional)

```html
<!-- Source: https://sli.dev/guide/animations.html (CITED) -->
<v-clicks>

- `./CLAUDE.md`
- `./.claude/`
- `./.claude/settings.json`  → Hooks
- `./.claude/settings.local.json`  (gitignored)
- `./.claude/skills/`  → Skills
- `./.claude/agents/`  → Subagents
- `./.claude/commands/`  (legacy — superseded by Skills)

</v-clicks>
```

`<v-clicks>` requires the blank lines around the list (Vue parsing). Each top-level item appears on a successive click. `depth="2"` would extend the reveal to nested items.

### Line highlighting in code blocks (available, sparingly used)

```markdown
[VERIFIED: https://sli.dev/features/line-highlighting.html]

\`\`\`bash {2|3|all}
$ claude
> /statusline show model, repo, and context percentage as a progress bar
[bottom bar appears]
\`\`\`
```

`{2|3|all}` reveals line 2 on first click, line 3 on second, the whole block on third. Useful if Section 05's Win 1 demo needs step-by-step pacing — defer to presenter taste.

### Inline rule line in a section file (Win 2)

````markdown
# Win 2: Make Claude listen across sessions

Add this one line to `~/.claude/CLAUDE.md`:

```text
When in plan mode, always ask clarifying questions before you start planning.
```

Save and close.

> ✓ Check: `grep -c 'When in plan mode' ~/.claude/CLAUDE.md` returns `1`.
````

Note ` ```text ` (not ` ```bash `) for the literal rule line — it's prose, not a command. Phase 2's CSS panel-styling applies to any Shiki block regardless of language.

### Section 05 Win 1 demo block (re-shaped — researcher recommendation)

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

This matches current Claude Code behavior verbatim ([CITED: https://code.claude.com/docs/en/statusline]) and gives a deterministic sync-point (the two `✓ Wrote` / `✓ Updated` lines) without claiming a specific output string.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `/statusline` as preset picker (CONTEXT assumption) | `/statusline <natural-language prompt>` → generated `~/.claude/statusline.sh` + auto-updated `~/.claude/settings.json` [CITED: code.claude.com/docs/en/statusline] | Pre-May 2026 (current behavior) | Section 05 re-shape required. |
| `.claude/commands/<n>.md` as the primary slash-command file shape | `.claude/skills/<n>/SKILL.md` is the canonical shape; `commands/` files still work but the docs call them "merged into skills" [CITED: code.claude.com/docs/en/skills] | Likely 2025–2026 | Section 04 tree footnote: "`commands/` — legacy, superseded by Skills." Do NOT name slash commands as a separate chapter (already out of v1.1 scope). |
| `./.claude/projects/` as project-local artifact | Lives at `~/.claude/projects/<derived-id>/memory/` — per-machine, per-repo auto-memory store [CITED: code.claude.com/docs/en/memory] | Always (the CONTEXT tree had it wrong) | Section 04 tree correction. |
| "CLAUDE.md loaded into the system prompt" (CONTEXT phrasing) | "Loaded at the start of every conversation as a user message after the system prompt" [CITED: code.claude.com/docs/en/memory] | Always (CONTEXT phrasing was imprecise) | Section 06 slide-2 wording tightening. |

**Deprecated/outdated (none introduced by this phase).**

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Slidev's default theme renders a markdown blockquote (`> ✓ Check: …`) legibly enough in the locked palette to serve as the callout without a custom component | Section 06 Win 2 `✓ Check` styling, all section-end checks | If illegible, planner falls back to a fenced block prefixed with `# ✓ Check:`. Visual check during Plan 07 catches this. |
| A2 | The two `✓ Wrote ~/.claude/statusline.sh` / `✓ Updated ~/.claude/settings.json` confirmation lines are emitted by current Claude Code on every successful `/statusline` invocation | Section 05 Win 1 `✓ Check` | Behavior strongly implied by docs ("Claude Code generates a script file … and updates your settings automatically") but the exact emit lines aren't in the docs as a verbatim quote. Mitigation: presenter pre-runs once before the workshop; deck wording softens to "you'll see a confirmation that the script was written and settings were updated." |
| A3 | Slidev `<v-clicks>` works inside a `src:`-imported file with no special handling | Section 04 (if `<v-clicks>` is used) | Risk: low. Slidev parser flattens imported slides into the main slide array before Vue renders them; `<v-clicks>` is a Vue component, not a parser feature, so it operates the same in any slide regardless of how it was loaded. Confirmed by inspecting `loadSlide` in `@slidev/parser/dist/fs.mjs` — no source manipulation of imported content. |

**All other claims in this research are tagged `[VERIFIED:]` (source inspection of `node_modules/@slidev/parser/dist/fs.mjs`, `node_modules/@slidev/cli/package.json`, repo file inspection) or `[CITED:]` (URLs above).** No `[ASSUMED]` claims outside the table.

## Open Questions

1. **Should the chapter cover slide live in `01-cover.md` or in `pages/01-audience-setup.md` itself?**
   - What we know: Slidev treats a `src:`-only slide as having its content fully replaced. So `pages/01-audience-setup.md` can include either: (a) one bare `src: ./01-audience-setup/01-cover.md` block as its first slide-block, which IS the chapter cover; or (b) an inline cover slide (markdown content) followed by 5 `src:` includes for sections 02–06.
   - What's unclear: CONTEXT D-01 lists `01-cover.md` as the chapter cover file, which argues for option (a) — one section file per slide-or-slide-group, no inline content in the orchestrator. CONTEXT D-02 also says the orchestrator "contains the chapter title slide" — argues for option (b).
   - Recommendation: **Option (a) — `01-cover.md` IS the chapter cover, orchestrator is pure `src:` includes.** Cleaner, atomic-commit story is tighter (Plan 1 = `01-cover.md` only), and matches "one plan per section file" in D-03. The orchestrator stays 12 lines (6 × `---\nsrc:…\n---`). Planner should adopt (a) unless instructor objects in plan review.

2. **Should `<v-clicks>` be used for Section 04's file tree?**
   - What we know: CONTEXT D-16 says "only on Section 04's file tree if the annotated reveal genuinely helps pacing." It's optional. The tree has ~7 items.
   - What's unclear: Pacing depends on presenter style; impossible to decide from research alone.
   - Recommendation: Planner drafts Section 04 *without* `<v-clicks>` first. If the static tree feels visually crowded at presenter-mode resolution during Plan 07's spot-check, retroactively wrap in `<v-clicks>` (one-line edit). Defer the decision.

3. **Does the chapter cover slide need an explicit `layout: cover` frontmatter?**
   - What we know: Slidev applies `layout: cover` automatically only to slide 1 of the deck [CITED: https://sli.dev/guide/layout]. `01-cover.md`'s slide is slide N of the deck, not slide 1.
   - Recommendation: Use `layout: center` in `01-cover.md`'s frontmatter — gives a centered chapter title without the "first slide of presentation" treatment. Trial it in Plan 01; switch to `layout: default` if `center` looks wrong against the Phase 2 dark palette.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| `bunx slidev` | Section authoring, Plan 07 build | ✓ (verified — `bun install` ran in v1.0; `dist/` exists) | Slidev 52.15.1 | — |
| `bun` | All commands | ✓ | 1.3.5 (pinned in `package.json`) | — |
| Node ≥ 20.12 | Slidev's Vite internals | Assumed ✓ (v1.0 shipped) | — | If missing: `nvm use 20.12+` |
| Git | Per-section atomic commits (QUAL-02) | ✓ | — | — |
| Vercel project link | Per-PR preview deploys (review-checkpoint flow) | ✓ (`.vercel/` present in repo) | — | Manual `bunx slidev build` + local preview if Vercel down |

No external service calls during build. Section content does NOT invoke Claude Code, `/statusline`, or filesystem writes during the deck build — those happen on the participant's machine at workshop time.

**No missing dependencies. No fallbacks needed.**

## Project Constraints (from CLAUDE.md)

The project root `CLAUDE.md` and `.planning/PROJECT.md` lock the following directives that the planner MUST honor:

- **Package manager:** Bun only (`bunx slidev`, `bunx slidev build`, `bunx slidev export`). NEVER `npm` / `npx` / `yarn`.
- **Theme:** `@slidev/theme-default` with custom CSS overlay. Do NOT swap to a community theme.
- **Highlighter:** Shiki `vitesse-dark`. Prism is removed in Slidev v0.48+ and is not an option.
- **Stack pin:** `@slidev/cli@^52.15`. Installed 52.15.1 (verified).
- **`vite.config.ts`:** Do NOT create one (avoids Slidev issue #2043 — Bun + custom vite.config silently drops config).
- **CSS scoping:** All custom CSS lives under `.slidev-layout` ancestor (Phase 2 D-14). Section authoring does NOT add new colors and does NOT touch `style.css`.
- **Tone discipline (QUAL-04):** Confident, terse, no hype, no exclamation marks in body, no screenshots.
- **GSD workflow:** All file edits go through GSD commands; per-section atomic commits per QUAL-02.

These constraints are non-negotiable for plans derived from this research.

## Sources

### Primary (HIGH confidence)

- **Slidev parser source** — `node_modules/@slidev/parser/dist/fs.mjs` (lines 18–104) — definitive proof of nested `src:` recursion and path resolution. [VERIFIED: file inspection 2026-05-12]
- **Slidev CLI version pin** — `node_modules/@slidev/cli/package.json` confirms installed 52.15.1.
- **Slidev importing slides** — https://sli.dev/features/importing-slides.html
- **Slidev v-clicks** — https://sli.dev/guide/animations.html
- **Slidev syntax + frontmatter** — https://sli.dev/guide/syntax.html
- **Slidev line highlighting** — https://sli.dev/features/line-highlighting.html
- **Slidev layouts (default, center, cover, two-cols)** — https://sli.dev/builtin/layouts
- **Slidev CLI build** — https://sli.dev/builtin/cli
- **Claude Code statusline** — https://code.claude.com/docs/en/statusline — full spec of `/statusline` natural-language behavior, JSON schema, no preset picker.
- **Claude Code memory (CLAUDE.md)** — https://code.claude.com/docs/en/memory — definitive loading semantics, precedence table, "delivered as a user message after the system prompt" quote.
- **Claude Code skills** — https://code.claude.com/docs/en/skills — confirms `.claude/skills/<n>/SKILL.md`, `.claude/commands/` legacy status, `.claude/agents/`, `.claude/rules/`.
- **Phase 2 theme tokens** — `style.css` + `uno.config.ts` (file inspection).

### Secondary (MEDIUM confidence)

- Context7 `/websites/sli_dev` (713 verified snippets) — used to cross-check `src:`, `<v-clicks>`, layouts, code-block syntax. All findings confirmed against the official URLs above.

### Tertiary (LOW confidence)

- None used. Every claim is sourced from either project files, installed-package source, or current docs.

## Metadata

**Confidence breakdown:**

- Slidev nested `src:` support: **HIGH** — source-code inspection.
- `/statusline` current behavior: **HIGH** — direct quote from current Claude Code docs.
- `~/.claude/CLAUDE.md` loading semantics: **HIGH** — direct quote from current docs.
- `./.claude/` canonical layout: **HIGH** — corroborated across skills/memory/settings docs.
- Section structure / shape recommendations: **HIGH** — derived from locked CONTEXT decisions, no novel architecture.
- `<v-clicks>` behavior inside `src:`-imported files: **MEDIUM** — inferred from parser source + Vue component semantics; not explicitly documented as a guaranteed combination, though there is no plausible mechanism by which it would differ. Plan 07 verification catches any surprise.
- Win 1 confirmation-line wording (`✓ Wrote …` / `✓ Updated …`): **MEDIUM** (A2) — strongly implied by docs, not quoted verbatim. Mitigation: presenter pre-run before workshop.

**Research date:** 2026-05-12
**Valid until:** 2026-06-11 (30 days — Slidev 52.15.x and Claude Code 2.1.x are stable lines; re-verify `/statusline` behavior before each workshop delivery).
