<script setup lang="ts">
import { Ellipsis } from "@lucide/vue";

defineProps<{ label: string }>();
</script>

<template>
  <details class="ui-action-menu settings-row-menu">
    <summary :aria-label="label" :title="label"><Ellipsis class="visual-icon" aria-hidden="true" /></summary>
    <div><slot /></div>
  </details>
</template>

<style scoped>
.ui-action-menu { position: relative; display: inline-block; }
.ui-action-menu > summary { display: grid; place-items: center; width: 28px; height: 28px; padding: 0; color: var(--text-muted); background: transparent; border: 1px solid transparent; border-radius: var(--radius-control); cursor: pointer; list-style: none; }
.ui-action-menu > summary::-webkit-details-marker { display: none; }
.ui-action-menu > summary .visual-icon { width: 17px; height: 17px; }
.ui-action-menu > summary:hover, .ui-action-menu[open] > summary { color: var(--text-primary); background: var(--surface-muted); border-color: var(--border-subtle); }
.ui-action-menu > div { position: absolute; z-index: var(--z-popover); right: 0; bottom: calc(100% + 6px); min-width: 132px; padding: 5px; background: var(--surface); border: 1px solid var(--border-default); border-radius: var(--radius-control); box-shadow: var(--shadow-offset-sm); }
.ui-action-menu:focus-within { z-index: var(--z-popover); }

@media (max-width: 760px) { .ui-action-menu > div { top: calc(100% + 6px); bottom: auto; } }
</style>
