<script setup lang="ts">
withDefaults(defineProps<{
  pressed: boolean;
  tone?: "blue" | "orange" | "acid" | "ink" | "clay" | "sky" | "ochre";
  disabled?: boolean;
}>(), {
  tone: "blue",
  disabled: false,
});
</script>

<template>
  <button class="ui-filter-chip" :class="[{ 'is-active': pressed }, `ui-filter-chip--${tone}`]" type="button" :aria-pressed="pressed" :disabled="disabled">
    <i aria-hidden="true"></i><span><slot /></span>
  </button>
</template>

<style scoped>
.ui-filter-chip {
  display: inline-flex;
  gap: var(--space-1);
  align-items: center;
  min-height: 30px;
  padding: 5px 9px;
  color: var(--text-secondary);
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-control);
  box-shadow: 0 1px 2px rgba(21, 49, 43, .05);
  font: inherit;
  font-size: var(--font-size-meta);
  font-weight: 630;
  line-height: 1;
  cursor: pointer;
  transition: color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard);
}
.ui-filter-chip:hover:not(:disabled) { color: var(--text-primary); background: var(--surface-muted); border-color: var(--border-strong); }
.ui-filter-chip.is-active { color: var(--text-primary); background: var(--accent-highlight); border-color: var(--text-primary); }
.ui-filter-chip:focus-visible { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
.ui-filter-chip:disabled { cursor: not-allowed; opacity: .55; }
.ui-filter-chip i { display: block; width: 11px; height: 11px; background: var(--chip-mark, var(--accent-info)); border-radius: var(--radius-xs); }
.ui-filter-chip.is-active i { background: var(--text-primary); }
.ui-filter-chip--orange { --chip-mark: var(--accent-primary); }
.ui-filter-chip--acid { --chip-mark: var(--accent-highlight); }
.ui-filter-chip--ink { --chip-mark: var(--text-secondary); }
.ui-filter-chip--clay { --chip-mark: #c67f56; }
.ui-filter-chip--sky { --chip-mark: var(--accent-info); }
.ui-filter-chip--ochre { --chip-mark: #b28c4c; }
</style>
