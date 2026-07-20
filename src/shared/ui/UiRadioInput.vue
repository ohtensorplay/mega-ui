<script setup lang="ts">
defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<{ modelValue: string; value: string; name: string; label: string; disabled?: boolean }>(), { disabled: false });
const emit = defineEmits<{ "update:modelValue": [value: string] }>();
</script>

<template>
  <input v-bind="$attrs" class="ui-radio-input" type="radio" :name="name" :value="value" :checked="modelValue === value" :disabled="disabled" :aria-label="label" @change="emit('update:modelValue', props.value)" />
</template>

<style scoped>
@layer components {
.ui-radio-input:focus-visible { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
}
</style>
