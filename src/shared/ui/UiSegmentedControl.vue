<script setup lang="ts">
import { computed } from "vue";

export type SegmentedOption = { value: string; label: string; disabled?: boolean };
const props = defineProps<{ modelValue: string; options: SegmentedOption[]; label: string; disabled?: boolean }>();
const emit = defineEmits<{ "update:modelValue": [value: string] }>();
const countStyle = computed(() => ({ "--ui-segmented-count": String(props.options.length) }));
</script>

<template>
  <div class="ui-segmented" role="group" :aria-label="label" :style="countStyle">
    <button
      v-for="option in options" :key="option.value" type="button" :class="{ 'is-active': option.value === modelValue }"
      :aria-pressed="option.value === modelValue" :disabled="disabled || option.disabled"
      @click="emit('update:modelValue', option.value)"
    >{{ option.label }}</button>
  </div>
</template>

<style scoped>
@layer components {
.ui-segmented { display: inline-grid; grid-template-columns: repeat(var(--ui-segmented-count), minmax(var(--ui-segmented-min-width, 92px), 1fr)); padding: var(--ui-segmented-padding, 3px); background: var(--ui-segmented-background, var(--surface-muted)); border: 1px solid var(--ui-segmented-border-color, var(--border-default)); border-radius: var(--ui-segmented-radius, var(--radius-control)); }
.ui-segmented button { min-height: var(--ui-segmented-control-height, var(--control-sm)); padding: var(--ui-segmented-control-padding, 0 var(--space-4)); color: var(--ui-segmented-color, var(--text-secondary)); background: transparent; border: 0; border-radius: var(--ui-segmented-control-radius, calc(var(--radius-control) - 3px)); font: inherit; cursor: pointer; }
.ui-segmented button.is-active { color: var(--ui-segmented-active-color, var(--inverse-text)); background: var(--ui-segmented-active-background, var(--inverse-surface)); }
.ui-segmented button:focus-visible { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
.ui-segmented button:disabled { cursor: not-allowed; opacity: .62; }
}
</style>
