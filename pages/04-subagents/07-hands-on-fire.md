# Fire it

**Step 0 — Make sure you have an uncommitted change:**

```
echo "test" >> README.md
```

**Step 1 — Confirm the subagent is registered:** run `/agents` again, switch to the **Library** tab.

> ✓ Check: `commit-message-writer` is listed.

**Step 2 — Invoke it explicitly:** in your main Claude Code chat, type `@` and pick `commit-message-writer` from the typeahead (or type `@agent-commit-message-writer` directly). Send.

> ✓ Check: Claude returns one conventional-commit line. The `git diff` output never appears in your main chat — that's the isolated context window from Section 03, working.

<div class="text-dim mt-6">
  Auto-delegation via <code>description:</code> is heuristic. <code>@</code>-mention guarantees the subagent runs.
</div>

<div class="text-dim text-sm mt-2">
  One subagent, one window, one summary back. Add more later — same pattern.
</div>
