<script setup lang="ts">
import { ref } from "vue";

defineOptions({ inheritAttrs: false });
withDefaults(defineProps<{
  modelValue: number;
  label: string;
  disabled?: boolean;
}>(), { disabled: false });
const emit = defineEmits<{ "update:modelValue": [value: number] }>();
const control = ref<HTMLInputElement | null>(null);

function update(value: string): void {
  const number = Number(value);
  if (Number.isFinite(number)) emit("update:modelValue", number);
}

defineExpose({ focus: () => control.value?.focus() });
</script>

<template>
  <input ref="control" v-bind="$attrs" class="ui-number-input" type="number" :value="modelValue" :disabled="disabled" :aria-label="label" @input="update(($event.target as HTMLInputElement).value)" />
</template>

<style scoped>
@layer components {
.ui-number-input:focus-visible { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
}
</style>
