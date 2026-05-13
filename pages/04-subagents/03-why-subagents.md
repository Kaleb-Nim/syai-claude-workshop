# Your main chat is finite

Every diff dump, every log spew, every multi-file scan piles into the same window. The window fills. Claude starts forgetting earlier turns. Output quality drops.

That's context bloat.

<div class="text-dim text-sm mt-6">
  the chat you're holding is the most expensive resource in the loop
</div>

---

# Subagents get their own window

A subagent runs in an isolated context window. Tool calls, intermediate reasoning, file contents — all of it lives inside the subagent, not your main chat.

Only the final summary returns to you.

---

# Where this pays off

- **Code review across many files** — the subagent reads 20 files; you see one review.
- **Research synthesis across many docs** — the subagent skims a folder of notes; you see the conclusion.
- **Log or diff analysis** — the subagent reads thousands of lines; you see the one-line takeaway.

<div class="text-dim text-sm mt-6">
  in every case, the heavy reading happens somewhere your main chat never has to load
</div>

---

# The trade

You give up live visibility into the subagent's intermediate steps. You get back a clean main chat and consistent quality across long sessions.

That's the deal. Section 04 is how you actually wire one.
