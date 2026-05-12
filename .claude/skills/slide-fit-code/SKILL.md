---
name: slide-fit-code
description: |
  Shrink an oversized code block on a Slidev slide so it fits the viewport
  without horizontal scroll or vertical overflow. Append a scoped style
  block — does not change content. Use when the user says "scale down /
  shrink / make slide N fit", "code block overflows", "JSON doesn't fit",
  "fit to screen", or asks to apply the Phase 1 font-shrink retrofit to
  any chapter slide.
---

# slide-fit-code

Apply the standard Slidev font-shrink retrofit to one or more slides whose
fenced code block (typically JSON or a directory tree) overflows the viewport.

## When to use

Trigger phrases:
- "scale down slide N"
- "shrink slide N", "make it fit", "fit to screen"
- "JSON overflows", "code block doesn't fit"
- "apply the font-shrink retrofit"
- "Phase 1 pattern G"

## The pattern

Append this scoped style block to the end of the target slide's `.md` file
(after all content, after any closing `</div>`):

```html
<style scoped>
pre, code {
  font-size: 0.7rem !important;
  line-height: 1.15 !important;
}
.slidev-code {
  padding: 0.6em 0.9em !important;
}
h1 {
  margin-bottom: 0.4em !important;
}
</style>
```

`scoped` confines the rules to this single slide — no leakage into siblings.

## How to apply

1. Identify the target file(s). Slidev slides are 1-indexed deck-wide. Resolve
   slide number → file by walking `slides.md` includes and counting `^---$`
   separators per included file:
   - File with 2 `---` (frontmatter only) = 1 slide
   - File with N internal `---` and no frontmatter = N+1 slides
   - File with frontmatter AND M internal `---` = M+1 slides

2. Confirm the slide has a fenced code block (` ```json `, ` ```bash `,
   ` ```ts `, etc.) or `<pre>` content. If it doesn't, the retrofit won't
   help — recommend a different fix (split slide, drop content).

3. Append the `<style scoped>` block verbatim. Do not modify the slide's
   body content.

4. If the slide already has a `<style scoped>` block, merge — adjust the
   `font-size` value down further (try `0.6rem`, `0.55rem`, `0.5rem`) rather
   than appending a duplicate block.

## Knobs (tune only if 0.7rem still overflows)

| Knob | Default | When to lower |
|------|---------|---------------|
| `font-size` | `0.7rem` | Block still overflows — try 0.6, 0.55, 0.5 |
| `line-height` | `1.15` | Many short lines — try 1.1 |
| `padding` | `0.6em 0.9em` | Padding dominates — try `0.4em 0.7em` |

Keep `!important` — Slidev's default theme has high-specificity code rules.

## Reference exemplars

- `pages/01-audience-setup/05-claude-files-primer.md` — directory tree slide,
  origin of this pattern (Phase 1, Plan 01-05).
- `pages/02-hooks/03-how-hooks-work.md` — Stop-only JSON slide.
- `pages/02-hooks/04-hands-on-build.md` — combined Stop+Notification JSON
  slide.

## What NOT to do

- Don't edit global `style.css` — the shrink must be scoped to the offending
  slide. Other slides intentionally use larger code rendering for emphasis.
- Don't remove or rewrite the code block content to make it fit. Content
  decisions live in PLAN.md; this skill is a render-only retrofit.
- Don't omit `scoped` on the `<style>` tag — global styles cascade and break
  unrelated slides.
- Don't add `<style>` before the slide content — it must come after, at file
  end, to avoid being parsed as part of the visible body.

## Verify

After editing, ask the user to reload `bunx slidev --open` and confirm the
slide fits without horizontal or vertical scroll. The dev server hot-reloads,
no rebuild needed.
