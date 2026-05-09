---
layout: section
---

# Welcome

advanced Claude Code, hands-on

---

# What we cover

- **Hooks** — scripts that fire on Claude Code lifecycle events
- **Subagents & the Agent SDK** — spawn focused workers; invoke from your own code
- **Slash commands, Skills, Plugins** — make Claude Code yours

What we skip today: MCP, plan mode internals, alternative agent CLIs.

---

# Setup verify

Run these now — every chapter writes to `.claude/`.

```bash
# Verify your Claude Code install
claude --version
# expect: 1.x.x or 2.x.x

# Verify project-local Claude config dir exists
mkdir -p .claude
ls -la .claude
# expect: directory listed, possibly empty
```

✓ Check: `claude --version` prints a semver string and `.claude/` exists in your current dir.
If either fails, fix before the next slide — every chapter writes into `.claude/`.

---

# How to follow

- Type the commands. Don't watch.
- Each chapter ends with a `✓ Check:` — if yours doesn't match, ask before we move on.
- Slides stay live at the workshop URL — re-walk at your own pace afterward.

---

# Ready

Three topics, ninety minutes, hands on keyboard.

Next: **Hooks**.
