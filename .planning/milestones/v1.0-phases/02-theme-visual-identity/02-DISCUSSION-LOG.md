# Phase 2: Theme & Visual Identity — Discussion Log

**Date:** 2026-05-09
**Mode:** discuss (default)

## Areas Selected by User

- Palette & accent tone
- Code block surface treatment

**Skipped (Claude's discretion):** Shiki code theme, Heading font source.

---

## Area 1 — Palette & Accent Tone

### Q1: Background tone
**Options presented:**
1. Warm near-black (Anthropic-feel) — `#1A1714` bg, `#F4ECE0` cream text, `#CC785C` rust accent
2. Neutral charcoal — `#161616` bg, `#ECECEC` cool white text
3. Pure black — `#000` / `#0A0A0A`, max projector contrast
4. Two-tone (panel-on-bg) — outer bg darker than slide content surface

**User chose:** Warm near-black (Anthropic-feel)
**Captured as:** D-01, D-02

### Q2: Where should the rust accent appear?
**Options presented:**
1. Sparing — links + inline code only
2. Headings + links
3. Single hairline rule + dot
4. Accent on code-block frame

**User chose:** Accent on code-block frame
**Captured as:** D-03, D-04 (rust appears as 2px left rule on code blocks; headings/links/slide-number stay cream)

---

## Area 2 — Code Block Surface Treatment

### Q3: Code-block surface (given accent goes on the frame)
**Options presented:**
1. Tinted panel + rust left rule (no rounded)
2. Flush, no panel, rust left rule only
3. Tinted panel + rust left rule + rounded corners

**User chose:** Tinted panel + rust left rule (no rounded)
**Captured as:** D-05 (panel `#14110E`, 2px rust left rule, sharp corners, no shadow, no outer border)

### Q4: Line numbers and Shiki annotations
**Options presented:**
1. Line numbers off by default; highlights on (Recommended)
2. Line numbers on globally
3. Line numbers on, but only via per-slide opt-in

**User chose:** Line numbers off by default; highlights on
**Captured as:** D-06 (line highlights, diff annotations, step-throughs all enabled; per-slide `lineNumbers: true` override remains functional)

---

## Claude's Discretion (not asked)

- D-09..D-11 — Inter + JetBrains Mono via Slidev `fonts:` headmatter (Google Fonts at build time). System-sans fallback as Slidev default.
- D-12 — Shiki theme: recommend `vitesse-dark`; alternates `github-dark-default`, `one-dark-pro` if contrast fails.
- D-13 — Pinned Shiki language list: `ts, tsx, bash, json, md, yaml`. `vue` only added when Phase 3+ needs it.
- D-08 — UnoCSS shortcut minimum set: `bg-main`, `bg-surface-code`, `text-main`, `text-dim`, `text-accent`, `border-accent`. Planner may extend.
- D-14, D-15 — All custom CSS scoped under `.slidev-layout`; `/presenter/` smoke test required.
- D-07 — Inline code uses JetBrains Mono with subtle background tint, NO left rule (inline ≠ block).

## Deferred Ideas (Captured for Future Phases)

None raised during this session — see `<deferred>` block in CONTEXT.md for the full list (carried forward from CLAUDE.md and ROADMAP.md).

---

*Phase: 02-theme-visual-identity*
