# Wire it: paste this into `~/.claude/settings.json`

Notification has the same shape — we just repeat it.

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
    ],
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Ping.aiff"
          }
        ]
      }
    ]
  }
}
```

<div class="text-dim text-sm mt-4">
  Linux / WSL → swap both <code>afplay</code> calls for <code>aplay /usr/share/sounds/alsa/Front_Center.wav</code> (use a different <code>.wav</code> for the second to hear a different chime)
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
