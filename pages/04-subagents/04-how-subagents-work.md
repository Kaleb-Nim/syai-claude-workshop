# How it gets invoked

Two paths, both supported:

- **You invoke it** — type `@` and pick from the typeahead, or open `/agents` and run it from the UI. Guaranteed to run.
- **Claude invokes it** — Claude reads the `description:` field and reaches for the Task / Agent tool when the field matches your request. Heuristic, not guaranteed — include `use proactively` in `description:` to nudge it.

<div class="text-dim text-sm mt-6">
  <code>@subagent-name</code> is the manual handle · <code>description:</code> is the auto-delegation hook
</div>

<div class="text-dim text-xs mt-2">
  Claude Code v2.1.63 renamed the <strong>Task</strong> tool to <strong>Agent</strong> — old <code>Task(...)</code> references still work as aliases
</div>
