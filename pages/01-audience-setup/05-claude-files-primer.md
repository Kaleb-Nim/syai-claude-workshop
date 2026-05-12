# Where Claude reads from in your project

```text
my-app/
├── .claude/                  ◀ workshop focus
│   ├── CLAUDE.md             (alternative location for project CLAUDE.md)
│   ├── settings.json         → Hooks (Ch.2)
│   ├── settings.local.json   (gitignored; personal overrides)
│   ├── skills/               → Skills (Ch.3)
│   ├── agents/               → Subagents (Ch.4)
│   ├── commands/             (legacy — superseded by Skills)
│   └── rules/                (path-scoped; not today)
├── .next/                    (gitignored build output)
├── .vscode/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/
├── components/
├── lib/
├── public/
├── node_modules/             (gitignored)
├── .env.local
├── .gitignore
├── CLAUDE.md                 ◀ workshop focus
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

We'll teach the **bold 3**: `settings.json`, `skills/`, `agents/`.
