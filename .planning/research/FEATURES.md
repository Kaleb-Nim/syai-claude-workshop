# Feature Research

**Domain:** Code-heavy developer workshop slide deck (live + async takeaway), Slidev-based
**Researched:** 2026-05-08
**Confidence:** HIGH (Slidev features verified via official docs; UX patterns verified via multiple sources)

## Feature Landscape

### Table Stakes (Users Expect These)

Developers walk away if these are missing or broken. All are Slidev built-ins or trivial to enable.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Syntax-highlighted code blocks (Shiki) | Code-heavy deck; unreadable code = unusable workshop | LOW | Slidev built-in via Shiki; supports `bash`, `ts`, `tsx`, `json`, `md` out of the box |
| Copy-to-clipboard on code blocks | Participants need to paste commands/snippets locally during live exec | LOW | Not Slidev default — needs `<CodeBlockWrapper>` component or copy plugin (e.g. `slidev-addon-components` or custom Vue wrapper) |
| Keyboard navigation (arrows, space, Esc) | Standard expectation for any deck; muscle memory | LOW | Slidev built-in |
| Slide-deep-linking via URL (`#/3`) | Async users return to a specific slide without re-scrolling 3hrs of content | LOW | Slidev built-in (route per slide) |
| Persistent progress indicator / slide counter | Both presenter pacing AND async readers need "where am I in the half-day" signal | LOW | Slidev built-in (bottom bar shows `n / total`) |
| Slide overview mode (press `o`) | Async navigation; jump to topic without linear click-through | LOW | Slidev built-in |
| Dark theme | Dev-aesthetic, alignment with Claude/Anthropic identity, eye comfort for 3-4hr session | LOW | Slidev theme config; many dev themes ship dark-default (e.g. `slidev-theme-default`, `@slidev/theme-seriph`) |
| Monospace body font for code | Identity + readability for code-heavy content | LOW | UnoCSS `font-mono` or theme override |
| Mobile-readable layout | Async participants will revisit on phone/tablet | LOW | Slidev responsive by default; presenter-side only requires desktop |
| Public URL, no auth wall | Participants must reach takeaway instantly post-workshop | LOW | Vercel deployment; covered in PROJECT.md |
| PDF export available | Some participants archive as PDF; corporate/offline reading | LOW | Slidev built-in (`slidev export`) — no custom work |
| Presenter mode (notes + next-slide preview) | Live delivery quality; presenter sees timing and notes | LOW | Slidev built-in (`/presenter` route) |
| Click animations / staged reveals | Code-heavy explanation needs progressive disclosure (don't show full snippet at once) | LOW | Slidev built-in `v-click`, `v-after`, click counts |
| Line highlighting in code blocks | Walk through specific lines while explaining; standard for code teaching | LOW | Slidev built-in via `{1,3-5}` syntax on code fence |

### Differentiators (Workshop UX Wins for This Audience)

Features that meaningfully improve a half-day, code-heavy, advanced workshop. Worth the build cost.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Sidebar TOC / section navigator (always-visible) | Half-day deck = lots of slides; async readers need persistent map. PROJECT.md explicitly requires this. | MEDIUM | Slidev `<Toc>` component exists but is slide-embedded, not a chrome sidebar. Needs custom global layout component or addon (`slidev-addon-tldraw`-style pattern) listening to `useNav()` |
| Section/chapter grouping (subagents, hooks, MCP, slash commands, skills, plugins, SDK) | Topic boundaries help async readers chunk content; matches workshop's 7 advanced areas | LOW | Slidev `## Section` headings + `<Toc :level="1">`; achieved via slide frontmatter `level: 1` |
| Shiki Magic Move (animated code morphs) | Showing CLI flag additions, `claude.md` evolution, subagent prompt iteration — beats jump-cuts | MEDIUM | Slidev built-in (4-backtick `magic-move` block); high payoff for advanced Claude Code teaching but requires deliberate authoring |
| Search across deck (Ctrl/Cmd+K) | Async returner: "where did they cover hooks?" → instant find | MEDIUM | Not Slidev default; addon `slidev-addon-search` or community Pagefind integration |
| Inline terminal-style command blocks (with `$` prompt prefix) | Workshop is bash-heavy (`claude code …`, `mcp install …`); a styled command component reads better than a generic code block | LOW | Custom Vue component `<Cmd>` wrapping Shiki + copy button |
| Per-slide URL-anchor share button | "Slide 47 covers MCP servers — copy this link" for Q&A and async support | LOW | Tiny Vue component using `useNav().currentSlideRoute` |
| External link / "open in Claude Code docs" callout component | Workshop links to anthropic.com/claude-code, MCP spec, plugin marketplace; consistent affordance > inline `[link](url)` | LOW | Custom `<DocLink>` component |
| Reduced-motion preference respected | Some participants disable animations; magic-move can be jarring | LOW | CSS `prefers-reduced-motion` query in theme |
| Twoslash / TypeScript hover types in code blocks | Audience writes TS; hovering function signatures > flipping to docs | MEDIUM | Slidev supports `twoslash` syntax via Shiki transformer; valuable for SDK section |
| Mermaid diagrams for agent/MCP flow | Subagent orchestration, hook fire order, MCP transport — diagrams beat prose | LOW | Slidev built-in mermaid support |
| Slide-resume on reload (last viewed slide in localStorage) | Async takeaway: close laptop mid-section, come back tomorrow, land where you left off | LOW | ~30 lines of Vue; reads `useNav()` and writes to localStorage |

### Anti-Features (Skip for v1 — Document Why)

Tempting additions that don't pay off for a half-day workshop deck. Several already pre-listed in PROJECT.md "Out of Scope"; included here with reasoning.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Speaker / participant accounts | "Track who's attended", "personalized progress" | Adds auth, DB, session state — half-day workshop doesn't need persistent identity. PROJECT.md explicitly excludes. | Public URL; localStorage for resume |
| Live polling / Q&A widgets (Slido/Mentimeter clone) | "Engage the audience" | Real-time backend, moderation, fallback when network fails on workshop wifi. Not core to advanced Claude Code teaching. | Verbal Q&A; shared Discord/Slack link on a slide |
| Live in-deck code execution sandbox | "Run the snippet from the slide" | Claude Code is a CLI tool — running it requires a real terminal with credentials. An in-browser sandbox cannot represent the actual tool. Misleading. | Participants run on their own laptop (as designed); slides show expected output |
| Hands-on exercise checkpoint UI ("mark complete") | "Track exercise progress" | UI design overhead, no validation possible without execution backend. PROJECT.md explicitly defers. | Plain Slidev slides labeled "Exercise N" |
| Multi-deck index / module landing page | "Future-proof for more workshops" | Premature; PROJECT.md is single-deck v1. Adds router complexity. | Add later when 2nd deck exists |
| Custom presenter mode redesign | "Better speaker UX" | Slidev's presenter mode is already strong (notes, next slide, timer). Reinventing wastes time. | Use Slidev default |
| Live participant cursor / shared annotations | "Collaborative workshop feel" | Realtime infra, moderation risk (drawings on screen during live demo). | Slidev's built-in drawing tool for presenter only |
| Custom video embeds / recorded walkthroughs per slide | "Async users get a recording" | Hosting, transcription, sync with slides. Doubles content authoring burden. | Single workshop recording linked from intro slide |
| i18n / multi-language toggle | "Reach broader audience" | Doubles content authoring; instructor authors in English. | Defer until demand validated |
| Analytics / participant tracking | "Measure engagement" | Privacy concerns, infra. PROJECT.md explicitly excludes. | None |
| Theming as an end-user toggle (light/dark switch) | "User choice" | Workshop has a brand identity (dark, Claude-aligned). Toggle dilutes that. | Single dark theme; respect OS-level if trivial |

## Feature Dependencies

```
Slidev scaffold (bun + Vercel)
    ├──enables──> Code blocks (Shiki built-in)
    │                 ├──enables──> Line highlighting
    │                 ├──enables──> Magic Move
    │                 ├──enables──> Twoslash hover types
    │                 └──requires──> Copy-to-clipboard wrapper component
    │
    ├──enables──> Slide routing (per-slide URLs)
    │                 ├──enables──> Deep-linking
    │                 ├──enables──> Per-slide share button
    │                 └──enables──> Slide-resume on reload (localStorage)
    │
    ├──enables──> Section frontmatter (level: 1)
    │                 ├──enables──> Built-in <Toc> component
    │                 └──enables──> Custom always-visible sidebar nav
    │
    ├──enables──> Theme + UnoCSS
    │                 ├──enables──> Dark monospace identity
    │                 └──enables──> Reduced-motion respect
    │
    └──enables──> Vercel deploy
                      └──enables──> Public URL (no auth)

Custom <Cmd> terminal block ──enhances──> Code blocks (specialized for shell)
Search (Pagefind) ──enhances──> Sidebar TOC (when deck grows)
Mermaid ──independent──> any slide

Live polling ──conflicts──> Anti-feature; would conflict with no-auth, no-backend constraint
Account system ──conflicts──> Public URL constraint
```

### Dependency Notes

- **Sidebar TOC requires section frontmatter:** without `level: 1` markers on chapter slides, the TOC has nothing meaningful to render. Authoring convention must be set in scaffold docs.
- **Magic Move requires deliberate authoring:** instructor must write multi-step code blocks with the `magic-move` 4-backtick fence; scaffold should document the pattern in README or example slide.
- **Slide-resume requires stable slide identifiers:** Slidev uses route index (`/3`) by default — reordering slides invalidates saved state. Acceptable for v1 (workshop is fixed once delivered).
- **Copy-to-clipboard wraps the Shiki component:** must be a global override (Slidev `setup/code.ts` or `<CodeBlockWrapper>` slot), not per-slide. Affects every code block at once.
- **Search conflicts with build-time complexity:** Pagefind requires a post-build index step; defer until deck size justifies it (>50 slides).

## MVP Definition

### Launch With (v1) — Scaffold Handoff to Instructor

Aligned with PROJECT.md "Active" requirements. All P1.

- [ ] **Slidev scaffold + Bun dev script** — `bunx slidev` runs locally; PROJECT.md requirement
- [ ] **Vercel deployment (preview on PR, prod on main)** — PROJECT.md requirement
- [ ] **Dark, monospace, Claude-aligned theme** — PROJECT.md requirement; identity essential
- [ ] **Syntax-highlighted code blocks (Shiki, with bash/ts/tsx/json/md)** — table stakes
- [ ] **Copy-to-clipboard button on every code block** — PROJECT.md requirement; live-workshop critical
- [ ] **Always-visible sidebar TOC / progress indicator** — PROJECT.md requirement
- [ ] **Section grouping convention (level-1 frontmatter)** — required for TOC to be useful; documented in scaffold README
- [ ] **Slide deep-linking (route per slide)** — Slidev default; verify enabled
- [ ] **Slide overview mode (`o` key)** — Slidev default; verify enabled
- [ ] **Click animations available (`v-click`)** — Slidev default; documented for instructor
- [ ] **Line highlighting available (`{1,3-5}`)** — Slidev default; documented for instructor
- [ ] **PDF export verified working** — Slidev default; verify in CI or smoke test
- [ ] **Presenter mode verified working** — Slidev default; verify route loads
- [ ] **README with content authoring guide** — PROJECT.md requirement (repo scaffolding)

### Add After Validation (v1.x) — After First Live Run

- [ ] **Shiki Magic Move example slide in scaffold** — trigger: instructor asks "how do I animate code changes?"
- [ ] **Custom `<Cmd>` terminal block component** — trigger: instructor writing many `$ claude code …` lines and wanting consistency
- [ ] **Per-slide share button** — trigger: post-workshop Q&A reveals participants asking "which slide was that?"
- [ ] **Slide-resume on reload (localStorage)** — trigger: feedback that async readers lose place
- [ ] **Mermaid diagram example slide** — trigger: instructor needs to diagram subagent/MCP flow

### Future Consideration (v2+) — After Multi-Deck or Repeat Workshops

- [ ] **Search (Pagefind)** — defer until deck has 50+ slides or 2nd deck exists
- [ ] **Twoslash TypeScript hover types** — defer; nice for SDK section but high authoring overhead
- [ ] **Multi-deck landing page** — defer per PROJECT.md until 2nd workshop exists
- [ ] **Workshop recording embed** — defer; depends on whether sessions are recorded
- [ ] **i18n** — defer indefinitely; no validated demand

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Slidev scaffold + Vercel | HIGH | LOW | P1 |
| Syntax-highlighted code blocks | HIGH | LOW (built-in) | P1 |
| Copy-to-clipboard | HIGH | LOW (component wrapper) | P1 |
| Sidebar TOC / progress | HIGH | MEDIUM (custom layout) | P1 |
| Dark/monospace theme | HIGH | LOW (theme config) | P1 |
| Section grouping convention | HIGH | LOW (docs only) | P1 |
| Deep-linking + overview mode | HIGH | LOW (built-in, verify) | P1 |
| PDF export + presenter mode | MEDIUM | LOW (built-in, verify) | P1 |
| Click animations + line highlight | HIGH | LOW (built-in, document) | P1 |
| Shiki Magic Move | MEDIUM | LOW (built-in) but MEDIUM authoring | P2 |
| `<Cmd>` terminal component | MEDIUM | LOW | P2 |
| Per-slide share button | MEDIUM | LOW | P2 |
| Slide-resume on reload | MEDIUM | LOW | P2 |
| Mermaid diagrams | MEDIUM | LOW (built-in) | P2 |
| Twoslash hover types | LOW | MEDIUM | P3 |
| Search (Pagefind) | LOW (small deck) | MEDIUM | P3 |
| Live polling | LOW | HIGH | Anti |
| Account system | LOW | HIGH | Anti |
| In-browser code sandbox | LOW (misleading) | HIGH | Anti |

**Priority key:** P1 = ship in v1 scaffold; P2 = add post-validation; P3 = defer; Anti = explicitly skip.

## Competitor / Reference Feature Analysis

| Feature | claudecode.sg/slides (concept ref) | Slidev defaults | Reveal.js typical | Our v1 approach |
|---------|------------------------------------|-----------------|-------------------|-----------------|
| Code highlighting | Yes (style ref only — content not cloned) | Shiki built-in | highlight.js built-in | Shiki (sharper, theme-able) |
| Copy buttons | Yes | No (custom needed) | No (plugin) | Custom global wrapper |
| Sidebar TOC | Persistent left nav (concept inspiration) | `<Toc>` slide-embedded only | Add-on | Custom always-visible layout |
| Progress | Slide counter | Bottom bar built-in | Built-in | Slidev default |
| Dark theme | Dark, monospace | Theme-dependent | Theme-dependent | Custom Claude-aligned |
| Deep-link to slide | Yes | Yes (built-in) | Yes (built-in) | Slidev default |
| Magic Move animations | n/a (static) | Built-in | No | Optional (P2) |
| PDF export | n/a | Built-in `slidev export` | Plugin | Slidev default |

## Sources

- [Slidev Features (official)](https://sli.dev/features/)
- [Shiki Magic Move | Slidev](https://sli.dev/features/shiki-magic-move)
- [Slidev Syntax Guide](https://sli.dev/guide/syntax)
- [Slidev Why](https://sli.dev/guide/why)
- [Slidev User Interface](https://sli.dev/guide/ui)
- [Slidev Built-in Components](https://sli.dev/builtin/components)
- [Slidev Toc / sidebar discussion #439](https://github.com/slidevjs/slidev/discussions/439)
- [Shiki Magic Move (antfu.me)](https://antfu.me/posts/shiki-magic-move)
- [Slidev 101: Coding presentations with Markdown (DEV)](https://dev.to/snyk/slidev-101-coding-presentations-with-markdown-397n)
- [Code-Based Presentation Tools for Developers (Medium, 2025)](https://medium.com/demohub-tutorials/10-code-based-presentation-tools-for-developers-ranked-2025-fe764698f132)
- [Creating Slide Decks That Engage: Design for Developers (dasroot.net, 2026)](https://dasroot.net/posts/2026/04/creating-slide-decks-engage-design-developers/)
- PROJECT.md (`/Users/kalebnim/Documents/GitHub/syai-claude-workshop/.planning/PROJECT.md`) — authoritative active/out-of-scope requirements
- Note: `claudecode.sg/slides/Beginner-walkthrough-002` returned HTTP 403 to automated fetch; treated as concept-only reference per PROJECT.md ("not as a template to copy")

---
*Feature research for: code-heavy developer workshop slide deck (Slidev, half-day, live + async)*
*Researched: 2026-05-08*
