# Three subagents, three domains

The point of the file shape is that it doesn't care what the subagent does. Same template, very different jobs.

---

# Three real ones, stacked

<div class="flex flex-col gap-2 mt-2">

<div>

**python-pro** — language specialist

```yaml
name: python-pro
description: "Use this agent when you need to build type-safe, production-ready Python code for web APIs, system utilities, or complex applications requiring modern async patterns and extensive type coverage."
tools: Read, Write, Edit, Bash, Glob, Grep
model: sonnet
```

</div>

<div>

**quant-analyst** — finance / risk modelling

```yaml
name: quant-analyst
description: "Use this agent when you need to develop quantitative trading strategies, build financial models with rigorous mathematical foundations, or conduct advanced risk analytics for derivatives and portfolios."
tools: Read, Write, Edit, Bash, Glob, Grep
model: opus
```

</div>

<div>

**market-researcher** — research and synthesis

```yaml
name: market-researcher
description: "Use this agent when you need to analyze markets, understand consumer behavior, assess competitive landscapes, and size opportunities to inform business strategy and market entry decisions."
tools: Read, Grep, Glob, WebFetch, WebSearch
model: sonnet
```

</div>

</div>

<div class="text-dim text-xs mt-3">
  one SWE specialist, one quant, one researcher · <code>tools</code> and <code>model</code> shift per job — same shape
</div>

<style scoped>
pre, code {
  font-size: 0.62rem !important;
  line-height: 1.25 !important;
}
.slidev-code {
  padding: 0.35em 0.7em !important;
  margin: 0.15em 0 !important;
}
h1 {
  margin-bottom: 0.3em !important;
}
</style>
