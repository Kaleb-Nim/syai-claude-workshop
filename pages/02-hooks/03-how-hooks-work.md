# How hooks work

Two events do most of the work:

- **`Stop`** — fires when Claude finishes a turn
- **`Notification`** — fires when Claude needs your attention (permission, idle)

You wire them in `~/.claude/settings.json`:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Glass.aiff"
          }
        ]
      }
    ]
  }
}
```

<div class="text-dim text-sm mt-4">

- Linux / WSL → swap `afplay` for `aplay /usr/share/sounds/alsa/Front_Center.wav`
- Native Windows → easiest path today is to run Claude Code inside WSL so `afplay`/`aplay` and shell paths work

</div>

<div class="text-dim text-xs mt-4">
  more exist: <code>PreToolUse</code>, <code>PostToolUse</code>, <code>UserPromptSubmit</code>, <code>SessionStart</code> — same shape
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
  margin-bottom: 0.4em !important;
}
</style>
