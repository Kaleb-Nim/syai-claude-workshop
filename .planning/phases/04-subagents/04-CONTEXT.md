# Phase 4: Subagents - Context

**Gathered:** 2026-05-13
**Status:** Ready for planning

> **Scope change vs ROADMAP.md:** SUB-02 (Agent SDK bridge) is **DROPPED entirely** in this discussion (D-09). Phase renamed from "Subagents + Agent SDK" → "Subagents". ROADMAP.md and REQUIREMENTS.md need updates at plan time (see Action Items at bottom).

<domain>
## Phase Boundary

Chapter 4 of the v1.1 workshop deck. Teaches **what subagents are**, **why they exist (context preservation vs context bloat)**, **how they work mechanically** (`.claude/agents/<name>.md` file shape, standardized template, Task tool, user-invoked vs Claude-invoked), shows **3 real subagent files** side-by-side from the VoltAgent registry, and walks participants through **one small live hands-on task**: creating a subagent via Claude Code's `/agents` slash command and invoking it.

Phase 4 ends when:
- `pages/04-subagents.md` is a `src:`-style chapter orchestrator including 7 section files under `pages/04-subagents/` (`01-cover.md` … `07-hands-on-fire.md`).
- `slides.md` `src:`-includes `pages/04-subagents.md`.
- `bunx slidev build` exits 0 and the chapter renders clean in presenter mode (QUAL-01 closing plan, plan 08).

**In scope:** SUB-01, SUB-03, QUAL-01 closing build plan, QUAL-02 atomic section commits, QUAL-04 tone discipline.

**Out of scope this phase:**
- **SUB-02 (Agent SDK bridge) — DROPPED.** No SDK content anywhere in this chapter. No `query()` snippet. No "same thing outside the CLI" framing. SUB-02 is closed-as-out-of-scope for the v1.1 milestone and is not coming back.
- MCP servers, plugins, Plan Mode — out of v1.1 scope entirely.
- Authoring custom subagents from scratch in a text editor — hands-on uses `/agents` interactive command, not manual `mkdir + paste`.
- Deep dive into all subagent template fields (Communication Protocol, Development Workflow sections) — these are shown verbatim in the file shape slide but not taught field-by-field.
- Project-level `.claude/agents/` vs user-level `~/.claude/agents/` precedence rules — researcher to verify which scope the `/agents` command writes to; one is taught, the other listed by name only.

</domain>

<decisions>
## Implementation Decisions

### Section Breakdown (D-01)
- **D-01:** Chapter 4 splits into **7 content sections + 1 closing build plan = 8 plans** for `/gsd-plan-phase 4`:
  1. `pages/04-subagents/01-cover.md` — chapter cover (one-line provocation).
  2. `pages/04-subagents/02-skills-vs-subagents.md` — cookbook/sous-chef framing + comparison table + 2-3 locked verbatim quotes (D-02, D-03).
  3. `pages/04-subagents/03-why-subagents.md` — context preservation as the core motivator; raises context bloat as the problem subagents solve (D-04).
  4. `pages/04-subagents/04-how-subagents-work.md` — `.claude/agents/<name>.md` shape + standardized template + Task tool + user-invoked vs Claude-invoked (SUB-01, D-05).
  5. `pages/04-subagents/05-showcase.md` — side-by-side frontmatter of 3 real VoltAgent subagent files (D-06).
  6. `pages/04-subagents/06-hands-on-build.md` — `/agents` interactive command walkthrough (SUB-03 wire, D-07).
  7. `pages/04-subagents/07-hands-on-fire.md` — invoke the new subagent, see isolated context, ✓ checks (SUB-03 fire, D-08).
  - **Plan 08:** `bunx slidev build` + presenter spot-check (QUAL-01).
- Mirrors Phase 3's chapter-orchestrator + 6-plan cadence, extended by one (showcase + dedicated skills-vs-subagents framing).
- Atomic per-section commits per QUAL-02.

### Section 02 — Skills vs Subagents framing (D-02, D-03)
- **D-02 (dedicated section, before why-subagents):** The cookbook/sous-chef framing gets its own section. The contrast carries the mental model; "why-subagents" (Section 03) carries the practical motivator (context preservation). Two distinct beats, not one merged "why".
- **D-03 (LOCKED QUOTES — verbatim, no edits, 2-3 quotes from the dev.to article):** Researcher MUST surface the highest-signal lines from the dev.to article. Plans MUST place chosen quotes verbatim with no rewording. Seed candidates (researcher to confirm exact wording from source):
  - The cookbook/sous-chef one-liner (skills = cookbook; subagents = sous chef).
  - The "don't use subagents for simple utilities — it wastes context" rule.
  - The "subagents get an isolated context window" structural difference.
- Mirrors Phase 3 HOOK-01 locked-quotes pattern (3 determinism quotes).

### Section 03 — Why subagents (D-04)
- **D-04 (framing — context preservation):** Section 03 is anchored on **context preservation** as the practical reason subagents exist. Explicit beat: subagents have their **own isolated context window**, so the main chat doesn't get polluted with diff dumps, log spew, research notes, or multi-file scans. Raise **context bloat** explicitly as the problem ("your main chat fills up with stuff you don't need to see"). Distinct from Section 02's mental-model framing; this is the "why you'd actually reach for one" answer.
- Researcher should source 1-2 concrete examples of context-heavy tasks where subagent delegation pays off (code review across many files, research synthesis across many docs, etc).

### Section 04 — How subagents work (D-05)
- **D-05 (file shape + standardized template — LOCKED structure):** Section 04 teaches the `.claude/agents/<name>.md` file via the **standardized VoltAgent template shape** (locked by user as the canonical structure to show):
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
  Plus, on the same or adjacent slide, the **two invocation modes** required by SUB-01:
  - **User-invoked** — `@subagent-name` or via `/agents` UI.
  - **Claude-invoked** — Claude reaches for the Task tool and delegates based on the subagent's `description:` field (parallel to skills auto-activation, contrast clearly).
- Researcher MUST verify the template structure against current Claude Code docs (the VoltAgent template MAY include conventions not enforced by Claude Code itself — flag any divergence).

### Section 05 — 3-subagent showcase (D-06)
- **D-06 (showcase mix — LOCKED domains):** Three files featured **side-by-side on a single slide showing their frontmatter only**:
  1. **python-pro** — language specialist (deep ecosystem knowledge).
  2. **quant-analyst** — quantitative analysis / finance domain.
  3. **market-researcher** — research and synthesis across docs/sources.
- Rationale: only one is a SWE-style subagent. Quant + market-researcher anchor the **"subagents aren't just for coding"** point — directly addresses the broad workshop audience.
- Layout: **single side-by-side diff-style slide** comparing all 3 frontmatters (name / description / tools / model rows aligned). Optional second slide for callouts if frontmatter doesn't fit cleanly side-by-side at default Slidev font size.
- Researcher MUST locate exact file paths inside `VoltAgent/awesome-claude-code-subagents` (category subdirectory + filename) and verify the files exist at HEAD. If `quant-analyst` or `market-researcher` don't exist under those exact names, pick the closest-matching analysis/research subagent from the repo's "Research & Analysis" and "Data & AI" categories and note the substitution.

### Section 06+07 — Hands-on build + fire (D-07, D-08)
- **D-07 (build via `/agents` command — LOCKED approach):** Hands-on uses Claude Code's **`/agents` interactive slash command**, NOT manual `mkdir .claude/agents && paste foo.md`. Participants run `/agents`, walk through the create flow, end with a working subagent file on disk. Reference video that walks through `/agents`: **https://www.youtube.com/watch?v=DNGxMX7ym44** — researcher MUST extract a transcript (heygen suggested) and screenshot key UI states (playwright CLI suggested) for slide content. Specifics: which prompts the `/agents` command asks, what the disk artifact looks like after, where it writes (project- vs user-scope — flag in research).
- **D-08 (fire — invoke + observe isolated context):** Section 07 has participants invoke the freshly-created subagent and **observe** that the subagent's tool calls + reasoning **don't appear inline** in the main chat — only the final summary returns. This is the structural payoff for Section 03's "context preservation" framing. Two ✓ Checks: (1) subagent visible in `/agents` list; (2) invoked subagent returns a result and main chat stays clean.
- What the subagent does: open seed (not locked) — could be `commit-message-writer` (reads `git diff` → conventional commit), `log-summarizer`, or a copy of one of the showcase files (python-pro). Planner picks based on research; whichever is fastest to demo live and demonstrates isolated context cleanly.

### Scope change (D-09)
- **D-09 (SUB-02 dropped):** Agent SDK bridge **removed entirely** from Phase 4. No SDK slides, no `query()` snippet, no callout in outro. SUB-02 is closed-as-out-of-scope for v1.1. Phase rename: "Subagents + Agent SDK" → "Subagents". Directory: `.planning/phases/04-subagents/` (not `04-subagents-sdk/`). ROADMAP.md and REQUIREMENTS.md must be updated at plan time (see Action Items).

### Claude's Discretion
- Exact wording of cover slide one-line provocation (planner picks).
- Specific hands-on subagent purpose (Section 06/07) — planner picks from the seed list in D-08 after research.
- Comparison-table column choices in Section 02 (which dimensions of skills vs subagents to surface — at minimum: activation, context, primary use; planner may add 1-2 more).
- Exact 3 quotes locked in Section 02 (researcher recommends; user/planner confirms).
- Whether the standardized template is shown in one slide or two (frontmatter slide + body-structure slide).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope and requirements
- `.planning/REQUIREMENTS.md` — SUB-01 (Task tool + file shape + user/Claude-invoked), SUB-03 (one live hands-on). **SUB-02 is dropped per D-09.**
- `.planning/ROADMAP.md` — Phase 4 details (note: ROADMAP needs rename "Subagents + Agent SDK" → "Subagents" at plan time).
- `.planning/PROJECT.md` — workshop tone, audience, stack constraints.

### Precedent chapters (chapter-orchestrator pattern + locked-quote pattern)
- `.planning/phases/03-hooks/03-CONTEXT.md` — Phase 3 context (mirrors the 6-plan cadence + locked verbatim quotes pattern + cross-chapter callback pattern).
- `.planning/phases/02-skills/02-CONTEXT.md` — Phase 2 context (Skills chapter — Section 02 of Phase 4 references it via the cookbook/sous-chef contrast).
- `pages/03-hooks.md` + `pages/03-hooks/` — Phase 3 rendered chapter, structural template for Phase 4.
- `pages/02-skills.md` + `pages/02-skills/` — Phase 2 rendered chapter, referenced explicitly in Section 02 framing.

### External sources (researcher MUST ingest)
- **dev.to article (Section 02 source-of-truth):** https://dev.to/nunc/claude-code-skills-vs-subagents-when-to-use-what-4d12 — cookbook/sous-chef framing, comparison table, locked-quote candidates.
- **VoltAgent registry (Section 05 source-of-truth):** https://github.com/VoltAgent/awesome-claude-code-subagents — locate exact file paths for `python-pro`, `quant-analyst`, `market-researcher` (or closest matches in Research & Analysis / Data & AI categories).
- **`/agents` walkthrough video (Section 06 source-of-truth):** https://www.youtube.com/watch?v=DNGxMX7ym44 — researcher to extract transcript (heygen) + UI screenshots (playwright CLI) for slide content.

### Claude Code official docs (researcher MUST verify against)
- Claude Code subagents docs — verify `.claude/agents/` file shape, frontmatter fields, scope precedence (project vs user), `/agents` command behavior, Task tool delegation rules. Researcher fetches current URL via Context7 or web search.
- VoltAgent template structure (D-05) — flag any divergence from Claude Code's official template.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Chapter-orchestrator pattern** (`pages/03-hooks.md` + `pages/03-hooks/01-cover.md` … `05-hands-on-fire.md`): direct template. Phase 4 follows the same `src:`-include shape with 7 section files instead of 5.
- **Locked-quote slide pattern** (Phase 3 Section 02 slides 3-5): same Slidev block style for placing the 2-3 dev.to quotes verbatim in Section 02 of Phase 4.
- **Cross-chapter callback pattern** (Phase 3 Section 02 Slide 4 → Phase 1 Win 2 CLAUDE.md): Phase 4 Section 02 callbacks to Phase 2 Skills the same way (cookbook/sous-chef contrast).
- **`bunx slidev build` + presenter spot-check** closing plan (Phase 3 plan 06 — `03-06-PLAN.md`): direct template for Phase 4 plan 08.

### Established Patterns
- **Section-as-plan mapping** (Phase 1, 2, 3): each pages/NN-chapter/NN-section.md is its own plan. Phase 4 follows: 7 section plans + 1 build plan = 8 plans.
- **Atomic per-section commits** (QUAL-02): each plan commits its own section file; no batching.
- **Hands-on build/fire split** (Phase 3 plans 04-05): "wire it" and "see it work" as separate sections. Phase 4 plans 06-07 mirror this.
- **Tone discipline** (QUAL-04): pithy, no marketing, no "imagine if…", no emoji-heavy headers.

### Integration Points
- `slides.md` — needs a new `src: ./pages/04-subagents.md` include after the existing Phase 3 include.
- `pages/04-subagents.md` — new chapter orchestrator file (does not yet exist).
- `pages/04-subagents/` — new directory for 7 section files (does not yet exist).
- ROADMAP.md — phase rename + SUB-02 status flip.
- REQUIREMENTS.md — SUB-02 marked closed-as-out-of-scope.

</code_context>

<specifics>
## Specific Ideas

- **Cookbook vs sous-chef framing is the chapter's mental-model anchor** — user specifically wants this dev.to article ingested as Section 02 content. Not paraphrased into workshop voice; 2-3 quotes locked verbatim like Phase 3.
- **Context preservation is the chapter's practical anchor** — Section 03 frames "why subagents" entirely around isolated context + avoiding main-chat context bloat. This is the user's specific take, distinct from the article's framing.
- **Side-by-side showcase, broad domain mix** — user explicitly rejected the all-SWE showcase. python-pro + quant-analyst + market-researcher chosen to demonstrate that subagents apply outside coding. Single comparison slide preferred over per-file slides.
- **`/agents` command, not manual file creation** — user explicitly wants the interactive Claude Code UX taught, with the YouTube walkthrough as source material (transcript + screenshots).
- **No SDK content at all** — user is clear; SUB-02 dropped permanently for v1.1.

</specifics>

<deferred>
## Deferred Ideas

- **Agent SDK bridge (SUB-02)** — Dropped entirely from v1.1 per D-09. Not a future-phase carry-over; closed-as-out-of-scope.
- **Authoring subagents from scratch in a text editor** — `/agents` command is the canonical path in this workshop. Manual authoring deferred indefinitely.
- **Deep template-field walkthrough** (Communication Protocol, Development Workflow sections) — shown verbatim in Section 04, not taught field-by-field. Could be a follow-up workshop or blog post.
- **Project-level vs user-level subagent scope precedence** — researcher to verify which `/agents` writes to; the other scope is listed by name only on the file-shape slide.
- **Subagent chaining / multi-agent orchestration** — out of scope; would be its own future chapter.

</deferred>

---

## Action Items (for planner)

These follow from D-09 and MUST happen during `/gsd-plan-phase 4`:

1. **Rename phase in ROADMAP.md:** "Phase 4: Subagents + Agent SDK" → "Phase 4: Subagents". Update Goal and Success Criteria text to drop SDK references.
2. **Update REQUIREMENTS.md:** Mark SUB-02 as closed-as-out-of-scope for v1.1 (not deferred — explicitly dropped).
3. **Update STATE.md** at session end with corrected phase name and current focus.

---

*Phase: 04-subagents*
*Context gathered: 2026-05-13*
