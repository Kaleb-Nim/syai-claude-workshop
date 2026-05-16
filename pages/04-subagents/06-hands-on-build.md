# Build it: log-tail-summarizer

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

   > A log-tail-summarizer that takes a file path, runs `tail -n 500` on it, and returns the top 3 error patterns with a one-line diagnosis. No raw log lines in the output.
6. Select tools: **Bash** and **Read** only. Deselect everything else.
7. Select model: **Sonnet**.
8. Pick a color. Memory: **None**. Save.

<div class="text-dim text-xs mt-3">
  Subagents created through <code>/agents</code> are loaded immediately — no session restart needed
</div>

---

# What just landed on disk

```
~/.claude/agents/log-tail-summarizer.md
```

Same shape as Section 04. Frontmatter Claude wrote for you, plus the system prompt it generated from your description.

<div class="text-dim text-sm mt-6">
  next slide: fire it · watch hundreds of log lines stay inside the subagent's window
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
  font-size: 1.5rem !important;
  margin-bottom: 0.35em !important;
}
p, li {
  font-size: 0.82rem !important;
  line-height: 1.35 !important;
  margin-top: 0.25em !important;
  margin-bottom: 0.25em !important;
}
ol, ul {
  margin-top: 0.3em !important;
  margin-bottom: 0.3em !important;
}
blockquote {
  font-size: 0.78rem !important;
  margin: 0.3em 0 !important;
  padding: 0.3em 0.7em !important;
}
</style>
