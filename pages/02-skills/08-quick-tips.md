# Quick tips

<div class="text-xs uppercase tracking-[0.3em] opacity-50 mt-1 mb-6">
  for skills
</div>

<div class="grid grid-cols-1 gap-4 max-w-3xl">

<div class="flex gap-4 items-baseline">
  <span class="text-dim text-sm w-6 text-right">01</span>
  <div>
    <div class="font-medium">Keep <code>SKILL.md</code> under 500 lines</div>
    <div class="text-dim text-sm mt-1">Past that, Claude skims. Split details into reference files.</div>
  </div>
</div>

<div class="flex gap-4 items-baseline">
  <span class="text-dim text-sm w-6 text-right">02</span>
  <div>
    <div class="font-medium">Use progressive disclosure</div>
    <div class="text-dim text-sm mt-1">Main file = the gist. Reference files = the depth, loaded only when needed.</div>
  </div>
</div>

<div class="flex gap-4 items-baseline">
  <span class="text-dim text-sm w-6 text-right">03</span>
  <div>
    <div class="font-medium">Write descriptions in third person</div>
    <div class="text-dim text-sm mt-1">"Creates polished UIs…" not "I create…" — Claude reads it as a tool spec.</div>
  </div>
</div>

<div class="flex gap-4 items-baseline">
  <span class="text-dim text-sm w-6 text-right">04</span>
  <div>
    <div class="font-medium">Include trigger words</div>
    <div class="text-dim text-sm mt-1">Spell out <em>when</em> to fire — phrases, file types, intents Claude should match on.</div>
  </div>
</div>

<div class="flex gap-4 items-baseline">
  <span class="text-dim text-sm w-6 text-right">05</span>
  <div>
    <div class="font-medium">Make them discoverable</div>
    <div class="text-dim text-sm mt-1">Drop in <code>~/.claude/skills/</code> or <code>.claude/skills/</code> — name the folder what the skill does.</div>
  </div>
</div>

</div>
