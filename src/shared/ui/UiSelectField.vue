<script setup lang="ts">
import { ref, useId } from "vue";

defineOptions({ inheritAttrs: false });

defineProps<{
  modelValue: string;
  label: string;
  name: string;
  compact?: boolean;
  hiddenLabel?: boolean;
  rootClass?: string;
  hint?: string;
}>();

const emit = defineEmits<{ "update:modelValue": [value: string] }>();
const inputId = useId();
const select = ref<HTMLSelectElement | null>(null);
defineExpose({ focus: () => select.value?.focus() });
</script>

<template>
  <label class="ui-select" :class="[{ 'ui-select--compact': compact }, rootClass]" :for="inputId">
    <slot name="leading" />
    <span :class="{ 'sr-only': hiddenLabel }">{{ label }}</span>
    <select
      ref="select"
      :id="inputId"
      v-bind="$attrs"
      :name="name"
      :value="modelValue"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <slot />
    </select>
    <small v-if="hint" class="ui-select__hint">{{ hint }}</small>
  </label>
</template>

<style scoped>
.ui-select { display: grid; gap: var(--ui-select-gap, var(--space-2)); color: var(--ui-select-color, var(--text-primary)); font-family: var(--ui-select-font-family, inherit); font-size: var(--ui-select-font-size, var(--font-size-body-sm)); font-weight: var(--ui-select-font-weight, var(--font-weight-semibold)); letter-spacing: var(--ui-select-letter-spacing, 0); text-transform: var(--ui-select-text-transform, none); }
.ui-select select {
  min-height: var(--ui-select-min-height, var(--control-lg));
  padding: var(--ui-select-padding, 0 36px 0 var(--space-3));
  color: var(--ui-select-control-color, var(--text-primary));
  background: var(--ui-select-background, var(--surface-raised));
  border: 1px solid var(--ui-select-border-color, var(--border-default));
  border-radius: var(--ui-select-border-radius, var(--radius-control));
  font: inherit;
  font-family: var(--ui-select-control-font-family, inherit);
  font-size: var(--ui-select-control-font-size, var(--font-size-body-sm));
  font-weight: var(--ui-select-control-font-weight, inherit);
  letter-spacing: 0;
  text-transform: var(--ui-select-control-text-transform, none);
}
.ui-select select:hover { border-color: var(--border-strong); }
.ui-select select:focus { border-color: var(--ui-select-focus-border-color, var(--color-focus)); outline: var(--ui-select-focus-outline, var(--focus-outline)); outline-offset: var(--ui-select-focus-offset, 1px); }
.ui-select__hint { min-height: 18px; color: var(--ui-select-hint-color, var(--text-subtle)); font-family: var(--ui-select-hint-font-family, inherit); font-size: var(--ui-select-hint-font-size, var(--font-size-ui)); font-weight: var(--ui-select-hint-font-weight, var(--font-weight-regular)); letter-spacing: var(--ui-select-hint-letter-spacing, 0); line-height: var(--ui-select-hint-line-height, 1.45); text-transform: var(--ui-select-hint-text-transform, none); }
.ui-select--compact { display: inline-flex; gap: var(--space-1); align-items: center; min-height: 34px; padding: 0 7px 0 10px; color: var(--text-secondary); background: var(--surface); border: 1px solid var(--border-default); border-radius: var(--radius-control); font-size: var(--font-size-meta); font-weight: 660; white-space: nowrap; }
.ui-select--compact :deep(svg) { flex: 0 0 auto; width: 13px; height: 13px; }
.ui-select--compact select { min-width: 104px; min-height: 32px; padding: 0 17px 0 0; color: var(--text-secondary); appearance: none; background: transparent; border: 0; cursor: pointer; font-size: var(--font-size-meta); font-weight: 660; }
</style>
