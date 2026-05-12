# Phase 3: Skills - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-12
**Phase:** 03-skills
**Areas discussed:** Research ingestion (user-directed), Locked quotes, Hands-on task, Skill scope, Persona + signature, Phase 2 bridge

---

## Pre-discussion: Research ingestion (user-directed)

Instead of selecting from the standard gray-area menu (Chapter shape / Framing / Mental model / Hands-on), the user directed: *"Before we proceed with the discussion, ingest these 2 resources. Then build out the content for the skill segment of the workshop."*

| Resource | Used for |
|----------|----------|
| <https://duet.so/guides/claude-code-skills-complete-guide#what-is-a-claude-code-skill> | Primary source. Sourced the 3 locked quotes (D-03), 3-tier progressive-disclosure model (D-07), "description has two jobs" framing (D-06), user-vs-project scope (D-05), minimal SKILL.md shape (D-06). |
| <https://alexop.dev/posts/understanding-claude-code-full-stack/> | Cross-reference. Surfaced advanced frontmatter fields (`disable-model-invocation`, `allowed-tools`, `paths`, `context: fork`) — all deferred per D-07 trailing line. Confirmed lazy-loading semantics. |

Both ingested via WebFetch. Both added to CONTEXT.md `<canonical_refs>` for researcher re-fetch at plan time.

---

## Locked verbatim quotes for Section 02

| Option | Description | Selected |
|--------|-------------|----------|
| Use the 3 research quotes | duet.so quotes Q1 (procedural-knowledge framing), Q2 (CLAUDE.md vs skill loading cost), Q3 (the-skill-activated-itself wow moment) | ✓ |
| User supplies own quotes | User provides 1–3 verbatim like Phase 2 did | |
| No locked quotes | Section 02 = framing only, no quote-reveal slides | |

**User's choice:** Use the 3 research quotes (Recommended).
**Notes:** Sourced from duet.so. Captured in CONTEXT.md D-03 verbatim. Pattern matches Phase 2's locked-quotes discipline (D-03 in Phase 2 CONTEXT.md).

---

## Hands-on task (SKL-03)

| Option | Description | Selected |
|--------|-------------|----------|
| commit-message skill | Classic. mkdir + paste minimal SKILL.md + ask "write a commit message" → auto-invoke + Conventional Commits | |
| Workshop-deck-specific skill | Skill tied to THIS repo (e.g., "author a new chapter section") | |
| Persona/format skill (haiku/pirate/rubber-duck) | Smallest possible. SKILL.md → fixed persona/format on trigger. Cleanest "skill activated itself" demo | ✓ |
| Let me name it | Freeform | |

**User's choice:** Persona/format skill.
**Notes:** Trade-off — persona skills are easier to demo but the wow moment depends on a *distinctive* signature (Claude wouldn't produce it unprompted). Persona alone is risky; distinctive signature locks the ✓ Check. Resolved in the Persona question below.

---

## Skill scope (user vs project)

| Option | Description | Selected |
|--------|-------------|----------|
| User-level (~/.claude/skills/) | Mirrors Phase 2's ~/.claude/settings.json hands-on pattern. No repo dependency | ✓ |
| Project-level (.claude/skills/) | Inside the workshop repo. Teaches team-distribution angle but adds "which repo am I in" wrinkle | |
| Show both, hands-on one | Section 03 shows both in 2-line note; hands-on uses user-level | |

**User's choice:** User-level (Recommended).
**Notes:** Captured in CONTEXT.md D-05 + D-08. Project-level kept as a one-line mention in Section 03's file-shape slide.

---

## Persona + signature

| Option | Description | Selected |
|--------|-------------|----------|
| haiku-mode | ☘ open + "— per haiku-mode" close. Lowest risk | |
| pirate-mode | "Ahoy!" open + "— yer pirate-mode" close | (variant ✓) |
| rubber-duck | 🦆 + "— rubber-duck out" close | |
| Let me name it | Freeform | ✓ |

**User's choice:** "pirate-mode but make it '2026 brain-rot style'."
**Notes:** Captured in CONTEXT.md D-06. The 2026 brain-rot vocabulary (skibidi, rizz, no cap, sigma, ohio, gyat, lowkey, …) layered on top of pirate-speak IS the distinctive signature — Claude won't unprompted dump that vocabulary in a serious answer, so its presence proves the skill self-invoked. Locked open: "Ahoy ye sigma." Locked close: "— per pirate-mode." Exact word list is at planner discretion (D-06 Claude's Discretion entry).

---

## Phase 2 → 3 bridge

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — callback on Section 02 | One line contrasting hook (you wire "when") vs skill (Claude decides "when") | ✓ |
| No — chapter stands alone | Cleaner but loses continuity | |

**User's choice:** Yes (Recommended).
**Notes:** Captured in CONTEXT.md D-04. Exact wording at planner discretion; the contrast MUST be present on Slide 1 of Section 02. Mirrors Phase 2 D-04 (which bridged Phase 1 → 2 via the CLAUDE.md callback on Quote 2's slide).

---

## Claude's Discretion

Per CONTEXT.md `<decisions>` → "Claude's Discretion" subsection. Highlights:
- Exact cover-slide one-liner (Section 01)
- Exact wording of Phase 2 callback (Section 02 Slide 1)
- Exact wording of the "procedural-knowledge" concrete example (Section 02 Slide 2 — `pr-review` illustrative)
- Exact brain-rot vocabulary list inside the example SKILL.md body
- Rendering of the 3-tier progressive-disclosure visual (Section 03 — table/diagram/list)
- Two-step paste layout (Section 04 — one slide or two)
- Non-invocation trigger topic (Section 05 Step 2 — `git rebase` illustrative)
- Restart caveat softening (D-09 — depends on current Claude Code hot-reload behavior at research time)
- ✓ Check callout rendering (defer to Phases 1–2's actual pattern)

## Deferred Ideas

Per CONTEXT.md `<deferred>` section. Highlights:
- `disable-model-invocation` + manual-only skills → v1.2
- `allowed-tools` + skill security framing → v1.2
- `context: fork` / skills as subagent-launchers → post-Phase-4 or v1.2
- `paths` glob filtering → v1.2
- Plugin distribution → v1.2 / "team adoption" mini-chapter
- Multi-file skills (scripts/, reference files) → v1.2
- `skill-creator` meta-skill → v1.2
- Skills × hooks cross-primitive composition → v1.2
- Project-level deep dive (versioning, PR review) → v1.2
- "500-line rule" / SKILL.md size discipline → v1.2 authoring aside
- Cross-platform SKILL.md standard (Codex, Cursor, etc.) → maybe Phase 5 outro pointer
