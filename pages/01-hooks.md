---
layout: section
---

# Hooks

scripts that fire on Claude Code's lifecycle

---

# Why hooks

- **Guardrails.** Block tool calls that touch what you don't want touched.
- **Telemetry.** Log every tool call, every prompt, every session start.
- **Glue.** Run a script when Claude finishes a turn — re-run tests, format, deploy.

Hooks are how you make Claude Code react to itself.

---

# Lifecycle events

| Event | Fires when |
|-------|-----------|
| `SessionStart` | a new Claude Code session begins |
| `UserPromptSubmit` | you press enter on a prompt |
| `PreToolUse` | before Claude executes a tool call |
| `PostToolUse` | after a tool call completes |
| `Stop` | Claude finishes a turn |

Each hook is a shell command. Output and exit code matter — block by exiting non-zero from `PreToolUse`.

---

# settings.json shape

Hooks live in `~/.claude/settings.json` (user-wide) or `.claude/settings.json` (project).

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "*",
        "hooks": [
          { "type": "command", "command": "/path/to/script.sh" }
        ]
      }
    ]
  }
}
```

`matcher` filters by tool name (e.g. `"Edit"`, `"Bash"`, `"*"` for all). `command` runs in your shell with hook context piped on stdin.

---

# Before — no hook

You ask Claude to clean up old logs.

```text
> claude
You: clean up everything in logs/, it's cluttered
Claude: I'll remove the contents of logs/.
  → Bash(rm -rf logs/*)
  → exit 0
You: ...wait. did that include the deploy logs from yesterday?
Claude: yes, those are gone.
```

No hook. Claude reaches for the dangerous primitive, and it runs. There is nothing between Claude's tool call and the kernel.

---

# The hook

```bash
#!/usr/bin/env bash
# ~/.claude/hooks/pre-tool-use.sh — block rm -rf and .env reads
payload=$(cat)
tool=$(echo "$payload" | jq -r '.tool_name')
cmd=$(echo "$payload" | jq -r '.tool_input.command // .tool_input.file_path // ""')

if [[ "$tool" == "Bash" && "$cmd" =~ rm[[:space:]]+(-[a-z]*r[a-z]*f|--recursive) ]]; then
  echo '{"decision":"block","reason":"rm -rf blocked by hook"}' >&2
  exit 2
fi

if [[ "$cmd" =~ \.env(\b|/) && "$cmd" != *.env.sample ]]; then
  echo '{"decision":"block","reason":".env access blocked"}' >&2
  exit 2
fi
```

<!-- VERIFY: exact PreToolUse block-decision JSON shape and exit code contract -->

---

# Wiring it in `.claude/settings.json`

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash|Read|Edit|Write",
        "hooks": [
          { "type": "command", "command": "$HOME/.claude/hooks/pre-tool-use.sh" }
        ]
      }
    ]
  }
}
```

`matcher` filters by tool name (pipe-separated). The hook receives the full tool call JSON on stdin. **Hook config loads at session start** — start a fresh `claude` session for it to take effect.

---

# After — hook wired

```text
> claude
You: clean up everything in logs/, it's cluttered
Claude: I'll remove the contents of logs/.
  → Bash(rm -rf logs/*)
  ✗ BLOCKED: {"decision":"block","reason":"rm -rf blocked by hook"}
Claude: that was blocked by your PreToolUse hook.
        Want me to list what's in logs/ first instead?
You: yes
  → Bash(ls -la logs/)
  → exit 0
```

Same prompt, same Claude. The hook intercepted before the kernel saw `rm -rf`.

---

# What just happened

```text
You ─→ UserPromptSubmit ─→ Claude
                              │
                              └─→ tool call (Bash rm -rf)
                                    │
                                    ├─→ PreToolUse ─── HOOK ──┐
                                    │                          │
                                    │   exit 2 + JSON block ◀─┘
                                    │
                                    ✗ tool never runs
                                    │
                              ┌──── Claude
                              │
You ◀─ Stop ◀─────────────────┘
```

The hook sits between Claude's intent and the tool's execution. Exit `0` — call proceeds. Exit `2` with `decision:"block"` — tool never runs and Claude sees the reason.

---

# One hook, two guardrails

The same `pre-tool-use.sh` already blocks `.env` access (slide 6, second `if`).

```text
You: read our .env so we can debug the deploy
Claude: → Read(.env)
  ✗ BLOCKED: {"decision":"block","reason":".env access blocked"}
```

Allowing `.env.sample` keeps the example-config workflow open. Defensive hooks compose — one matcher, many rules in the script.

---

# When hooks don't fire

- **New session?** Hook config loads at session start. Old sessions don't pick it up.
- **Executable?** `chmod +x ~/.claude/hooks/pre-tool-use.sh`.
- **Matcher right?** `Bash|Read|Edit|Write`, not `*` (which doesn't match anything for hooks).
- **Output going where?** Hooks run silently by default. While debugging, append `>> /tmp/hook.log 2>&1` to the command in `settings.json`.
- **Path expansion?** Use `$HOME`, not `~` — JSON doesn't expand `~`.

---

# Exercise (5 min)

Wire a `PostToolUse` hook that appends one line per tool call to `~/.claude/tool-log.txt`. You write the script and the JSON.

```bash
# Hint: a 4-line shell script is enough.
# stdin is JSON; append timestamp + tool_name to the log.
```

1. Create `~/.claude/hooks/log-tool.sh` — read stdin, write `$(date -u +%FT%TZ) $(jq -r .tool_name)` to the log.
2. Add a `PostToolUse` entry to `~/.claude/settings.json` with `matcher: ""` (matches all tools).
3. Start a fresh `claude` session. Ask it to list files.

✓ Check: `wc -l ~/.claude/tool-log.txt` shows ≥1; `tail -1` shows a timestamp + a tool name like `Bash` or `Read`.

---

# Hooks recap

- 5 lifecycle events covered today: `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `Stop`. (13 events exist total.)
- `PreToolUse` exit `2` + `{"decision":"block"}` is your guardrail.
- Config in `~/.claude/settings.json` (user) or `.claude/settings.json` (project).
- Hook config loads at session start; debug with `>> /tmp/hook.log 2>&1`.

**Further reading:** [disler/claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery) — all 13 events, payload shapes, TTS integrations.

Next: subagents — when one Claude isn't enough.
