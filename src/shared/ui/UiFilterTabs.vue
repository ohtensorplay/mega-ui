<script setup lang="ts">
export type FilterTab = { value: string; label: string; count?: number };

defineProps<{ modelValue: string; options: readonly FilterTab[]; label: string }>();
const emit = defineEmits<{ "update:modelValue": [value: string] }>();
</script>

<template>
  <nav class="settings-ui-filter-tabs" :aria-label="label">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      :class="{ 'is-active': option.value === modelValue }"
      :aria-pressed="option.value === modelValue"
      @click="emit('update:modelValue', option.value)"
    >
      <span>{{ option.label }}</span><small v-if="option.count !== undefined">{{ option.count }}</small>
    </button>
  </nav>
</template>
