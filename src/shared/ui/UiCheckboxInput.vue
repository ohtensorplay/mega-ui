<script setup lang="ts">
defineOptions({ inheritAttrs: false });
withDefaults(defineProps<{ modelValue: boolean; label: string; disabled?: boolean }>(), { disabled: false });
const emit = defineEmits<{ "update:modelValue": [value: boolean] }>();
</script>

<template>
  <input v-bind="$attrs" class="ui-checkbox-input" type="checkbox" :checked="modelValue" :disabled="disabled" :aria-label="label" @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)" />
</template>

<style scoped>
@layer components {
.ui-checkbox-input:focus-visible { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
}
</style>
