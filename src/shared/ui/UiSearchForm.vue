<script setup lang="ts">
import { useId } from "vue";
import { Search } from "@lucide/vue";

withDefaults(defineProps<{
  modelValue: string;
  label: string;
  inputLabel?: string;
  placeholder?: string;
  name?: string;
  submitLabel?: string;
}>(), {
  inputLabel: undefined,
  placeholder: "Search…",
  name: "q",
  submitLabel: undefined,
});
const emit = defineEmits<{ "update:modelValue": [value: string]; submit: [] }>();
const id = useId();
</script>

<template>
  <form class="ui-search-form" role="search" :aria-label="label" @submit.prevent="emit('submit')">
    <Search class="ui-search-form__icon" :size="14" aria-hidden="true" />
    <label class="sr-only" :for="id">{{ inputLabel || label }}</label>
    <input :id="id" :name="name" type="search" :value="modelValue" autocomplete="off" spellcheck="false" :placeholder="placeholder" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
    <button type="submit" :aria-label="submitLabel || label"><Search :size="14" aria-hidden="true" /></button>
  </form>
</template>

<style scoped>
.ui-search-form { display: flex; gap: 7px; align-items: center; min-width: 0; height: 34px; padding: 0 10px; color: var(--text-muted); background: var(--surface-raised); border: 1px solid var(--border-default); border-radius: var(--radius-control); box-shadow: none; }
.ui-search-form__icon { flex: 0 0 auto; width: 14px; height: 14px; }
.ui-search-form input { flex: 1 1 auto; min-width: 0; height: 100%; padding: 0; color: var(--text-primary); background: transparent; border: 0; outline: 0; font: inherit; font-size: var(--font-size-ui); }
.ui-search-form input::placeholder { color: var(--text-muted); }
.ui-search-form:focus-within { border-color: var(--border-strong); box-shadow: var(--focus-shadow); }
.ui-search-form button { display: none; }
</style>
