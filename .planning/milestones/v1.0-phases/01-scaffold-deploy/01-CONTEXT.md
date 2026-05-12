# Phase 1: Scaffold & Deploy - Context

**Gathered:** 2026-05-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Stand up a Slidev project (Bun + Vercel) so the instructor and Claude can run it locally, push to a branch, and visit a live preview URL with deep-linkable slide routes. Phase 1 ends when:

- `bun install && bunx slidev` brings up the deck at `http://localhost:3030/` from a clean clone.
- `bunx slidev build` + `bun run preview` serve `dist/` cleanly.
- A real Vercel preview URL exists, and hitting `<preview>/3` on hard refresh loads slide 3 (SPA rewrite verified).
- Pushes to GitHub auto-trigger Vercel preview deployments.

**Out of scope this phase** (covered later): theme/visual identity (Phase 2), copy-button + sidebar components (Phase 3), authoring guide + chapter structure + content slots (Phase 4).

</domain>

<decisions>
## Implementation Decisions

### Vercel Link Flow
- **D-01:** User has already authenticated the Vercel CLI locally (`vercel whoami` works). Claude will drive `vercel link` and the first preview deploy directly — no dashboard-import step required for project creation.
- **D-02:** Phase ends with a real preview URL produced by `bunx vercel` (or `vercel`) so DEPL-04 (deep-link on hard refresh) can be verified against an actual deployment, not just the local `bun run preview` server.
- **D-03:** Claude should attempt to wire GitHub → Vercel auto-deploy via `vercel git connect` (non-interactive). If it fails (repo not yet pushed, scope mismatch, etc.), fall back to documenting a one-click "Connect Git Repository" step in the README and flagging it as a verifier UAT item. DEPL-01 is satisfied either way.
- **D-04:** Production URL for v1 is the auto-assigned `*.vercel.app` URL (no custom domain). Documented in README per DEPL-05.

### Scaffold Deck Content
- **D-05:** Trim the `bun create slidev` starter deck down to a **3-slide minimal placeholder** before first commit. Goal: the deck reads as a workshop scaffold at first glance, not a stock Slidev demo, while still exercising the full pipeline (multi-slide nav, code highlighting, layout system, SPA rewrite).
- **D-06:** The 3 slides are:
  1. **Title slide** — "syai-claude-workshop" with a short subtitle (e.g., "advanced Claude Code workshop scaffold").
  2. **Code-block slide** — a fenced TypeScript block (e.g., a tiny snippet) so Shiki highlighting is visibly working in dev, build, and preview.
  3. **Section-header slide** — using a section/header layout so layouts are exercised. This slide doubles as the navigation target for SPA-rewrite verification: hitting `<preview>/3` directly must load it.
- **D-07:** Phase 4 will replace this placeholder with the real chapter-orchestrator structure (`src:` includes, `pages/` directory). Phase 1 must NOT pre-build that structure — keep `slides.md` as one flat file with all 3 slides.

### Claude's Discretion
- Versions / toolchain pinning (Bun version in `packageManager`, `engines.node`, `.nvmrc` / `.bun-version`, lockfile commit policy) — follow CLAUDE.md guidance (Slidev `^52.15`, Node ≥ 20.12, Bun `^1.3.x`); commit `bun.lockb`; pin `packageManager` to a specific Bun version. No `.nvmrc` / `.bun-version` unless straightforward.
- Production URL & domain — auto Vercel `*.vercel.app` only; no custom domain work this phase.
- README scope for Phase 1 — minimum needed to satisfy SCAF-04 + DEPL-05: setup, dev, build, deploy, public preview URL, pre-flight `vercel login` note, and the GitHub→Vercel connect step (in case `vercel git connect` failed). Defer the authoring guide (CONT-05) to Phase 4.
- Content of the title-slide subtitle and the TypeScript snippet on the code-block slide — pick something low-key and on-brand (no lorem ipsum, no Claude branding).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project anchors
- `CLAUDE.md` — full recommended stack, version pins, Vercel config shape, "What NOT to Use" list, and confidence-per-decision table. Single source of truth for stack choices in Phase 1.
- `.planning/REQUIREMENTS.md` §SCAF + §Deploy — the 10 acceptance criteria this phase must satisfy (SCAF-01..05, DEPL-01..05).
- `.planning/ROADMAP.md` Phase 1 — goal + success criteria + phase boundary.
- `.planning/STATE.md` — current project decisions and history.

### External specs
- [Slidev hosting guide](https://sli.dev/guide/hosting) — `slidev build`, `dist` output, `--base` flag (already cited in CLAUDE.md).
- [Vercel `vercel.json` reference](https://vercel.com/docs/project-configuration/vercel-json) — `framework: null`, `installCommand`, `buildCommand`, `outputDirectory`, `rewrites` shape.
- Slidev install docs (Context7 `/websites/sli_dev`) — `bun create slidev` flow, default project layout.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — this is the first implementation phase. Repository currently contains only `.planning/` artifacts and `CLAUDE.md`. Everything in Phase 1 is greenfield.

### Established Patterns
- All decisions about stack, versions, and Vercel config shape are already locked in `CLAUDE.md`. Planner should treat that document as authoritative and not re-litigate.
- Bun > npm and `bunx` over `npx` per project + global rules.

### Integration Points
- GitHub remote (must be pushed before `vercel git connect` can succeed).
- Vercel CLI (already authenticated by user — `vercel whoami` is expected to work).

</code_context>

<specifics>
## Specific Ideas

- The 3-slide placeholder is intentionally chosen so slide `/3` (the section-header slide) is what DEPL-04 verifies on hard refresh — it doubles as the SPA-rewrite smoke test.
- `vercel git connect` is the preferred wiring for DEPL-01, but treat its failure as recoverable (README + UAT note), not blocking.

</specifics>

<deferred>
## Deferred Ideas

- Custom domain for the production URL — keep auto `*.vercel.app` for v1; revisit if needed before workshop day.
- `.nvmrc` / `.bun-version` files — only add if `packageManager` pin proves insufficient.
- Authoring guide content (CONT-05) — Phase 4.
- Theme work, custom CSS, fonts — Phase 2.
- Copy button, sidebar, presenter-mode tweaks — Phase 3.
- Pages/`src:`-based chapter orchestrator — Phase 4.

</deferred>

---

*Phase: 01-scaffold-deploy*
*Context gathered: 2026-05-08*
