# Wire it: paste this into `~/.claude/settings.json`

Notification has the same shape — we just repeat it.

<div class="grid grid-cols-3 gap-3 mt-2">

<div>

**macOS**

```json
{
  "hooks": {
    "Stop": [
      { "hooks": [{ "type": "command",
        "command": "afplay /System/Library/Sounds/Glass.aiff" }] }
    ],
    "Notification": [
      { "hooks": [{ "type": "command",
        "command": "afplay /System/Library/Sounds/Ping.aiff" }] }
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
    ],
    "Notification": [
      { "hooks": [{ "type": "command",
        "command": "aplay /usr/share/sounds/alsa/Side_Right.wav" }] }
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
    ],
    "Notification": [
      { "hooks": [{ "type": "command",
        "command": "powershell -c \"(New-Object Media.SoundPlayer 'C:\\Windows\\Media\\chimes.wav').PlaySync()\"" }] }
    ]
  }
}
```

</div>

</div>

<div class="text-dim text-xs mt-4">
  Native Windows works; if PowerShell quoting fights you, run Claude Code inside WSL and use the Linux command.
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
