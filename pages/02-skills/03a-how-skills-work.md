# The base template, annotated

```markdown
---
name: skill-name                          # kebab-case, matches the folder
description: Use when ... Triggers on ... # what + when, one paragraph
---

# Skill Name                              # body starts here — markdown only

## Instructions                           # what Claude should do, step-by-step

1. First do X
2. Then do Y

## When to use                            # disambiguation — when NOT to fire

Use for A. Skip for B (use other-skill instead).

## Examples                               # concrete input → expected behavior

- User says "..." → respond with "..."
```

<div class="text-dim text-sm mt-4">
  Two frontmatter fields, then plain markdown. Section headings are convention, not syntax — Claude reads the whole body once activated.
</div>

---

# The smallest valid SKILL.md

```markdown
---
name: pirate-mode
description: Use when the user asks for pirate-mode, asks to explain
  something in pirate, or says "arrr." Responds in 2026 brain-rot pirate
  voice — opens with "Ahoy" and signs every reply "— per pirate-mode."
---

# Pirate Mode

Respond in pirate-speak laced with 2026 internet brain-rot vocabulary
(skibidi, rizz, no cap, sigma, ohio, gyat, lowkey). Open every response
with "Ahoy ye sigma" and close with "— per pirate-mode."
```

<div class="text-dim text-sm mt-4">
  <code>description</code> has two jobs: tell humans what the skill does, and tell Claude when to load it.
</div>
