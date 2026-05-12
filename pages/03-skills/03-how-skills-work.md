# Where skills live

```text
~/.claude/skills/pirate-mode/
  └── SKILL.md
```

<div class="text-dim text-sm mt-6">
  User-level today. Project-level (<code>.claude/skills/</code> inside a repo) versions with the codebase — same shape.
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

---

# How Claude loads a skill

| Tier | What loads | Token cost |
|------|------------|------------|
| **Discovery** | `name` + `description` only | ~100 tokens / skill |
| **Activation** | Full `SKILL.md` body | ~1K–5K tokens |
| **Execution** | Scripts, reference files, templates | only what the task needs |

<div class="text-dim text-sm mt-6">
  more frontmatter fields exist (<code>allowed-tools</code>, <code>disable-model-invocation</code>, <code>paths</code>…) — <code>name</code> + <code>description</code> is enough today.
</div>
