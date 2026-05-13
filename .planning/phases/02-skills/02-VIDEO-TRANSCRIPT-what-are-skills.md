---
source_url: https://www.youtube.com/watch?v=bjdBVZa66oU
title: What are skills?
channel: Claude
uploaded: 2026-02-27
duration: 2m 54s
pulled: 2026-05-13
pulled_via: yt-dlp --write-auto-subs --sub-lang en
license: third-party — quote with attribution; do not redistribute verbatim
---

# Transcript — "What are skills?" (Claude, 2026-02-27)

Auto-captions pulled from YouTube and de-duplicated. Light paragraph breaks added at topic boundaries; wording is otherwise verbatim from the auto-caption track (so minor ASR artefacts like "claw.md" for "claude.md" are preserved as-is — flagged inline).

## Body

Every time you explain your team's coding standards to Claude, you're repeating yourself. Every PR review, you redescribe how you want feedback structured. Every commit message, you remind Claude of your preferred format.

And skills fix this. A skill is a markdown file that teaches Claude how to do something once, and Claude applies that knowledge automatically whenever it's relevant. Agent skills are folders of instructions, scripts, and resources that agents can discover and use to do things more accurately and efficiently.

With Claude Code, we have the SKILL.md file. The description is how Claude decides whether to use the skill. When you ask Claude to review this PR, it matches your request against available skill descriptions and finds this one. Claude reads your request, compares it to all available skill descriptions, and activates the ones that match.

You can store skills in a few places depending on who needs them. Personal skills go in the home directory `.claude/skills` and follow you across all your projects. These are your preferences, your commit message style, your documentation format, how you like code explained. Project skills go in the `.claude/skills` inside of the root directory of your repository. Anyone who clones the repository gets these skills automatically. This is where team standards live, like your company's brand guidelines, preferred fonts, and colors that you use for web design.

Claude Code has several ways to customize behavior. Skills are unique because they're automatic and task-specific. `CLAUDE.md` files load into every conversation. If you want Claude to always use TypeScript strict mode, that goes in your `CLAUDE.md` file [ASR: "claw.md"]. Skills, on the other hand, load on demand when they match your request. It only loads in the name and description, so it doesn't fill up your entire context window. Your PR review checklist doesn't need to be in the context when you're debugging. It loads when you actually ask for a review. Slash commands require you to type them. Skills don't. Claude applies them when it recognizes the situation.

Skills work best for specialized knowledge that applies to specific tasks. Code review standards your team follows, commit message formats that you prefer, brand guidelines of your organization. If you find yourself explaining the same thing to Claude repeatedly, well, that's a skill waiting to be written.

## Key claims (for citation during slide authoring)

| # | Claim | Where it fits the deck |
|---|-------|------------------------|
| 1 | "A skill is a markdown file that teaches Claude how to do something once, and Claude applies that knowledge automatically whenever it's relevant." | Chapter 2 cover subtitle — already mirrored in `pages/02-skills/01-cover.md` |
| 2 | "The description is how Claude decides whether to use the skill." | Chapter 2 "how skills work" — `pages/02-skills/03-how-skills-work.md` |
| 3 | "It only loads in the name and description, so it doesn't fill up your entire context window." | "Why this scales" slide — `pages/02-skills/02-why-skills.md` |
| 4 | "Slash commands require you to type them. Skills don't. Claude applies them when it recognizes the situation." | "Self-invocation moment" slide — `pages/02-skills/02-why-skills.md` |
| 5 | Personal (`~/.claude/skills`) vs project (`.claude/skills` in repo root) storage split. | Storage/scope slide — `pages/02-skills/03-how-skills-work.md` |
| 6 | "If you find yourself explaining the same thing to Claude repeatedly, well, that's a skill waiting to be written." | Closing motivation / handoff to hands-on build — `pages/02-skills/04-hands-on-build.md` |

## Related plans

- `02-RESEARCH.md` — chapter research notes
- `02-CONTEXT.md` — locked decisions for chapter 2
- `02-01-PLAN.md` … `02-07-PLAN.md` — per-section plans
- `pages/02-skills/*` — rendered slides
