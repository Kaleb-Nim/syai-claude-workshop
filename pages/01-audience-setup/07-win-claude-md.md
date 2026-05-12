# Win 2: Make Claude listen across sessions

Add this one line to `~/.claude/CLAUDE.md`:

```text
When in plan mode, always ask clarifying questions before you start planning.
```

Save and close.

---

# Why it sticks

Claude Code loads `~/.claude/CLAUDE.md` at the start of every session —
as a message attached to your conversation, not as enforced config.
Behavioral rules in there land in front of every prompt you send,
with no per-session ceremony.

> ✓ Check: `grep -c 'When in plan mode' ~/.claude/CLAUDE.md` returns `1`.
