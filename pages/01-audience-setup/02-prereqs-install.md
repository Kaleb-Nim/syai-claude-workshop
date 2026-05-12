# Before we start — what you need

**On your laptop:**

- macOS, Linux, or Windows (WSL recommended on Windows)
- a terminal you're comfortable in
- **Node.js 18+** — check with `node --version` · [download](https://nodejs.org/en/download)
- **git** — check with `git --version` · [download](https://git-scm.com/downloads)

**From us (today only):**

- a temporary **Anthropic API key** — we'll hand these out

<div class="text-dim text-sm mt-6">
no Claude account, no billing setup, no OAuth — the key is all you need
</div>

---

# Install Claude Code — 3 commands

```bash
# 1. install the CLI globally
npm install -g @anthropic-ai/claude-code

# 2. set the API key we gave you (this terminal only)
export ANTHROPIC_API_KEY=sk-ant-...

# 3. verify, then launch
claude --version
claude
```

<div class="text-dim text-sm mt-4">
first run drops you into an interactive session. type a message, hit enter.<br/>
exit with <code>/exit</code> or <kbd>Ctrl-D</kbd>. you're ready.
</div>

<div class="text-sm mt-6 opacity-70">
stuck? raise a hand — we'll get you unblocked before slide 4.
</div>
