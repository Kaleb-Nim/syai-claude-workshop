---
layout: section
---

# Subagents & the Agent SDK

spawn focused workers; invoke from your own code

---

# Why subagents

- **Independent context.** A subagent doesn't pollute the parent's context window with research it did.
- **Parallelism.** Three subagents can investigate three branches of a problem at once.
- **Specialization.** Different system prompts, different tool sets, different focus.

When you find yourself thinking "I need a fresh Claude for this" — that's a subagent.

---

# The Task tool

Inside Claude Code, **Claude itself can spawn subagents** by calling the `Task` tool.

You don't call Task. Claude does — when its system prompt or your prompt says it should.

```
parent Claude → Task → fresh subagent → returns final message → parent continues
```

The subagent has its own context, its own tool budget, and its own system prompt (from the agent definition file).

---

# `.claude/agents/<name>.md`

A subagent is a markdown file with frontmatter. The frontmatter declares the agent's
identity; the body becomes its system prompt.

```markdown
---
name: code-reviewer
description: Reviews diffs for bugs, style, and missed edge cases.
tools: [Read, Grep, Bash]
---

You are a strict but fair code reviewer.
Read the diff. Flag concrete issues with file:line references.
Skip style nits unless they materially affect readability.
```

`tools` is the allowlist — the subagent only sees these. Omit to inherit the parent's tool set. <!-- VERIFY: exact frontmatter keys (name, description, tools) -->

---

# Two ways in

- **Claude-invoked.** You ask the parent to do something; it decides a subagent is the right move and calls Task with the agent name.
- **User-invoked.** You explicitly say *"use the code-reviewer agent on this diff"* — the parent forwards.

Same primitive, different trigger. The agent file doesn't know or care which path called it.

---

# Live: list what's there

```bash
# Many CC installs ship with example agents. List yours:
ls -la .claude/agents/ 2>/dev/null
ls -la ~/.claude/agents/ 2>/dev/null

# Project-local agents in .claude/agents/ override
# user-wide agents in ~/.claude/agents/.
```

```
✓ Check: at least one of those directories exists.
If not, you'll create one in the exercise.
```

---

# Live: anatomy of a real agent

```bash
# Pick an existing agent and read it.
# If you don't have one, skip to the exercise.
ls ~/.claude/agents/ | head -1
# example output: planner.md

cat ~/.claude/agents/planner.md | head -20
```

Notice the shape: frontmatter (`name`, `description`, optional `tools`) + a body that reads as
a system prompt. That's the entire contract.

---

# Exercise (8 min) — write `code-reviewer`

**Step 1.** Create `.claude/agents/code-reviewer.md` in your project:

```markdown
---
name: code-reviewer
description: Reviews recent changes for bugs, style, and edge cases.
tools: [Read, Grep, Bash]
---

You are a strict but fair code reviewer.
When invoked, run `git diff` to see recent changes.
Flag concrete issues with file:line references.
Skip style nits unless they materially affect readability.
End with a one-line verdict: APPROVE or REQUEST CHANGES.
```

**Step 2.** In Claude Code, ask:

> *"Use the code-reviewer agent on the most recent commit."*

```
✓ Check: Claude calls the Task tool with agent "code-reviewer"
and the review ends with APPROVE or REQUEST CHANGES.
```

---

# The SDK bridge

The Agent SDK exposes the same primitive — query a Claude agent — from your own code.
Same model, same tool semantics, no CLI wrapper.

`@anthropic-ai/claude-agent-sdk` on npm. TypeScript-first. Streams.

Use it when the invocation is programmatic: a cron job, a CI hook, your own app.

---

# Live: minimal SDK call

```ts
import { query } from "@anthropic-ai/claude-agent-sdk";

const result = query({
  prompt: "List the markdown files in this repo and summarize each.",
});

for await (const message of result) {
  if (message.type === "result") {
    console.log(message.result);
  }
}
```

That's the whole "spawn a Claude" surface. <!-- VERIFY: exact message.type discriminant for final result -->

---

# Which one when

- **CLI / inside Claude Code.** Interactive. You're at a terminal, riffing.
- **SDK.** Programmatic. Cron job, CI hook, your own app. No terminal in the loop.

The agent definition file format is the same on both sides. Write it once, invoke from either.

---

# Subagents recap

- Subagents = fresh Claude with its own context, system prompt, tool set.
- Invoke from inside CC via the Task tool (Claude- or user-triggered).
- Define in `.claude/agents/<name>.md` with `name`, `description`, optional `tools`.
- Same primitive lives in `@anthropic-ai/claude-agent-sdk` for programmatic use.

Next: how to package your own commands and skills.
