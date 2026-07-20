<script setup lang="ts">
import { ref } from "vue";

defineOptions({ inheritAttrs: false });
withDefaults(defineProps<{
  modelValue: string;
  label: string;
  type?: string;
  disabled?: boolean;
}>(), { type: "text", disabled: false });
const emit = defineEmits<{ "update:modelValue": [value: string] }>();
const control = ref<HTMLInputElement | null>(null);
defineExpose({ focus: () => control.value?.focus() });
</script>

<template>
  <input ref="control" v-bind="$attrs" class="ui-text-input" :type="type" :value="modelValue" :disabled="disabled" :aria-label="label" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
</template>

<style scoped>
@layer components {
.ui-text-input:focus-visible { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
}
</style>
