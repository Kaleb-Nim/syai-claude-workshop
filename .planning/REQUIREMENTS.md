# Requirements: syai-claude-workshop — v1.1

**Defined:** 2026-05-12
**Milestone:** v1.1 workshop-content-v2
**Core Value:** Participants can follow the workshop live and return to the same URL afterward to step through the material at their own pace — without losing place, formatting, or copyable code.

**Authoring approach:** Iterative section-by-section loop — each section is its own GSD plan; review checkpoint between sections instead of a milestone-end aborted-prone verification phase.

**Locked from v1.0** (not re-derived here): Slidev `^52.15` on Bun, Vercel auto-deploy, D-01 warm near-black palette + rust accent, JetBrains Mono + Inter fonts, `.slidev-layout` CSS scoping, `slides.md` `src:` orchestrator pattern, `global-top.vue` progress bar.

## v1 Requirements

### Audience + Setup chapter (`pages/01-audience-setup.md`)

- [ ] **AUD-01**: A "Who is this workshop for" opening establishes the target participant — engineers comfortable with Git, terminals, and chat-mode LLMs but who haven't pushed past chat into Claude Code's deeper primitives
- [ ] **AUD-02**: A "What we'll cover / what we won't" slide explicitly names the 4 topic chapters (Hooks, Skills, Subagents, SDK) and explicitly excludes slash commands and plugins for v1.1
- [ ] **SET-01**: Section walks participants through `/statusline` as the smallest possible "make Claude work for you" win — exact command, expected visible change, ✓ Check callout
- [ ] **SET-02**: Section walks participants through editing `CLAUDE.md` — what it does, where it lives, one concrete edit that demonstrates immediate behavioral change in the next Claude turn
- [ ] **SET-03**: Section closes with a recap and a sync-check ("everyone has a working `/statusline` and an edited `CLAUDE.md`") so the room is aligned before Chapter 2

### Hooks chapter (`pages/02-hooks.md`)

- [ ] **HOOK-01**: Section explains what Claude Code hooks fire on (PreToolUse, PostToolUse, etc.) with a concrete example of one hook event with input/output JSON shape
- [ ] **HOOK-02**: Section walks through `settings.json` hook wiring — exact JSON, where the file lives, how a hook is registered
- [ ] **HOOK-03**: Section builds one practical defensive hook live (e.g. PreToolUse rejecting `rm -rf` or env-file reads) with BEFORE/AFTER demonstration
- [ ] **HOOK-04**: Section gives participants one hands-on exercise (write a PostToolUse logger or similar) with copy-paste-precise commands

### Skills chapter (`pages/03-skills.md`)

- [ ] **SKL-01**: Section explains what a skill is — `.claude/skills/<name>/SKILL.md` file shape, where it lives, how Claude discovers it
- [ ] **SKL-02**: Section explains progressive disclosure — why skills load lazily, how the SKILL.md frontmatter (`description` field) drives matching
- [ ] **SKL-03**: Section walks through one worked-example skill built live (e.g. a domain-specific lookup) so participants see the full create → use loop
- [ ] **SKL-04**: Section gives participants one hands-on exercise (write a personal skill) with copy-paste-precise scaffolding

### Subagents + Agent SDK chapter (`pages/04-subagents-sdk.md`)

- [ ] **SUB-01**: Section explains subagents in Claude Code — the Task tool, `.claude/agents/<name>.md` file shape, user-invoked vs Claude-invoked distinction
- [ ] **SUB-02**: Section walks through one worked-example subagent built live (e.g. code-reviewer or research-agent)
- [ ] **SUB-03**: Section bridges to the programmatic Agent SDK — same primitive, ≤15-line `@anthropic-ai/claude-agent-sdk` snippet showing equivalent functionality outside the CLI
- [ ] **SUB-04**: Section gives participants one hands-on exercise (invoke a subagent OR call the SDK programmatically) with copy-paste-precise scaffolding

### Outro chapter (`pages/99-outro.md`)

- [ ] **OUT-01**: Recap slide naming the 4 topic chapters and their one-line takeaway each
- [ ] **OUT-02**: "Where to next" slide pointing to Anthropic docs, the workshop GitHub repo, and 2-3 community resources
- [ ] **OUT-03**: Closing slide with the production deck URL so participants can return to it after the workshop

### Authoring workflow quality gates

- [ ] **QUAL-01**: Each chapter phase ends with a lightweight build + presenter spot-check — `bunx slidev build` exits 0, the new chapter renders in presenter mode without styling artifacts, before the next chapter phase starts
- [ ] **QUAL-02**: Each section within a chapter is committed atomically with a section-scoped commit message before the next section starts
- [ ] **QUAL-03**: Milestone-end full-deck PDF export via `bunx slidev export` produces a readable PDF (>50KB, all chapters present in order)
- [ ] **QUAL-04**: All chapter content respects the locked v1.0 tone constraints — confident, terse, no hype prose, no exclamation marks in body, no screenshots (code/terminal blocks only)

## Future Requirements

Deferred to v1.2+ or beyond.

### Authoring Polish

- **AUTH-01**: Slidev `<Cmd>` Vue component for terminal command blocks with separate prompt + output styling
- **AUTH-02**: Worked Shiki Magic Move example demonstrating CLI flag/config evolution
- **AUTH-03**: Mermaid diagram on at least one chapter to demonstrate the diagram authoring convention

### Participant UX

- **PUXX-01**: Per-slide share-link button (copies deep link to clipboard)
- **PUXX-02**: Slide-resume on reload via `localStorage`
- **PUXX-03**: OG image + favicon for social-share previews

### Misc

- **MISC-01**: Pagefind search across slide content
- **MISC-02**: Twoslash-enabled TypeScript blocks for type-aware annotations in the SDK chapter

## Out of Scope (v1.1)

Explicitly excluded for this milestone.

| Feature | Reason |
|---------|--------|
| Slash commands chapter | Dropped from workshop scope v1.1 — didn't earn its slot. Slash commands still exist as a Claude Code primitive but are not workshop teaching material. |
| Plugins chapter | Dropped from workshop scope v1.1 — same reasoning. |
| Copy-to-clipboard button on code blocks | Carried over from v1.0's deferred COMP-01..02. Revive only if dry-run friction surfaces. |
| Persistent sidebar with section nav | Carried over from v1.0's deferred COMP-03..05. `global-top.vue` progress bar is sufficient. |
| README authoring guide | The instructor IS Claude in this codebase; no separate human-targeted authoring guide is needed for v1.1. |
| Per-chapter PDF export gates | PDF export gated only at milestone end (QUAL-03), not per chapter. |
| Pre-commit build hooks | Considered and rejected — lightweight per-chapter build gate (QUAL-01) is sufficient. |
| MCP chapter | Out of scope — covered in a future milestone if demand surfaces. |
| Hooks + skills + subagents inter-composition examples | Each chapter teaches its primitive in isolation; cross-primitive recipes are a v1.2+ concern. |
| Live-coding extended demos beyond the one hands-on exercise per chapter | Each chapter is bounded by its 1 worked-example slide and 1 participant exercise; longer demos belong to a separate "deep dive" milestone if ever. |

## Traceability

Phase mapping will be filled by the roadmapper.

| Phase | Requirements |
|-------|--------------|
| TBD | TBD |

---
*Requirements defined 2026-05-12 for milestone v1.1.*
