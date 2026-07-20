<script setup lang="ts">
import { useId } from "vue";

defineOptions({ inheritAttrs: false });
withDefaults(defineProps<{
  modelValue: string;
  label: string;
  prefix: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
}>(), { disabled: false, required: false });
const emit = defineEmits<{ "update:modelValue": [value: string] }>();
const id = useId();
</script>

<template>
  <label class="ui-prefixed-field" :for="id"><span class="sr-only">{{ label }}</span><span aria-hidden="true">{{ prefix }}</span><input :id="id" v-bind="$attrs" type="text" :name="name" :value="modelValue" :disabled="disabled" :required="required" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" /></label>
</template>

<style scoped>
@layer components {
.ui-prefixed-field input:focus { outline: var(--focus-outline); outline-offset: 1px; }
}
</style>
