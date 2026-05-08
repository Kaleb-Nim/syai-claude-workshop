# Phase 1: Scaffold & Deploy - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-08
**Phase:** 01-scaffold-deploy
**Areas discussed:** Vercel link flow, Scaffold deck content

---

## Vercel link flow

### Q1: How should the Vercel project get created the first time?

| Option | Description | Selected |
|--------|-------------|----------|
| You import via Vercel dashboard | Phase 1 commits `vercel.json` + README; user imports repo at vercel.com/new. | |
| Claude runs `vercel` CLI locally | Claude installs and runs Vercel CLI locally (requires auth). | ✓ (refined) |
| Hybrid — you link, Claude verifies | User runs `vercel link`, Claude verifies. | |

**User's choice (free-text):** "I already verified my vercel CLI" — user has authenticated `vercel` locally; Claude can drive linking and deployment directly.

### Q2: What should Phase 1 do with your authenticated Vercel CLI?

| Option | Description | Selected |
|--------|-------------|----------|
| Link + first preview deploy | Run `vercel link` + first preview deploy; phase ends with a real preview URL. | ✓ |
| Link only, no deploy | Only run `vercel link`; first deploy via push integration. | |
| Commit `vercel.json` only | Don't touch CLI; user does it later. | |

**User's choice:** Link + first preview deploy.

### Q3: Connect the Vercel project to GitHub for auto preview-on-push (DEPL-01)?

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — connect via dashboard step | Document a one-click GitHub connect step in README. | |
| Yes — attempt via `vercel git connect` CLI | Try `vercel git connect` non-interactively; fall back to dashboard. | ✓ |
| Defer to verification step | Capture as manual UAT item only. | |

**User's choice:** Attempt `vercel git connect` non-interactively; fall back to README/UAT note if it fails.

---

## Scaffold deck content

### Q1: What should the Phase 1 deck contain at handoff?

| Option | Description | Selected |
|--------|-------------|----------|
| Full `bun create slidev` starter | Keep the default starter slides verbatim. | |
| Minimal 2-3 slide placeholder | Strip down to a small placeholder deck that still exercises the pipeline. | ✓ |
| Empty `slides.md` with one slide | Single scaffold slide. | |

**User's choice:** Minimal 2-3 slide placeholder.

### Q2: What 2-3 slides should the placeholder include?

| Option | Description | Selected |
|--------|-------------|----------|
| Title + code block + section header | Title, TS code block (Shiki), section-header layout. Hitting `/3` verifies SPA rewrite. | ✓ |
| Title + 'how to author' note + section header | Title, instructional slide, section header. | |
| Title + code block only (2 slides) | Minimal nav + Shiki proof. | |

**User's choice:** Title + code block + section header — slide 3 doubles as DEPL-04 SPA-rewrite verification target.

---

## Claude's Discretion

- Versions/toolchain pinning — follow CLAUDE.md (Slidev `^52.15`, Node ≥ 20.12, Bun `^1.3.x`); commit `bun.lockb`; pin `packageManager`. Optional `.nvmrc` / `.bun-version` only if straightforward.
- Production URL & domain — auto `*.vercel.app` for v1.
- README scope for Phase 1 — limited to setup/dev/build/deploy + GitHub→Vercel connect note. Defer authoring guide to Phase 4.
- Title-slide subtitle and TS snippet content — pick low-key, on-brand text.

## Deferred Ideas

- Custom domain — defer; revisit before workshop day if needed.
- `.nvmrc` / `.bun-version` files — only if `packageManager` pin is insufficient.
- Authoring guide (CONT-05) → Phase 4.
- Theme/visual identity → Phase 2.
- Copy button + sidebar + presenter-mode polish → Phase 3.
- `src:`-based chapter orchestrator and `pages/` structure → Phase 4.
