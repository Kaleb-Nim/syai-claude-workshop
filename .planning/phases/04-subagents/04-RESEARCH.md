# Phase 4: Subagents - Research

**Researched:** 2026-05-13
**Domain:** Slidev chapter authoring (mirror of Phase 3 pattern) + Claude Code subagents accuracy (`/agents` command flow, `.claude/agents/<name>.md` file shape, scope precedence, Task→Agent tool delegation, VoltAgent registry template structure)
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Section breakdown (D-01):** Chapter 4 = 7 content sections + 1 closing build plan = 8 plans.
1. `pages/04-subagents/01-cover.md` — chapter cover (one-line provocation).
2. `pages/04-subagents/02-skills-vs-subagents.md` — cookbook/sous-chef framing + comparison table + 2-3 locked verbatim quotes (D-02, D-03).
3. `pages/04-subagents/03-why-subagents.md` — context preservation as core motivator; raises context bloat (D-04).
4. `pages/04-subagents/04-how-subagents-work.md` — `.claude/agents/<name>.md` shape + standardized template + Task tool + user-invoked vs Claude-invoked (SUB-01, D-05).
5. `pages/04-subagents/05-showcase.md` — side-by-side frontmatter of 3 real VoltAgent subagent files (D-06).
6. `pages/04-subagents/06-hands-on-build.md` — `/agents` interactive command walkthrough (SUB-03 wire, D-07).
7. `pages/04-subagents/07-hands-on-fire.md` — invoke the new subagent, observe isolated context, ✓ checks (SUB-03 fire, D-08).
- Plan 08: `bunx slidev build` + presenter spot-check (QUAL-01).

**Section 02 (D-02, D-03):** Cookbook/sous-chef framing gets its own section, before why-subagents. 2-3 verbatim quotes from dev.to article — researcher confirms exact wording below.

**Section 03 (D-04):** Anchored on **context preservation**. Subagents have **own isolated context window** so main chat doesn't get polluted. Explicitly raise **context bloat**.

**Section 04 (D-05):** Teaches `.claude/agents/<name>.md` via the **standardized VoltAgent template shape** (locked):
```markdown
---
name: subagent-name
description: When this agent should be invoked
tools: Read, Write, Edit, Bash, Glob, Grep
model: sonnet
---

You are a [role description and expertise areas]...

[Agent-specific checklists, patterns, and guidelines]...

## Communication Protocol
Inter-agent communication specifications...

## Development Workflow
Structured implementation phases...
```
Plus on same/adjacent slide, two invocation modes (SUB-01): **user-invoked** (`@subagent-name` / `/agents` UI) and **Claude-invoked** (Task/Agent tool delegation via the `description:` field).

**Section 05 (D-06):** Side-by-side frontmatter slide for **python-pro**, **quant-analyst**, **market-researcher**. Researcher to confirm exact file paths + raw frontmatter.

**Section 06 (D-07):** `/agents` interactive slash command. NOT manual file creation. YouTube walkthrough https://www.youtube.com/watch?v=DNGxMX7ym44 is source-of-truth.

**Section 07 (D-08):** Invoke + observe isolated context. Two ✓ checks: (1) subagent visible in `/agents` list; (2) invoked subagent returns result, main chat stays clean.

### Claude's Discretion

- Exact cover-slide one-liner (Section 01).
- Specific hands-on subagent purpose (Section 06/07) — planner picks from research recommendation below.
- Comparison-table column choices in Section 02 (min: activation, context, primary use; planner may add 1-2 more).
- Exact 3 quotes locked in Section 02 (researcher recommends below; user/planner confirms).
- Whether the standardized template is shown in one slide or two (frontmatter slide + body-structure slide).

### Deferred Ideas (OUT OF SCOPE)

- **Agent SDK bridge (SUB-02) — DROPPED entirely from v1.1 per D-09.** No SDK content anywhere.
- Authoring subagents from scratch in a text editor (manual `mkdir` + paste).
- Deep template-field walkthrough (Communication Protocol, Development Workflow taught field-by-field).
- Project-level vs user-level scope precedence rules (taught only by name on the file-shape slide).
- Subagent chaining / multi-agent orchestration.
- MCP, Plan Mode, copy-to-clipboard, persistent sidebar.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SUB-01 | Subagents in Claude Code — Task/Agent tool, `.claude/agents/<name>.md` file shape, user-invoked vs Claude-invoked | Section 04 — verified against `code.claude.com/docs/en/sub-agents`. Frontmatter (`name`, `description` required; `tools`, `model` optional) confirmed. Task tool was renamed to **Agent** in v2.1.63 (existing `Task(...)` references still work as aliases) — mention "Task / Agent tool" in slides to bridge old and new docs. Two invocation modes confirmed: (a) automatic delegation via `description:` field, (b) explicit `@agent-<name>` typeahead (verbatim syntax from official docs). |
| SUB-03 | One small live hands-on task | Section 06/07 — `/agents` interactive command flow extracted from official quickstart + YouTube transcript (saved to `assets/agents-walkthrough-transcript.txt`). Walkthrough verified: open `/agents` → Library tab → Create new agent → Personal/Project → Generate with Claude → describe purpose → select tools → select model → choose color → save. Hands-on subagent recommendation: **commit-message-writer** (fastest demo, cleanest isolated-context payoff — see Section 06/07 recommendation below). |
| QUAL-01 | `bunx slidev build` exits 0 + presenter spot-check | Closing plan 08 mirrors Phase 3 plan 06. Same shape, no new build risk. |
| QUAL-02 | Atomic per-section commits | Discipline, not technical. |
| QUAL-04 | Tone discipline | Drives slide-writing only. |

**SUB-02 (Agent SDK bridge): DROPPED per D-09.** No research output for SUB-02. Action item: planner must update REQUIREMENTS.md to mark SUB-02 closed-as-out-of-scope and rename ROADMAP phase "Subagents + Agent SDK" → "Subagents".

</phase_requirements>

## Summary

Phase 4 ports the Phase 3 chapter-orchestrator template forward with two structural extensions: a dedicated **Section 02 (skills-vs-subagents framing)** that mirrors the Phase 3 locked-quote pattern, and a **Section 05 showcase** that puts three real VoltAgent subagent frontmatters side-by-side. The technical core (`SUB-01`) is well-supported by current official docs at `code.claude.com/docs/en/sub-agents`. The locked VoltAgent template (D-05) is a **superset** of the official Claude Code template — only `name` and `description` are strictly required; `tools` and `model` are optional. The Communication Protocol + Development Workflow body sections are **VoltAgent registry convention, not enforced by Claude Code** — this divergence must be flagged on the slide (one-liner footnote is sufficient; the template still loads cleanly).

The dev.to article yielded three verbatim, high-signal quotes that map cleanly onto D-02/D-03 seeds:
1. **Cookbook/sous-chef one-liner:** *"Skill = giving Claude a cookbook · Subagent = hiring a sous chef"*
2. **Isolated context structural difference (from the comparison table):** *"Shares your main chat context"* (Skills) vs *"Gets its own isolated context window"* (Subagents)
3. **The "don't reach for one unless you need it" rule:** *"Start with a skill unless you specifically need subagent features. Skills are simpler, faster, and easier to maintain."*

The article's wording for the "don't waste context on simple utilities" beat is softer than CONTEXT.md's seed — the author frames it as *"Start with a skill unless…"* rather than *"don't use subagents for simple utilities — wastes context."* Two acceptable paths for the planner:
- **Use the article's exact wording** (truer to the verbatim policy).
- **Combine quote #3 with a one-line researcher-attributed summary** ("If a skill can do it, prefer the skill — subagents are heavier") — but this breaks the locked-verbatim discipline. Recommend path A.

All three VoltAgent files (`python-pro`, `quant-analyst`, `market-researcher`) **exist at HEAD** with usable frontmatters. The `/agents` command on current Claude Code (v2.1.x) opens a **tabbed interface** (Running / Library), not a flat menu — slides should match the current UI flow extracted from the official quickstart, with the YouTube video as secondary reference (the video predates the tabbed-interface refresh in some details; favor official docs where they diverge).

**Primary recommendation:** Mirror Phase 3 structure exactly. Use article quotes 1+2+3 verbatim. Show the VoltAgent template with a one-line footnote: *"The lower two sections are a VoltAgent-registry convention — Claude Code only requires `name` and `description`."* For Section 06/07 hands-on, use **commit-message-writer** (Bash `git diff` + Read; reads diff → writes conventional commit message; demonstrates isolated context because the diff stays in the subagent's window and only the one-line message returns to main chat).

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Chapter orchestrator (`pages/04-subagents.md`) | Slidev source / authoring | — | Thin `src:`-include wrapper, identical pattern to `pages/03-hooks.md`. |
| Section slide files (`pages/04-subagents/0N-*.md`) | Slidev source / authoring | — | Markdown + scoped CSS only; no Vue components needed beyond Slidev defaults. |
| Locked verbatim quotes (Section 02) | Slidev markdown blockquote | — | Same shape as `pages/03-hooks/02-why-hooks.md`. |
| VoltAgent frontmatter showcase (Section 05) | Slidev fenced markdown blocks (3-up grid) | Scoped CSS | Use the Phase 3 Section 03 grid-cols-3 layout pattern; will need `slide-fit-code` skill retrofit if frontmatter doesn't fit at default font size. |
| `/agents` walkthrough screenshots/assets (Section 06) | Static assets in `.planning/phases/04-subagents/assets/` referenced only if instructor wants them | Slidev `public/` if shipped to deck | QUAL-04 tone constraint forbids screenshots in body — text-only walkthrough on slides. Assets in `.planning/` are for instructor reference, not deck content. |
| Build verification (Plan 08) | `bunx slidev build` + presenter spot-check | — | Identical to Phase 3 plan 06. |

**Why this matters:** QUAL-04 explicitly bans screenshots. The YouTube transcript + key UI prompts must be **transcribed into text on the slide** (the prompt sequence: "Project / Personal" → "Generate with Claude" → describe → tools → model → color → save). Screenshots captured for instructor preparation only.

## Standard Stack

### Core

| Library / Tool | Version | Purpose | Why Standard |
|---------------|---------|---------|--------------|
| Slidev | `@slidev/cli` ^52.15 | Slide framework (locked from v1.0) | Project constraint. No change from Phase 3. `[VERIFIED: existing package.json]` |
| Bun | ^1.3.x | Package manager + script runner | Project constraint. `[VERIFIED: CLAUDE.md + Phase 3 PRs]` |
| Claude Code | v2.1.63+ | Required for current `/agents` tabbed interface and the Task → Agent tool rename | Slides reference current UI. Older Claude Code installs (pre-2.1.63) still see `Task` tool; docs note "existing `Task(...)` references in settings and agent definitions still work as aliases." `[VERIFIED: https://code.claude.com/docs/en/sub-agents — "In version 2.1.63, the Task tool was renamed to Agent."]` |

### Supporting

| Library / Tool | Purpose | When to Use |
|---------------|---------|-------------|
| Shiki (bundled) | YAML syntax highlighting for `---` frontmatter blocks in Sections 04 + 05 | Default Slidev behavior; no config needed. |
| `slide-fit-code` skill (project-local) | Font-shrink retrofit if 3-up VoltAgent frontmatter overflows on Section 05 | Apply only if Section 05 dry-run shows overflow. Same pattern as Phase 3 plan 03 retrofit. |
| `preview-deck` skill (project-local) | Start `bunx slidev` dev server during authoring | Used by author/instructor only; not slide content. |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Side-by-side 3-up frontmatter grid | One slide per subagent (3 slides) | Loses the side-by-side comparison value that motivates D-06. Reject. |
| YouTube screenshots embedded in slides | Text-only walkthrough (recommended) | QUAL-04 bans screenshots. Reject screenshots. Use ordered-list of prompts on slide. |
| Pure article-quote verbiage for "don't waste context" beat | Researcher-paraphrased one-liner | Breaks verbatim-quote discipline (D-03 LOCKED). Prefer article quote 3 verbatim. |
| `commit-message-writer` hands-on | `log-summarizer` or copy of `python-pro` | `python-pro` requires participants to have meaningful Python work in scope (not assumed). `log-summarizer` needs a verbose log in scope (not assumed). `commit-message-writer` only needs an uncommitted change in any repo — universally demoable and cleanly demonstrates "diff stays in subagent context, one-line message returns." Recommend `commit-message-writer`. |

**Installation:** No new package installs. Phase 4 uses the existing Slidev/Bun toolchain. Participants need:
- Claude Code v2.1.63+ for the tabbed `/agents` interface (recommend v2.1.117+ for fork mode mention parity, though fork mode is not taught).

## Architecture Patterns

### System Architecture Diagram

```
participant editor (instructor)
    │
    ▼ writes
pages/04-subagents.md  ──src:──▶  pages/04-subagents/01-cover.md
    (chapter orchestrator)        pages/04-subagents/02-skills-vs-subagents.md
                                  pages/04-subagents/03-why-subagents.md
                                  pages/04-subagents/04-how-subagents-work.md
                                  pages/04-subagents/05-showcase.md
                                  pages/04-subagents/06-hands-on-build.md
                                  pages/04-subagents/07-hands-on-fire.md
    │
    ▼ src:-included into
slides.md  (root orchestrator)
    │
    ▼ bunx slidev build
dist/   (static SPA — Vercel deploys)
    │
    ▼ presenter loads
audience sees rendered chapter

# runtime artifact participants build during Sections 06/07:
participant runs `/agents`
    │
    ▼ interactive flow (project | personal → generate → tools → model)
~/.claude/agents/commit-message-writer.md   (personal scope, default)
or .claude/agents/commit-message-writer.md  (project scope)
    │
    ▼ participant runs `@commit-message-writer` or natural-language prompt
Claude Code spawns subagent (own context window)
    │
    ▼ tool calls (Read git diff) stay in subagent window
final summary message returns to main chat
```

### Recommended Project Structure

```
pages/
├── 04-subagents.md             # NEW — chapter orchestrator (7 src: includes)
└── 04-subagents/               # NEW directory
    ├── 01-cover.md
    ├── 02-skills-vs-subagents.md
    ├── 03-why-subagents.md
    ├── 04-how-subagents-work.md
    ├── 05-showcase.md
    ├── 06-hands-on-build.md
    └── 07-hands-on-fire.md
slides.md                       # MODIFIED — add src: ./pages/04-subagents.md after Phase 3 include

.planning/phases/04-subagents/
├── 04-CONTEXT.md               # exists
├── 04-RESEARCH.md              # this file
├── assets/
│   └── agents-walkthrough-transcript.txt   # saved during research
└── (PLAN.md files added by /gsd-plan-phase 4)
```

### Pattern 1: Chapter-orchestrator src: includes

**What:** `pages/NN-chapter.md` is a thin file containing only frontmatter blocks pointing at `pages/NN-chapter/0M-section.md`.
**When to use:** Every v1.1 chapter (already established Phases 1-3).
**Example (verbatim from `pages/03-hooks.md`):**
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
src: ./03-hooks/04b-or-just-ask.md
---
---
src: ./03-hooks/05-hands-on-fire.md
---
```
Phase 4 follows the same pattern with 7 includes.

### Pattern 2: Locked verbatim quote slides

**What:** A slide whose body is one markdown blockquote (`> quote here`) with no Claude-paraphrase.
**When to use:** Section 02 — same as Phase 3 Section 02 "what makes hooks different / why use hooks / in essence" slides 3-5.
**Example (verbatim from `pages/03-hooks/02-why-hooks.md`):**
```markdown
# What makes hooks different

> The key diff between Hooks and everything else is that Hooks are deterministic, they always run

---

# Why use hooks

> We can tell claude in your claude.md file to ping us every time it needs an input from us. But it's not perfect. A hook makes it run every single time without exceptions
```
Phase 4 Section 02 mirrors this for the dev.to article quotes.

### Pattern 3: Multi-column code grid (Section 05)

**What:** `<div class="grid grid-cols-3 gap-3 mt-2">` wrapping 3 fenced code blocks, with a scoped `<style>` shrinking code font.
**When to use:** Side-by-side frontmatter comparison (Section 05).
**Example (verbatim shape from `pages/03-hooks/03-how-hooks-work.md`):**
```markdown
<div class="grid grid-cols-3 gap-3 mt-2">

<div>

**python-pro**

```yaml
---
name: python-pro
description: ...
tools: Read, Write, Edit, Bash, Glob, Grep
model: sonnet
---
```

</div>

<div>

**quant-analyst**

```yaml
---
…
---
```

</div>

<div>

**market-researcher**

```yaml
---
…
---
```

</div>

</div>

<style scoped>
pre, code { font-size: 0.5rem !important; line-height: 1.15 !important; }
.slidev-code { padding: 0.35em 0.55em !important; }
h1 { margin-bottom: 0.3em !important; }
</style>
```

### Anti-Patterns to Avoid

- **Screenshots of the `/agents` UI on slides.** QUAL-04 bans screenshots. Transcribe the prompt sequence as text.
- **Paraphrasing dev.to quotes.** D-03 LOCKS verbatim wording. The slide body is the blockquote, full stop.
- **Showing 3 separate showcase slides.** D-06 LOCKS side-by-side; loses comparison value otherwise.
- **Teaching SDK content.** D-09 drops SUB-02 entirely. No `query()` snippet, no "same thing outside CLI" framing.
- **Manual `.claude/agents/` file creation in Section 06.** D-07 LOCKS the `/agents` interactive command.
- **JSON-style comments inside YAML frontmatter blocks** (Phase 3 lesson — YAML rejects them; in fenced YAML blocks they render but mislead participants about file validity).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Side-by-side comparison layout | Custom Vue component for "diff-style frontmatter compare" | `grid grid-cols-3` + scoped CSS (Phase 3 Section 03 pattern) | Existing pattern works, ships zero JS, hot-reloads cleanly. |
| YouTube transcript extraction | Manual viewing + paraphrase | `yt-dlp --write-auto-sub --sub-lang en` (used during this research; transcript saved at `.planning/phases/04-subagents/assets/agents-walkthrough-transcript.txt`) | Already done — planner uses the saved transcript. |
| Code-block font shrink retrofit | New scoped CSS authored from scratch | Apply `slide-fit-code` skill or copy the Phase 3 Section 03 `<style scoped>` block verbatim | Same pattern exists; QUAL-02 doesn't reward novelty. |
| YAML highlighting | Custom Shiki transformer | Slidev's bundled Shiki — fence as ` ```yaml ` | Default behavior covers it. |

**Key insight:** Phase 4 introduces zero new technical patterns. Everything reuses Phase 3 mechanisms. The novelty is content (subagent topic) + one extra section (skills-vs-subagents framing as its own beat).

## Common Pitfalls

### Pitfall 1: Showing the VoltAgent template as if it's Claude Code's required shape

**What goes wrong:** Slide implies Communication Protocol + Development Workflow sections are required by Claude Code. Participant copies template, omits those sections, panics that "their subagent is broken."
**Why it happens:** D-05's locked template is the **VoltAgent registry convention**, not Claude Code's requirements. The official Claude Code docs explicitly state: *"Only `name` and `description` are required."* Other fields (`tools`, `model`, etc.) are optional. Communication Protocol and Development Workflow are body conventions VoltAgent adopted for cross-agent consistency.
**How to avoid:** Section 04 slide includes a single-line footnote in dimmed text: *"The lower two sections (Communication Protocol, Development Workflow) are a VoltAgent-registry convention — Claude Code only requires `name` and `description`."*
**Warning signs:** Participant asks "do I need a Communication Protocol section?" during Section 06 hands-on.

### Pitfall 2: Task vs Agent tool naming confusion

**What goes wrong:** Slide says "Task tool" — participant on Claude Code v2.1.63+ sees the tool called Agent and assumes the slide is outdated.
**Why it happens:** *"In version 2.1.63, the Task tool was renamed to Agent. Existing `Task(...)` references in settings and agent definitions still work as aliases."* `[VERIFIED: https://code.claude.com/docs/en/sub-agents]`
**How to avoid:** Section 04 slide uses *"Task tool (now called the Agent tool)"* on first mention, then either name afterward.
**Warning signs:** Participant says "I don't see a Task tool" in chat.

### Pitfall 3: `/agents` writes to project scope when user expected user-scope (or vice versa)

**What goes wrong:** Participant runs `/agents` from inside a repo and the subagent ends up in `.claude/agents/` instead of `~/.claude/agents/` (or vice versa). They later can't find it from a different project.
**Why it happens:** The `/agents` interactive UI prompts: *"Switch to the **Library** tab, select **Create new agent**, then choose **Personal**. This saves the subagent to `~/.claude/agents/` so it's available in all your projects."* `[VERIFIED: https://code.claude.com/docs/en/sub-agents quickstart]`. The choice is **Personal (user-scope)** vs **Project (project-scope)**. Defaults are interactive — there's no silent default. Participants who skim might pick the wrong one.
**How to avoid:** Section 06 slide is explicit: *"Choose **Personal** when prompted — your subagent will live in `~/.claude/agents/` and work in every project. Pick Project only if you want this subagent to ship with one specific repo."*
**Warning signs:** Section 07 ✓ Check 1 fails (subagent not listed) because participant created in Project scope from a different cwd.

### Pitfall 4: Auto-delegation doesn't fire reliably from the description field

**What goes wrong:** Section 07 hands-on participant types a natural-language prompt and Claude doesn't delegate to their new subagent — answers in the main chat instead.
**Why it happens:** Per official docs: *"Claude automatically delegates tasks based on the task description in your request, the `description` field in subagent configurations, and current context. To encourage proactive delegation, include phrases like 'use proactively' in your subagent's description field."* `[VERIFIED]` — auto-delegation is **heuristic, not guaranteed**.
**How to avoid:** Section 07 hands-on instructs participants to use explicit `@`-mention: *"Type `@` and pick your subagent from the typeahead — this guarantees it runs."* Verbatim from docs: *"`@`-mention: guarantees the subagent runs for one task."*
**Warning signs:** Live demo doesn't delegate. Fallback to `@agent-<name>` in front of audience.

### Pitfall 5: Subagent file edits require session restart (unless created via `/agents`)

**What goes wrong:** Instructor edits a `.md` file in `.claude/agents/` between demos and Claude doesn't see the change.
**Why it happens:** *"Subagents are loaded at session start. If you add or edit a subagent file directly on disk, restart your session to load it. Subagents created through the `/agents` interface take effect immediately without a restart."* `[VERIFIED]`
**How to avoid:** Stay inside `/agents` for all live authoring. Section 06 hands-on never touches the file in an editor.

## Code Examples

Verified patterns from official sources:

### Example 1: Minimal subagent file (official Claude Code docs)

```markdown
---
name: code-reviewer
description: Reviews code for quality and best practices
tools: Read, Glob, Grep
model: sonnet
---

You are a code reviewer. When invoked, analyze the code and provide
specific, actionable feedback on quality, security, and best practices.
```
Source: https://code.claude.com/docs/en/sub-agents `[CITED]`

### Example 2: VoltAgent `python-pro` frontmatter (verbatim)

```yaml
---
name: python-pro
description: "Use this agent when you need to build type-safe, production-ready Python code for web APIs, system utilities, or complex applications requiring modern async patterns and extensive type coverage."
tools: Read, Write, Edit, Bash, Glob, Grep
model: sonnet
---
```
Source: https://raw.githubusercontent.com/VoltAgent/awesome-claude-code-subagents/main/categories/02-language-specialists/python-pro.md `[VERIFIED: curl 2026-05-13]`

### Example 3: VoltAgent `quant-analyst` frontmatter (verbatim)

```yaml
---
name: quant-analyst
description: "Use this agent when you need to develop quantitative trading strategies, build financial models with rigorous mathematical foundations, or conduct advanced risk analytics for derivatives and portfolios. Invoke this agent for statistical arbitrage strategy development, backtesting with historical validation, derivatives pricing models, and portfolio risk assessment."
tools: Read, Write, Edit, Bash, Glob, Grep
model: opus
---
```
Source: https://raw.githubusercontent.com/VoltAgent/awesome-claude-code-subagents/main/categories/07-specialized-domains/quant-analyst.md `[VERIFIED: curl 2026-05-13]`

**Note:** the `quant-analyst` description is **long** (~430 chars). For Section 05's 3-up grid, the planner may need to either (a) truncate at the first sentence with an ellipsis (visually only — flag as "truncated for slide") or (b) shrink font further via `slide-fit-code`. Recommend (a) with a footnote: *"Descriptions truncated for layout — full text in linked repo."*

### Example 4: VoltAgent `market-researcher` frontmatter (verbatim)

```yaml
---
name: market-researcher
description: "Use this agent when you need to analyze markets, understand consumer behavior, assess competitive landscapes, and size opportunities to inform business strategy and market entry decisions."
tools: Read, Grep, Glob, WebFetch, WebSearch
model: sonnet
---
```
Source: https://raw.githubusercontent.com/VoltAgent/awesome-claude-code-subagents/main/categories/10-research-analysis/market-researcher.md `[VERIFIED: curl 2026-05-13]`

**Tool list contrast value:** Notice `market-researcher` has **no Bash/Write/Edit** — read-only + web tools. This contrasts cleanly with `python-pro` (full read/write/exec) and `quant-analyst` (full read/write/exec, but `model: opus`). The 3 files together show **tool restriction**, **model selection**, and **domain breadth** — all three teaching points for D-06 fall out naturally.

### Example 5: User invocation patterns (verbatim from official docs)

```text
# Natural language — Claude may delegate
Use the test-runner subagent to fix failing tests

# @-mention — guarantees the subagent runs
@"code-reviewer (agent)" look at the auth changes

# Or manually typed
@agent-code-reviewer
```
Source: https://code.claude.com/docs/en/sub-agents `[CITED]`

### Example 6: Recommended hands-on subagent — `commit-message-writer`

```markdown
---
name: commit-message-writer
description: Use proactively after the user makes uncommitted changes and asks for a commit message. Reads `git diff` and writes a single conventional-commit message (type(scope): subject) with no body.
tools: Bash, Read
model: sonnet
---

You write conventional-commit messages from a working-tree diff.

When invoked:
1. Run `git diff --staged` (or `git diff` if nothing is staged).
2. Identify the most prominent change (added feature, fix, refactor, docs, chore).
3. Write ONE line in the form `type(scope): subject` — lowercase, no period.
4. Return that single line as your final message. Do not commit. Do not explain.

Constraints:
- Subject ≤ 72 characters.
- No body, no footer, no co-authored-by.
- If the diff is empty, return "no changes to commit".
```

**Why this for hands-on:**
- **Universally demoable:** every participant has an uncommitted change in any repo (the workshop repo itself works).
- **Cleanly demonstrates isolated context:** the `git diff` output (potentially hundreds of lines) stays in the subagent's window — only the one-line commit message returns to main chat.
- **Visible payoff for Section 03's "context preservation" framing.**
- **Tools narrow (`Bash, Read`) — reinforces "tool restriction" teaching point.**

## Runtime State Inventory

**Skipped.** Phase 4 is a greenfield chapter (new files only) — no rename/refactor/migration involved.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Slidev | All sections (build verification) | ✓ (assumed — Phase 3 just shipped) | `@slidev/cli ^52.15` | — |
| Bun | Build + dev server | ✓ (assumed — Phase 3 just shipped) | ^1.3.x | — |
| Claude Code (v2.1.63+) | Section 06/07 live hands-on for participants | participant-side (not researched machine) | — | Older Claude Code (pre-2.1.63) still works; slides should say "Task / Agent tool" to bridge. |
| `yt-dlp` (research only) | Transcript extraction during research | ✓ | latest | — |

No missing dependencies. No blocking gaps.

## Validation Architecture

**Skipped per config check.** Per `.planning/REQUIREMENTS.md` and Phase 3 precedent, validation for this project is **QUAL-01: `bunx slidev build` exits 0 + presenter spot-check** — there is no unit-test framework in this Slidev/markdown project, and `workflow.nyquist_validation` is not relevant (this is a content authoring project, not an executable codebase requiring test sampling). Build-gate validation is captured in Plan 08 (mirrors Phase 3 plan 06).

## Security Domain

**Not applicable.** This phase produces static slide content — no auth, no input handling, no cryptography, no user-data flows. No ASVS categories apply. `[VERIFIED: no runtime code shipped from this phase]`

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `Task` tool name | `Agent` tool name (aliases preserved) | Claude Code v2.1.63 | Slides should say "Task / Agent tool" or "Task tool (now Agent tool)" on first mention. |
| Flat `/agents` menu | Tabbed `/agents` interface (Running / Library) | Recent Claude Code (current docs as of fetch 2026-05-13) | Section 06 walkthrough mirrors the **Library** tab → **Create new agent** flow from current docs, not the older YouTube video flow. |
| "subagent template = name + description + body" (minimal) | "subagent template" frontmatter now supports 15+ optional fields (`disallowedTools`, `permissionMode`, `maxTurns`, `skills`, `mcpServers`, `hooks`, `memory`, `background`, `effort`, `isolation`, `color`, `initialPrompt`) | Iteratively over 2025-2026 | D-05's locked template (4 fields: `name`, `description`, `tools`, `model`) is a sensible teaching subset. Other fields out of scope per deferred list. |

**Deprecated / outdated:**
- Manual `mkdir .claude/agents && nano foo.md` workflow — still works, but no longer the recommended teaching path (`/agents` is). Deferred per CONTEXT.md.

## `/agents` Walkthrough — Verified Flow

Source: official quickstart (https://code.claude.com/docs/en/sub-agents) cross-referenced with YouTube transcript (`assets/agents-walkthrough-transcript.txt`). Where the YouTube video predates the tabbed interface, the official docs win.

**Steps (canonical sequence for Section 06):**

1. **Run `/agents`** in Claude Code.
2. **Tabbed interface opens** — tabs: *Running* | *Library*.
3. **Switch to Library tab.**
4. **Select "Create new agent".**
5. **Choose scope:** *Personal* (writes to `~/.claude/agents/`) or *Project* (writes to `.claude/agents/`). Workshop recommendation: **Personal** so the subagent persists across all participant projects after the workshop.
6. **Select "Generate with Claude"** — alternative is *Configure manually*.
7. **Describe the subagent** when prompted. Workshop participant types:
   *"A commit-message-writer that reads `git diff` and returns one conventional-commit line. No body, no footer, ≤72 chars."*
   Claude generates `name`, `description`, and system prompt.
8. **Select tools** — choose *Bash* and *Read* only (deselect everything else).
9. **Select model** — pick *Sonnet*.
10. **Choose a color** — any.
11. **Configure memory** — select *None* (workshop subagent doesn't need cross-session memory).
12. **Review + save** — press `s` or `Enter` to save, `e` to save and open in editor.
13. **Subagent is available immediately** (no session restart needed — this is the key advantage over manual file creation).

**Disk artifact after save (assuming Personal scope):**
```
~/.claude/agents/commit-message-writer.md
```

**YouTube transcript quote (verbatim, for instructor reference — not slide content):**
> "Once you're within Cloud Code, all that you need to do to create new agents is you can forward slash agents. Once you're within there, you can create a new agent. You can specify whether the agent is going to live within the project or whether it's going to be globally on your machine where you can access it within any project. And then from there you can either manually configure or generate with claude the agent that you want to create."

Stored at: `.planning/phases/04-subagents/assets/agents-walkthrough-transcript.txt` (full transcript).

## Skills-vs-Subagents Quotes — Verified Verbatim from dev.to

Article: https://dev.to/nunc/claude-code-skills-vs-subagents-when-to-use-what-4d12 (Nunc, published 2025-10-27, fetched + verbatim-confirmed 2026-05-13)

**Quote 1 — cookbook/sous-chef one-liner (LOCKED candidate for Section 02 Slide 3):**
> Skill = giving Claude a cookbook
> Subagent = hiring a sous chef

`[VERIFIED: direct HTML extraction from dev.to article — exact wording, two-line shape with the en-dash separator on the source page]`

**Quote 2 — isolated context structural difference (LOCKED candidate for Section 02 Slide 4):**
The article's comparison table renders this verbatim row:
> Context | Shares your main chat context | Gets its own isolated context window

The clean teachable form (just the contrast pair, no table chrome):
> Skills share your main chat context. Subagents get their own isolated context window.

`[VERIFIED]`

⚠ **Verbatim-discipline note:** The clean teachable form above is a **light reformat of the comparison-table row** — the article doesn't have this prose anywhere else. Two paths for planner:
- **(A) Use the table row verbatim** as a blockquote: `> Context — Skills: Shares your main chat context · Subagents: Gets its own isolated context window` (preserves verbatim discipline but loses prose flow).
- **(B) Use the reformatted prose version** with a footnote: *"Reformatted from the article's comparison table — content verbatim, layout adapted for slide."*

**Recommend Path A** (verbatim discipline matches Phase 3's 3 hook quotes exactly).

**Quote 3 — "start with a skill" rule (LOCKED candidate for Section 02 Slide 5):**
> Start with a skill unless you specifically need subagent features. Skills are simpler, faster, and easier to maintain.

`[VERIFIED]`

⚠ **Mismatch with CONTEXT.md seed:** D-03's third seed was *"don't use subagents for simple utilities — it wastes context."* The article **does not contain those exact words.** It conveys the same idea via Quote 3 above. Two paths:
- **(A) Replace the seed with Quote 3 verbatim** (recommended — keeps verbatim discipline).
- **(B) Drop the third quote entirely** and run Section 02 with two locked quotes + the comparison table. Acceptable fallback if the planner wants tighter pacing.

**Recommend Path A.** The "Start with a skill unless…" rule is **stronger** than the seed framing — it gives participants an actionable default rather than a negative rule, which lands better at the end of Section 02.

## Comparison-Table Source Data (for Section 02)

The dev.to article's "Quick Version" table, verbatim:

| Aspect | Skills | Subagents |
|--------|--------|-----------|
| What it is | Instructions that extend Claude's knowledge | A separate AI assistant with its own context |
| When Claude uses it | Automatically when relevant | Delegated for complex workflows |
| Best for | Utility functions, recipes, how-tos | Multi-step analysis, code review, research |
| Context | Shares your main chat context | Gets its own isolated context window |

Section 02's comparison-table slide can use this verbatim. Per Claude's Discretion: planner may add 1-2 columns (e.g., "Where it lives" → `~/.claude/skills/<name>/SKILL.md` vs `~/.claude/agents/<name>.md`), but the four article rows are sufficient and verbatim-safe.

## VoltAgent Template Divergence from Claude Code Official Template

Side-by-side comparison flagged per CONTEXT.md D-05:

| Element | VoltAgent template (D-05 locked) | Claude Code official | Status |
|---------|----------------------------------|----------------------|--------|
| `name` | Required | Required | ✓ Match |
| `description` | Required | Required | ✓ Match |
| `tools` | Shown as required-ish | Optional (inherits all if omitted) | ⚠ Divergence — flag |
| `model` | Shown as required-ish | Optional (defaults to `inherit`) | ⚠ Divergence — flag |
| `## Communication Protocol` body section | Standard | **Not a Claude Code convention** — purely VoltAgent | ⚠ Flag in footnote |
| `## Development Workflow` body section | Standard | **Not a Claude Code convention** — purely VoltAgent | ⚠ Flag in footnote |
| `disallowedTools`, `permissionMode`, `maxTurns`, `skills`, `mcpServers`, `hooks`, `memory`, `background`, `effort`, `isolation`, `color`, `initialPrompt` | Not in VoltAgent canonical examples | Optional in Claude Code | Deferred per CONTEXT.md |

**Recommendation for Section 04:** Show the locked VoltAgent template **as-is** (it's a valid Claude Code subagent — the body sections render as ordinary system prompt content), with a single-line dim footnote:

> The lower two body sections (`## Communication Protocol` and `## Development Workflow`) are a VoltAgent-registry convention — Claude Code only requires `name` and `description`.

This satisfies both the locked template shape and the "flag any divergence" research mandate.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Participants have an uncommitted change in some repo (any repo) during Section 07 fire | Section 06/07 hands-on rec | Demo fails for participants with clean working trees. Mitigation: instructor instructs participants to `echo "test" >> README.md` before invoking `@commit-message-writer`. **Add as a Step 0 in Section 07.** |
| A2 | Claude Code v2.1.63+ is on participants' machines (so `/agents` shows tabbed interface) | Section 06 walkthrough fidelity | Older Claude Code shows different UI. Mitigation: workshop prerequisites slide (Phase 1) likely already covers a recent install; cross-check with Phase 1 prereqs section. |
| A3 | YouTube video at `DNGxMX7ym44` will remain accessible | None — transcript saved locally | Already saved to `assets/agents-walkthrough-transcript.txt`. No risk. |
| A4 | The VoltAgent registry URLs remain stable at HEAD until workshop ship date | Section 05 (showcase) | Files verified 2026-05-13. Mitigation: planner can also pin a commit SHA. Risk low — repo is curated and the three featured files have been there for months. |
| A5 | Truncating long `quant-analyst` description for slide-fit is acceptable to user | Section 05 layout | If user wants no truncation, planner uses `slide-fit-code` to shrink the entire 3-up grid further. Either works. |

## Open Questions

1. **Should Section 02 use the article's table verbatim, or render it with a planner-chosen column set?**
   - What we know: D-03 locks 2-3 verbatim quotes. The comparison table is a separate slide candidate.
   - What's unclear: Whether the table itself counts as a "quote" under verbatim discipline.
   - Recommendation: Use the article's 4 rows verbatim on the table slide. Add 1 row (planner discretion) only if it adds teaching value (e.g., "Where it lives" with the canonical file paths). Researcher recommends the as-is 4 rows for tightness.

2. **Should the hands-on subagent be `commit-message-writer` or something else?**
   - What we know: Three seeds in D-08 — `commit-message-writer`, `log-summarizer`, or a copy of a showcase file.
   - What's unclear: User preference.
   - Recommendation: **`commit-message-writer`** — universally demoable, clean isolated-context payoff, narrow toolset reinforces teaching. Defer final choice to planner if user has a different preference.

3. **Should the YouTube video URL appear on a slide, or only in research notes?**
   - What we know: Phase 4 plan list doesn't allocate a "credits" slot. Phase 99 Resources page already exists (`pages/99-resources/01-resources.md`).
   - What's unclear: Whether to add the YouTube URL to the resources page.
   - Recommendation: **Add to `pages/99-resources/01-resources.md` during Plan 08** as part of build-verify housekeeping (one-line addition, no plan-level overhead).

4. **Does the `quant-analyst` long description need truncation, slide-fit, or both?**
   - What we know: Description is ~430 chars; default Slidev font in a 3-up grid will overflow vertically.
   - What's unclear: Without a dry-run, exact font size needed is unknown.
   - Recommendation: Planner truncates to first sentence in Section 05 with a footnote. If still tight, apply `slide-fit-code` skill. Both available, both reversible.

## Sources

### Primary (HIGH confidence)

- **Claude Code official subagents docs** — https://code.claude.com/docs/en/sub-agents — file shape, frontmatter fields (full table), scope precedence, `/agents` quickstart, Task→Agent rename, invocation patterns. Fetched verbatim 2026-05-13. `[VERIFIED]`
- **VoltAgent `python-pro`** — https://raw.githubusercontent.com/VoltAgent/awesome-claude-code-subagents/main/categories/02-language-specialists/python-pro.md — fetched via curl 2026-05-13, file exists. `[VERIFIED]`
- **VoltAgent `quant-analyst`** — https://raw.githubusercontent.com/VoltAgent/awesome-claude-code-subagents/main/categories/07-specialized-domains/quant-analyst.md — fetched via curl 2026-05-13, file exists. `[VERIFIED]`
- **VoltAgent `market-researcher`** — https://raw.githubusercontent.com/VoltAgent/awesome-claude-code-subagents/main/categories/10-research-analysis/market-researcher.md — fetched via curl 2026-05-13, file exists. `[VERIFIED]`
- **dev.to article** — https://dev.to/nunc/claude-code-skills-vs-subagents-when-to-use-what-4d12 — full HTML fetched, quotes extracted programmatically, verbatim wording confirmed. `[VERIFIED]`

### Secondary (HIGH-MEDIUM confidence)

- **YouTube `/agents` walkthrough** — https://www.youtube.com/watch?v=DNGxMX7ym44 — auto-generated subtitles extracted via `yt-dlp`, saved at `.planning/phases/04-subagents/assets/agents-walkthrough-transcript.txt`. Source is a third party; some details (flat menu) predate the current tabbed interface — official docs override where they differ. `[VERIFIED transcript, MEDIUM on UI-flow currency]`
- **VoltAgent README + repo structure** — https://github.com/VoltAgent/awesome-claude-code-subagents — top-level category structure confirmed (`01-core-development` through `10-research-analysis`). `[VERIFIED via WebFetch]`

### Tertiary (n/a)

No LOW-confidence claims in this research. All findings either verified or cited.

## Project Constraints (from CLAUDE.md)

- **Bun-only:** No `npm`/`npx`/`yarn` anywhere. Plans use `bunx slidev` and `bun install`. `[VERIFIED: CLAUDE.md]`
- **Tone discipline (QUAL-04):** Confident, terse, no hype, no `!` in body, no emoji-heavy headers, **no screenshots** — code/terminal blocks only. Applies to all 7 section files. `[VERIFIED: REQUIREMENTS.md]`
- **Slidev 52.15 + Vercel + dark theme + JetBrains Mono / Inter** — locked from v1.0. No Phase 4 changes. `[VERIFIED: CLAUDE.md]`
- **Atomic per-section commits (QUAL-02):** Each plan ships its own commit. `[VERIFIED]`
- **Chapter-orchestrator + `src:` includes:** Established pattern, mandatory. `[VERIFIED: pages/03-hooks.md]`
- **GSD workflow:** All file changes go through GSD command (Edit/Write must be inside a plan). `[VERIFIED: CLAUDE.md]`

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new tools, Phase 3 stack carries forward.
- Architecture / chapter structure: HIGH — direct port of Phase 3 pattern with one extra section.
- Quote verbatim wording: HIGH — programmatically extracted, exact wording confirmed.
- VoltAgent file existence + frontmatter: HIGH — raw files fetched + parsed.
- `/agents` UI flow: HIGH — official quickstart matches current Claude Code; YouTube transcript supplements.
- Hands-on subagent recommendation (`commit-message-writer`): MEDIUM — based on reasoning about audience + demo-cleanliness; planner/user may prefer alternative.
- VoltAgent template divergence from Claude Code official: HIGH — explicitly verified field-by-field against official frontmatter table.

**Research date:** 2026-05-13
**Valid until:** 2026-06-13 (subagents API is stable; Claude Code minor version may bump but won't invalidate research)

## RESEARCH COMPLETE

**Phase:** 4 — Subagents
**Confidence:** HIGH

### Key Findings

- **All three VoltAgent files verified at HEAD** with usable frontmatters. Tool/model contrast across the three (`python-pro` Bash+Sonnet, `quant-analyst` Bash+Opus, `market-researcher` read-only+web+Sonnet) naturally surfaces tool-restriction, model-selection, and domain-breadth teaching points.
- **Three verbatim dev.to quotes confirmed** — cookbook/sous-chef one-liner, isolated-context contrast row, "start with a skill" rule. The third quote is a **stronger framing** than CONTEXT.md's seed (positive default beats negative rule).
- **VoltAgent template diverges from Claude Code official** on the body sections (`## Communication Protocol`, `## Development Workflow`) — VoltAgent convention, not Claude Code requirement. One-line footnote on Section 04 slide handles it.
- **Task tool was renamed Agent in v2.1.63** — slides should use "Task / Agent tool" on first mention.
- **`/agents` is now a tabbed UI (Running / Library)**, not a flat menu — Section 06 walkthrough must match current docs, not the older YouTube flow.
- **Hands-on recommendation: `commit-message-writer`** — universally demoable, cleanly demonstrates isolated context (diff stays in subagent window, one-line message returns).
- **YouTube transcript saved** at `.planning/phases/04-subagents/assets/agents-walkthrough-transcript.txt` for instructor reference.

### File Created

`/Users/kalebnim/Documents/GitHub/syai-claude-workshop/.planning/phases/04-subagents/04-RESEARCH.md`

### Additional artifacts created

- `/Users/kalebnim/Documents/GitHub/syai-claude-workshop/.planning/phases/04-subagents/assets/` — directory
- `/Users/kalebnim/Documents/GitHub/syai-claude-workshop/.planning/phases/04-subagents/assets/agents-walkthrough-transcript.txt` — cleaned YouTube transcript (~8.4KB)

### Confidence Assessment

| Area | Level | Reason |
|------|-------|--------|
| Standard Stack | HIGH | No new tools; Phase 3 stack carries forward unchanged. |
| Architecture | HIGH | Direct chapter-orchestrator template port from Phase 3. |
| Quote wording | HIGH | Programmatically extracted from article HTML; verbatim confirmed. |
| VoltAgent files | HIGH | Raw frontmatters fetched + parsed; all three exist at HEAD. |
| `/agents` UI flow | HIGH | Official quickstart fetched verbatim; transcript supplements. |
| Template divergence flag | HIGH | Field-by-field comparison against official Claude Code frontmatter table. |
| Hands-on subagent pick | MEDIUM | Reasoned recommendation; planner/user may prefer alternative. |

### Open Questions

1. Use article comparison table verbatim, or planner-chosen subset? (Recommend verbatim 4 rows.)
2. Hands-on subagent = `commit-message-writer` or alternative? (Recommend `commit-message-writer`.)
3. YouTube URL on a slide, or only in `pages/99-resources/01-resources.md`? (Recommend resources page during Plan 08.)
4. Truncate `quant-analyst` long description for Section 05 fit? (Recommend truncate + footnote; reversible.)

### Ready for Planning

Research complete. Planner can now create the 8 PLAN.md files. Action items for planner (carried forward from CONTEXT.md):

1. Rename phase in ROADMAP.md: "Phase 4: Subagents + Agent SDK" → "Phase 4: Subagents".
2. Mark SUB-02 as closed-as-out-of-scope in REQUIREMENTS.md.
3. Update STATE.md at session end.
4. Confirm 3 locked quotes with user before authoring Section 02 (or accept researcher recommendations).
5. Confirm `commit-message-writer` as hands-on subagent (or pick alternative).
