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

---

# The standard template

The VoltAgent registry uses a richer body shape — frontmatter, role line, then two convention sections:

````markdown
---
name: subagent-name
description: When this agent should be invoked
tools: Read, Write, Edit, Bash, Glob, Grep
model: sonnet
---

You are a [role description and expertise areas]...

[Agent-specific checklists, patterns, and guidelines]...

## Communication Protocol
Inter-agent communication specifications...

## Development Workflow
Structured implementation phases...
````

<div class="text-dim text-xs mt-3">
  the lower two sections (<code>## Communication Protocol</code>, <code>## Development Workflow</code>) are a VoltAgent-registry convention — Claude Code only requires <code>name</code> and <code>description</code>
</div>

<style scoped>
pre, code {
  font-size: 0.6rem !important;
  line-height: 1.2 !important;
}
.slidev-code {
  padding: 0.45em 0.7em !important;
}
h1 {
  margin-bottom: 0.3em !important;
}
</style>

---

# How it gets invoked

Two paths, both supported:

- **You invoke it** — type `@` and pick from the typeahead, or open `/agents` and run it from the UI. Guaranteed to run.
- **Claude invokes it** — Claude reads the `description:` field and reaches for the Task / Agent tool when the field matches your request. Heuristic, not guaranteed — include `use proactively` in `description:` to nudge it.

<div class="text-dim text-sm mt-6">
  <code>@subagent-name</code> is the manual handle · <code>description:</code> is the auto-delegation hook
</div>

<div class="text-dim text-xs mt-2">
  Claude Code v2.1.63 renamed the <strong>Task</strong> tool to <strong>Agent</strong> — old <code>Task(...)</code> references still work as aliases
</div>
