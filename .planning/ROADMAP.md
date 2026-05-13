# Roadmap: syai-claude-workshop

## Milestones

- ✅ **v1.0 scaffold-shipped** — Phases 1, 2, 4 (shipped 2026-05-12; Phase 3 deferred; Phase 4 partial — chapter drafts retired for v1.1 re-authoring)
- 🚧 **v1.1 workshop-content-v2** — 5 chapter phases, section-by-section authoring with per-phase research (started 2026-05-12)

## Phases

<details>
<summary>✅ v1.0 scaffold-shipped (shipped 2026-05-12) — see <a href="milestones/v1.0-ROADMAP.md">milestones/v1.0-ROADMAP.md</a></summary>

- [x] Phase 1: Scaffold & Deploy (2/2 plans) — completed 2026-05-09
- [x] Phase 2: Theme & Visual Identity (4/4 plans) — completed 2026-05-09
- [ ] Phase 3: Components & Persistent UI — **deferred 2026-05-09** (COMP-01..05 retired)
- [⚠] Phase 4: Workshop Content — Draft (4/5 plans, 04-05 aborted 2026-05-12; chapter drafts retired for v1.1 re-authoring)

</details>

### 🚧 v1.1 workshop-content-v2

- [x] **Phase 1: Audience + Setup** — Open the workshop, establish the target participant, deliver immediate small Claude wins. ✅ completed 2026-05-12
- [x] **Phase 2: Skills** — Teach what skills are, how they work (progressive disclosure), with one small hands-on task. ✅ completed 2026-05-12 (renumbered from Phase 3 on 2026-05-13 — see commit history)
- [x] **Phase 3: Hooks** — Teach what hooks are, how they work, with one small hands-on task. ✅ completed 2026-05-12 (renumbered from Phase 2 on 2026-05-13 — see commit history)
- [ ] **Phase 4: Subagents** — Teach subagents in Claude Code: what they are, why isolated context matters, build one live with `/agents`.
- [ ] **Phase 5: Outro + Milestone Gate** — Recap, where-to-next, closing URL, full-deck PDF export gate.

> **Per-phase research policy:** Each chapter phase begins with a researcher spawn during `/gsd-plan-phase N` that surveys top articles + official docs for the primitive being taught. Detailed worked examples, exercise scaffolds, and per-section success criteria are derived from that research, not from this roadmap. The phase details below are intentionally generic.

## Phase Details

### Phase 1: Audience + Setup
**Goal**: A reader opening `pages/01-audience-setup.md` knows who the workshop is for, what's covered, and walks away with at least two small immediate Claude wins.
**Depends on**: Nothing (first v1.1 phase; stack/theme/architecture locked from v1.0).
**File**: `pages/01-audience-setup.md`
**Requirements**: AUD-01, AUD-02, SET-01, SET-02
**Success Criteria**: Derived during `/gsd-plan-phase 1` after research. The generic shape is: concept slide(s) + small hands-on win(s) + sync-check before the next chapter. User-suggested seeds for the wins: `/statusline`, editing `CLAUDE.md`.
**Plans:** 8 plans
- [x] 01-01-PLAN.md — wire chapter orchestrator (slides.md src include + pages/01-audience-setup.md)
- [x] 01-02-PLAN.md — section 01 chapter cover
- [x] 01-03-PLAN.md — section 02 who-this-is-for (AUD-01)
- [x] 01-04-PLAN.md — section 03 whats-covered (AUD-02)
- [x] 01-05-PLAN.md — section 04 claude-files-primer
- [x] 01-06-PLAN.md — section 05 win-statusline (SET-01 Win 1)
- [x] 01-07-PLAN.md — section 06 win-claude-md (SET-01 Win 2 + SET-02 sync-check)
- [x] 01-08-PLAN.md — bunx slidev build + presenter spot-check (QUAL-01)

### Phase 2: Skills
**Goal**: A reader opening `pages/02-skills.md` understands what skills are, how progressive disclosure works, and walks through one small live hands-on task.
**Depends on**: Phase 1.
**File**: `pages/02-skills.md`
**Requirements**: SKL-01, SKL-02, SKL-03
**Success Criteria**: Generic shape: what-is-a-skill + mental model (progressive disclosure, frontmatter matching) + one small live hands-on task.
**Plans:** 7 plans
- [x] 02-01-PLAN.md — wire chapter orchestrator (slides.md src include + pages/02-skills.md)
- [x] 02-02-PLAN.md — section 01 chapter cover
- [x] 02-03-PLAN.md — section 02 why-skills (procedural-knowledge framing + 3 locked verbatim quotes, SKL-01)
- [x] 02-04-PLAN.md — section 03 how-skills-work (file shape + SKILL.md + 3-tier progressive disclosure, SKL-01 + SKL-02)
- [x] 02-05-PLAN.md — section 04 hands-on-build (mkdir + SKILL.md paste + softened hot-reload, SKL-03 wire)
- [x] 02-06-PLAN.md — section 05 hands-on-fire (trigger + control + two ✓ Checks, SKL-03 fire)
- [x] 02-07-PLAN.md — A1 dry-run + bunx slidev build + presenter spot-check (QUAL-01)

### Phase 3: Hooks
**Goal**: A reader opening `pages/03-hooks.md` understands what hooks are and how they work, and walks through one small live hands-on task with the presenter.
**Depends on**: Phase 2.
**File**: `pages/03-hooks.md`
**Requirements**: HOOK-01, HOOK-02, HOOK-03
**Success Criteria**: Generic shape: why-it-exists framing + how-it-works (lifecycle events + `settings.json` wiring) + one small live hands-on task. Seed: sound-notification hook on `Stop` and `Notification` events (`afplay` macOS / `aplay` Linux). Opens with a contrast back-reference to skills (Chapter 2 → 3 bridge).
**Plans:** 6 plans
- [x] 03-01-PLAN.md — scaffolding (slides.md include + pages/03-hooks.md orchestrator + section 01 cover)
- [x] 03-02-PLAN.md — section 02 why-hooks (IFTTT framing + 3 locked determinism quotes, HOOK-01)
- [x] 03-03-PLAN.md — section 03 how-hooks-work (Stop + Notification + minimal settings.json JSON, HOOK-02)
- [x] 03-04-PLAN.md — section 04 hands-on-build (full Stop+Notification paste-target JSON, HOOK-03 wire)
- [x] 03-05-PLAN.md — section 05 hands-on-fire (trigger both events + two ✓ Checks, HOOK-03 fire)
- [x] 03-06-PLAN.md — bunx slidev build + presenter spot-check (QUAL-01)

### Phase 4: Subagents
**Goal**: A reader opening `pages/04-subagents.md` understands subagents in Claude Code — what they are (`.claude/agents/<name>.md` file shape + Task/Agent tool delegation), why they exist (isolated context windows), and walks through one small live hands-on task building a subagent via the `/agents` slash command.
**Depends on**: Phase 3.
**File**: `pages/04-subagents.md`
**Requirements**: SUB-01, SUB-03
**Success Criteria**: 7 section files under `pages/04-subagents/` covering: cover, skills-vs-subagents framing (verbatim dev.to quotes), why-subagents (context preservation), how-subagents-work (file shape + invocation modes), 3-up showcase (python-pro / quant-analyst / market-researcher), hands-on build via `/agents` (commit-message-writer), hands-on fire (invoke + observe isolated context).
**Plans:** 8 plans
- [x] 04-01-PLAN.md — scaffolding (slides.md include + pages/04-subagents.md orchestrator + section 01 cover)
- [x] 04-02-PLAN.md — section 02 skills-vs-subagents (cookbook framing + 3 verbatim dev.to quotes)
- [x] 04-03-PLAN.md — section 03 why-subagents (context preservation framing, D-04)
- [x] 04-04-PLAN.md — section 04 how-subagents-work (file shape + VoltAgent template + invocation modes, SUB-01)
- [x] 04-05-PLAN.md — section 05 showcase (3-up grid: python-pro / quant-analyst / market-researcher, D-06)
- [x] 04-06-PLAN.md — section 06 hands-on-build via /agents (SUB-03 wire, D-07)
- [x] 04-07-PLAN.md — section 07 hands-on-fire (invoke + observe isolated context, SUB-03 fire, D-08)
- [ ] 04-08-PLAN.md — ROADMAP/REQUIREMENTS/STATE + bunx slidev build + presenter spot-check (QUAL-01 + D-09 admin)

### Phase 5: Outro + Milestone Gate
**Goal**: A reader opening `pages/99-outro.md` gets a clean recap, knows where to go next, ends on the production deck URL — and the full deck exports cleanly to PDF for milestone close.
**Depends on**: Phase 4.
**File**: `pages/99-outro.md`
**Requirements**: OUT-01, OUT-02, OUT-03, QUAL-03
**Success Criteria**: Derived during `/gsd-plan-phase 5` after research. Generic shape: recap slide + where-to-next pointers + closing URL + milestone PDF export.
**Plans**: TBD via `/gsd-plan-phase 5`.

### Cross-cutting Quality (all phases)

**Requirements**: QUAL-01, QUAL-02, QUAL-03, QUAL-04 — see REQUIREMENTS.md.

- **QUAL-01** — each chapter phase's final plan is a lightweight `bunx slidev build` + presenter spot-check.
- **QUAL-02** — atomic per-section commits; discipline, not a separate plan.
- **QUAL-03** — milestone-end full-deck PDF export gate folded into Phase 5.
- **QUAL-04** — tone discipline; reviewed during each section's plan execution.

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Audience + Setup | v1.1 | 8/8 | Complete | 2026-05-12 |
| 2. Skills | v1.1 | 7/7 | Complete | 2026-05-12 |
| 3. Hooks | v1.1 | 6/6 | Complete | 2026-05-13 |
| 4. Subagents | v1.1 | 7/8 | In progress | — |
| 5. Outro + Milestone Gate | v1.1 | 0/0 | Not started | — |

---
*v1.1 roadmap created 2026-05-12. Phase details intentionally generic — per-chapter specifics derived via researcher spawn during `/gsd-plan-phase N`. v1.0 phase artifacts archived under `.planning/milestones/v1.0-phases/`.*
