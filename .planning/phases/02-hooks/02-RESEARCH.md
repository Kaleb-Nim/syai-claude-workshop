# Phase 2: Hooks - Research

**Researched:** 2026-05-12
**Domain:** Slidev chapter authoring (mirror of Phase 1 pattern) + Claude Code hooks accuracy (`Stop`/`Notification` events, `~/.claude/settings.json` schema, cross-OS sound playback)
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Section breakdown (D-01):** Chapter 2 = 5 content sections + 1 closing build plan = 6 plans.
- `pages/02-hooks/01-cover.md` — chapter cover (one-line provocation).
- `pages/02-hooks/02-why-hooks.md` — IFTTT framing + 3 locked determinism quotes (HOOK-01).
- `pages/02-hooks/03-how-hooks-work.md` — Stop + Notification events + minimal `settings.json` JSON shape (HOOK-02).
- `pages/02-hooks/04-hands-on-build.md` — participants paste Stop+Notification JSON into `~/.claude/settings.json` (HOOK-03 wire).
- `pages/02-hooks/05-hands-on-fire.md` — trigger Claude, hear chimes, ✓ check (HOOK-03 fire).
- Plan 06: `bunx slidev build` + presenter spot-check (QUAL-01).

Mirrors Phase 1's chapter-orchestrator pattern (Phase 1 D-02/D-03). Atomic per-section commits (QUAL-02).

**Section 02 — Why hooks (D-02, D-03, D-04):** 5 slides — IFTTT framing slides 1-2, then 3 locked determinism quotes verbatim on slides 3-5. Slide 4 includes a callback to Phase 1 Win 2's `~/.claude/CLAUDE.md` rule, framing it as the imperfect-version-of-a-hook. Quote wording is **user-locked, verbatim, no edits**:
- Quote 1 (Slide 3): *"The key diff between Hooks and everything else is that Hooks are deterministic, they always run"*
- Quote 2 (Slide 4): *"We can tell claude in your claude.md file to ping us every time it needs an input from us. But it's not perfect. A hook makes it run every single time without exceptions"*
- Quote 3 (Slide 5): *"If something needs to happen every single time, don't put it in a prompt, put it in a hook"*

**Section 03 — How hooks work (D-05, D-06):** Stop + Notification only on the events slide; other lifecycle events listed by name in a single trailing line. Single slide with minimal Stop-only JSON fenced as ` ```json `, cross-OS notes rendered as prose OUTSIDE the JSON block. JSON shape (verbatim from CONTEXT, verified accurate below):

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

**JSON comments are NOT permitted** inside the fenced JSON block — `settings.json` rejects them. Cross-OS notes are slide prose, not code-block content.

**Section 04 — Hands-on build (D-07, D-08):** Participants paste the **full Stop + Notification JSON together** into `~/.claude/settings.json`:
- `Stop` → `afplay /System/Library/Sounds/Glass.aiff`
- `Notification` → `afplay /System/Library/Sounds/Ping.aiff`

One explanatory line before the JSON block: *"Notification has the same shape — we just repeat it."* Linux/WSL participants substitute `aplay <.wav>` per Section 03 notes; restated as a brief footnote.

**Section 05 — Hands-on fire (D-09):** Two micro-steps on one slide:
- Step 1 — Trigger Stop: run `claude`, ask a quick thing, wait for it to stop. **✓ Check:** "you hear a chime when Claude finishes."
- Step 2 — Trigger Notification: ask Claude to do something requiring permission. **✓ Check:** "you hear a different chime when Claude needs your input."
- Closing line: "Two events, same shape. Add more later — that's the whole pattern."

**Slide-level shape (D-10..D-13):** Per-slide `---` separator, minimal frontmatter, no `layout: section` mid-chapter, code blocks ≤25 lines, `<v-clicks>` sparingly (only Section 02 quote reveal if pacing benefits — never in hands-on sections), tone discipline (QUAL-04): confident, terse, no hype, no `!` in body, no screenshots.

### Claude's Discretion

- Exact cover-slide one-liner (Section 01).
- Exact wording of the Phase 1 callback line on Slide 4 (D-04) — must reference `~/.claude/CLAUDE.md` and frame it as imperfect-version-of-a-hook.
- Exact `.wav` (or `.oga`) path for the Linux/WSL note — researcher picks below.
- Whether the Notification trigger example in Section 05 uses a permission prompt or an idle-prompt scenario — researcher picks below (recommend **permission_prompt**, most reliable).
- Whether Section 02 slides 1-2 (IFTTT) use `<v-clicks>` to reveal the three IF→THEN examples row-by-row.
- Whether the ✓ Check callouts use the same shape as Phase 1 (markdown blockquote prefixed with `> ✓ Check:`) — recommend yes, mirror Phase 1 exactly.

### Deferred Ideas (OUT OF SCOPE)

- Project-local hooks (`.claude/settings.json` vs `~/.claude/settings.json`).
- Hook security caveat ("hooks execute arbitrary commands").
- PreToolUse / PostToolUse / UserPromptSubmit / SessionStart / SessionEnd / SubagentStop / PreCompact deep dives.
- Hook input JSON, `$CLAUDE_PROJECT_DIR`, decision JSON output, exit-code semantics, hook output protocol.
- Custom matchers — Section 03's Stop hook omits `"matcher"` entirely; Notification hook in Section 04 likewise (catches all notification types).
- Pre/post relationship with skills + subagents.
- MCP, Plan Mode, copy-to-clipboard, persistent sidebar.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HOOK-01 | Frame why hooks exist | Section 02 = IFTTT + 3 locked determinism quotes. Quotes are user-supplied content; research role is only to verify the technical claims are accurate (verified — "deterministic, always run" matches docs: "Hooks fire at specific points during a Claude Code session"). |
| HOOK-02 | Teach how hooks work mechanically | Section 03 JSON shape **verified** against `https://code.claude.com/docs/en/hooks` and `https://code.claude.com/docs/en/hooks-guide` — nested `hooks` → `<EventName>` → `[{ "hooks": [{ "type": "command", "command": "…" }] }]` structure is current and canonical (snippets fetched 2026-05-12). |
| HOOK-03 | One small live hands-on task | Sound-notification hook on `Stop` + `Notification` — verified to fire reliably (`Stop` fires "when Claude Code has finished generating its response"; `Notification` fires on `permission_prompt`, `idle_prompt`, and other notification types). macOS `afplay` + system sounds verified present. |
| QUAL-01 | `bunx slidev build` exits 0 + presenter spot-check | Closing plan 06 mirrors Phase 1's plan 08 exactly. No new build risk. |
| QUAL-02 | Atomic per-section commits | Discipline, not technical. |
| QUAL-04 | Tone discipline | Drives slide-writing only. |

</phase_requirements>

## Summary

Phase 2 is a 5-section authoring phase plus build/spot-check closer. The visual/structural machinery is **fully solved** by Phase 1 — every pattern (chapter orchestrator, nested `src:`, section file frontmatter, ✓ Check blockquote, Shiki code block with auto-styled tinted panel + rust left rule, tone discipline) is locked. The Phase 2 plan should treat Phase 1's `01-PATTERNS.md` and existing section files as the template and **copy-paste** their structure.

The substantive research risk lives in **content accuracy** for Section 03 (events teaching) and Section 04 (the JSON participants actually paste). Two confirmations and one correction:

1. **JSON shape in CONTEXT D-06 is correct.** The nested `hooks → <EventName> → [{ "hooks": [{ "type": "command", "command": "…" }] }]` structure is the current canonical schema (Claude Code docs, fetched 2026-05-12). Notification hooks may optionally include a `"matcher"` field (e.g., `"permission_prompt"`, `"idle_prompt"`) but it can be omitted to catch all notification types — recommended for Section 04 (simpler paste).
2. **`Stop` fires at end-of-turn, every turn.** Docs quote: *"The `Stop` event fires when Claude Code has finished generating its response."* The hands-on chime fires reliably. ✓
3. **CONTEXT D-06 Windows footnote is stale.** Native Windows is now officially supported (PowerShell install: `irm https://claude.ai/install.ps1 | iex`). The "bash/jq/paths break otherwise" claim is no longer accurate for the CLI itself. **However**, the hooks hands-on still has a real cross-OS gap: `afplay` does not exist on native Windows, and Windows lacks a single-binary equivalent that ships by default. WSL is still the simplest path for Windows participants to get audio. Researcher recommends softening the wording (see Pitfall 1 below).

**Primary recommendation:** Mirror Phase 1's chapter-orchestrator + section-file patterns verbatim. Adopt the CONTEXT D-06 JSON shape as-is (verified correct). Soften the Windows footnote per below. Use `permission_prompt`-based trigger in Section 05 (most deterministic). Use `/usr/share/sounds/alsa/Front_Center.wav` as the canonical Linux/WSL path (verified to ship with `alsa-utils` which is pulled in by `aplay` itself on Ubuntu/Debian) — falls back gracefully on minimal images.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Chapter orchestration (`slides.md` → `pages/02-hooks.md`) | Slidev parser (build time) | — | Single new `src:` block appended to `slides.md`; mirrors Phase 1 add. |
| Section file rendering | Slidev runtime (Vue/Vite SPA) | Shiki | Each section file = 1–5 slides via standard markdown + per-slide frontmatter. |
| JSON/bash code-block presentation | Shiki (build-time syntax highlight) | `style.css` (auto-applied tinted panel + rust left rule) | All hook-config blocks use ` ```json `; all shell snippets use ` ```bash `. No CSS edits needed. |
| Click-driven reveal (Section 02 only, optional) | Slidev `<v-clicks>` | — | If quote-reveal pacing benefits. Default: skip. |
| Progress feedback | `global-top.vue` (locked, untouched) | — | Just works. |
| Build verification (QUAL-01) | `bunx slidev build` | — | CLI exit-0 + presenter spot-check. |
| Hook execution (Section 04 paste happens at workshop time) | Claude Code runtime + participant OS shell (`afplay`/`aplay`) | participant's `~/.claude/settings.json` | OUT of deck — deck shows the JSON; the runtime change lives on participants' machines. |

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@slidev/cli` | 52.15.1 [VERIFIED: `node_modules/@slidev/cli/package.json` from Phase 1 RESEARCH] | Markdown → SPA build pipeline | Locked from v1.0; already installed. |
| `@slidev/parser` | bundled with cli (52.15.x) [VERIFIED: Phase 1 RESEARCH — source inspection of `dist/fs.mjs`] | Resolves `src:` imports recursively at load time | Same pattern as Phase 1 — nested `src:` chapter orchestrator pattern. |
| `@slidev/theme-default` | bundled, `latest` per package.json | Slide layouts (`default`, `center`) | Locked. |
| Shiki | bundled with Slidev | Syntax highlight for ` ```bash `, ` ```json ` | `slides.md` headmatter already declares `langs: ['ts', 'tsx', 'bash', 'json', 'md', 'yaml']` — `json` is in the list, no headmatter edit needed. |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `<v-clicks>` | built-in Slidev component [CITED: https://sli.dev/guide/animations.html] | Wrap a list/quote stack to reveal one click at a time | Section 02 ONLY (and only if presenter wants paced reveal). Never in hands-on sections (CONTEXT D-12). |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Nested `src:` chapter orchestrator | Inline all 5 sections in `pages/02-hooks.md` | Loses atomic per-section commit clarity (QUAL-02). Same conclusion as Phase 1. |
| `Stop` + `Notification` chime hands-on | `PreToolUse` log-to-file hands-on | The user-locked seed is sound-notification. PreToolUse would teach more but require terminal-tail observation (less visceral). Out of scope per CONTEXT. |

**Installation:** No new dependencies. Phase 1 already wired the stack.

**Version verification:** Same as Phase 1 — Slidev 52.15.1 installed.

## Architecture Patterns

### System Architecture Diagram

```
slides.md (locked headmatter: theme/fonts/Shiki/colorSchema — DO NOT TOUCH)
  │
  ├── cover slide (existing, untouched)
  │
  ├── src: ./pages/01-audience-setup.md  (existing, untouched)
  │
  └── src: ./pages/02-hooks.md           (NEW — appended at EOF)
            │
            └── pages/02-hooks.md  (chapter orchestrator — NEW, pure src: includes)
                  │
                  ├─── src: ./02-hooks/01-cover.md             ──► 1 slide (chapter cover)
                  ├─── src: ./02-hooks/02-why-hooks.md         ──► 5 slides (IFTTT + 3 quotes)
                  ├─── src: ./02-hooks/03-how-hooks-work.md    ──► 1 slide (events + JSON)
                  ├─── src: ./02-hooks/04-hands-on-build.md    ──► 1 slide (paste JSON)
                  └─── src: ./02-hooks/05-hands-on-fire.md     ──► 1 slide (trigger + ✓ checks)
                  ▼
              @slidev/parser (loadSlide recurses through src: — verified Phase 1)
                  ▼
              SPA build (Vite) → dist/
                  ▼
              Vercel auto-deploy on push to main
```

### Recommended Project Structure (additions only)

```
pages/                              # existing from Phase 1
├── 01-audience-setup.md            # existing, untouched
├── 01-audience-setup/              # existing, untouched
├── 02-hooks.md                     # NEW — chapter orchestrator (pure src: includes)
└── 02-hooks/                       # NEW directory
    ├── 01-cover.md
    ├── 02-why-hooks.md
    ├── 03-how-hooks-work.md
    ├── 04-hands-on-build.md
    └── 05-hands-on-fire.md
```

`slides.md` gains exactly one new slide-block appended after the existing Phase 1 include:
```markdown
---
src: ./pages/02-hooks.md
---
```

No headmatter changes. No `style.css` changes. No new components.

### Pattern 1: Chapter Orchestrator File (mirrors Phase 1 verbatim)

**What:** Pure `src:`-only orchestrator. Zero inline content. Each slide-block delegates to a section file. Locked by Phase 1.

**Example — `pages/02-hooks.md` (complete file, 15 lines):**
```markdown
---
src: ./02-hooks/01-cover.md
---
---
src: ./02-hooks/02-why-hooks.md
---
---
src: ./02-hooks/03-how-hooks-work.md
---
---
src: ./02-hooks/04-hands-on-build.md
---
---
src: ./02-hooks/05-hands-on-fire.md
---
```

**Path resolution rule (Phase 1 Pitfall 3, still applies):** Inside `pages/02-hooks.md`, use `src: ./02-hooks/01-cover.md` (relative to `pages/`). NOT `src: ./pages/02-hooks/01-cover.md`.

**No headmatter:** Orchestrator skips deck-level headmatter (lives only in `slides.md`).

### Pattern 2: Section Cover Slide (mirrors Phase 1 `01-cover.md`)

**`pages/02-hooks/01-cover.md`:**
```markdown
---
layout: center
---

# Chapter 2 — Hooks

<one-line provocation here — planner's discretion>

<div class="text-sm opacity-60 mt-8">
  what hooks are · how they work · one chime you'll wire live
</div>
```

The subtitle bullet line mirrors Phase 1's `01-cover.md` style (`text-sm opacity-60 mt-8` dim helper).

### Pattern 3: Section 02 — Why Hooks (5 slides, locked quotes)

**File structure (`pages/02-hooks/02-why-hooks.md`):** 5 slides separated by `---` mid-file, no per-slide frontmatter (default layout).

**Slide 1 — IFTTT framing.** Recommended shape:
```markdown
# IF this, THEN that

- **IF** Claude finishes  →  **THEN** play a sound
- **IF** Claude uses a tool  →  **THEN** log it
- **IF** you submit a prompt  →  **THEN** check it first
```

**Slide 2 — The "THEN" is just shell.** Recommended shape:
```markdown
# The "THEN" is just a shell command

Anything you can run in your terminal can be the "THEN".

Today we make the "THEN" a sound.
```

**Slides 3, 4, 5 — locked verbatim quotes.** Use markdown blockquote rendering for visual weight, H1 frames the theme. Slide 4 includes the Phase 1 callback (D-04). Recommended shape for slide 4:

```markdown
# Why use hooks

> We can tell claude in your claude.md file to ping us every time it needs an input from us. But it's not perfect. A hook makes it run every single time without exceptions

<div class="text-dim text-sm mt-6">
  the rule you put in <code>~/.claude/CLAUDE.md</code> in Chapter 1 — that's the imperfect version of a hook
</div>
```

Slides 3 and 5 follow the same shape (H1 + quote, no callback). **All quote text MUST be verbatim** per D-03. Quotes contain no exclamation marks (verified — QUAL-04 compliant).

Optional `<v-clicks>` on slides 1-2 to reveal the three IF→THEN examples row-by-row. Default: skip.

### Pattern 4: Section 03 — How Hooks Work (single slide, events + JSON)

**File structure (`pages/02-hooks/03-how-hooks-work.md`):** One slide, no frontmatter.

**Recommended whole-file content:**

````markdown
# How hooks work

Two events do most of the work:

- **`Stop`** — fires when Claude finishes a turn
- **`Notification`** — fires when Claude needs your attention (permission, idle)

You wire them in `~/.claude/settings.json`:

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

<div class="text-dim text-sm mt-4">

- Linux / WSL → swap `afplay` for `aplay /usr/share/sounds/alsa/Front_Center.wav`
- Native Windows → easiest path today is to run Claude Code inside WSL so `afplay`/`aplay` and shell paths work

</div>

<div class="text-dim text-xs mt-4">
  more exist: <code>PreToolUse</code>, <code>PostToolUse</code>, <code>UserPromptSubmit</code>, <code>SessionStart</code> — same shape
</div>
````

**Critical rules (verified against docs 2026-05-12):**
- JSON shape is **byte-identical** to the docs canonical Stop hook (no `"matcher"` needed when you want to catch all stops).
- Cross-OS notes rendered OUTSIDE the ` ```json ` block (JSON forbids comments — docs explicitly disclaim trailing commas and comments: see Pitfall 2).
- Windows wording **softened** from CONTEXT D-06 — see Pitfall 1.
- "more exist" line uses the **verified current event list** (see State of the Art table).

### Pattern 5: Section 04 — Hands-on Build (single slide, full Stop+Notification JSON)

**File structure (`pages/02-hooks/04-hands-on-build.md`):** One slide, no frontmatter.

**Recommended whole-file content:**

````markdown
# Wire it: paste this into `~/.claude/settings.json`

Notification has the same shape — we just repeat it.

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
    ],
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Ping.aiff"
          }
        ]
      }
    ]
  }
}
```

<div class="text-dim text-sm mt-4">
  Linux / WSL → swap both <code>afplay</code> calls for <code>aplay /usr/share/sounds/alsa/Front_Center.wav</code> (use a different <code>.wav</code> for the second to hear a different chime)
</div>
````

**Block length:** ~22 lines — within the CONTEXT D-11 ≤25 cap. Compact `<style scoped>` `font-size: 0.7rem` override (Phase 1 Section 05 file-tree pattern) is available if the JSON visually overflows at presenter-mode resolution; default: skip.

### Pattern 6: Section 05 — Hands-on Fire (single slide, two micro-steps + ✓ Checks)

**File structure (`pages/02-hooks/05-hands-on-fire.md`):** One slide, no frontmatter.

**Recommended whole-file content:**

````markdown
# Fire it

**Step 1 — Trigger `Stop`:** run `claude`, ask a quick thing, wait for it to finish.

> ✓ Check: you hear a chime when Claude finishes.

**Step 2 — Trigger `Notification`:** ask Claude to run something it needs permission for (e.g. `run rm -rf /tmp/foo`).

> ✓ Check: you hear a *different* chime when Claude asks for input.

<div class="text-dim mt-6">
  Two events, same shape. Add more later — that's the whole pattern.
</div>
````

**✓ Check pattern** is identical to Phase 1 (markdown blockquote, `> ✓ Check: …`). No new component.

**Notification trigger choice (researcher pick — D-09 discretion):** Use a **permission_prompt** scenario, not idle_prompt. Rationale:
- `permission_prompt` fires deterministically the moment Claude attempts a tool call outside the auto-allow list. The audience sees an exact cause→effect.
- `idle_prompt` fires after Claude has been waiting for input for a (variable) timeout. Less deterministic in a 30-second hands-on window.
- Docs list both as valid `Notification` triggers (`matcher: "permission_prompt"` and `matcher: "idle_prompt"` are both supported), and the Section 04 JSON omits the matcher entirely, so both fire the same chime — but the slide example should describe a permission-prompt scenario.

Example trigger that fires `permission_prompt` reliably: ask Claude to run a `rm`, `curl`, or `git push` command (none are in the default auto-allow list, all surface a permission dialog).

### Anti-Patterns to Avoid

- **Do NOT put cross-OS notes inside the ` ```json ` block as `// comments`.** `settings.json` rejects them (Pitfall 2). CONTEXT D-06 already flags this.
- **Do NOT introduce a `"matcher"` field in Section 03's Stop block** — it's optional, and adding it would distract from the minimal JSON teaching goal.
- **Do NOT add `layout: section` inside Chapter 2** (same as Phase 1 D-14).
- **Do NOT build a `<HookExample>` Vue component.** Plain Shiki blocks render perfectly with Phase 1's CSS contract.
- **Do NOT claim Native Windows is unsupported.** It is supported (Pitfall 1). Frame WSL as the practical recommendation for *this hands-on*, not as a Claude Code requirement.
- **Do NOT use `Sosumi.aiff` or `Basso.aiff`** for the Stop chime — both have negative connotations (system error sounds). `Glass.aiff` (Stop) and `Ping.aiff` (Notification) are the canonical pair.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Step-by-step quote reveal | Custom JS | Slidev `<v-clicks>` | Built-in, presenter-aware. |
| Terminal/JSON-style code block | Custom `<Cmd>` Vue component | Plain ` ```bash `/` ```json ` + Phase 2 CSS contract (already wired) | AUTH-01 deferred to v1.2. |
| Multi-file deck composition | Bespoke include directive | Slidev `src:` frontmatter | Verified Phase 1. |
| ✓ Check callout | New `<Check>` component | Markdown blockquote `> ✓ Check: …` | Mirrors Phase 1 — same render. |
| Chapter-to-chapter callback link | New navigation widget | Inline prose + `<code>` reference | Phase 1 Win 2 visual already shows the CLAUDE.md attachment pattern; Section 02 slide 4 references it in prose. |

**Key insight:** Phase 2 is content authoring on a Phase 1-solved chassis. Every mechanism (theme, fonts, code-block styling, progress bar, `src:` orchestration, ✓ Check, click animation) already exists. **Resist any temptation to introduce new components, new CSS, or new patterns.**

## Common Pitfalls

### Pitfall 1: Stating "Native Windows isn't supported" (D-06 wording is stale)

**What goes wrong:** CONTEXT D-06 instructs the Section 03 slide to say `Native Windows → run Claude Code inside WSL (bash/jq/paths break otherwise)`. Current Claude Code docs explicitly support native Windows via PowerShell installer: `irm https://claude.ai/install.ps1 | iex` (https://code.claude.com/docs/en/setup).

**Why it happens:** Docs evolved between CONTEXT gathering and now. The "bash/jq/paths break" wording is no longer accurate as a blanket claim — it conflates "Claude Code itself doesn't run on Windows" (false) with "this specific `afplay`-based hook doesn't run on Windows" (true).

**Source quote ([CITED: https://code.claude.com/docs/en/setup]):**
> "You can run Claude Code natively on Windows or within WSL. Native Windows installation requires Git for Windows and uses PowerShell or CMD. WSL 2 offers sandboxing and is recommended for Linux toolchains."

**How to avoid:** Soften the slide wording. Recommended replacement:
```
Native Windows → easiest path today is to run Claude Code inside WSL so afplay/aplay and shell paths work
```
This is accurate: Claude Code itself runs natively on Windows, but this specific hook (which calls `afplay`/`aplay`) needs a Unix-like shell. The hands-on is the issue, not the CLI.

**Warning signs:** Slide wording that says "Claude Code doesn't work on Windows" or "Windows is unsupported."

### Pitfall 2: JSON Comments in `settings.json` Will Break the Parser

**What goes wrong:** A planner might inline cross-OS notes as `// macOS path` or `# Linux: swap to aplay` inside the ` ```json ` fenced block. Visually this seems helpful — but participants who copy-paste the block verbatim into `~/.claude/settings.json` will get a parse error and silently lose all their settings on next session start.

**Source quote ([CITED: https://code.claude.com/docs/en/hooks-guide]):**
> "verify that your JSON settings file is valid (no trailing commas or comments) and located in the correct directory: `.claude/settings.json` for project-specific hooks or `~/.claude/settings.json` for global hooks."

**How to avoid:** Cross-OS notes are slide prose, rendered OUTSIDE the JSON block. CONTEXT D-06 already specifies this; the plan must enforce it.

**Warning signs:** Any `//` or `#` characters appearing on a line inside a ` ```json ` block.

### Pitfall 3: Confusing `Notification` Matcher Types

**What goes wrong:** A planner might add `"matcher": "permission_prompt"` to the Notification block in Section 04, thinking it's required. This would cause the chime to fire ONLY on permission prompts, missing other notification types (idle, auth_success, elicitation_*). For the workshop hands-on, omitting the matcher (catches all notification types) gives the simplest paste and the most reliable demo.

**Source quote ([CITED: https://code.claude.com/docs/en/hooks]):**
> "Notification hooks are triggered when Claude Code sends notifications and can be matched on notification types such as `permission_prompt`, `idle_prompt`, `auth_success`, `elicitation_dialog`, `elicitation_complete`, and `elicitation_response`."

**How to avoid:** Section 04's Notification block omits `"matcher"` entirely. This catches all notification subtypes — the most permissive (and simplest) shape. Section 05's slide describes a permission-prompt scenario as the trigger because it's the most deterministic to demo, but the underlying hook catches everything.

**Warning signs:** A `"matcher"` field appearing in the Section 03 or Section 04 JSON.

### Pitfall 4: Using `.oga` for `aplay` (Wrong Tool for Wrong Format)

**What goes wrong:** A planner might recommend `aplay /usr/share/sounds/freedesktop/stereo/bell.oga` for the Linux/WSL note. **`aplay` plays WAV files; `.oga` is Ogg-Vorbis** and requires `paplay` or `ogg123`. Using `aplay` on `.oga` will fail silently or with a "format error" on most distros.

**Source quote (WebSearch [VERIFIED]):** `aplay` is the ALSA WAV player; `paplay` is the PulseAudio player that handles `.oga`/`.ogg`. WSL doesn't ship PulseAudio by default.

**How to avoid:** Use `/usr/share/sounds/alsa/Front_Center.wav` — a `.wav` file that ships with the `alsa-utils` package (which is the package providing `aplay` itself, so it's present whenever `aplay` is). The `alsa/` directory contains multiple WAVs (`Front_Center.wav`, `Front_Left.wav`, `Front_Right.wav`, `Rear_Center.wav`, …) — pick `Front_Center.wav` for Stop and `Front_Right.wav` (or any other) for Notification if a second sound is needed.

**Alternative recommendation:** If the participant's WSL/Linux setup is minimal and even `alsa-utils` sound files are missing, the planner can soften the slide to `aplay <path-to-any-.wav-on-your-system>` — the workshop doesn't depend on a specific file, only on the chime firing.

**Warning signs:** Slide wording recommending `aplay <something>.oga` or `aplay <something>.ogg`.

### Pitfall 5: `Stop` Event Misunderstanding — Not Just a Tool Stop

**What goes wrong:** A planner might worry that `Stop` only fires when the user types `/stop` or hits Ctrl-C, leading them to recommend a more complex hook setup. This is incorrect.

**Source quote ([CITED: https://code.claude.com/docs/en/hooks-guide]):**
> "The `Stop` event fires when Claude Code has finished generating its response."

**Also ([CITED: https://code.claude.com/docs/en/hooks]):**
> "Events fall into three cadences: once per session (SessionStart, SessionEnd), once per turn (UserPromptSubmit, Stop, StopFailure), and on every tool call inside the agentic loop (PreToolUse, PostToolUse)."

**How to avoid:** Trust the docs — `Stop` fires once per assistant turn, deterministically. Section 05's Step 1 ✓ Check ("you hear a chime when Claude finishes") will succeed on the participant's first prompt-and-reply. No need to engineer a more elaborate trigger.

**Warning signs:** Plan tasks that reference `/stop`, Ctrl-C, or "end of session" instead of "end of turn."

### Pitfall 6: Slide-4 Callback Wording Drifting from Phase 1 Win 2

**What goes wrong:** D-04 requires Slide 4 of Section 02 to include a callback to the `~/.claude/CLAUDE.md` rule from Phase 1 Section 07 (Win 2). The callback wording is at planner discretion, but the rule text and file path MUST be accurate. A sloppy paraphrase that says "the rule you put in `claude.md`" or "in `CLAUDE.md`" (without the `~/.claude/` prefix) breaks the bridge — participants need to recognize the exact path they wrote to in Chapter 1.

**Source (Phase 1 actual rendered output, `pages/01-audience-setup/07-win-claude-md.md` line 1, 3, 33):**
- The file participants edited: `~/.claude/CLAUDE.md`
- The rule line: `When in plan mode, always ask clarifying questions before you start planning.`
- The Phase 1 framing of why it works: "A message attached to every conversation — not the system prompt, not enforced config."

**How to avoid:** Slide 4 callback prose MUST use the exact path `~/.claude/CLAUDE.md` (inline-coded). The rule text itself does NOT need to be re-quoted (that would be redundant), but the path must match. Recommended wording (researcher pick):
> the rule you put in `~/.claude/CLAUDE.md` in Chapter 1 — that's the imperfect version of a hook

This matches the quote-2 wording ("we can tell claude in your claude.md file…") and Phase 1's actual file path simultaneously.

**Warning signs:** Plan wording using `./CLAUDE.md`, `claude.md`, or any other path variant. The callback file path is load-bearing.

### Pitfall 7: Forgetting `slides.md` Headmatter Preservation (Phase 1 Pitfall 6, still applies)

**What goes wrong:** Editing `slides.md` to add the chapter `src:` block accidentally rewrites the headmatter, breaking locked theme tokens.

**How to avoid:** The Phase 2 edit to `slides.md` appends exactly one block at the end of the file:
```markdown
---
src: ./pages/02-hooks.md
---
```
No headmatter edit. No cover-slide edit. No edit to the existing Phase 1 include block. The diff must touch only lines AFTER the last existing `---` block (current EOF is line 31 per `Read` of `slides.md`).

**Warning signs:** A diff that touches any of lines 1-31 of `slides.md`.

## Code Examples

Verified syntax from official sources:

### Canonical Stop+Notification hook (Section 04 paste target)

```json
// Source: https://code.claude.com/docs/en/hooks-guide (verified 2026-05-12)
// Structure: hooks → <EventName>[] → { "matcher"?: <regex>, "hooks": [{ "type": "command", "command": <shell> }] }
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
    ],
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Ping.aiff"
          }
        ]
      }
    ]
  }
}
```
(Note: the `// Source` comments above are documentation here — they MUST NOT appear in the slide's fenced block.)

### Reference: Notification with matcher (NOT what we use — for completeness only)

```json
// Source: https://code.claude.com/docs/en/hooks
{
  "hooks": {
    "Notification": [
      {
        "matcher": "permission_prompt",
        "hooks": [
          {
            "type": "command",
            "command": "/path/to/permission-alert.sh"
          }
        ]
      },
      {
        "matcher": "idle_prompt",
        "hooks": [
          {
            "type": "command",
            "command": "/path/to/idle-notification.sh"
          }
        ]
      }
    ]
  }
}
```
**We deliberately omit the matcher in Section 04** to catch all notification types with one paste.

### Phase 1 ✓ Check pattern (mirror exactly in Section 05)

```markdown
> ✓ Check: you hear a chime when Claude finishes.
```

Blockquote with `✓ Check:` prefix. Phase 2's CSS renders blockquotes legibly against the locked palette. Mirrors Phase 1's pattern verbatim.

### Chapter orchestrator (mirror Phase 1's `pages/01-audience-setup.md`)

```markdown
---
src: ./02-hooks/01-cover.md
---
---
src: ./02-hooks/02-why-hooks.md
---
---
src: ./02-hooks/03-how-hooks-work.md
---
---
src: ./02-hooks/04-hands-on-build.md
---
---
src: ./02-hooks/05-hands-on-fire.md
---
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Hooks JSON schema (older flat `{"Stop": ["command"]}` form, pre-v1.x) | Nested `{ "hooks": { "Stop": [ { "hooks": [ { "type": "command", "command": "…" } ] } ] } }` [CITED: https://code.claude.com/docs/en/hooks 2026-05-12] | Pre-2025 — current is stable across all v2.x Claude Code releases | CONTEXT D-06 JSON shape is CORRECT — verified. |
| Native Windows unsupported (CONTEXT D-06 assumption) | Native Windows supported via PowerShell installer [CITED: https://code.claude.com/docs/en/setup] | 2025–2026 (timing imprecise) | Section 03 Windows footnote wording softened — see Pitfall 1. |
| `aplay` `.oga` file recommendation (researcher temptation) | `aplay <wav>` only; use `paplay` for `.oga`/`.ogg` [VERIFIED: WebSearch + Linux man pages] | Always — researcher caught this before slide-write | Linux/WSL note uses `/usr/share/sounds/alsa/Front_Center.wav`. |
| Single hook event list (Stop/Notification only) | Full canonical list: `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PostToolBatch`, `Notification`, `UserPromptSubmit`, `SessionStart`, `SessionEnd`, `Stop`, `SubagentStart`, `SubagentStop`, `PreCompact`, `PermissionRequest`, plus SDK-only: `Setup`, `TeammateIdle`, `TaskCompleted`, `ConfigChange`, `WorktreeCreate`, `WorktreeRemove` [CITED: agent-sdk/typescript] | Continuously expanded | Section 03's "more exist" line should cite the CLI-relevant subset: `PreToolUse, PostToolUse, UserPromptSubmit, SessionStart` — matches CONTEXT D-05 wording exactly. Don't extend the list mid-slide. |

**Deprecated/outdated:**
- The phrase "system prompt" as the loading mechanism for `~/.claude/CLAUDE.md` — Phase 1 RESEARCH Pitfall 4 confirmed it's a "message attached to your conversation, not the system prompt." This phrasing appears in Phase 1's actual Slide 4 of Win 2. The Phase 2 Slide 4 callback (D-04) should use language consistent with Phase 1's framing — i.e., refer to the rule sitting in the conversation, not the system prompt.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `/usr/share/sounds/alsa/Front_Center.wav` ships with `alsa-utils` on Ubuntu/Debian/WSL Ubuntu defaults | Section 03 + 04 Linux/WSL footnote | LOW. The `alsa-utils` package (which provides `aplay` itself) installs these WAVs as part of the package. If a participant has `aplay` available, they have this file. Mitigation: slide-prose says "swap path if needed" softly. |
| A2 | `permission_prompt` is a more deterministic trigger than `idle_prompt` for a 30-second hands-on window | Section 05 step 2 trigger choice | LOW. Permission prompts fire immediately on tool-call attempt; idle prompts have variable timing. Researcher confirmed via docs that both fire `Notification`. |
| A3 | The Section 04 paste-target Notification JSON (omitting matcher) catches `permission_prompt` notifications | Section 04 + 05 ✓ Check | LOW. Docs are explicit: omitting matcher catches all notification subtypes. Verified across two docs pages (hooks.md and hooks-guide.md). |
| A4 | Participants on macOS will have `afplay` available without extra install | Section 03 + 04 macOS path | NONE — `afplay` is a built-in macOS binary present since Mac OS X 10.x. Verified `ls /System/Library/Sounds/` returns the canonical sound list including `Glass.aiff` and `Ping.aiff` on the researcher's M4 Max. |

**All other claims are tagged [VERIFIED] (Context7 docs fetched 2026-05-12, Phase 1 RESEARCH source-of-truth, local file inspection) or [CITED] (URLs in Sources section).** No [ASSUMED] claims outside this table.

## Open Questions

1. **Should Slide 4 of Section 02 quote Phase 1's "message attached to your conversation" framing, or just reference the file path?**
   - What we know: D-04 requires a callback. Quote 2 itself references `claude.md` directly. The Phase 1 Slide 2 of Win 2 (now consolidated to a single slide per the SUMMARY) uses the exact phrase "A message attached to every conversation."
   - What's unclear: whether re-quoting Phase 1's framing on Slide 4 adds value or just adds noise.
   - Recommendation: **Just the path reference is enough.** Quote 2 already does the conceptual work ("ping us every time it needs an input from us"). Slide 4 callback prose should be one short dim line: "the rule you put in `~/.claude/CLAUDE.md` in Chapter 1 — that's the imperfect version of a hook." If presenter wants more, they say it live.

2. **Should the Section 03 events line use inline-coded event names or plain text?**
   - What we know: Phase 1 inline-codes file paths and command names (`~/.claude/CLAUDE.md`, `/statusline`). Same convention applies.
   - Recommendation: inline-code each event name: `<code>PreToolUse</code>, <code>PostToolUse</code>, <code>UserPromptSubmit</code>, <code>SessionStart</code>`. Matches Phase 1 typography discipline.

3. **Does the Section 04 JSON visually overflow at presenter-mode resolution?**
   - What we know: The full Stop+Notification JSON is ~22 lines including blank lines — within the ≤25 line cap. Phase 1 Section 05 (file tree) hit a similar issue and solved it with a `<style scoped>` `font-size: 0.7rem` override.
   - Recommendation: Draft Section 04 WITHOUT the font override first. If the presenter spot-check (Plan 06) shows overflow, retrofit the same `<style scoped>` block Phase 1's `05-claude-files-primer.md` uses (lines 36-47). Defer the decision to Plan 06.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| `bunx slidev` | Section authoring, Plan 06 build | ✓ (verified Phase 1) | Slidev 52.15.1 | — |
| `bun` | All commands | ✓ | 1.3.5 | — |
| Node ≥ 20.12 | Slidev's Vite internals | ✓ (Phase 1 shipped) | — | `nvm use 20.12+` |
| Git | Per-section atomic commits (QUAL-02) | ✓ | — | — |
| Vercel project link | Per-PR preview deploys | ✓ | — | local preview if Vercel down |
| `afplay` | Researcher's local verification of sound paths only (NOT a deck build dependency) | ✓ (macOS native) | — | N/A — participants run on their own machines |
| `/System/Library/Sounds/Glass.aiff` + `Ping.aiff` | Researcher verification of slide content | ✓ (both confirmed via `ls` on researcher M4 Max) | — | — |

No external service calls during build. Section content does NOT invoke Claude Code or write to `~/.claude/settings.json` during the deck build — those happen on the participant's machine at workshop time.

**No missing dependencies. No fallbacks needed for the deck build itself.**

## Project Constraints (from CLAUDE.md)

The project root `CLAUDE.md` locks the following directives that the planner MUST honor (carried forward from Phase 1, unchanged):

- **Package manager:** Bun only (`bunx slidev`, `bunx slidev build`). NEVER `npm` / `npx` / `yarn`.
- **Theme:** `@slidev/theme-default` with custom CSS overlay. Do NOT swap to a community theme.
- **Highlighter:** Shiki `vitesse-dark`. Prism removed in v0.48+, not an option.
- **Stack pin:** `@slidev/cli@^52.15`. Installed 52.15.1.
- **`vite.config.ts`:** Do NOT create one (Slidev issue #2043).
- **CSS scoping:** All custom CSS lives under `.slidev-layout` ancestor. Section authoring does NOT add new colors and does NOT touch `style.css`.
- **Tone discipline (QUAL-04):** Confident, terse, no hype, no exclamation marks in body, no screenshots.
- **GSD workflow:** All file edits go through GSD commands; per-section atomic commits per QUAL-02.

**Phase-2-specific content constraints:**
- The three Section 02 quotes are **user-locked, verbatim, no edits, no paraphrasing**. (CONTEXT D-03)
- The Section 03/04 JSON shape is **verified canonical** — do not "improve" it (no matchers, no `"name"` field, no `"version"` field).
- JSON code blocks **must never contain comments or trailing commas** (Pitfall 2 + canonical docs).
- The Slide 4 callback path must read exactly `~/.claude/CLAUDE.md` (Pitfall 6).

These constraints are non-negotiable.

## Sources

### Primary (HIGH confidence)

- **Claude Code hooks reference** — https://code.claude.com/docs/en/hooks — full lifecycle event list, JSON schema, Stop/Notification semantics, matcher syntax. [CITED — fetched via Context7 2026-05-12]
- **Claude Code hooks guide** — https://code.claude.com/docs/en/hooks-guide — practical config examples, "Stop event fires when Claude Code has finished generating its response", "no trailing commas or comments" enforcement, `.claude/settings.json` vs `~/.claude/settings.json` location guidance. [CITED — fetched via Context7 2026-05-12]
- **Claude Code settings** — https://code.claude.com/docs/en/settings — `settings.json` example schema, `$schema` autocomplete pointer. [CITED]
- **Claude Code setup (Windows)** — https://code.claude.com/docs/en/setup — native Windows support confirmation: "You can run Claude Code natively on Windows or within WSL." [CITED — invalidates CONTEXT D-06 Windows wording, see Pitfall 1]
- **Claude Code Agent SDK (TS)** — https://code.claude.com/docs/en/agent-sdk/typescript — full HookEvent union type. [CITED]
- **Slidev importing slides** — https://sli.dev/features/importing-slides.html — `src:` frontmatter semantics, "original content of the slide will be ignored." [CITED]
- **Slidev v-clicks** — https://sli.dev/guide/animations.html [CITED]
- **Phase 1 RESEARCH.md** — `.planning/phases/01-audience-setup/01-RESEARCH.md` — definitive source for Slidev parser source-inspection findings (nested `src:` recursion, path resolution), patterns, anti-patterns. [VERIFIED — file inspection]
- **Phase 1 PATTERNS.md** — `.planning/phases/01-audience-setup/01-PATTERNS.md` — definitive section file templates, code-block CSS contract, ✓ Check pattern. [VERIFIED — file inspection]
- **Phase 1 actual rendered files** — `pages/01-audience-setup/*.md` (read all 7 files) — ground-truth visual conventions Phase 2 mirrors. [VERIFIED — file inspection]
- **`slides.md`** — current orchestrator state, headmatter (lines 1-18), existing Phase 1 include (lines 28-30). [VERIFIED]
- **`style.css`** — Phase 2 CSS contract (auto-applied tinted panel + rust left rule on every Shiki block). [VERIFIED]
- **Phase 1 Plan 08 SUMMARY** — `.planning/phases/01-audience-setup/01-08-SUMMARY.md` — captures the build + spot-check pattern Plan 06 will mirror; also documents the live deviations (e.g., port-3030 stale-process gotcha) that Phase 2's build plan may want to anticipate. [VERIFIED]
- **Local macOS** — `ls /System/Library/Sounds/` returned `Glass.aiff`, `Ping.aiff`, and 12 others on researcher M4 Max — confirms canonical paths still ship. [VERIFIED]

### Secondary (MEDIUM confidence)

- **Context7 `/websites/code_claude`** (7393 verified snippets) — cross-referenced for hook event enumeration and lifecycle semantics. All findings cross-confirmed against the primary URLs.
- **WebSearch — WSL Ubuntu sound files** — confirms `aplay` plays WAV (not OGA), `/usr/share/sounds/` is the canonical directory, `/usr/share/sounds/alsa/Front_Center.wav` ships with `alsa-utils`. [Multiple sources, cross-referenced.]

### Tertiary (LOW confidence)

- None used.

## Metadata

**Confidence breakdown:**

- Slidev structural patterns (chapter orchestrator, nested `src:`, section file frontmatter): **HIGH** — copy-paste from Phase 1's proven-shipped patterns.
- Hooks JSON schema (CONTEXT D-06 shape): **HIGH** — direct verification against current docs, byte-for-byte identical to canonical examples.
- `Stop` event semantics: **HIGH** — direct quote from docs.
- `Notification` event triggers: **HIGH** — explicit matcher list in docs (`permission_prompt`, `idle_prompt`, `auth_success`, `elicitation_*`).
- macOS sound paths: **HIGH** — local file verification + docs convention.
- Linux/WSL sound path (`/usr/share/sounds/alsa/Front_Center.wav`): **MEDIUM** (A1) — ships with `alsa-utils` package per Ubuntu/Debian conventions, but minimal/Alpine WSL images may lack it. Mitigation: slide-prose softening.
- Native Windows support claim: **HIGH** — direct docs quote contradicts CONTEXT D-06.
- Slide 4 callback wording (D-04 discretion area): **HIGH** — researcher pick grounded in Phase 1's actual rendered file content.

**Research date:** 2026-05-12
**Valid until:** 2026-06-11 (30 days — Slidev 52.15.x stable; Claude Code hook schema has been stable across v2.x).
