<script setup lang="ts">
import { useId } from "vue";

const props = withDefaults(defineProps<{
  modelValue: string;
  value: string;
  name: string;
  title: string;
  description: string;
  mark?: string;
  compact?: boolean;
  disabled?: boolean;
}>(), {
  mark: undefined,
  compact: false,
  disabled: false,
});

const emit = defineEmits<{ "update:modelValue": [value: string] }>();
const id = useId();
</script>

<template>
  <label
    class="ui-radio-card"
    :class="{ 'is-selected': modelValue === value, 'ui-radio-card--compact': compact }"
    :for="id"
  >
    <input
      :id="id"
      class="sr-only"
      type="radio"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      :disabled="disabled"
      @change="emit('update:modelValue', props.value)"
    />
    <span v-if="mark || $slots.mark" class="ui-radio-card__mark" aria-hidden="true">
      <slot name="mark">{{ mark }}</slot>
    </span>
    <span class="ui-radio-card__copy">
      <strong>{{ title }}</strong>
      <small>{{ description }}</small>
    </span>
    <i class="ui-radio-card__indicator" aria-hidden="true"></i>
  </label>
</template>

<style scoped>
@layer components {
.ui-radio-card {
  position: relative;
  display: grid;
  grid-template-columns: var(--ui-radio-columns, 42px minmax(0, 1fr) 14px);
  gap: var(--ui-radio-gap, 11px);
  align-items: center;
  min-width: 0;
  min-height: var(--ui-radio-min-height, 82px);
  padding: var(--ui-radio-padding, 12px);
  color: var(--ui-radio-color, var(--text-primary));
  background: var(--ui-radio-background, var(--surface));
  border: 1px solid var(--ui-radio-border-color, var(--border-default));
  border-radius: var(--ui-radio-radius, var(--radius-control));
  cursor: pointer;
  transition: background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard);
}
.ui-radio-card:hover { border-color: var(--ui-radio-hover-border-color, var(--text-primary)); transform: var(--ui-radio-hover-transform, translateY(-1px)); }
.ui-radio-card:has(input:focus-visible) { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
.ui-radio-card.is-selected { background: var(--ui-radio-selected-background, var(--surface-muted)); border-color: var(--ui-radio-selected-border-color, var(--text-primary)); box-shadow: var(--ui-radio-selected-shadow, var(--shadow-offset-sm)); }
.ui-radio-card:has(input:disabled) { cursor: not-allowed; opacity: .58; }
.ui-radio-card__mark { display: grid; place-items: center; width: var(--ui-radio-mark-size, 40px); height: var(--ui-radio-mark-size, 40px); color: var(--ui-radio-mark-color, var(--accent-highlight)); background: var(--ui-radio-mark-background, var(--inverse-surface)); border: var(--ui-radio-mark-border, 0); border-radius: var(--ui-radio-mark-radius, var(--radius-control)); font-family: var(--font-code); font-size: var(--ui-radio-mark-font-size, var(--font-size-meta)); font-weight: var(--font-weight-bold); }
.ui-radio-card__copy { min-width: 0; }
.ui-radio-card strong, .ui-radio-card small { display: block; }
.ui-radio-card strong { color: var(--ui-radio-title-color, var(--text-primary)); font-size: var(--ui-radio-title-size, var(--font-size-body-sm)); }
.ui-radio-card small { margin-top: 3px; color: var(--ui-radio-detail-color, var(--text-muted)); font-size: var(--ui-radio-detail-size, var(--font-size-ui)); line-height: 1.45; }
.ui-radio-card__indicator { width: 12px; height: 12px; border: 1px solid var(--ui-radio-indicator-border, var(--border-default)); border-radius: 50%; }
.ui-radio-card.is-selected .ui-radio-card__indicator { background: var(--ui-radio-accent, var(--accent-primary)); border: 3px solid var(--surface); box-shadow: 0 0 0 1px var(--ui-radio-accent, var(--accent-primary)); }
.ui-radio-card--compact { grid-template-columns: minmax(0, 1fr) 14px; min-height: var(--ui-radio-compact-min-height, 65px); padding: var(--ui-radio-compact-padding, 11px 12px); box-shadow: none; }
.ui-radio-card--compact.is-selected { box-shadow: inset 3px 0 0 var(--ui-radio-accent, var(--accent-primary)); }
}
</style>
