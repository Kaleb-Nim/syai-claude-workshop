# Win 1: Custom statusline in 30 seconds

Inside Claude Code, type:

```bash
> /statusline show model, repo, and context percentage as a progress bar
```

Claude generates a script in `~/.claude/statusline.sh` and wires it into `~/.claude/settings.json`. You'll see:

```bash
✓ Wrote ~/.claude/statusline.sh
✓ Updated ~/.claude/settings.json
```

> ✓ Check: a status bar now sits at the bottom of your Claude Code window —
> showing the model, your folder, and a context-usage bar. Exact bar style
> depends on your model + session.
