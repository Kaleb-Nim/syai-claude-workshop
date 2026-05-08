# Pitfalls Research

**Domain:** Slidev-based workshop deck on Vercel using Bun (live + async, code-heavy)
**Researched:** 2026-05-08
**Confidence:** MEDIUM-HIGH (Slidev/Vercel docs HIGH; Bun-specific edge cases MEDIUM; workshop UX HIGH from accessibility consensus)

---

## Critical Pitfalls

### Pitfall 1: Missing SPA fallback in `vercel.json` causes 404s on direct slide URLs

**What goes wrong:**
A participant lands directly on a deep slide URL (e.g. `/14`, or `/2/intro`) — either from a shared link, a refresh, or returning to a bookmarked slide — and Vercel returns a 404. The deck appears broken to anyone who didn't enter through the root URL.

**Why it happens:**
Slidev builds a Vite SPA. Vercel resolves URL paths against the filesystem first; `/14` does not exist as a static file, so Vercel returns 404 instead of serving `index.html` and letting Slidev's client-side router handle it. This breaks the core "return to the same URL afterward" value prop.

**How to avoid:**
Commit a `vercel.json` at repo root containing:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```
This is the documented Slidev recommendation in the official hosting guide.

**Warning signs:**
- Direct visits to `https://<deck>.vercel.app/5` 404 in preview deploys
- Refreshing on any slide other than slide 1 returns 404
- Sharing a link to a specific slide doesn't open that slide

**Phase to address:** Deploy/CI phase (very first deploy) — verify by visiting a non-root slide URL on the preview deployment.

---

### Pitfall 2: Forgetting `--base` (or setting it wrong) breaks asset paths

**What goes wrong:**
Slides load but images, fonts, and chunked JS 404. Or, if deployed under a subpath project, the whole deck is blank.

**Why it happens:**
Slidev's `--base` flag (passed through to Vite) **must begin and end with a slash** (e.g. `/workshop/`). Common mistakes: omitting the trailing slash, omitting the leading slash, or using `./`. For a Vercel project deployed at the root domain, `--base` should be left at the default `/`. People who copy-pasted a `--base /workshop` from another project break their root deploy.

**How to avoid:**
- Default Vercel deploys at root: do **not** pass `--base`. Build command is just `slidev build`.
- Sub-route deploy: use `slidev build --base /sub-path/` (both slashes required).
- Reference assets in markdown via `./assets/foo.png` or `/foo.png` from `public/` consistently — do not hardcode `https://...` to your own deploy URL.

**Warning signs:**
- DevTools network tab shows 404s on `/assets/*.js` chunks
- Blank page on production but works locally
- `index.html` references like `/workshop/assets/...` when deployed at root

**Phase to address:** Deploy/CI phase — set Vercel build command explicitly and document base-path policy in README.

---

### Pitfall 3: `public/` static assets break when entry markdown is in a subdirectory

**What goes wrong:**
Images referenced via `<img src="/images/foo.png">` show as broken in the dev server or fail Vite import resolution at build, even though `public/images/foo.png` exists.

**Why it happens:**
[Slidev issue #2161](https://github.com/slidevjs/slidev/issues/2161): when the entry markdown is nested (e.g. `slides/intro.md` rather than top-level `slides.md`), Slidev's resolution of `public/` paths can fail. The instructor's content directory layout will determine whether this hits.

**How to avoid:**
- Keep the entry file as top-level `slides.md`. Use `src:` includes in frontmatter to import nested chapter files rather than starting from a nested entry.
- Place images in top-level `public/` and reference them as `/images/foo.png` — confirm they resolve in both `bun run dev` and `bun run build && bun run preview`.

**Warning signs:**
- Images render in dev but Vite errors `Failed to resolve import` at build time
- Build succeeds but `dist/` is missing referenced assets

**Phase to address:** Scaffold phase — fix the content directory layout convention before instructor adds slides.

---

### Pitfall 4: Build path with whitespace silently breaks SPA build

**What goes wrong:**
`bun run build` fails or produces a broken `dist/` when the project path contains a space (e.g. `~/My Projects/syai-claude-workshop`). Vercel cloned paths don't have spaces, but a contributor cloning into `~/Documents/GitHub/...` is fine — this bites local-only.

**Why it happens:**
[Slidev issue #2197](https://github.com/slidevjs/slidev/issues/2197) — Slidev's SPA build does not handle whitespace in paths correctly.

**How to avoid:**
- Document in README: clone into a path without spaces.
- CI is unaffected (Vercel paths are space-free), so this is a contributor-onboarding warning, not a deploy blocker.

**Warning signs:**
- "Works on Vercel, broken on my machine" reports
- Build error referencing truncated paths

**Phase to address:** Scaffold phase — README setup section.

---

### Pitfall 5: Custom CSS leaks into presenter mode and breaks presenter UI

**What goes wrong:**
The instructor opens presenter mode mid-workshop and the slide preview pane is blank, or the header logo is enormous, or the layout is broken. Normal/play mode works fine, so this only manifests in front of a live audience.

**Why it happens:**
[Slidev issue #2446](https://github.com/slidevjs/slidev/issues/2446): broad CSS selectors in `styles/index.css` (e.g. `.grid { ... }`, `img { ... }`, unscoped utility overrides) bleed into Slidev's internal presenter chrome because presenter mode renders the slide thumbnails inside the same DOM and the global selectors match Slidev's own UI elements.

**How to avoid:**
- Scope all custom CSS under `.slidev-layout` (e.g. `.slidev-layout .grid { ... }`).
- Avoid styling bare element selectors (`img`, `pre`, `code`, `h1`) globally — scope or use UnoCSS utilities on the slide instead.
- Test presenter mode (press `O` for overview, navigate to `/presenter/`) at the end of every styling change, not just play mode.

**Warning signs:**
- Presenter mode shows blank preview thumbnails
- Header/sidebar elements in presenter UI look "too big" or misaligned
- CSS works in `bun run dev` slide view but breaks in overview mode

**Phase to address:** Theming phase — add a presenter-mode smoke check to the dev workflow, document scoping rule in `styles/README.md`.

---

### Pitfall 6: Bun + Slidev type/config recognition issue

**What goes wrong:**
`bunx slidev` runs but the `slidev` config block in `vite.config.ts` is silently ignored, or slides fail to render with a config-related error. Specific to certain Bun versions interacting with Slidev's Vite plugin.

**Why it happens:**
[Slidev issue #2043](https://github.com/slidevjs/slidev/issues/2043): on Bun (v1.2.2 was the reported version), the `slidev` configuration option in `vite.config.ts` is not recognized unless `@slidev/types` is explicitly referenced via a triple-slash directive. Bun's TypeScript handling differs from Node's tsx/ts-node in module resolution edge cases.

**How to avoid:**
- If a `vite.config.ts` is needed at all, add `/// <reference types="@slidev/types" />` at the top.
- For v1, **prefer not creating a custom `vite.config.ts`** — use Slidev's default and configure via `slides.md` headmatter or `setup/` files. This sidesteps the issue entirely.
- Pin Bun version in `package.json` (`"packageManager": "bun@<version>"`) and document the tested version.

**Warning signs:**
- `bun run dev` starts but slides show a default theme instead of configured one
- `vite.config.ts` Slidev settings appear ignored
- Works under `npx slidev` but not `bunx slidev`

**Phase to address:** Scaffold phase — avoid custom `vite.config.ts` for v1; document if introduced later.

---

### Pitfall 7: Addons that work in dev but fail in `dist/`

**What goes wrong:**
An addon (custom slide component, layout, or visualization library) renders perfectly in `bun run dev` but is missing or broken in the production build deployed to Vercel.

**Why it happens:**
[Slidev issue #2072](https://github.com/slidevjs/slidev/issues/2072): some addons rely on dynamic imports or runtime resolution paths that work under Vite dev server but aren't picked up by the SPA build's static analysis. Addon authors don't always test the `build` path.

**How to avoid:**
- For every addon added, run `bun run build && bun run preview` locally before pushing. Do not trust dev-only verification.
- Prefer first-party Slidev built-in components and layouts over third-party addons for v1.
- If a third-party addon is essential, pin its version and verify it has been tested against current Slidev (check its repo's last-updated date).

**Warning signs:**
- Component renders in dev, missing/blank in Vercel preview
- Console errors about undefined components only on production

**Phase to address:** Scaffold + every PR that adds an addon — `bun run preview` must be a CI step or local pre-push check.

---

### Pitfall 8: Code blocks too small / too wide for projector

**What goes wrong:**
During the live workshop, participants in the back row cannot read code samples. Lines wrap or get cut off horizontally. This is the single most common workshop failure mode for code-heavy decks.

**Why it happens:**
- Slidev's default code block font is sized for laptop-screen reading, not a projector at 4–8m viewing distance.
- Long code lines (>60 characters) overflow the slide horizontally; Slidev does not auto-shrink to fit by default.
- Authors paste real code (often 80+ char lines, deeply nested) without trimming for slide context.
- Dark theme + low-contrast syntax theme (e.g. `vitesse-dark` defaults) may fall below WCAG 4.5:1 on a washed-out projector.

**How to avoid:**
- Set a global code block minimum: target 24pt-equivalent on render. In Slidev, use `<style>` scoped under `.slidev-layout` to set `.slidev-code { font-size: 1.1em; line-height: 1.5; }` or higher.
- Enforce a hard line-length limit for code samples: **60 characters** (some sources say 64). Document this in the authoring guide.
- For longer real code, use `{lines: '3-12'}` line-range syntax to focus attention, or break into `magic-move` steps.
- Verify on an actual projector or simulate by viewing the deck at 50% browser zoom from across the room before the workshop.
- Pick a Shiki theme with verified contrast on the chosen background (test with a contrast checker — aim ≥4.5:1 for text, 3:1 for syntax accents).

**Warning signs:**
- Code blocks have horizontal scrollbars in `bun run dev`
- Lines visibly wrap mid-statement on 1280px-wide viewport
- Reviewing at 50% zoom, code is unreadable

**Phase to address:** Theming phase — set base code-block sizing; Authoring-conventions phase — document 60-char rule in `CONTENT_GUIDE.md`.

---

### Pitfall 9: Magic-move and many-step transitions kill build/runtime performance

**What goes wrong:**
The deck builds slowly (minutes), or live presentation feels janky on slide transitions, or the bundle size on Vercel exceeds reasonable load times for participants on workshop wifi.

**Why it happens:**
- Each `magic-move` block runs Shiki tokenization for every step at build time. A deck with dozens of magic-move blocks compounds.
- Shiki ships per-language grammars — loading many languages (TS, Python, Bash, JSON, YAML, Vue, Rust, etc.) inflates the bundle.
- Many slides with embedded Vue components and Mermaid diagrams add to chunk count.

**How to avoid:**
- Limit `magic-move` to the 5–10 highest-impact "code evolution" moments — not every code reveal needs animation. Use static code blocks with line highlighting (`{|3|5-7|all}`) for ordinary reveals.
- Configure Shiki with only the languages actually used. In `setup/shiki.ts`, list explicit languages instead of "all".
- Avoid nesting Mermaid + heavy Vue components on the same slide.
- Watch `bun run build` time: under 60s is healthy for a half-day deck.

**Warning signs:**
- Build time grows past 90s as content is added
- Slide transitions stutter on mid-range hardware (presenter laptop)
- Vercel build log shows large chunk warnings (>500kB)
- Total bundle exceeds ~5MB

**Phase to address:** Authoring-conventions phase — document magic-move budget; Theming/Shiki-config phase — restrict language list.

---

### Pitfall 10: Theme override locks instructor out of plain markdown authoring

**What goes wrong:**
The scaffold ships with a heavily customized theme (custom layouts, required frontmatter fields, mandatory components). The instructor — who is supposed to add content as plain markdown — has to learn the custom DSL before they can add a single slide.

**Why it happens:**
Over-eager scaffolding. The "Claude/Anthropic-aligned visual identity" requirement is interpreted as building bespoke layouts when global tokens (font, colors, code theme) would suffice.

**How to avoid:**
- Pick a base theme (`@slidev/theme-default` or `@slidev/theme-seriph`) and override **only**: color tokens, fonts, code theme, and a global layout `<style>`.
- Do not invent custom layouts unless the instructor explicitly requests one. Default Slidev layouts (`default`, `cover`, `two-cols`, `center`, `image-right`) cover 90%+ of cases.
- Authoring guide should fit on one page: how to add a slide, how to add a code block, how to use the 5 stock layouts.

**Warning signs:**
- README authoring guide is more than ~150 lines
- Default Slidev layouts don't render correctly without custom frontmatter
- Instructor asks "how do I make a normal slide?"

**Phase to address:** Theming phase — explicit decision to customize tokens only, not layouts.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Skip `vercel.json` SPA rewrite | One less file | Direct slide URLs 404; breaks "takeaway" promise | Never |
| Hardcode `--base /something/` | Works for one sub-path deploy | Breaks root deploys, future-proofing | Only if deploying under a fixed sub-path permanently |
| Custom `vite.config.ts` for one tweak | Familiar Vite escape hatch | Bun + Slidev type-resolution friction (#2043) | Only after exhausting `slides.md` headmatter + `setup/` files |
| Inline `<style>` per slide for sizing | Quick visual fix | Inconsistent typography across deck | Prototyping only — promote to global on commit |
| Skip `bun run preview` before pushing | Faster local loop | Addon-in-dist breakage caught only on Vercel | Never for any change touching addons/components |
| Use `magic-move` for all code reveals | Looks impressive | Build time + bundle bloat; presenter jank | When the *evolution* is the point — not for static reveals |
| Reference assets via absolute deploy URL | Works without thinking about base path | Breaks preview deploys, breaks local dev | Never |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Vercel + Bun | Letting Vercel auto-detect with no lockfile committed | Commit `bun.lock` (or `bun.lockb`); set `"packageManager": "bun@x.y.z"` in `package.json`; Vercel detects from lockfile root |
| Vercel + Slidev | Leaving framework preset as "Other" | Set framework to "Vite" so Vercel applies correct caching for `node_modules/.vite` |
| Vercel build cache | Cache stale after Slidev/Shiki upgrade | Bump dependency, then "Redeploy without cache" once |
| Vercel preview deploys | Not testing PR previews before merge | Every content PR must verify the preview URL — that's the whole point of preview deploys for content iteration |
| Vercel + monorepo | Putting deck in a subdirectory without setting Root Directory | Either keep deck at repo root (recommended for v1) or explicitly set Root Directory in Vercel project settings |
| Slidev `public/` | Mixing relative (`./foo.png`) and absolute (`/foo.png`) paths | Pick one convention. `/foo.png` (root-relative from `public/`) is more robust and matches how `--base` is applied |
| Shiki languages | Importing entire Shiki bundle | Configure explicit language list in `setup/shiki.ts` |
| `bunx slidev` global | Running `slidev` (global) instead of project-local | Always `bunx slidev` or `bun run dev` so the project's pinned version is used |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Unrestricted Shiki language list | Bundle >5MB; slow first paint on workshop wifi | Pin explicit languages in Shiki setup | Beyond ~10 languages or all-langs default |
| Magic-move overuse | Build time >90s; presenter transition stutter | Budget: ≤10 magic-move blocks per deck | At ~20+ magic-move blocks |
| Embedded Mermaid + heavy Vue components on same slide | Slide loads slowly; LCP poor on revisit | One heavy interactive per slide max | Per-slide, not deck-wide |
| Many large images uncompressed in `public/` | Slow Vercel cold-load; bad mobile/tablet UX for async revisit | Compress to WebP; budget ≤200KB per image | When `dist/` exceeds ~10MB |
| Hundreds of slides in single `slides.md` | Editor lag; Vite HMR slowdown | Split via `src:` frontmatter into chapter files | At ~50+ slides in a single file |

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Committing API keys / Anthropic tokens in code samples | Public repo + public deploy = leaked credentials | Use placeholder strings (`sk-ant-...REPLACE_ME`) in all code samples; add `.env*` to `.gitignore`; run a secret scan pre-merge |
| Embedding internal/private URLs in slides | Information leak when deck is shared post-workshop | Review deck for `localhost:`, internal hostnames, `*.internal` before going to production |
| Live demo recording exposes terminal scrollback | Past command history visible | Clear scrollback / use a fresh terminal profile for demos |
| Vercel preview URLs publicly accessible | Drafts of unfinished content discoverable via search | Use Vercel's password protection on preview deploys (paid feature) or accept that previews are public and treat as such |
| Copy-paste from real codebases | Accidental inclusion of proprietary logic | Author code samples fresh in the deck, not pasted from work projects |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| No persistent navigation | Async users get lost; no sense of progress | Slidev's built-in nav bar + slide overview (`O` key) — ensure both are enabled and visible |
| No copy-to-clipboard on code blocks | Async users transcribe by hand or can't follow along | Slidev provides this by default — verify it survives theme customization |
| Dark-only theme with no toggle | Daylight projector washout; participants on laptops in bright rooms struggle | Default dark (matches brand) but verify Shiki theme has 4.5:1 contrast against background under projector lighting |
| Slide numbers hidden | Participants asking "what slide are we on?" can't catch up | Show slide counter in default position |
| No URL fragment / per-slide URL | Sharing "go to the hooks part" requires manual count | Slidev's deep-linking is built-in — confirm `vercel.json` rewrite preserves it (see Pitfall 1) |
| 80+ char code lines | Wrap on projector, unreadable from row 5 | 60-char hard limit in authoring guide |
| Tiny code font in default theme | Back row can't read | Bump base code font ≥1.1em globally |
| Reveal transitions too aggressive | Live: presenter clicks past content; async: feels jumpy | Prefer line-highlight reveals over slide-by-slide for long code |
| Animations on async revisit | Async user gets distracting auto-plays | Make magic-move advance only on click, never timed |
| No "PDF export" link visible | Async users may want offline copy | Slidev exports PDF — surface a link in the README and (optionally) in the deck footer |

---

## "Looks Done But Isn't" Checklist

- [ ] **SPA routing:** Direct visit to `<deploy-url>/5` loads slide 5 — verify `vercel.json` rewrite is committed and active
- [ ] **Preview deploy:** PR preview URL works end-to-end (not just dev server) — `bun run preview` locally, then Vercel preview check
- [ ] **Build time:** `bun run build` completes in <90s on a clean checkout (CI cold cache)
- [ ] **Asset paths:** Every image/font in `public/` resolves on production deploy — DevTools network tab shows zero 404s
- [ ] **Presenter mode:** Press `O` for overview, navigate to `/presenter/` — thumbnails render, no broken layout
- [ ] **PDF export:** `bunx slidev export` produces a complete PDF — verify in CI or pre-release
- [ ] **Copy-clipboard:** Hover a code block, copy button appears, copying captures the full unhighlighted code
- [ ] **Mobile/tablet:** Deck is at least navigable on iPad-sized viewports for async revisit (not pretty, but functional)
- [ ] **Contrast:** Spot-check 3 code slides with a contrast tool (e.g. browser devtools) — text ≥4.5:1, syntax accents ≥3:1
- [ ] **Bun pinned:** `package.json` has `"packageManager": "bun@..."` and `bun.lock` is committed
- [ ] **No secrets:** Run `grep -r "sk-" content/` and similar scans before going public
- [ ] **README setup:** A fresh contributor can `bun install && bun run dev` from a clean clone with no extra steps

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Missing `vercel.json` (404s in production) | LOW | Add file, commit, redeploy — fixed in <5 min |
| Wrong `--base` path (broken assets) | LOW | Update build command in Vercel project settings, redeploy |
| CSS leaks into presenter mode | LOW-MEDIUM | Audit `styles/index.css`, scope all selectors under `.slidev-layout`, retest |
| Bun + Slidev config not recognized | LOW | Add `/// <reference types="@slidev/types" />`, or remove custom `vite.config.ts` |
| Addon broken in dist | MEDIUM | Either find a maintained alternative or copy the addon's source into `components/` and patch |
| Code blocks unreadable on projector | LOW (if caught pre-workshop) / HIGH (mid-workshop) | Pre: bump global font sizes. Mid: switch to overview mode (`O`) and zoom browser — humiliating but works |
| Build performance degraded by magic-move | MEDIUM | Audit usage, convert non-essential magic-moves to line-highlight reveals |
| Stale Vercel build cache after upgrade | LOW | "Redeploy without cache" once in Vercel UI |
| Presenter mode broken at workshop start | HIGH | Fall back to play mode + a separate window with `slides.md` open for notes |

---

## Pitfall-to-Phase Mapping

Suggested phase names below; adjust to actual roadmap. The point is to map prevention to a specific phase boundary.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| #1 SPA fallback / 404 | Phase: Deploy bootstrap | Visit `<preview>/5` directly — must load slide 5 |
| #2 `--base` misconfiguration | Phase: Deploy bootstrap | DevTools network tab on prod — zero 404s |
| #3 `public/` asset resolution | Phase: Scaffold | `bun run preview` shows all images |
| #4 Whitespace path | Phase: Scaffold | README has "clone into space-free path" note |
| #5 Presenter-mode CSS leak | Phase: Theming | Manual presenter-mode smoke check on every theme change |
| #6 Bun + Slidev config recognition | Phase: Scaffold | Avoid custom `vite.config.ts` for v1; if added, types reference present |
| #7 Addon dev-vs-dist gap | Phase: Scaffold + every addon-touching PR | `bun run preview` is a required step (CI or pre-push) |
| #8 Code unreadable on projector | Phase: Theming + Authoring guide | Pre-workshop projector dry-run; 60-char line rule documented |
| #9 Magic-move / Shiki perf | Phase: Authoring guide + Shiki config | Build time <90s budget; explicit language list |
| #10 Over-customized theme | Phase: Theming | Authoring guide ≤150 lines; default layouts work without custom frontmatter |

---

## Sources

- [Slidev — Building and Hosting](https://sli.dev/guide/hosting) — official Vercel deploy guidance, `vercel.json` rewrite, `--base` flag (HIGH confidence)
- [Slidev issue #2161 — public/ assets fail with nested entry](https://github.com/slidevjs/slidev/issues/2161) (HIGH)
- [Slidev issue #2197 — whitespace in path breaks SPA build](https://github.com/slidevjs/slidev/issues/2197) (HIGH)
- [Slidev issue #2043 — Bun + @slidev/types reference](https://github.com/slidevjs/slidev/issues/2043) (MEDIUM — version-specific)
- [Slidev issue #2072 — addon works in dev but not dist](https://github.com/slidevjs/slidev/issues/2072) (HIGH)
- [Slidev issue #2446 — scope custom CSS to avoid presenter mode breakage](https://github.com/slidevjs/slidev/issues/2446) (HIGH)
- [Slidev — Customizations](https://sli.dev/custom/) (HIGH)
- [Slidev — Shiki Magic Move feature](https://sli.dev/features/shiki-magic-move) (HIGH)
- [Vercel — Vite framework preset](https://vercel.com/docs/frameworks/frontend/vite) (HIGH)
- [Vercel — Package Managers (Bun lockfile detection)](https://vercel.com/docs/package-managers) (HIGH)
- [Vercel — Configuring a Build (cache, output dir)](https://vercel.com/docs/builds/configure-a-build) (HIGH)
- [Vercel community — SPA 404 on refresh](https://community.vercel.com/t/404-on-refresh-direct-access-for-spa-subpaths-vercel-deployment/12593) (MEDIUM)
- [Section508.gov — Accessible fonts and typography](https://www.section508.gov/develop/fonts-typography/) (HIGH — accessibility consensus)
- [Intopia — Inclusive Design For Accessible Presentations](https://intopia.digital/articles/inclusive-design-for-accessible-presentations/) (HIGH)
- [Beautiful.ai — Presentation font sizes](https://www.beautiful.ai/blog/what-font-size-is-best-for-presentations) (MEDIUM — workshop UX consensus)

---
*Pitfalls research for: Slidev workshop deck on Vercel + Bun*
*Researched: 2026-05-08*
