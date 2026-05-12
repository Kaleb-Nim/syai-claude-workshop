# Win 2: Make Claude listen across sessions

Add this one line to `~/.claude/CLAUDE.md`:

```text
When in plan mode, always ask clarifying questions before you start planning.
```

<div class="mt-10" />

## How it lands in every conversation

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

A message attached to every conversation — not the system prompt, not enforced config.

> ✓ Check: `grep -c 'When in plan mode' ~/.claude/CLAUDE.md` returns `1`.
