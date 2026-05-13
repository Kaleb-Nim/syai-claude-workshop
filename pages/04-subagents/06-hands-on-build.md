# Build it: run /agents

Open Claude Code and run the slash command:

```
/agents
```

Then walk this flow:

1. The interface opens in two tabs — **Running** and **Library**. Switch to **Library**.
2. Pick **Create new agent**.
3. Choose **Personal** when prompted — your subagent lives in `~/.claude/agents/` and works in every project. Pick Project only if you want it scoped to one repo.
4. Pick **Generate with Claude** (the alternative is configure manually — we're not doing that today).
5. When asked what the agent does, paste:

   > A commit-message-writer that reads `git diff` and returns one conventional-commit line. No body, no footer, ≤72 chars.
6. Select tools: **Bash** and **Read** only. Deselect everything else.
7. Select model: **Sonnet**.
8. Pick a color. Memory: **None**. Save.

<div class="text-dim text-xs mt-3">
  Subagents created through <code>/agents</code> are loaded immediately — no session restart needed
</div>

---

# What just landed on disk

```
~/.claude/agents/commit-message-writer.md
```

Same shape as Section 04. Frontmatter Claude wrote for you, plus the system prompt it generated from your description.

<div class="text-dim text-sm mt-6">
  next slide: fire it · watch the diff stay inside the subagent's window
</div>
