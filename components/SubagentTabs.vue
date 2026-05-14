<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import pythonProRaw from '../pages/04-subagents/_agents/python-pro.md?raw'
import quantAnalystRaw from '../pages/04-subagents/_agents/quant-analyst.md?raw'
import marketResearcherRaw from '../pages/04-subagents/_agents/market-researcher.md?raw'

type Parsed = {
  id: string
  name: string
  description: string
  tools: string
  model: string
  yaml: string
  body: string
}

function parse(id: string, raw: string): Parsed {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  const yaml = m ? m[1] : ''
  const body = m ? m[2].replace(/^\n+/, '') : raw
  const fm: Record<string, string> = {}
  for (const line of yaml.split('\n')) {
    const km = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/)
    if (!km) continue
    let v = km[2].trim()
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1)
    }
    fm[km[1]] = v
  }
  return {
    id,
    name: fm.name ?? id,
    description: fm.description ?? '',
    tools: fm.tools ?? '',
    model: fm.model ?? '',
    yaml,
    body,
  }
}

const agents: Parsed[] = [
  parse('python-pro', pythonProRaw),
  parse('quant-analyst', quantAnalystRaw),
  parse('market-researcher', marketResearcherRaw),
]

const active = ref(agents[0].id)
const bodyOpen = ref(false)

watch(active, () => {
  bodyOpen.value = false
})

const current = computed(() => agents.find(a => a.id === active.value)!)
</script>

<template>
  <div class="subagent-tabs">
    <div class="tab-row">
      <button
        v-for="a in agents"
        :key="a.id"
        :class="{ active: active === a.id }"
        @click="active = a.id"
      >
        {{ a.id }}
      </button>
    </div>

    <div class="agent-pane">
      <pre class="yaml-block">---
name: {{ current.name }}
description: "{{ current.description }}"
tools: {{ current.tools }}
model: {{ current.model }}
---</pre>

      <button class="toggle" @click="bodyOpen = !bodyOpen">
        {{ bodyOpen ? '▾' : '▸' }} system prompt body
        <span class="hint">({{ current.body.split('\n').length }} lines)</span>
      </button>

      <pre v-if="bodyOpen" class="body-block">{{ current.body }}</pre>
    </div>

    <div class="footer-note">
      source · <code>VoltAgent/awesome-claude-code-subagents</code>
    </div>
  </div>
</template>

<style scoped>
.subagent-tabs {
  font-size: 0.85rem;
  margin-top: 0.4rem;
}

.tab-row {
  display: flex;
  gap: 0.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 0.6rem;
}

.tab-row button {
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 0.35rem 0.75rem;
  font-family: var(--slidev-code-font-family, ui-monospace, monospace);
  font-size: 0.78rem;
  color: var(--slidev-theme-text, #ccc);
  opacity: 0.55;
  cursor: pointer;
  transition: opacity 0.15s, border-color 0.15s;
}

.tab-row button:hover {
  opacity: 0.85;
}

.tab-row button.active {
  opacity: 1;
  border-bottom-color: #cc785c;
  color: #cc785c;
}

.agent-pane {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.yaml-block {
  font-family: var(--slidev-code-font-family, ui-monospace, monospace);
  font-size: 0.7rem;
  line-height: 1.4;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 0.55rem 0.75rem;
  margin: 0;
  white-space: pre-wrap;
  overflow-x: auto;
}

.toggle {
  align-self: flex-start;
  background: transparent;
  border: none;
  padding: 0.15rem 0;
  font-family: var(--slidev-code-font-family, ui-monospace, monospace);
  font-size: 0.72rem;
  color: #cc785c;
  cursor: pointer;
  opacity: 0.85;
}

.toggle:hover {
  opacity: 1;
}

.toggle .hint {
  color: var(--slidev-theme-text, #ccc);
  opacity: 0.45;
  margin-left: 0.4rem;
}

.body-block {
  font-family: var(--slidev-code-font-family, ui-monospace, monospace);
  font-size: 0.6rem;
  line-height: 1.35;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  padding: 0.6rem 0.8rem;
  margin: 0;
  max-height: 48vh;
  overflow-y: auto;
  white-space: pre-wrap;
}

.footer-note {
  margin-top: 0.6rem;
  font-size: 0.65rem;
  opacity: 0.45;
}

.footer-note code {
  font-size: 0.65rem;
  background: transparent;
  padding: 0;
}
</style>
