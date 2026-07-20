<script setup lang="ts">
import { ref, useId, useSlots } from "vue";

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<{
  modelValue: string;
  label: string;
  name: string;
  type?: string;
  autocomplete?: string;
  hint?: string;
  error?: string | null;
  disabled?: boolean;
  required?: boolean;
  rootClass?: string;
  labelClass?: string;
  labelDetail?: string;
  optional?: boolean;
}>(), {
  type: "text",
  autocomplete: undefined,
  hint: undefined,
  error: null,
  disabled: false,
  required: false,
  rootClass: undefined,
  labelClass: undefined,
  labelDetail: undefined,
  optional: false,
});

const emit = defineEmits<{ "update:modelValue": [value: string] }>();
const inputId = useId();
const slots = useSlots();
const input = ref<HTMLInputElement | null>(null);

defineExpose({ focus: () => input.value?.focus() });
</script>

<template>
  <label class="ui-field" :class="rootClass" :for="inputId">
    <span class="ui-field__label" :class="labelClass"><slot name="label">{{ label }}</slot> <small v-if="optional">optional</small></span>
    <small v-if="labelDetail" class="ui-field__label-detail">{{ labelDetail }}</small>
    <span class="ui-field__control" :class="{ 'has-trailing': slots.trailing }">
      <input
        ref="input"
        :id="inputId"
        v-bind="$attrs"
        :name="name"
        :type="type"
        :value="modelValue"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :required="required"
        :aria-invalid="Boolean(error)"
        :aria-describedby="error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <span v-if="slots.trailing" class="ui-field__trailing"><slot name="trailing" /></span>
    </span>
    <span v-if="error" :id="`${inputId}-error`" class="ui-field__error">{{ error }}</span>
    <small v-else-if="hint" :id="`${inputId}-hint`" class="ui-field__hint"><slot name="hint">{{ hint }}</slot></small>
  </label>
</template>

<style scoped>
.ui-field { display: grid; gap: var(--ui-field-gap, var(--space-2)); min-width: 0; color: var(--ui-field-color, var(--text-primary)); }
.ui-field__label { color: var(--ui-field-label-color, inherit); font-family: var(--ui-field-label-font-family, inherit); font-size: var(--ui-field-label-font-size, var(--font-size-body-sm)); font-weight: var(--ui-field-label-font-weight, var(--font-weight-semibold)); letter-spacing: var(--ui-field-label-letter-spacing, inherit); text-transform: var(--ui-field-label-text-transform, none); }
.ui-field__label-detail { color: var(--ui-field-label-detail-color, var(--text-muted)); font-family: var(--ui-field-label-detail-font-family, inherit); font-size: var(--ui-field-label-detail-font-size, var(--font-size-meta)); font-weight: var(--ui-field-label-detail-font-weight, var(--font-weight-regular)); letter-spacing: var(--ui-field-label-detail-letter-spacing, 0); line-height: var(--ui-field-label-detail-line-height, 1.4); text-transform: var(--ui-field-label-detail-text-transform, none); }
.ui-field__control { position: relative; display: block; font-family: var(--ui-field-control-font-family, inherit); font-size: var(--ui-field-control-font-size, inherit); font-weight: var(--ui-field-control-font-weight, inherit); letter-spacing: var(--ui-field-control-letter-spacing, inherit); text-transform: var(--ui-field-control-text-transform, none); }
.ui-field input {
  width: 100%;
  min-height: var(--ui-field-input-min-height, var(--control-lg));
  padding: var(--ui-field-input-padding, 0 var(--space-3));
  color: var(--ui-field-input-color, var(--text-primary));
  background: var(--ui-field-input-background, var(--surface-raised));
  border: 1px solid var(--ui-field-input-border-color, var(--border-default));
  border-radius: var(--ui-field-input-border-radius, var(--radius-control));
  font: var(--ui-field-input-font, inherit);
  font-size: var(--ui-field-input-font-size, var(--font-size-body-sm));
  letter-spacing: 0;
}
.ui-field__control.has-trailing input { padding-right: var(--ui-field-input-trailing-padding, calc(var(--control-md) + var(--space-2))); }
.ui-field input::placeholder { color: var(--ui-field-input-placeholder-color, var(--text-subtle)); }
.ui-field input:hover:not(:disabled) { border-color: var(--border-strong); }
.ui-field input:focus { outline: var(--ui-field-input-focus-outline, var(--focus-outline)); outline-offset: 1px; border-color: var(--ui-field-input-focus-border-color, var(--color-focus)); }
.ui-field input:disabled { cursor: not-allowed; opacity: .62; }
.ui-field__trailing { position: absolute; top: 50%; right: var(--ui-field-trailing-right, var(--space-1)); display: grid; transform: translateY(-50%); }
.ui-field__error, .ui-field__hint { min-height: var(--ui-field-hint-min-height, 0); font-family: var(--ui-field-hint-font-family, inherit); font-size: var(--ui-field-hint-font-size, var(--font-size-ui)); font-weight: var(--ui-field-hint-font-weight, var(--font-weight-regular)); letter-spacing: var(--ui-field-hint-letter-spacing, 0); line-height: var(--ui-field-hint-line-height, 1.45); text-transform: var(--ui-field-hint-text-transform, none); }
.ui-field__error { color: var(--text-danger); }
.ui-field__hint { color: var(--ui-field-hint-color, var(--text-muted)); }
</style>
