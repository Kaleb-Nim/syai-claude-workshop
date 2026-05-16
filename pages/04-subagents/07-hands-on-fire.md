# Fire it

**Step 0 — Make a log to feed it.** Paste this into your terminal to plant a predictable mix of errors:

```bash
cat > /tmp/demo.log <<'EOF'
2026-05-15 09:12:01 INFO  starting install
2026-05-15 09:12:02 ERROR EACCES: permission denied, open '/usr/local/lib/node_modules/.bin/foo'
2026-05-15 09:12:03 ERROR EACCES: permission denied, open '/usr/local/lib/node_modules/.bin/bar'
2026-05-15 09:12:04 WARN  retrying...
2026-05-15 09:12:05 ERROR ETIMEDOUT registry.npmjs.org
2026-05-15 09:12:06 INFO  resolving deps
2026-05-15 09:12:07 ERROR EACCES: permission denied, open '/usr/local/lib/node_modules/.bin/baz'
2026-05-15 09:12:08 WARN  peer dep mismatch: react@19 expected, found react@18
2026-05-15 09:12:09 ERROR ETIMEDOUT registry.npmjs.org
2026-05-15 09:12:10 INFO  retrying network
2026-05-15 09:12:11 ERROR EACCES: permission denied, open '/usr/local/lib/node_modules/.bin/qux'
2026-05-15 09:12:12 WARN  peer dep mismatch: react-dom@19 expected, found react-dom@18
2026-05-15 09:12:13 ERROR ETIMEDOUT registry.npmjs.org
2026-05-15 09:12:14 INFO  giving up after 3 attempts
2026-05-15 09:12:15 ERROR install failed
EOF
```

**Step 1 — Confirm the subagent is registered:** run `/agents` again, switch to the **Library** tab.

> ✓ Check: `log-tail-summarizer` is listed.

**Step 2 — Invoke it explicitly:** in your main Claude Code chat, type `@` and pick `log-tail-summarizer` from the typeahead (or type `@agent-log-tail-summarizer` directly), then pass the path. Send:

```
@log-tail-summarizer /tmp/demo.log
```

> ✓ Check: Claude returns ~5 lines — top 3 error patterns + a one-line diagnosis. The raw log lines `tail` produced never appear in your main chat — that's the isolated context window from Section 03, working at scale.

<div class="text-dim mt-6">
  Auto-delegation via <code>description:</code> is heuristic. <code>@</code>-mention guarantees the subagent runs.
</div>

<div class="text-dim text-sm mt-2">
  Large input, small output. The bigger the noise the subagent absorbs, the more your main context wins.
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
