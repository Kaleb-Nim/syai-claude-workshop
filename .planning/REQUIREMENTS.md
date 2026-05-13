# Requirements: syai-claude-workshop — v1.1

**Defined:** 2026-05-12
**Milestone:** v1.1 workshop-content-v2
**Core Value:** Participants can follow the workshop live and return to the same URL afterward to step through the material at their own pace — without losing place, formatting, or copyable code.

**Authoring approach:** Iterative section-by-section loop — each section is its own GSD plan; review checkpoint between sections.

**Locked from v1.0** (not re-derived): Slidev `^52.15` on Bun, Vercel auto-deploy, D-01 warm near-black palette + rust accent, JetBrains Mono + Inter fonts, `.slidev-layout` CSS scoping, `slides.md` `src:` orchestrator pattern, `global-top.vue` progress bar.

**Research policy:** Each chapter phase begins with a researcher spawn during `/gsd-plan-phase N`. The researcher surveys top articles + official docs for the primitive being taught, and the per-section plans inside that phase derive their specific worked examples, exercise scaffolds, and detailed success criteria from research findings. The requirements below are intentionally generic — they fix the shape of every chapter (concept + mechanism + hands-on) without locking in specifics that should be informed by current best practice.

## v1 Requirements

### Audience + Setup chapter (`pages/01-audience-setup.md`)

- [ ] **AUD-01**: Chapter establishes who this workshop is for — target participant profile (engineers comfortable with Git, terminals, and chat-mode LLMs but haven't pushed past chat into Claude Code's deeper primitives)
- [ ] **AUD-02**: Chapter establishes what's covered (4 topic chapters: Skills, Hooks, Subagents, SDK) and what's explicitly excluded (slash commands, plugins) so participants align before the deep chapters
- [ ] **SET-01**: Chapter delivers at least two small immediate Claude wins so participants leave Chapter 1 with Claude already working better for them than when they walked in. Specific wins selected during `/gsd-plan-phase 1` research; user-suggested seeds: `/statusline`, editing `CLAUDE.md`
- [ ] **SET-02**: Chapter ends with a sync-check / hands-on confirming the room is aligned before Chapter 2 starts

### Skills chapter (`pages/02-skills.md`)

- [x] **SKL-01**: Chapter explains what a skill is — `.claude/skills/<name>/SKILL.md` file shape, where it lives, how Claude discovers it
- [x] **SKL-02**: Chapter teaches the mental model — progressive disclosure, why skills load lazily, what role frontmatter plays in matching
- [x] **SKL-03**: Chapter includes one small live hands-on task. Specific worked example derived during `/gsd-plan-phase 2` research

### Hooks chapter (`pages/03-hooks.md`)

- [x] **HOOK-01**: Chapter frames why hooks exist — what problem they solve, what becomes possible because of them
- [x] **HOOK-02**: Chapter teaches how hooks work mechanically — relevant lifecycle events + `settings.json` wiring with one concrete JSON shape. Specific events emphasised selected during `/gsd-plan-phase 3` research
- [x] **HOOK-03**: Chapter includes one small live hands-on task that participants build alongside the presenter. Specific worked example derived during `/gsd-plan-phase 3` research; user-suggested seed: sound-notification hook on `Stop` and `Notification` events (`afplay` macOS / `aplay` Linux)

### Subagents chapter (`pages/04-subagents.md`)

- [ ] **SUB-01**: Chapter explains subagents in Claude Code — Task tool, `.claude/agents/<name>.md` file shape, user-invoked vs Claude-invoked distinction
- [~] **SUB-02**: ~~Chapter bridges to the programmatic Agent SDK — same primitive outside the CLI in a short snippet~~ — **closed-as-out-of-scope for v1.1** (dropped per Phase 4 CONTEXT.md D-09; not deferred — explicitly removed from milestone scope on 2026-05-13)
- [ ] **SUB-03**: Chapter includes one small live hands-on task. Specific worked example derived during `/gsd-plan-phase 4` research

### Outro chapter (`pages/99-outro.md`)

- [ ] **OUT-01**: Recap slide naming the 4 topic chapters with one-line takeaways
- [ ] **OUT-02**: "Where to next" slide pointing to Anthropic docs, the workshop GitHub repo, and a small number of community resources (count + selection during `/gsd-plan-phase 5` research)
- [ ] **OUT-03**: Closing slide with the production deck URL

### Authoring workflow quality gates

- [x] **QUAL-01**: Each chapter phase ends with a lightweight build + presenter spot-check — `bunx slidev build` exits 0, the chapter renders clean in presenter mode, before the next chapter phase starts
- [x] **QUAL-02**: Each section within a chapter is committed atomically with a section-scoped commit message
- [ ] **QUAL-03**: Milestone-end full-deck PDF export via `bunx slidev export` produces a readable PDF (>50KB, all 5 chapters present in order)
- [x] **QUAL-04**: All chapter content respects the locked v1.0 tone constraints — confident, terse, no hype prose, no exclamation marks in body, no screenshots (code/terminal blocks only)

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

| Feature | Reason |
|---------|--------|
| Slash commands chapter | Dropped from workshop scope v1.1 — didn't earn its slot. Slash commands still exist as a primitive but are not workshop teaching material. |
| Plugins chapter | Dropped from workshop scope v1.1 — same reasoning. |
| Copy-to-clipboard button on code blocks | Carried over from v1.0's deferred COMP-01..02. Revive only if dry-run friction surfaces. |
| Persistent sidebar with section nav | Carried over from v1.0's deferred COMP-03..05. `global-top.vue` progress bar is sufficient. |
| README authoring guide | The instructor IS Claude in this codebase; no separate human-targeted authoring guide is needed for v1.1. |
| Per-chapter PDF export gates | PDF export gated only at milestone end (QUAL-03), not per chapter. |
| Pre-commit build hooks | Lightweight per-chapter build gate (QUAL-01) is sufficient. |
| MCP chapter | Out of scope — future milestone if demand surfaces. |
| Hooks + skills + subagents inter-composition examples | Each chapter teaches its primitive in isolation; cross-primitive recipes are a v1.2+ concern. |
| Live-coding extended demos beyond the one hands-on task per chapter | Each chapter is bounded by its single hands-on task; longer demos belong to a separate "deep dive" milestone if ever. |

## Traceability

17 requirements across 5 chapter phases + 4 cross-cutting quality requirements. Specifics for each chapter's worked example, lifecycle events emphasised, and detailed success criteria are derived per-phase via researcher spawn during `/gsd-plan-phase N`.

| Requirement | Phase | Notes |
|-------------|-------|-------|
| AUD-01 | Phase 1: Audience + Setup | — |
| AUD-02 | Phase 1: Audience + Setup | — |
| SET-01 | Phase 1: Audience + Setup | Specifics from research (hint: /statusline, CLAUDE.md edit) |
| SET-02 | Phase 1: Audience + Setup | — |
| SKL-01 | Phase 2: Skills | — |
| SKL-02 | Phase 2: Skills | — |
| SKL-03 | Phase 2: Skills | Specifics from research |
| HOOK-01 | Phase 3: Hooks | — |
| HOOK-02 | Phase 3: Hooks | Specifics (events emphasised) from research |
| HOOK-03 | Phase 3: Hooks | Specifics from research (hint: sound-notification on Stop/Notification) |
| SUB-01 | Phase 4: Subagents | — |
| SUB-02 | Phase 4: Subagents | closed-as-out-of-scope (v1.1) |
| SUB-03 | Phase 4: Subagents | Specifics from research (commit-message-writer via /agents) |
| OUT-01 | Phase 5: Outro + Milestone Gate | — |
| OUT-02 | Phase 5: Outro + Milestone Gate | — |
| OUT-03 | Phase 5: Outro + Milestone Gate | — |
| QUAL-01 | All phases | Final plan in each chapter phase |
| QUAL-02 | All phases | Discipline — atomic section commits |
| QUAL-03 | Phase 5 | Milestone-end PDF gate |
| QUAL-04 | All phases | Discipline — tone constraints |

---
*Requirements defined 2026-05-12 for milestone v1.1. Generic-by-design — per-chapter specifics derived via research during /gsd-plan-phase.*
