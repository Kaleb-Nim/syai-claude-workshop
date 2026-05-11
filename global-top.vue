<!--
  GlobalTop.vue — slim top-of-viewport progress bar.

  Slidev auto-discovers any `components/GlobalTop.vue` and mounts it
  via the built-in `global-top` slot: rendered ABOVE every slide on
  every layout, but EXCLUDED from presenter chrome (sidebar thumbnails,
  overview tiles). This satisfies D-14/D-15 scoping (presenter chrome
  must keep default Slidev appearance) without explicit guarding.

  Width = currentPage / total — driven by `useNav()` reactive refs,
  the canonical Slidev API. Do not derive from the router manually.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentPage, total } = useNav()

const progress = computed(() =>
  total.value > 0 ? (currentPage.value / total.value) * 100 : 0,
)
</script>

<template>
  <div class="gsd-progress-top" aria-hidden="true">
    <div
      class="gsd-progress-top__fill"
      :style="{ width: progress + '%' }"
    />
  </div>
</template>

<style scoped>
.gsd-progress-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 100;
  pointer-events: none;
  background: transparent;
}

.gsd-progress-top__fill {
  height: 100%;
  background-color: var(--accent);
  transition: width 300ms ease-out;
  will-change: width;
}
</style>
