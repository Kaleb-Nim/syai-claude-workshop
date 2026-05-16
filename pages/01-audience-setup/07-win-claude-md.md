# Win 2: Make Claude listen across sessions

Add this one line to `~/.claude/CLAUDE.md`:

<div class="text-dim text-sm mt-2 mb-2">
  Don't know where the file lives? Just ask Claude Code: <code>open my user claude.md file</code>
</div>


```text
When in plan mode, always ask clarifying questions, ask them one at a time to incoporate answers into follow up questions.
```

<div class="mt-10" />

## How it lands in every conversation

<div class="text-xs leading-tight">

```text
~/.claude/CLAUDE.md  ── loaded at session start ──┐
   (your rules)                                   │
                                                  ▼
                         ┌────────────────────────────┐
                         │  conversation context      │
                         │                            │
                         │  [ CLAUDE.md ]   ← always  │
                         │  [ prompt 1 ]              │
                         │  [ reply 1 ]               │
                         │  [ prompt 2 ]              │
                         │  [ reply 2 ]               │
                         │  ...                       │
                         └────────────────────────────┘
```

</div>

A message attached to every conversation — not the system prompt, not enforced config.

> ✓ Check: `grep -c 'When in plan mode' ~/.claude/CLAUDE.md` returns `1`.

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
