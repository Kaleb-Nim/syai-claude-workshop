# Workshop subagent demo candidates — research

**Researched:** 2026-05-15
**For:** `pages/04-subagents/06-hands-on-build.md` + `07-hands-on-fire.md`
**Goal:** 3–5 alternative/additional ≤5-min `/agents` demos to swap in alongside (or instead of) `commit-message-writer`.

---

## Top-line recommendation

**Use `log-tail-summarizer`** as the single best addition. It shows the isolation payoff harder than CMW does — a 500-line log dump stays inside the subagent's window, only a 3-bullet diagnosis comes back. Every participant has a log file somewhere (`npm`/`bun` output, `git log`, `~/.claude/projects/.../*.jsonl`). Builds in under 5 min with Bash + Read.

If the instructor wants **two** new examples to rotate through, pair it with **`pr-describer`** — same flavor as CMW (git input → terse output) but a step up in real-world utility, so it lands as "I'm using this tomorrow."

---

## Candidate table

| # | Name | One-line purpose | Tools | What lesson it teaches | 5-min buildable? | `/agents` "Generate with Claude" description |
|---|------|-------------------|-------|------------------------|------------------|---------------------------------------------|
| 1 | **`log-tail-summarizer`** ⭐ | Read the last N lines of a log file, return top errors + 1-line diagnosis. | Bash, Read | **Isolation at scale** — hundreds of log lines never enter main chat. | Yes | `A log-tail-summarizer that takes a file path, runs tail -n 500 on it, and returns the top 3 error patterns with a one-line diagnosis. No raw log lines in the output.` |
| 2 | **`pr-describer`** | Turn `git diff origin/main...HEAD` into a PR title + 3-bullet body. | Bash, Read | **Summarization + delegation** — variant of CMW, longer input, structured output. | Yes | `A pr-describer that runs git diff against origin/main and returns a PR title (≤60 chars) plus a 3-bullet body describing what changed and why. Markdown only.` |
| 3 | **`repo-mapper`** | Walk the repo, return a one-paragraph "what is this codebase" summary + entry points. | Read, Glob, Grep, Bash | **Read-many-files, return-one-thing** — the canonical subagent shape from Anthropic's docs. | Yes | `A repo-mapper that explores the current directory's top-level structure and returns a one-paragraph description of what the project does plus its 3 most important entry-point files.` |
| 4 | **`url-fact-checker`** | Given a claim + URL, fetch the page and return verdict (supports / contradicts / silent) + 1 quote. | WebFetch | **WebFetch isolation** — entire HTML page stays in subagent, one quote returns. Single-tool simplicity. | Yes | `A url-fact-checker that takes a URL and a claim, fetches the page, and returns one of {supports, contradicts, silent} plus a single supporting quote ≤25 words.` |
| 5 | **`todo-harvester`** | Grep the repo for `TODO`/`FIXME`/`XXX`, return a grouped table by file and priority. | Grep, Read | **Many-results-to-summary** — raw grep output (potentially hundreds of hits) compressed to a table. | Yes | `A todo-harvester that greps the project for TODO, FIXME, and XXX markers and returns a markdown table grouped by file with the comment text trimmed to 60 chars.` |

---

## Detailed write-ups (top 3)

These mirror the format of slides 06 and 07 so the instructor can slot them in directly.

### 1. `log-tail-summarizer` ⭐ — recommended primary swap

**Build it — paste into `/agents` "Generate with Claude":**

> A log-tail-summarizer that takes a file path, runs `tail -n 500` on it, and returns the top 3 error patterns with a one-line diagnosis. No raw log lines in the output.

**Tools to select:** Bash, Read. Deselect everything else.
**Model:** Sonnet. **Memory:** None.

**Fire it:**

```
# Step 0 — make sure you have a log file. Any of these work:
ls ~/.claude/projects/*/*.jsonl | tail -1     # claude session log
# or
bun install 2> /tmp/install.log               # capture something fresh
# or just point it at any .log file you have

# Step 1 — invoke
@log-tail-summarizer /tmp/install.log
```

**What you should see come back:**

```
Top error patterns:
1. EACCES on node_modules/.bin (12×) — permission issue
2. ETIMEDOUT registry.npmjs.org (4×) — flaky network
3. peer dep mismatch on react@19 (2×) — version conflict

Diagnosis: install is failing mostly on permissions; fix with chown then retry.
```

**The teaching moment:** open `/agents` → Running tab while it works. Participants see the subagent reading hundreds of lines. Back in main chat: 5 lines. *That's* the isolated context window.

---

### 2. `pr-describer` — the "I'll use this tomorrow" pick

**Build it — paste into `/agents`:**

> A pr-describer that runs `git diff origin/main...HEAD` and returns a PR title (≤60 chars, conventional-commit style) plus a 3-bullet body describing what changed and why. Markdown only, no preamble.

**Tools:** Bash, Read. **Model:** Sonnet. **Memory:** None.

**Fire it:**

```
# Step 0 — need at least one commit ahead of main
git checkout -b demo-pr
echo "// test change" >> README.md && git commit -am "tweak readme"

# Step 1 — invoke
@pr-describer
```

**What you should see come back:**

```
**docs: clarify README intro for new contributors**

- Reworded the opening paragraph for clarity
- Added a one-line tagline above the install section
- No behavioral changes; docs-only
```

**The teaching moment:** same isolation lesson as CMW but on a longer diff — and the output is something they'd genuinely paste into GitHub. Reinforces the pattern from slide 06 without being a rerun.

---

### 3. `repo-mapper` — best illustration of read-many-return-one

**Build it — paste into `/agents`:**

> A repo-mapper that explores the current directory's top-level structure (ignoring `node_modules`, `dist`, `.git`) and returns a one-paragraph description of what the project does plus its 3 most important entry-point files with one-line explanations.

**Tools:** Read, Glob, Grep, Bash. **Model:** Sonnet. **Memory:** None.

**Fire it:**

```
@repo-mapper
```

(no setup — runs against whatever repo they're in)

**What you should see come back:**

```
This is a Slidev-based workshop deck (Vue 3 + Vite under the hood) built with
Bun, deployed to Vercel. The deck teaches advanced Claude Code workflows
across four chapters: setup, skills, hooks, subagents.

Entry points:
- slides.md — top-level deck index, imports all chapter pages
- pages/04-subagents/ — current chapter under construction
- components/SubagentTabs.vue — custom Vue component for live source viewing
```

**The teaching moment:** this one is *visibly* heavy. The subagent runs many Globs, opens several files, reads `package.json`, maybe `README.md`. Main chat sees three sentences. The asymmetry between work done and tokens returned is the lesson.

---

## Anti-patterns — examples that *sound* good but break the workshop

| Bad example | Why it fails |
|-------------|--------------|
| **`code-reviewer`** (the canonical Anthropic example) | Output is long, prose-heavy, and looks like normal Claude output — participants can't *feel* the isolation benefit. Also: Anthropic's docs already use it as the headline example, so it's been seen. Save it as a reference, don't demo it. |
| **`test-runner` / `test-fixer`** | Half the room will be in a repo without tests or with a broken test setup. High chance of "works on instructor's machine." Violates rule #4. |
| **`react-component-reviewer`** (or any framework-specific) | Stack-gated. Half the room isn't in a React/Vue/Svelte repo. Violates rule #4. |
| **`security-auditor`** | Vague scope, slow, output is a long report — doesn't show the isolation/summarization punch in a 30-second demo. Same problem as code-reviewer but worse. |
| **`refactor-suggester`** | Needs Edit tool to be useful, and "suggest only" mode produces walls of prose. Output volume kills the lesson. |
| **`documentation-writer`** | Output is *meant* to be long — that's the opposite of the lesson. Subagents shine when output is **shorter** than the work done. |

**The pattern:** good workshop demos return a **small structured artifact** (1 commit line, 3 bullets, 1 paragraph, a table). Bad ones return prose reports.

---

## Picking guidance for the instructor

- **Want maximum "aha"?** → `log-tail-summarizer` (the asymmetry is visible).
- **Want CMW-adjacent variety?** → `pr-describer` (same shape, more useful).
- **Want to teach delegation across many files?** → `repo-mapper`.
- **Want a single-tool minimalist demo?** → `url-fact-checker` (only WebFetch).
- **Want a Grep-heavy demo?** → `todo-harvester`.

Suggested deck change: keep CMW as slide 06/07 (it's already polished), and **add `log-tail-summarizer` as a second hands-on right after fire-it**, with the framing "now build another one — same flow, different shape, watch the size of what comes back."

---

## Sources

- [Anthropic — Create custom subagents (official docs)](https://code.claude.com/docs/en/sub-agents) — canonical examples (`code-reviewer`, `debugger`, `data-scientist`), frontmatter spec, best-practices block ("design focused subagents", "limit tool access").
- [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) — already cited in `SubagentTabs.vue`. Heavy/specialist agents; useful for showcase, not for ≤5-min demos.
- [wshobson/agents](https://github.com/wshobson/agents) — surveyed for small single-purpose ideas (log-parser, dependency-lister, url-validator inspired candidates 1, 4, 5).
- [iannuttall/claude-agents](https://github.com/iannuttall/claude-agents) — confirms `code-reviewer` / `security-auditor` are oversaturated picks; informed the anti-patterns table.
- Existing workshop slides — `pages/04-subagents/03-why-subagents.md` (isolation framing), `06-hands-on-build.md` and `07-hands-on-fire.md` (format mirrored above).

---

## Confidence

| Claim | Confidence | Why |
|-------|-----------|-----|
| `log-tail-summarizer` is the strongest demo | HIGH | Directly satisfies all 6 workshop criteria; isolation visible. |
| All 5 candidates buildable via `/agents` "Generate with Claude" in ≤5 min | HIGH | Each is one sentence, uses only default tools per Anthropic spec. |
| Anti-pattern list (code-reviewer, test-runner, etc. unsuitable) | MEDIUM-HIGH | Reasoned against criteria; instructor judgement may differ on `code-reviewer` given its canonical status. |
| Community agent collections are mostly too heavy for this slot | HIGH | Confirmed via repo surveys; matches existing showcase choice. |
