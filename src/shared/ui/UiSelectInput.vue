<script setup lang="ts">
import { ref } from "vue";

defineOptions({ inheritAttrs: false });
withDefaults(defineProps<{ modelValue: string | number; label: string; disabled?: boolean }>(), { disabled: false });
const emit = defineEmits<{ "update:modelValue": [value: string] }>();
const control = ref<HTMLSelectElement | null>(null);
defineExpose({ focus: () => control.value?.focus() });
</script>

<template>
  <select ref="control" v-bind="$attrs" class="ui-select-input" :value="modelValue" :disabled="disabled" :aria-label="label" @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"><slot /></select>
</template>

<style scoped>
@layer components {
.ui-select-input:focus-visible { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
}
</style>
