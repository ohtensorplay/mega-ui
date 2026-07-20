<script setup lang="ts">
withDefaults(defineProps<{ pressed: boolean; disabled?: boolean }>(), { disabled: false });
</script>

<template><button class="ui-choice-card" type="button" :class="{ 'is-active': pressed }" :aria-pressed="pressed" :disabled="disabled"><slot /></button></template>

<style scoped>
@layer components {
.ui-choice-card { display: var(--ui-choice-display, grid); flex-direction: var(--ui-choice-flex-direction, row); gap: var(--ui-choice-gap, 0); align-items: var(--ui-choice-align-items, stretch); justify-content: var(--ui-choice-justify-content, normal); min-height: var(--ui-choice-min-height, var(--control-lg)); padding: var(--ui-choice-padding, var(--space-4)); overflow: var(--ui-choice-overflow, visible); color: var(--ui-choice-color, var(--text-primary)); font-family: var(--ui-choice-font-family, inherit); text-align: var(--ui-choice-text-align, left); background: var(--ui-choice-background, var(--surface)); border: 1px solid var(--ui-choice-border-color, var(--border-default)); border-radius: var(--ui-choice-radius, var(--radius-control)); box-shadow: var(--ui-choice-shadow, var(--shadow-hairline)); cursor: pointer; }
.ui-choice-card:hover:not(:disabled) { border-color: var(--ui-choice-hover-border-color, var(--text-subtle)); transform: var(--ui-choice-hover-transform, translateY(-1px)); }
.ui-choice-card.is-active { color: var(--ui-choice-active-color, var(--ui-choice-color, var(--inverse-text))); background: var(--ui-choice-active-background, var(--ui-choice-background, var(--inverse-surface))); border-color: var(--ui-choice-active-border-color, var(--inverse-surface)); box-shadow: var(--ui-choice-active-shadow, none); }
.ui-choice-card:focus-visible { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
.ui-choice-card:disabled { cursor: not-allowed; opacity: .6; }
}
</style>
