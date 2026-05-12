# How hooks work

Two events do most of the work:

- **`Stop`** — fires when Claude finishes a turn
- **`Notification`** — fires when Claude needs your attention (permission, idle)

You wire them in `~/.claude/settings.json`:

<div class="grid grid-cols-3 gap-3 mt-2">

<div>

**macOS**

```json
{
  "hooks": {
    "Stop": [
      { "hooks": [{ "type": "command",
        "command": "afplay /System/Library/Sounds/Glass.aiff" }] }
    ]
  }
}
```

</div>

<div>

**Linux / WSL**

```json
{
  "hooks": {
    "Stop": [
      { "hooks": [{ "type": "command",
        "command": "aplay /usr/share/sounds/alsa/Front_Center.wav" }] }
    ]
  }
}
```

</div>

<div>

**Windows**

```json
{
  "hooks": {
    "Stop": [
      { "hooks": [{ "type": "command",
        "command": "powershell -c \"(New-Object Media.SoundPlayer 'C:\\Windows\\Media\\notify.wav').PlaySync()\"" }] }
    ]
  }
}
```

</div>

</div>

<div class="text-dim text-xs mt-4">
  Native Windows works; if PowerShell quoting fights you, run Claude Code inside WSL and use the Linux command.
</div>

<div class="text-dim text-xs mt-2">
  more exist: <code>PreToolUse</code>, <code>PostToolUse</code>, <code>UserPromptSubmit</code>, <code>SessionStart</code> — same shape
</div>

<style scoped>
pre, code {
  font-size: 0.55rem !important;
  line-height: 1.15 !important;
}
.slidev-code {
  padding: 0.4em 0.6em !important;
}
h1 {
  margin-bottom: 0.4em !important;
}
</style>
