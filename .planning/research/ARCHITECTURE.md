# Architecture Research

**Domain:** Slidev workshop deck (markdown-driven Vue SPA) deployed on Vercel
**Researched:** 2026-05-08
**Confidence:** HIGH (sourced from official Slidev docs via Context7)

## Standard Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                      Authoring Layer (Markdown)                  │
│  ┌──────────────┐    ┌──────────────────┐    ┌──────────────┐   │
│  │  slides.md   │───▶│  pages/*.md      │───▶│  notes/*.md  │   │
│  │  (entry)     │ src:│ (per-section)   │    │  (speaker)   │   │
│  └──────┬───────┘    └────────┬─────────┘    └──────────────┘   │
│         │ frontmatter (theme, fonts, addons)                     │
├─────────┼────────────────────────────────────────────────────────┤
│         ▼            Presentation Layer (Vue/Slidev)             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │ layouts/     │  │ components/  │  │ global-top.vue       │   │
│  │  *.vue       │  │  CopyButton  │  │ global-bottom.vue    │   │
│  │  (slide      │  │  Sidebar     │  │ (persistent overlays)│   │
│  │   shells)    │  │  (auto-reg)  │  └──────────────────────┘   │
│  └──────────────┘  └──────────────┘                              │
├──────────────────────────────────────────────────────────────────┤
│                       Theme/Styling Layer                        │
│  ┌────────────────┐  ┌──────────────┐  ┌────────────────────┐   │
│  │ styles/        │  │ uno.config.ts│  │ setup/main.ts      │   │
│  │ index.ts       │  │ (UnoCSS:     │  │ (Vue app hooks)    │   │
│  │ (CSS entry)    │  │  shortcuts,  │  │                    │   │
│  │                │  │  dark theme) │  │                    │   │
│  └────────────────┘  └──────────────┘  └────────────────────┘   │
├──────────────────────────────────────────────────────────────────┤
│                  Static Assets (public/) + Build                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  bunx slidev build  →  dist/  (SPA, hashed assets)       │   │
│  │  vercel.json rewrites /(.*) → /index.html                │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| `slides.md` | Single entry point; deck-wide frontmatter (theme, fonts, addons, title); ordered `src:` includes | Markdown with YAML frontmatter; each `---` separates a slide |
| `pages/*.md` | Per-section content authored independently | Plain markdown imported via `src: ./pages/intro.md` from `slides.md` |
| `components/*.vue` | Custom UI primitives (e.g., `CopyButton.vue`, `Sidebar.vue`); auto-registered via `unplugin-vue-components` — no imports needed in markdown | Vue 3 SFC; usable directly in markdown by tag name |
| `layouts/*.vue` | Slide shells (cover, two-column, code-focus); selected per-slide via `layout:` frontmatter | Vue SFC with `<slot/>` for slide body |
| `global-top.vue` / `global-bottom.vue` | Persistent overlays across all slides (e.g., progress bar, footer, sidebar trigger) | Single Vue SFC at project root; rendered above/below every slide |
| `styles/index.ts` + `styles/*.css` | Global CSS, font @imports, layout overrides, dark-mode tokens | TS file importing CSS partials; picked up automatically |
| `uno.config.ts` | UnoCSS shortcuts, theme tokens, dark-mode background/text | Extends Slidev's default UnoCSS preset |
| `setup/main.ts` | Vue app hooks (e.g., register clipboard plugin, mount listeners) | Slidev setup function — runs once during app init |
| `public/` | Static assets served from root path (logos, fonts, OG images) | Passthrough — file paths stay stable in dev and build |
| `vercel.json` | SPA rewrite so deep-link slide URLs (e.g., `/15`) resolve to `index.html` | Single `rewrites` rule |

## Recommended Project Structure

```
syai-claude-workshop/
├── slides.md                    # Entry deck; deck frontmatter + src includes
├── pages/                       # Multi-file deck split (created from day 1)
│   ├── 00-intro.md              # Each file = one section, owned by instructor
│   ├── 10-subagents.md
│   ├── 20-hooks.md
│   ├── 30-mcp.md
│   ├── 40-slash-commands.md
│   ├── 50-skills.md
│   ├── 60-plugins.md
│   ├── 70-agent-sdk.md
│   └── 99-outro.md
├── components/                  # Auto-registered Vue components
│   ├── CopyButton.vue           # Wraps <pre> blocks; navigator.clipboard
│   ├── Sidebar.vue              # Section nav / progress indicator
│   ├── SectionHeader.vue        # Reusable section title block
│   └── Callout.vue              # Note/warning/tip blocks for instructor
├── layouts/                     # Custom slide shells (override theme defaults)
│   ├── cover.vue                # Title slide
│   ├── section.vue              # Chapter divider
│   └── code.vue                 # Code-heavy slide layout
├── global-top.vue               # Persistent top overlay (e.g., progress bar)
├── global-bottom.vue            # Persistent bottom overlay (e.g., footer brand)
├── styles/
│   ├── index.ts                 # Imports all CSS partials
│   ├── layout.css               # .slidev-layout overrides
│   ├── code.css                 # Shiki/code-block tweaks
│   └── fonts.css                # @import / @font-face for monospace
├── setup/
│   └── main.ts                  # Vue app setup hooks (optional)
├── public/                      # Static, served at root
│   ├── favicon.svg
│   └── og-image.png
├── snippets/                    # Optional: external code files included via <<< @/snippets/foo.ts
│   └── example.ts
├── uno.config.ts                # UnoCSS theme tokens (dark, monospace, brand colors)
├── vercel.json                  # SPA rewrite rule
├── package.json                 # Bun-managed; scripts: dev/build/export
├── bun.lockb
├── .gitignore                   # ignore dist/, node_modules/, .slidev/
└── README.md                    # Authoring + deploy instructions for instructor
```

### Structure Rationale

- **`pages/` from day 1:** A single monolithic `slides.md` becomes painful past ~30 slides. Splitting via `src:` keeps each section independently editable, reduces merge conflicts, and lets the instructor author one file at a time. Slidev officially supports this pattern (`src: ./subpage.md`).
- **`components/` is flat and auto-registered:** Slidev uses `unplugin-vue-components`, so any `.vue` file in `components/` is usable in markdown by tag name (`<CopyButton :code="..." />`) without imports. No barrel files, no manual registration.
- **`layouts/` separate from `components/`:** Layouts are slide *shells* selected via frontmatter (`layout: cover`); components are *content primitives* used inside slides. Keeping them in different folders matches Slidev convention and prevents accidental layout/component confusion.
- **`global-top.vue` / `global-bottom.vue` at project root (not nested):** Slidev resolves these by exact filename at the project root — they cannot live inside `components/`. They render above/below every slide, ideal for the persistent sidebar/progress indicator requirement.
- **`styles/index.ts` not `styles/index.css`:** Slidev expects a TS entry that re-exports/imports CSS so it can be processed by Vite. Direct CSS imports are fine inside it.
- **`uno.config.ts` at root:** Slidev auto-detects this. Use it (not raw CSS) to define dark-theme shortcuts like `bg-main`, brand colors, and monospace font family — keeps tokens consistent across components and layouts.
- **`public/` for served-as-is assets only:** Anything imported from a Vue SFC (logos referenced via `import logo from './logo.svg'`) belongs alongside the component, not in `public/`. `public/` is for files that must keep a stable URL (favicon, OG image, downloads).
- **`vercel.json` at root:** Required for SPA routing — Slidev's deep links (e.g., `/15` for slide 15, `/15/2` for click-step) are client-routed, so without the rewrite Vercel returns 404 on hard refresh.

## Build Order Dependencies (Greenfield Sequence)

This is the critical ordering for a greenfield workshop deck. Reversing steps causes rework.

```
1. Scaffold        → 2. Deploy pipeline → 3. Theme tokens → 4. Layouts →
5. Components      → 6. Content slots   → 7. Polish        → 8. Handoff
```

| Step | What | Why this order | Blocks |
|------|------|----------------|--------|
| 1. Scaffold | `bunx create-slidev` (or manual `package.json` + `slides.md`); pin Slidev version; `bunx slidev` runs | Establishes a known-good baseline before any customization. | Everything |
| 2. Vercel pipeline + `vercel.json` | Wire repo to Vercel, push a trivial commit, verify preview URL works | Catches deploy issues while the project is small (rewrites, base path, build command). Cheap to debug at this stage; expensive after content lands. | All later visual work going to production |
| 3. Theme tokens (uno.config + styles + fonts) | Define dark background, monospace stack, brand colors as UnoCSS shortcuts and CSS vars | Tokens must exist *before* layouts and components reference them — otherwise you redo styling later. | Layouts, components |
| 4. Layouts | Build `cover.vue`, `section.vue`, `code.vue` consuming the theme tokens | Components live *inside* layouts; layouts must be stable first. | Components, content |
| 5. Custom components | `CopyButton`, `Sidebar`, `Callout`, `SectionHeader` — built against existing layouts/tokens | Can only be designed once layouts exist (otherwise spacing/alignment assumptions break). `Sidebar` placed in `global-top.vue` or `global-bottom.vue`. | Content authoring |
| 6. Content slots | Create empty `pages/*.md` files with section titles + `src:` wired in `slides.md` | Gives instructor a clear authoring contract: "fill these files." | Handoff |
| 7. Polish | Speaker notes defaults, PDF export check, `--base` path verification, OG image, favicon | Final pass once shape is locked. | — |
| 8. Handoff | README with `bun install`, `bunx slidev`, authoring conventions, component usage examples | Instructor takes over content. | — |

**Hard dependency:** Theme tokens (3) → Layouts (4) → Components (5). Skipping ahead to components before tokens exist means refactoring every component when the theme stabilizes.

**Soft dependency:** Deploy pipeline (2) can happen alongside step 1, but must be verified before step 3 to avoid late-stage hosting surprises.

## Architectural Patterns

### Pattern 1: Multi-file deck via `src:` includes

**What:** Keep `slides.md` as a thin orchestrator (frontmatter + ordered `src:` references); author actual content in `pages/*.md`.

**When to use:** Any deck > ~20 slides, especially when multiple authors or long-lived content.

**Trade-offs:**
- (+) Independent section editing, lower merge conflict risk, clearer git diffs.
- (+) Section reordering is one-line edit in `slides.md`.
- (−) Frontmatter scoping rules can confuse first-timers (deck-level vs slide-level vs file-level).

**Example (`slides.md`):**

```markdown
---
theme: default
title: Advanced Claude Code Workshop
fonts:
  mono: 'JetBrains Mono'
colorSchema: dark
addons: []
---

# Advanced Claude Code

Half-day workshop · syai

---
src: ./pages/00-intro.md
---

---
src: ./pages/10-subagents.md
---
```

### Pattern 2: Auto-registered components used directly in markdown

**What:** Drop `.vue` files in `components/`; use them in markdown by tag name, no imports.

**When to use:** Any reusable UI primitive (copy buttons, callouts, diagrams).

**Trade-offs:**
- (+) Zero ceremony for instructor authoring content later.
- (−) Naming collisions are silent — pick distinct PascalCase names.

**Example (`components/CopyButton.vue`):**

```vue
<script setup lang="ts">
const props = defineProps<{ code: string }>()
const copy = () => navigator.clipboard.writeText(props.code)
</script>
<template>
  <button class="copy-btn" @click="copy">copy</button>
</template>
```

Used in markdown:

````markdown
```ts
const x = 1
```
<CopyButton code="const x = 1" />
````

### Pattern 3: Persistent UI via `global-top.vue` / `global-bottom.vue`

**What:** Slidev renders these two files (if present at project root) on top of/below *every* slide. Use for sidebar, progress indicator, brand watermark.

**When to use:** Any UI that must persist across slides without per-slide markup.

**Trade-offs:**
- (+) Single source of truth; instructor authoring stays clean.
- (−) Cannot vary per slide without conditional logic on `$slidev.nav.currentPage`.

**Example (`global-bottom.vue`):**

```vue
<script setup lang="ts">
import { useNav } from '@slidev/client'
const { currentPage, total } = useNav()
</script>
<template>
  <div class="absolute bottom-2 right-3 text-xs opacity-60">
    {{ currentPage }} / {{ total }}
  </div>
</template>
```

### Pattern 4: UnoCSS-driven theming over hand-rolled CSS

**What:** Define theme tokens (background, text, brand) as UnoCSS shortcuts in `uno.config.ts`. Reference them everywhere via `--uno: bg-main` or class names.

**When to use:** Default for any custom visual identity in Slidev — Slidev ships with UnoCSS already wired in.

**Trade-offs:**
- (+) Tokens live in one file; dark/light variants handled via `dark:` variant.
- (−) Requires learning UnoCSS shortcut syntax (close to Tailwind).

**Example (`uno.config.ts`):**

```ts
import { defineConfig } from 'unocss'
export default defineConfig({
  shortcuts: {
    'bg-main': 'bg-[#0d0d0d] text-[#e5e5e5]',
    'text-accent': 'text-[#cc785c]', // claude-adjacent terracotta
  },
  theme: {
    fontFamily: { mono: '"JetBrains Mono", "Fira Code", ui-monospace, monospace' },
  },
})
```

## Build & Deploy Flow

### Local development

```bash
bun install
bunx slidev               # dev server, HMR, opens http://localhost:3030
bunx slidev --open        # auto-open browser
bunx slidev export        # PDF export (built-in, requires playwright)
```

### Production build

```bash
bunx slidev build         # → dist/ (SPA, default)
bunx slidev build --base /                # explicit root base path
bunx slidev build --download              # bundle PDF download into SPA
```

- Default output: `dist/`
- Default base: `/` (Vercel apex/subdomain — no override needed)
- Base override only if hosted under a sub-route (e.g., `/talks/x/`).

### Vercel configuration

**`vercel.json`** (mandatory for SPA deep links):

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Vercel project settings:**

| Setting | Value |
|---------|-------|
| Framework Preset | Other (Vercel does not have a Slidev preset) |
| Build Command | `bunx slidev build` |
| Output Directory | `dist` |
| Install Command | `bun install` |
| Node/Runtime | Bun is supported by Vercel as a build runtime; if Bun build runtime is unavailable, fall back to `npm install -g @slidev/cli && slidev build` with Node 20+ |

**Preview deploys:** Default Vercel behavior — every PR + every non-main branch pushes a unique preview URL. No extra config.

**Production deploys:** Pushes to `main` deploy to the production domain. Combined with Vercel's atomic deploys, rollback is one click.

## Data Flow

### Slide-render flow

```
slides.md (frontmatter + src: chain)
    ↓ Slidev parser (markdown-it + custom)
Slide AST (per-slide frontmatter, body, layout name)
    ↓ Vite + Vue
Layout component wraps slide body
    ↓
global-top.vue + slide + global-bottom.vue composed
    ↓
Auto-registered components resolved at compile time
    ↓
UnoCSS scans templates, generates atomic CSS
    ↓
Browser SPA — client-side routing for slide nav
```

### Authoring flow (instructor handoff)

```
Instructor edits pages/NN-section.md
    ↓ HMR via bunx slidev
Browser updates instantly
    ↓ git push
Vercel preview deploy (unique URL per branch)
    ↓ PR merge to main
Vercel production deploy
```

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 1 deck, < 100 slides (this project) | No changes; default architecture handles it. |
| 1 deck, 100–300 slides | Lazy-load heavy components; split `pages/` into nested folders by chapter; consider `--no-notes` for production build to shrink bundle. |
| Multiple decks (out of scope for v1) | Promote `components/` and `theme/` into a shared Slidev addon (`addons: ['./shared']`) consumed by per-deck repos. |

### Scaling priorities (most likely first failures)

1. **Bundle size from inlined assets:** Large images embedded in markdown bloat `dist/`. Move to `public/` and reference by URL.
2. **Cold start of Vercel preview on big PRs:** Build time grows with slide count. Mitigate via Vercel's build cache (automatic for Bun installs) and by avoiding heavy Mermaid/Monaco imports in many slides.
3. **PDF export timeout:** `slidev export` uses Playwright; long decks need `--timeout 60000`. Not a runtime concern.

## Anti-Patterns

### Anti-Pattern 1: Single monolithic `slides.md`

**What people do:** Put 200+ slides into one markdown file.
**Why it's wrong:** Merge conflicts, slow editor, hard to reorder, instructor has to scroll through all content to edit one section.
**Do this instead:** Use `src:` includes from day 1 even if the file count is small. Cost is near-zero; benefit compounds.

### Anti-Pattern 2: Importing components manually inside markdown

**What people do:** Add `<script setup>` blocks at the top of `slides.md` to `import` components.
**Why it's wrong:** Defeats Slidev's `unplugin-vue-components` auto-registration; adds noise the instructor will copy-paste incorrectly.
**Do this instead:** Place components in `components/`, use them by tag name, no imports.

### Anti-Pattern 3: Hand-rolled CSS theme without UnoCSS tokens

**What people do:** Write `styles/theme.css` with hardcoded hex values scattered across selectors.
**Why it's wrong:** Color/font changes require grep-and-replace; dark mode variants get out of sync; UnoCSS shortcuts are already available.
**Do this instead:** Define tokens once in `uno.config.ts` shortcuts; reference everywhere via shortcut names.

### Anti-Pattern 4: Skipping `vercel.json` rewrite

**What people do:** Deploy to Vercel without the SPA rewrite rule.
**Why it's wrong:** Direct loads of `/15` (slide 15) and hard refreshes return 404. Sidebar deep links are broken. Participants returning to a specific slide URL hit error pages — directly contradicts the workshop's "takeaway reference" core value.
**Do this instead:** Commit `vercel.json` with the rewrite during scaffold (step 2 of build order), not later.

### Anti-Pattern 5: Storing imported assets in `public/`

**What people do:** Put every image in `public/` and reference by absolute URL.
**Why it's wrong:** Loses Vite's hashing/optimization; hard to colocate with components; breaks if base path changes.
**Do this instead:** Only put files in `public/` that need stable URLs (favicon, OG image). Everything else lives next to the component or under `assets/`.

### Anti-Pattern 6: Using a custom theme package before tokens are stable

**What people do:** Fork a Slidev theme package and edit it directly.
**Why it's wrong:** Theme packages are a publishing concern; for a single deck, the project root *is* the theme. Forking adds versioning/publishing overhead with no payoff.
**Do this instead:** For one deck, customize via `layouts/`, `styles/`, `uno.config.ts`, `global-*.vue`. Only extract a theme package if the project becomes multi-deck (out of scope for v1).

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Vercel | Git-based deploy; `vercel.json` for rewrites; build command `bunx slidev build`, output `dist` | Free tier sufficient for workshop traffic. Preview deploys per PR are automatic. |
| Google Fonts | Auto-imported via `fonts:` frontmatter (`fonts: { mono: 'JetBrains Mono' }`) | No manual `<link>` tag needed. Disable via `fonts: { provider: 'none' }` if self-hosting. |
| Shiki (code highlighting) | Bundled with Slidev; configured via `highlighter: shiki` frontmatter (default) | Theme via `themes:` frontmatter — pick dark theme matching Claude/Anthropic identity (e.g., `vitesse-dark`). |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| markdown ↔ Vue components | Compile-time auto-registration via `unplugin-vue-components` | Tag-name-based; PascalCase for components, kebab-case in markdown both work. |
| layouts ↔ slide content | `<slot/>` in layout SFC; `layout: name` in slide frontmatter | One layout per slide; `default` layout used if unspecified. |
| theme tokens ↔ components | UnoCSS shortcuts referenced as classes | Single source of truth in `uno.config.ts`. |
| dev ↔ prod | Same SPA build; `--base` differs only for sub-route hosting | No env-specific code branches needed. |

## Sources

- Slidev official guide — Components: https://sli.dev/guide/component (HIGH)
- Slidev official guide — Layouts: https://sli.dev/guide/write-layout (HIGH)
- Slidev official guide — Hosting (Vercel, base path): https://sli.dev/guide/hosting (HIGH)
- Slidev built-in CLI reference: https://sli.dev/builtin/cli (HIGH)
- Slidev directory structure: https://sli.dev/custom/directory-structure (HIGH)
- Slidev UnoCSS config: https://sli.dev/custom/config-unocss (HIGH)
- Slidev font config: https://sli.dev/custom/config-fonts (HIGH)
- Slidev global layers (`global-top.vue` / `global-bottom.vue`): https://sli.dev/features/global-layers.html (HIGH)
- Slidev multi-file decks via `src:`: https://sli.dev/demo/starter/12 (HIGH)

All architecture claims verified via Context7 against official Slidev documentation.

---
*Architecture research for: Slidev workshop deck on Vercel*
*Researched: 2026-05-08*
