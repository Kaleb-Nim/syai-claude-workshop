# Let Claude write the skill

You don't have to hand-write `SKILL.md`. Just describe what you want:

```text
> Create a skill called pirate-mode. Trigger it when I say "pirate-mode"
  or "arrr". Respond in pirate-speak mixed with 2026 internet slang.
```

```text
> Write me a SKILL.md for a skill that makes you speak like a pirate.
  Put it in ~/.claude/skills/pirate-mode/
```

```text
> I want a skill that activates when I say "pirate". Make it respond
  with brain-rot pirate vocab — skibidi, rizz, sigma, etc.
```

<div class="text-dim text-sm mt-4">
  You describe the behavior. Claude writes the frontmatter, the body, and drops it in the right folder.
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
