# Cookbook · sous chef

Back in Chapter 2, a skill was a doc you wrote once that Claude pulled in when relevant. A subagent is structurally different — a whole separate worker Claude can hand a task to.

> Skill = giving Claude a cookbook
> Subagent = hiring a sous chef

<div class="text-dim text-xs mt-6">
  dev.to / nunc — <em>claude-code-skills-vs-subagents-when-to-use-what</em>
</div>

---

# The quick version

| Aspect | Skills | Subagents |
|--------|--------|-----------|
| What it is | Instructions that extend Claude's knowledge | A separate AI assistant with its own context |
| When Claude uses it | Automatically when relevant | Delegated for complex workflows |
| Best for | Utility functions, recipes, how-tos | Multi-step analysis, code review, research |
| Context | Shares your main chat context | Gets its own isolated context window |

<div class="text-dim text-xs mt-4">
  table verbatim from the dev.to article
</div>

---

# Where context lives

> Context — Skills: Shares your main chat context · Subagents: Gets its own isolated context window

<div class="text-dim text-sm mt-6">
  the structural difference — Section 03 unpacks why that matters
</div>

---

# Default to the lighter tool

> Start with a skill unless you specifically need subagent features. Skills are simpler, faster, and easier to maintain.

<div class="text-dim text-xs mt-6">
  all three quotes: dev.to / nunc — <em>claude-code-skills-vs-subagents-when-to-use-what</em>
</div>
