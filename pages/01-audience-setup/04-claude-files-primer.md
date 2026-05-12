# Where Claude reads from in your project

```text
./CLAUDE.md
./.claude/
  CLAUDE.md              (alternative location for project CLAUDE.md)
  settings.json          → Hooks (Chapter 2)
  settings.local.json    (gitignored; personal overrides)
  skills/                → Skills (Chapter 3)
  agents/                → Subagents (Chapter 4)
  commands/              (legacy — superseded by Skills)
  rules/                 (path-scoped; not today)
```

We'll teach the **bold 3**: `settings.json`, `skills/`, `agents/`.
