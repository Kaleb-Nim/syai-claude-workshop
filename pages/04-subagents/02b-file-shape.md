# The subagent template, annotated

```markdown
---
name: subagent-name                       # kebab-case, matches the filename
description: Use when ... Invoke for ...  # what + when, one paragraph
tools: Read, Grep, Glob                   # optional — omit to inherit all tools
model: sonnet                             # optional — sonnet | opus | haiku | inherit
---

You are a {role}.                         # system prompt starts here — plain markdown

## Responsibilities                       # what this subagent owns

- Do X
- Do Y

## Approach                               # step-by-step playbook

1. First inspect ...
2. Then report ...

## Output                                 # shape of the final message back to the caller

Return a concise summary with file:line references.
```

<div class="text-dim text-sm mt-4">
  Two required frontmatter fields, then the system prompt as plain markdown. Section headings are convention, not syntax — the whole body becomes the subagent's instructions on invocation.
</div>

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
