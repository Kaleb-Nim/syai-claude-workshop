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

# Install Claude Code — 3 steps in your terminal

<div class="text-sm opacity-70 mb-2">1 · install the CLI globally</div>

```bash
npm install -g @anthropic-ai/claude-code
```

<div class="text-sm opacity-70 mt-4 mb-2">2 · export the API key (this terminal only)</div>

```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

<div class="text-sm opacity-70 mt-4 mb-2">3 · run <code>claude</code> — when it asks about the key, pick <b>Yes</b></div>

```text
Detected a custom API key in your environment

ANTHROPIC_API_KEY: sk-ant-...CgAA

Do you want to use this API key?
❯ 1. Yes
  2. No (recommended)
```

<div class="text-dim text-xs mt-2">
the "No (recommended)" default assumes OAuth login — today, pick <b>Yes</b> to use the workshop key.
</div>
