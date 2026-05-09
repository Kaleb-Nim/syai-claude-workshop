---
title: syai-claude-workshop
info: |
  Advanced Claude Code workshop scaffold.
  Phase 1 placeholder deck.
class: text-center
drawings:
  persist: false
mdc: true
---

# syai-claude-workshop

advanced Claude Code workshop scaffold

<div class="text-sm opacity-60 mt-8">
  Phase 1 placeholder — content authored after handoff
</div>

---

# Code blocks work

Shiki highlighting wired and rendering in dev, build, and preview:

```ts
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({ prompt: "ship it" })) {
  console.log(message);
}
```

---
layout: section
---

# Deep-linking works

This is slide `/3` — the SPA-rewrite verification target.
