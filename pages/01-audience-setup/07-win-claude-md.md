# Win 2: Make Claude listen across sessions

Add this one line to `~/.claude/CLAUDE.md`:

```text
When in plan mode, always ask clarifying questions before you start planning.
```

Save and close.

---

# Why it sticks

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

A message attached to every conversation — not the system prompt, not enforced config. Behavioral rules sit in front of every prompt with no per-session ceremony.

> ✓ Check: `grep -c 'When in plan mode' ~/.claude/CLAUDE.md` returns `1`.
