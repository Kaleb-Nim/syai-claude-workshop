# Hooks are the opposite end

In Chapter 2, **Claude** decided when to load the skill — based on what you asked. A hook flips it.

With a hook, **you** wire the exact when. Every time Claude does X, run Y. Deterministic. No model judgment in the loop.

<div class="text-dim text-sm mt-6">
  skill = Claude decides the "when" · hook = you wire the "when"
</div>

---

# IF this, THEN that

- **IF** Claude finishes  →  **THEN** play a sound
- **IF** Claude uses a tool  →  **THEN** log it
- **IF** you submit a prompt  →  **THEN** check it first

<div class="text-dim text-sm mt-6">
  the "THEN" is just a shell command — anything you can run in your terminal. today we make it a sound.
</div>

---

# What makes hooks different

> The key diff between Hooks and everything else is that Hooks are deterministic, they always run

You can tell Claude in your `CLAUDE.md` to ping you every time it needs input — but it's not perfect. A hook runs every single time, without exceptions.

<div class="text-dim text-sm mt-6">
  the rule you put in <code>~/.claude/CLAUDE.md</code> in Chapter 1 — that's the imperfect version of a hook
</div>

---

# In essence

> If something needs to happen every single time, don't put it in a prompt, put it in a hook
