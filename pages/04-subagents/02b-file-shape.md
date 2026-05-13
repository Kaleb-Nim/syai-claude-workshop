# A subagent is a markdown file

Live under `.claude/agents/<name>.md` (project scope) or `~/.claude/agents/<name>.md` (user scope, available in every project). Two required frontmatter fields: `name` and `description`. The rest is optional.

```yaml
---
name: code-reviewer
description: Reviews code for quality and best practices
tools: Read, Glob, Grep
model: sonnet
---

You are a code reviewer. When invoked, analyze the code
and provide specific, actionable feedback.
```

<div class="text-dim text-xs mt-3">
  the minimal shape — straight from the Claude Code subagents docs
</div>
