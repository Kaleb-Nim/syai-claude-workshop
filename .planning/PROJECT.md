# syai-claude-workshop

## What This Is

A slide-deck website for a half-day, advanced Claude Code workshop. It serves as the **vehicle** for live presentation and as a takeaway reference participants revisit afterward — the lesson content itself will be authored separately by the workshop instructor.

## Core Value

Participants can follow the workshop live and return to the same URL afterward to step through the material at their own pace — without losing place, formatting, or copyable code.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Slidev-based deck scaffold deployable to Vercel at a public URL
- [ ] Single half-day deck structure (3–4 hours of content slots) — content authored later by instructor
- [ ] Code blocks render with syntax highlighting and a copy-to-clipboard button
- [ ] Navigation sidebar / progress indicator visible to participants in both live and self-paced modes
- [ ] Claude/Anthropic-aligned visual identity — dark theme, monospace, minimal chrome
- [ ] Vercel deployment pipeline (preview on PR, production on main)
- [ ] Repository scaffolding: README, dev-server scripts (`bun`/`bunx`), Slidev config, content directory layout ready for instructor's markdown

### Out of Scope

- Authoring the actual workshop lesson content — instructor will add this after the scaffold is built
- Hands-on exercise checkpoint UI — out of v1; instructor can use plain Slidev slides for exercises
- Speaker notes UI / dedicated presenter mode customisations — Slidev's defaults are acceptable for v1
- PDF export feature work — Slidev provides this out of the box; no custom work needed for v1
- Multi-deck / module index landing page — single deck only for v1
- Authentication / participant accounts / progress sync across devices — public URL is sufficient
- Analytics / participant tracking — not needed for the workshop format
- Cloning content or design from claudecode.sg/slides — referenced for *concept only*, not as a template to copy

## Context

- **Audience:** Developers under 35, comfortable with Git and Node.js, bringing laptops to a live workshop. Self-sufficient on terminals.
- **Workshop topic:** Advanced Claude Code — subagents, hooks, MCP, slash commands, skills, plugins, agent SDK. Hands-on, code-heavy.
- **Format:** Live presenter walkthrough during the session, then the same URL becomes the participants' takeaway reference.
- **Reference (concept only):** claudecode.sg/slides/Beginner-walkthrough-002 — the *style* of a slides-based walkthrough is the inspiration; content and design will be original.
- **Local environment:** macOS (Apple M4 Max). Bun is the package manager (not npm/node). Slidev runs cleanly on Bun via `bunx`.

## Constraints

- **Tech stack:** Slidev (Vue-based, markdown-driven slide framework) — chosen for built-in dev-friendly features (code blocks, syntax highlighting, presenter mode, PDF export, SPA build).
- **Package manager:** Bun (`bun` / `bunx`) — per local environment standard. No npm/yarn.
- **Hosting:** Vercel — public URL with preview deployments per PR.
- **Visual identity:** Dark theme, monospace, minimal — must read as Claude/Anthropic-adjacent without infringing branding.
- **Content ownership:** Scaffold must be content-agnostic. Instructor will add slides as plain markdown after handoff.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Slidev over Reveal.js | Markdown-driven, dev-aesthetic out of the box, better DX for code-heavy decks, presenter mode + PDF export built in | — Pending |
| Single deck for v1 (not multi-module) | Workshop is half-day; module split adds complexity without proven need | — Pending |
| Vercel hosting | Already familiar, free tier covers usage, preview deploys per PR aid content iteration | — Pending |
| Defer hands-on exercise UI | Slidev plain slides are sufficient; custom exercise component is unproven design work | — Pending |
| Bun over npm | Matches local environment standard | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-08 after initialization*
