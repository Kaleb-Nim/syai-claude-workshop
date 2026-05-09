# Phase 4: Workshop Content — Draft - Context

**Gathered:** 2026-05-09
**Status:** Ready for planning
**Source:** Direct user decisions (no discuss-phase ceremony — locked answers from /gsd-plan-phase 3 → /gsd-plan-phase 4 reframe)

<domain>
## Phase Boundary

Draft the actual lesson content for a 1.5-hour hands-on workshop on advanced Claude Code features. Three anchor topics + intro + outro. Content lives in `pages/*.md` chapter files included via Slidev `src:` directives. Phase 4 ends when:

- `slides.md` is a thin orchestrator pulling chapter files via `src:`.
- Chapters `00-intro`, `01-hooks`, `02-subagents-sdk`, `03-commands-skills-plugins`, `99-outro` exist with draft content.
- Each anchor chapter is ~25–30 min of teachable hands-on material with exact commands, exercise prompts, and "✓ Check" callouts.
- `bunx slidev build` exits 0; presenter mode is clean; PDF export works.

**Out of scope this phase:**
- Authoring guide README walkthrough (Phase 5 if ever needed — instructor IS Claude here).
- MCP servers (deferred — not in the chosen anchor topics).
- Magic-move budget rules + 5 stock layouts ceremony (deferred — drafting directly, no formal layout taxonomy yet).
- Engagement primitives that require new components (live polls, click-to-reveal builds) — deferred to a future phase if needed.
- Copy button + persistent sidebar (Phase 3 — deferred).

</domain>

<decisions>
## Implementation Decisions

### Audience (D-01 .. D-03)
- **D-01:** Audience = engineers who've tried Claude Code briefly. Comfortable with terminal + LLM chat, haven't pushed past chat into power-user features. No CC primer slide needed; assume they've installed Claude Code and run a session.
- **D-02:** No glossary or "what is Claude Code" slide. The intro names what advanced features we'll cover and verifies their setup works.
- **D-03:** Skill assumption: TS/JS familiarity, can read a JSON config, knows what a CLI flag is. Don't explain those.

### Workshop Shape (D-04 .. D-08)
- **D-04:** Total duration = ~1.5 hours of content. Pacing breakdown:
  - Intro + setup verify: 5 min
  - Hooks (lifecycle automation): 25 min
  - Subagents & Agent SDK: 30 min (slightly heavier — has SDK + subagent dual concepts)
  - Slash Commands + Skills + Plugins: 25 min
  - Outro + Q&A pointer: 5 min
  - Buffer: 0–10 min
- **D-05:** Topic order = Hooks → Subagents/SDK → Commands/Skills/Plugins. Hooks first because they show "Claude Code is programmable" with low conceptual surface area; Subagents next as the force-multiplier; Skills/Commands/Plugins last as the "make it yours" capstone.
- **D-06:** No MCP, no Plan Mode deep-dive, no agent CLI alternatives. Three topics only — depth over breadth.
- **D-07:** Chapter ordering encoded in filenames (`00-intro.md`, `01-hooks.md`, ...) so the directory listing matches the deck order.
- **D-08:** Each anchor chapter has the same internal shape:
  1. **Title slide** — one-line provocation ("Hooks: scripts that fire on Claude's lifecycle")
  2. **Why care** — 1 slide, 3 bullets, the use cases that make participants lean in
  3. **Mental model** — 1–2 slides showing the lifecycle/concept
  4. **Live walkthrough** — 3–6 slides with exact commands; participants type along
  5. **Exercise** — 1–2 slides with a prompt + "✓ Check:" callout for self-verification
  6. **Recap + pointers** — 1 slide: 3 takeaways + 1 link to deeper docs

### Delivery (D-09 .. D-12)
- **D-09:** Hands-on follow-along mode. Slides give exact commands and prompts so participants can type along without watching a fast live-typing demo.
- **D-10:** Slide density is HIGHER than a pure demo deck — text + code on the same slide is fine. Code blocks lean ≤25 lines per slide so projector/screen-share remains readable.
- **D-11:** Every chapter has at least one **`✓ Check: <expected output>`** callout so participants know they're synced before the next concept builds on the previous one. This is the engagement mechanism — synchronization, not novelty.
- **D-12:** Use `<v-clicks>` (Slidev built-in) sparingly — only to reveal long lists 1-by-1 when needed for pacing. Don't gate every bullet behind a click.

### Technical (D-13 .. D-17)
- **D-13:** Chapter files live in `pages/` at the project root. `slides.md` becomes a thin orchestrator: a project-wide title slide, then `---` separators with `src: ./pages/<n>.md` for each chapter.
- **D-14:** Each chapter file uses Slidev's per-slide `---` separator and per-slide frontmatter (e.g. `layout: section`) where appropriate. Keep frontmatter minimal — let Phase 2's theme do the work.
- **D-15:** Existing 3 placeholder slides in `slides.md` (from Phase 1) are REPLACED by the new content. The placeholder is no longer needed.
- **D-16:** Code samples in chapters reflect REAL Claude Code APIs — hooks `settings.json` shape, `.claude/agents/*.md` for subagents, `.claude/commands/*.md` for slash commands, `.claude/skills/*/SKILL.md` for skills. NO invented APIs. If unsure of an exact field name during drafting, leave a `<!-- VERIFY -->` HTML comment for the instructor to spot-check.
- **D-17:** Section navigation: each anchor chapter starts with a `layout: section` slide. This integrates naturally with Phase 2's `.slidev-layout` styling and gives the deck a clear table-of-contents shape.

### Content Substance (D-18 .. D-23)
- **D-18:** Hooks chapter must cover: what hooks are (PreToolUse, PostToolUse, SessionStart, Stop, UserPromptSubmit), the `settings.json` shape, one practical hook (e.g. "block edits to `.env`" or "log every tool call"), one defensive hook, debugging when hooks don't fire. Live walkthrough builds the hook step by step in `~/.claude/settings.json` or project `.claude/settings.json`.
- **D-19:** Subagents & Agent SDK chapter must cover: when to spawn a subagent (independent context, parallel work), the `Task` tool from inside Claude Code, the `.claude/agents/<name>.md` file shape with frontmatter, the difference between user-invoked and Claude-invoked subagents, then a brief `@anthropic-ai/claude-agent-sdk` snippet showing programmatic agent invocation OUTSIDE Claude Code. Exercise: write a `.claude/agents/code-reviewer.md` and invoke via Task tool.
- **D-20:** Commands + Skills + Plugins chapter must cover: slash commands as `.claude/commands/<name>.md` (the `<command-message>` shape), skills as `.claude/skills/<name>/SKILL.md` with progressive disclosure, plugins as a distribution layer for bundled commands/skills/agents (mention only — don't build a plugin in 25 min). Exercise: write a small `.claude/commands/standup.md` slash command.
- **D-21:** Each chapter's "✓ Check:" output should be precise enough to copy-paste compare. E.g. after wiring a PostToolUse hook, `cat ~/.claude/hook-log.txt` should show one line; the exercise tells the participant exactly what to grep for.
- **D-22:** No screenshots in the content. Anything that needs visual context is a code block or a terminal-style block. Reasoning: screenshots rot, terminal output stays valid longer.
- **D-23:** Tone: confident, terse, no hype. "Hooks fire on Claude Code lifecycle events." Not "Hooks are an AMAZING way to take control of your AI workflow!"

### Claude's Discretion
- Exact slide count per chapter (keep within the D-08 shape but vary 1–2 slides as content demands).
- Specific hook example to demo (D-18 lists 2 candidates — pick whichever has cleaner exact-output for the "✓ Check").
- The brief Agent SDK code snippet shape — keep ≤15 lines.
- Whether to include a "what's next / further reading" slide per chapter or only one at the outro.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before drafting content.**

### Project anchors
- `CLAUDE.md` — project value, constraints, "What NOT to Use" list, Slidev stack guide.
- `.planning/PROJECT.md` — workshop project framing.
- `.planning/REQUIREMENTS.md` — CONT-01, CONT-02, CONT-04 (chapter file shape, src: includes); QUAL-01, QUAL-02 (presenter clean, PDF export). Deferred: CONT-03, CONT-05, QUAL-03, QUAL-04.
- `.planning/phases/02-theme-visual-identity/02-CONTEXT.md` — Phase 2 locked decisions (D-01 palette, D-04 accent only on code-block left rule, D-14 `.slidev-layout` scoping). Content must NOT introduce new colors or break scoping.
- `.planning/phases/02-theme-visual-identity/02-04-SUMMARY.md` — what Phase 2 built (uno.config.ts tokens, style.css, vitesse-dark Shiki theme).
- `.planning/phases/01-scaffold-deploy/01-01-SUMMARY.md` and `01-02-SUMMARY.md` — current slides.md state (the 3 placeholder slides we replace) and Vercel deploy wiring.
- Existing `slides.md` — current headmatter (preserve!) + 3 placeholder slides (replace).

### External specs (Slidev)
- [Slidev — Multiple slides via src](https://sli.dev/guide/syntax#importing-slides) — `src: ./pages/file.md` directive shape.
- [Slidev — Slide layouts](https://sli.dev/builtin/layouts) — `default`, `section`, `two-cols`, `center`, `cover`. Phase 4 uses `default` and `section` primarily.
- [Slidev — Click animations](https://sli.dev/guide/animations#click-animations) — `<v-clicks>`, click count, used sparingly per D-12.
- [Slidev — `bunx slidev export`](https://sli.dev/guide/exporting) — PDF export verification step.

### Claude Code references (for content accuracy per D-16)
- Claude Code official docs — hooks, subagents, slash commands, skills.
- `@anthropic-ai/claude-agent-sdk` package docs — for the SDK code snippet in chapter 02.
- Note for the planner: when drafting, prefer using `mcp__context7` to verify exact API shapes before committing to a code sample. Mark `<!-- VERIFY -->` for any field that couldn't be confirmed against authoritative docs at draft time.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `slides.md` — currently 3 placeholder slides + Phase 2 headmatter. Phase 4 keeps the headmatter, replaces the body with `src:` includes.
- `style.css`, `uno.config.ts` — Phase 2 theme. Phase 4 uses these tokens; does NOT add new colors.
- `package.json` — Slidev `^52.15`, Bun pinned. No new deps expected for Phase 4 (Slidev's `src:` is built-in).

### Established Patterns
- Bun-only commands (`bunx slidev`, `bunx slidev build`, `bunx slidev export`).
- Slidev default theme + `.slidev-layout` scoping (Phase 2 D-14).
- Headmatter in `slides.md` is the source of truth for theme/font/Shiki config; chapter files inherit those.

### Integration Points
- Vercel auto-deploys on commit — Phase 4's first commit triggers a preview the instructor can review.
- Presenter mode (`/presenter/`) — Phase 2 D-15 verified scoping holds; new content must not break this.
- PDF export via `bunx slidev export` — requires `bunx playwright install chromium` first (per CLAUDE.md). Plan must include this step in the verification chapter.

</code_context>

<specifics>
## Specific Ideas

- The Hooks "✓ Check:" can use the actual file Claude Code creates — `~/.claude/projects/-<repo>/memory/` exists in this very session, suggesting hooks are already at play here. Lean into "look at your own state" as the verification.
- For the Agent SDK snippet (D-19), use a 10-line example that wraps Claude Code's Task tool semantics in a TS function — shows that the SDK is "the same primitive, programmatic." Avoid streaming complexity in the demo.
- For the Skills section (D-20), point at the `.claude/skills/` directory in the user's own runtime — they already have many skills installed (gsd-*, vercel:*, hookify:*). Use that as the "you already have this; here's how it works" hook.
- Keep one exercise per chapter — two is too many for 25 min when participants are also listening to explanation.

</specifics>

<deferred>
## Deferred Ideas

- MCP server chapter — explicitly deferred per D-06.
- Authoring guide README walkthrough — deferred (instructor is Claude in this repo).
- Live polls / click-to-reveal builds / engagement components — deferred (would need Phase 3-style component work first).
- Magic-move animations between code blocks — defer; theme defaults are enough.
- Per-chapter accent colors — deferred (one-deck-one-accent per Phase 2).
- Twoslash inline TS hover info — deferred to per-slide opt-in by content authors.
- 5 stock layouts taxonomy — deferred; chapters use `default` and `section`, that's it.

</deferred>

---

*Phase: 04-workshop-content-draft*
*Context gathered: 2026-05-09 via direct user dialog (skipped formal discuss-phase)*
