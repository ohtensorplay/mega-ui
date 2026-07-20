<script setup lang="ts">
import { ref, useId } from "vue";

const props = withDefaults(defineProps<{ modelValue: string | null; value: string; name: string; disabled?: boolean }>(), { disabled: false });
const emit = defineEmits<{ "update:modelValue": [value: string] }>();
const id = useId();
const input = ref<HTMLInputElement | null>(null);
defineExpose({ focus: () => input.value?.focus() });
</script>

<template>
  <label class="ui-radio-tile" :class="{ 'is-active': modelValue === value }" :for="id"><input ref="input" :id="id" class="sr-only" type="radio" :name="name" :value="value" :checked="modelValue === value" :disabled="disabled" @change="emit('update:modelValue', props.value)" /><slot /></label>
</template>

<style scoped>
@layer components {
.ui-radio-tile { display: grid; min-width: 0; color: var(--ui-radio-tile-color, var(--text-primary)); background: var(--ui-radio-tile-background, var(--surface)); border: 1px solid var(--ui-radio-tile-border-color, var(--border-default)); border-radius: var(--ui-radio-tile-radius, var(--radius-control)); cursor: pointer; }
.ui-radio-tile:hover { border-color: var(--ui-radio-tile-hover-border-color, var(--text-primary)); }
.ui-radio-tile.is-active { color: var(--ui-radio-tile-active-color, var(--inverse-text)); background: var(--ui-radio-tile-active-background, var(--inverse-surface)); border-color: var(--ui-radio-tile-active-border-color, var(--inverse-surface)); }
.ui-radio-tile:has(input:focus-visible) { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
.ui-radio-tile:has(input:disabled) { cursor: not-allowed; opacity: .58; }
}
</style>
