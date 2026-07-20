<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: boolean;
  label: string;
  name?: string;
  value?: string;
  disabled?: boolean;
}>(), { name: undefined, value: undefined, disabled: false });

const emit = defineEmits<{ "update:modelValue": [value: boolean]; change: [value: boolean] }>();
function update(event: Event): void {
  const value = (event.target as HTMLInputElement).checked;
  emit("update:modelValue", value);
  emit("change", value);
}
</script>

<template><label class="ui-inline-checkbox"><input type="checkbox" :name="name" :value="value" :checked="modelValue" :disabled="disabled" @change="update" /><span><slot>{{ label }}</slot></span></label></template>
