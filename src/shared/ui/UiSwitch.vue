<script setup lang="ts">
withDefaults(defineProps<{ modelValue: boolean; label: string; disabled?: boolean }>(), { disabled: false });
const emit = defineEmits<{ "update:modelValue": [value: boolean]; change: [value: boolean] }>();

function toggle(value: boolean): void {
  emit("update:modelValue", value);
  emit("change", value);
}
</script>

<template>
  <button class="ui-switch" :class="{ 'is-active': modelValue }" type="button" role="switch" :aria-checked="modelValue" :aria-label="label" :disabled="disabled" @click="toggle(!modelValue)"><span aria-hidden="true"></span></button>
</template>

<style scoped>
@layer components {
.ui-switch { position: relative; display: block; width: var(--ui-switch-width, 44px); height: var(--ui-switch-height, 24px); padding: 0; background: var(--ui-switch-background, var(--surface-muted)); border: 1px solid var(--ui-switch-border-color, var(--border-default)); border-radius: var(--radius-pill); cursor: pointer; }
.ui-switch > span { position: absolute; top: var(--ui-switch-thumb-inset, 3px); left: var(--ui-switch-thumb-inset, 3px); width: var(--ui-switch-thumb-size, 16px); height: var(--ui-switch-thumb-size, 16px); background: var(--ui-switch-thumb-background, var(--text-muted)); border-radius: 50%; transition: background var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard); }
.ui-switch.is-active { background: var(--ui-switch-active-background, var(--accent-highlight)); border-color: var(--ui-switch-active-border-color, var(--accent-highlight)); }
.ui-switch.is-active > span { background: var(--ui-switch-active-thumb-background, var(--accent-contrast)); transform: translateX(var(--ui-switch-thumb-travel, 20px)); }
.ui-switch:focus-visible { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
.ui-switch:disabled { cursor: not-allowed; opacity: .58; }
}
</style>
