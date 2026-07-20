<script setup lang="ts">
defineOptions({ inheritAttrs: false });
withDefaults(defineProps<{
  modelValue: string;
  label: string;
  name: string;
  disabled?: boolean;
}>(), { disabled: false });
const emit = defineEmits<{ "update:modelValue": [value: string] }>();
</script>

<template>
  <textarea v-bind="$attrs" class="ui-code-field" :name="name" :value="modelValue" :disabled="disabled" :aria-label="label" spellcheck="false" @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"></textarea>
</template>

<style scoped>
@layer components {
.ui-code-field:focus { outline: var(--focus-outline); outline-offset: -2px; }
}
</style>
