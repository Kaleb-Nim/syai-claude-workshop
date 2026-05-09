# Phase 2: Theme & Visual Identity - Context

**Gathered:** 2026-05-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Style the existing 3-slide placeholder deck so it reads as Claude/Anthropic-adjacent — dark, monospace-forward, minimal — while keeping the Slidev default theme intact (no community theme swap). All overrides land in `uno.config.ts` (UnoCSS shortcuts) and a single `style.css`. Phase 2 ends when:

- Deck loads dark with `colorSchema: 'dark'` and named UnoCSS shortcuts (no scattered hex literals across slides).
- Headings render in Inter, code in JetBrains Mono via Slidev `fonts:` headmatter — verified in dev and preview.
- Code samples on the placeholder slides are projector-readable (≥4.5:1 contrast) with a pinned Shiki language list.
- `/presenter/` chrome is unaffected by the new styles (all custom CSS scoped under `.slidev-layout`).

**Out of scope this phase** (covered later): copy button + sidebar nav (Phase 3), authoring guide + chapter orchestrator (Phase 4), per-component Vue work, animations, custom layouts beyond what's needed to apply tokens.

**Phase 2 does NOT change slide content** — the 3-slide placeholder stays intact; Phase 4 replaces content. The placeholder code-block slide IS the projector-readability test target.
</domain>

<decisions>
## Implementation Decisions

### Palette — Warm Near-Black (Anthropic-Adjacent)
- **D-01:** Background tone is **warm near-black** with a slight brown undertone — not pure black, not cool charcoal. Anchor values:
  - `--bg-main: #1A1714` (slide background)
  - `--text-main: #F4ECE0` (warm cream body / heading text)
  - `--accent: #CC785C` (rust accent — Anthropic-adjacent, not Anthropic)
  - `--surface-code: #14110E` (~3% darker than `--bg-main`, used for code-block panel only)
  - Dim/secondary text: `--text-dim: rgba(244, 236, 224, 0.65)` (cream at 65%)
- **D-02:** Single-tone background — the slide canvas is one color (`--bg-main`). No two-tone outer-vs-content panel. The only surface darker than `--bg-main` is the code-block tint (`--surface-code`).
- **D-03:** Accent is used **sparingly and structurally**, not as a heading color. See D-04.

### Accent Placement — Code-Block Frame Only
- **D-04:** Rust accent (`#CC785C`) appears as a **2px left rule on every code block**, and nowhere else on slide chrome by default. Specifically:
  - Headings (h1–h6) render in cream `--text-main`. NOT rust.
  - Links render in cream with an underline (Slidev default link styling preserved or made cream — NOT rust).
  - Slide-number indicator: cream/dim, NOT rust.
  - The rust accent color is exposed as a UnoCSS token (`text-accent`, `border-accent`, etc.) so per-slide opt-in use is possible, but the default theme does NOT apply it to text.
- **Rationale:** ties the accent to the workshop's identity as a code-heavy deck without making the whole deck "feel orange." Closer to Anthropic's restraint.

### Code-Block Surface — Tinted Panel + Rust Left Rule
- **D-05:** Code blocks render as a **tinted panel** with the rust left rule:
  - Panel background: `--surface-code` (`#14110E`, slightly darker than slide bg).
  - Left rule: 2px solid `--accent` (`#CC785C`), full block height.
  - **Sharp corners** — no border-radius. (Architectural, not card-like.)
  - No outer border, no shadow.
  - Internal padding: comfortable but not airy — roughly `0.9rem 1.1rem` (planner refines exact values during implementation).
- **D-06:** Line numbers are **off by default**, but Slidev's per-slide `lineNumbers: true` headmatter / `{lines}` opt-in remains functional. Highlights, diff annotations, and step-throughs are ALL on:
  - Line highlights: `{2,4-6}` after lang.
  - Diff annotations: `// [!code ++]`, `// [!code --]`.
  - Highlight notation: `// [!code highlight]`.
  - Step-through: `{2|4-6|all}`.
- **D-07:** Inline code (single backticks in body text) renders in **JetBrains Mono**, slightly tinted (e.g., `--surface-code` background pill), but does NOT get a left rule. Inline ≠ block.

### Tokens — UnoCSS Shortcuts (THEM-02)
- **D-08:** Define UnoCSS shortcuts in `uno.config.ts` so slides reference semantic names, not hex literals. Minimum required set:
  - `bg-main`, `bg-surface-code` (backgrounds)
  - `text-main`, `text-dim`, `text-accent` (text colors)
  - `border-accent` (used by code-block left rule)
  - Planner may add more if implementation needs them — but every color must come through a shortcut, NOT inline hex.

### Typography — Inter + JetBrains Mono via Slidev `fonts:`
- **D-09:** Heading sans is **Inter, loaded via Slidev `fonts:` headmatter** (Google Fonts at build time). Acceptable: Slidev's default `fonts.local: false` (network fetch). Trade-off (offline reproducibility) is acceptable for Phase 2 — workshop machines have network.
- **D-10:** Code/mono is **JetBrains Mono** via the same `fonts:` headmatter. Both fonts loaded in the weights Slidev needs (regular + bold minimum).
- **D-11:** No system-sans fallback chain customization beyond what Slidev defaults to. Don't fight the framework.

### Shiki Theme — Claude's Discretion (Vitesse Dark recommended)
- **Claude's discretion (D-12):** Pick a single Shiki dark theme that pairs cleanly with `#1A1714` + `#F4ECE0` text and pins ≥4.5:1 contrast on TS, TSX, bash, JSON, MD, YAML samples. **Recommended:** `vitesse-dark` — warm, low-contrast keywords, plays well with cream text. Acceptable alternates if vitesse-dark fails contrast on any required language: `github-dark-default` or `one-dark-pro`. Pin the choice in `slides.md` headmatter (`highlighter: shiki, theme: <name>`).
- **D-13:** Shiki language list is pinned explicitly in headmatter (`shiki.langs: [ts, tsx, bash, json, md, yaml, ...]`) per THEM-04. Add `vue` only if Phase 3+ ends up showing Vue snippets — defer the addition until then.

### Scoping — Presenter Mode Safety (THEM-05)
- **D-14:** ALL custom CSS lives under a `.slidev-layout { ... }` ancestor selector, except for `:root` CSS variable declarations and font `@import`s. This is non-negotiable: presenter chrome (sidebar, thumbnails, controls) MUST NOT pick up these styles.
- **D-15:** Smoke-test every visual change at `/presenter/` in dev — sidebar thumbnails should look like the default Slidev presenter (uncolored, default background), not the styled deck.

### Claude's Discretion
- Exact `--surface-code` value (within ±2 luminance steps of `#14110E`) — pick what reads cleanest in dev/preview.
- Exact font weights to load via `fonts:` (default Slidev set is fine).
- UnoCSS shortcut naming beyond the required minimum (D-08) — keep names short and semantic.
- Inline-code background tint exact opacity / padding — keep it subtle.
- Where to put `style.css` (`./styles/index.css` or `./style.css`) — match Slidev convention.
- Whether to define a tiny `.code-block-frame` UnoCSS shortcut or rely on a CSS rule against the Shiki-generated wrapper element — pick whichever survives Slidev/Shiki updates better.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project anchors
- `CLAUDE.md` — recommended stack, theme guidance, font advice, "What NOT to Use" list. Phase 2 keeps default theme + custom CSS — DO NOT swap to a community theme.
- `.planning/REQUIREMENTS.md` §Theme — THEM-01..06 acceptance criteria.
- `.planning/ROADMAP.md` Phase 2 — goal + success criteria.
- `.planning/phases/01-scaffold-deploy/01-CONTEXT.md` — Phase 1 locked decisions (3-slide placeholder structure, single flat slides.md — Phase 2 must not change content).
- `.planning/phases/01-scaffold-deploy/01-01-SUMMARY.md` and `01-02-SUMMARY.md` — what Phase 1 actually built (package.json contents, slides.md current state, vercel.json, README).

### External specs
- [Slidev customizations — Frontmatter](https://sli.dev/custom/) — `colorSchema`, `fonts`, `highlighter`, `lineNumbers`, `themeConfig` keys.
- [Slidev fonts](https://sli.dev/custom/config-fonts) — `fonts:` headmatter shape and Google-Fonts loading behavior.
- [Slidev theme customization](https://sli.dev/custom/) and [style guide](https://sli.dev/themes/write-a-theme) — `style.css` location, scoping rules.
- [UnoCSS shortcuts](https://unocss.dev/config/shortcuts) — shortcut definition pattern in `uno.config.ts`.
- [Shiki themes](https://shiki.style/themes) — list of prebundled dark themes (vitesse-dark, github-dark-default, one-dark-pro, etc.).
- [Shiki transformers](https://shiki.style/packages/transformers) — `notation-diff`, `notation-highlight` transformers used by Slidev for `[!code ++/--]` annotations.
- WCAG contrast ratio reference for ≥4.5:1 verification (any reputable contrast checker is fine — link not required in plan).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets (from Phase 1)
- `slides.md` — single flat file with the 3-slide placeholder. Phase 2 adds headmatter (`colorSchema`, `fonts`, `highlighter`, `shiki.langs`) here. Slide content does NOT change in Phase 2.
- `package.json` — Slidev `^52.15`, Bun `1.3.5` pinned. Phase 2 may add `unocss` related devDeps if not bundled, and may add `@unocss/preset-icons` only if needed.
- `bun.lock` (text format) — committed. Phase 2 commits the lockfile updates.
- No `uno.config.ts` exists yet — Phase 2 creates it (Slidev 52 ships UnoCSS bundled; only the config file is needed).
- No `style.css` / `styles/` directory exists yet — Phase 2 creates it.

### Established Patterns
- Bun-only (no npm/yarn/npx). All script commands use `bunx slidev`.
- Slidev default theme — keep. Override via tokens, not by swapping themes.
- Single flat `slides.md` with all slide content — Phase 4 will introduce `pages/` / `src:` includes; Phase 2 must NOT preempt that.

### Integration Points
- Vercel deploy (Phase 1) is wired — every commit on connected branches re-deploys. Phase 2's first preview deployment is the natural visual-review gate for THEM-06.
- `bunx slidev build` already exits 0 — Phase 2 must keep this true.
- `bun run preview` (uses `bunx serve dist -s -l 4173`) is the local production smoke test.

</code_context>

<specifics>
## Specific Ideas

- The Phase 1 code-block slide (slide 2, the `@anthropic-ai/claude-agent-sdk` snippet) doubles as the THEM-04 contrast verification target — pick a Shiki theme that reads cleanly on this exact snippet.
- Phase 1's slide /3 (section-layout) is the natural test for D-15 (presenter scoping) — if section-layout styles leak into the sidebar, the verifier sees it immediately.
- Anchor accent value `#CC785C` is taken from CLAUDE.md's "warm rust matches Anthropic's accent without infringing" guidance — do NOT change to a brand-exact Anthropic color.

</specifics>

<deferred>
## Deferred Ideas

- **Copy-to-clipboard button** on code blocks — Phase 3 (Components).
- **Sidebar / nav chrome restyle** — Phase 3.
- **Per-chapter accent variants** (e.g., different rust shades per workshop section) — defer indefinitely; v1 is one-deck-one-accent.
- **Custom domain on Vercel** — Phase 1 deferred; revisit before workshop day if needed.
- **Local font self-hosting** (no Google Fonts network call) — defer to v2 if reproducibility ever becomes an issue.
- **Light-mode toggle** — out of scope; v1 is dark-only.
- **Animations / slide transitions** — defer; v1 uses Slidev defaults.
- **Twoslash inline TS hover info** — defer to per-slide opt-in by instructor; not part of theme phase.
- **Monaco runnable code blocks** — explicitly excluded by CLAUDE.md "What NOT to Use".

</deferred>

---

*Phase: 02-theme-visual-identity*
*Context gathered: 2026-05-09*
