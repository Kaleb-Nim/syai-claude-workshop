# Fire it

Step 1 — run `claude` and ask, in plain English:

```text
Explain hooks in pirate-mode.
```

> ✓ Check: Claude's response opens with "Ahoy ye sigma" and ends with "— per pirate-mode." You never typed a slash command.

Step 2 — ask Claude a normal, unrelated question:

```text
What's a git rebase?
```

> ✓ Check: no "Ahoy," no "— per pirate-mode" — the skill didn't fire because nothing in your prompt matched its description.

<div class="text-dim text-sm mt-6">
  Two prompts, one skill. Claude chose when to use it — that's the whole point.
</div>
