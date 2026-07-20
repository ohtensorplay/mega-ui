<script setup lang="ts">
import { useId } from "vue";

withDefaults(defineProps<{
  modelValue: number;
  label: string;
  hint?: string;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  error?: string | null;
}>(), { hint: undefined, name: "quantity", min: undefined, max: undefined, step: 1, disabled: false, required: false, invalid: false, error: null });
const emit = defineEmits<{ "update:modelValue": [value: number] }>();
const id = useId();
</script>

<template>
  <label class="ui-number-field" :for="id">
    <span><strong>{{ label }}</strong><small v-if="hint">{{ hint }}</small></span>
    <input
      :id="id" :name="name" type="number" inputmode="numeric" :value="modelValue"
      :min="min" :max="max" :step="step" :disabled="disabled" :required="required" :aria-invalid="invalid || Boolean(error)" :aria-describedby="error ? `${id}-error` : undefined"
      @input="emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
    />
    <small v-if="error" :id="`${id}-error`" class="ui-number-field__error">{{ error }}</small>
  </label>
</template>

<style scoped>
@layer components {
.ui-number-field { display: grid; gap: var(--ui-number-field-gap, var(--space-2)); color: var(--text-primary); }
.ui-number-field > span { display: flex; flex-wrap: wrap; gap: var(--space-2); align-items: baseline; }
.ui-number-field strong { font-size: var(--font-size-ui); }
.ui-number-field small { color: var(--text-muted); font-size: var(--font-size-meta); }
.ui-number-field input { width: 100%; min-height: var(--ui-number-field-height, var(--control-lg)); padding: var(--ui-number-field-padding, 0 var(--space-4)); color: var(--text-primary); background: var(--surface); border: 1px solid var(--border-default); border-radius: var(--radius-control); box-shadow: var(--shadow-hairline); font: inherit; }
.ui-number-field input:invalid, .ui-number-field input[aria-invalid="true"] { border-color: var(--border-danger); }
.ui-number-field input:focus-visible { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
.ui-number-field__error { color: var(--text-danger) !important; }
}
</style>
