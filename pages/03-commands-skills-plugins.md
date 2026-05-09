---
layout: section
---

# Commands · Skills · Plugins

three primitives for making Claude Code yours

---

# Why these three

- **Slash commands.** A reusable prompt with a name. Type `/standup` instead of writing the prompt.
- **Skills.** Progressive disclosure — Claude reads a skill's index, fetches details only when relevant.
- **Plugins.** A bundle of commands + skills + agents you can share or install.

Together: write once, invoke fast, share with the team.

---

# The pyramid

```
plugin (bundle)
   │
   ├── slash commands  → fast, on-demand prompts
   ├── skills          → discoverable knowledge, on-demand depth
   └── agents          → focused workers (previous chapter)
```

A plugin is just packaging. Underneath, every entry is one of the primitives you already know.

---

# `.claude/commands/<name>.md`

A slash command is a markdown file. Type `/<name>` in Claude Code; the file's body becomes the prompt.

```markdown
---
description: Daily standup summary from recent commits.
---

Read the last 24 hours of git activity in this repo.
For each meaningful commit, write one line:
"<short-sha>: <one-sentence summary of what changed>".
End with three bullets: in progress, blockers, next.
Keep it under 15 lines total.
```

`description` shows up in the `/` menu autocomplete. The body is the prompt — just markdown.

<!-- VERIFY: any other reserved frontmatter keys (e.g. allowed-tools, argument passthrough) -->

---

# Arguments

Pass arguments after the slash command name:

```
/standup --since 3d
```

The full string after the command name is appended to the prompt body. Reference it in your prompt with natural language ("use the arguments provided") or with the placeholder below.

<!-- VERIFY: exact placeholder syntax for arguments inside the command body — $ARGUMENTS or {args} or injected inline -->

---

# Live: list your commands

```bash
# Project-local commands live in .claude/commands/
ls .claude/commands/ 2>/dev/null || echo "(none yet)"

# User-wide commands live in ~/.claude/commands/
ls ~/.claude/commands/ 2>/dev/null || echo "(none yet)"
```

✓ Check: one or both directories listed. Even if empty, the command ran without error — the path is valid. Commands in `~/.claude/commands/` are available in every project.

---

# Exercise (5 min) — write `/standup`

1. Create `.claude/commands/standup.md`:

```markdown
---
description: Daily standup summary from recent commits.
---

Run `git log --since="24 hours ago" --oneline` in this repo.
For each commit, write one line:
"<short-sha>: <one-sentence summary of what changed>".
Then three bullets labeled: 'in progress', 'blockers', 'next'.
Keep it under 15 lines total.
```

2. In Claude Code, type `/standup` and press Enter.

3. ✓ Check: Claude runs `git log --since="24 hours ago" --oneline`, then prints one line per commit and three labeled bullets, all under ~15 lines.

---

# `.claude/skills/<name>/SKILL.md`

A skill is a directory with a `SKILL.md` index. Claude sees the index — short and descriptive — and only reads supporting files when relevant.

```
.claude/skills/
└── postgres-migrations/
    ├── SKILL.md           ← always-loaded index
    ├── examples/up-down.sql
    └── playbooks/safe-migration.md
```

The `SKILL.md` says *what* the skill is for and *what files are inside*. Claude pulls the rest only when the situation calls for it.

---

# Progressive disclosure

The win: large knowledge bases don't blow up your context.

- **Always loaded:** every `SKILL.md` index in scope (a few hundred tokens each).
- **Loaded on demand:** the rest of the skill's files, only when Claude decides they're relevant.

You write the index to be a good table of contents. The skill's depth lives in the supporting files.

---

# Live: skills you already have

```bash
# You almost certainly have skills installed already.
ls ~/.claude/skills/ 2>/dev/null | head -10

# Pick one and read its index:
FIRST=$(ls ~/.claude/skills/ 2>/dev/null | head -1)
cat ~/.claude/skills/"$FIRST"/SKILL.md 2>/dev/null | head -30
```

✓ Check: you see a `SKILL.md` index with a short description and a list of supporting files or subdirectories. That's the contract — index = always loaded, the rest = on demand.

---

# Plugins — distribution layer

A plugin bundles **commands + skills + agents** so you can install or share them as a unit.

```
my-plugin/
├── commands/
│   └── standup.md
├── skills/
│   └── git-conventions/
│       └── SKILL.md
└── agents/
    └── code-reviewer.md
```

Install once, get every primitive inside. We won't build one in 25 minutes — the pattern is just your `.claude/` directory, packaged.

<!-- VERIFY: exact plugin manifest filename and install mechanism (plugin.json? package.json? .claude/plugin.yml?) -->

---

# Which primitive when

- **Slash command** — short reusable prompt. Body fits on one screen. Invoke by name.
- **Skill** — body wouldn't fit on one screen. You want progressive disclosure; Claude pulls depth only when needed.
- **Agent** — needs its own context, its own tool budget, its own focused instruction set.

Sliding scale, same family. Pick the smallest one that does the job.

---

# Commands · Skills · Plugins recap

- Slash commands = `.claude/commands/<name>.md`. Body is the prompt. Frontmatter `description` powers the `/` menu.
- Skills = `.claude/skills/<name>/SKILL.md` index plus on-demand support files. Progressive disclosure keeps context tight.
- Plugins = a directory bundling all three for distribution. Not built today — the structure is the concept.

Same backbone, different scope. Pick the smallest one that does the job.
