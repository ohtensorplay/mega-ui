<script setup lang="ts">
import { useId } from "vue";

defineOptions({ inheritAttrs: false });
withDefaults(defineProps<{
  modelValue: string;
  label: string;
  name?: string;
  rows?: number;
  hiddenLabel?: boolean;
  disabled?: boolean;
  hint?: string;
  labelDetail?: string;
  error?: string | null;
  rootClass?: string;
  labelClass?: string;
  optional?: boolean;
  inlineLabelDetail?: boolean;
}>(), { name: "body", rows: 5, hiddenLabel: false, disabled: false, hint: undefined, labelDetail: undefined, error: null, rootClass: undefined, labelClass: undefined, optional: false, inlineLabelDetail: false });
const emit = defineEmits<{ "update:modelValue": [value: string] }>();
const id = useId();
</script>

<template>
  <label class="ui-textarea" :class="rootClass" :for="id">
    <span :class="[labelClass, { 'sr-only': hiddenLabel }]">{{ label }} <small v-if="optional">optional</small><small v-if="labelDetail && inlineLabelDetail">{{ labelDetail }}</small></span>
    <small v-if="labelDetail && !inlineLabelDetail" class="ui-textarea__label-detail">{{ labelDetail }}</small>
    <textarea
      :id="id"
      v-bind="$attrs"
      :name="name"
      :rows="rows"
      :value="modelValue"
      :disabled="disabled"
      :aria-invalid="Boolean(error)"
      :aria-describedby="error ? `${id}-error` : hint ? `${id}-hint` : undefined"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    ></textarea>
    <small v-if="error" :id="`${id}-error`" class="ui-textarea__error">{{ error }}</small>
    <small v-else-if="hint" :id="`${id}-hint`" class="ui-textarea__hint"><slot name="hint">{{ hint }}</slot></small>
  </label>
</template>

<style scoped>
@layer components {
.ui-textarea { display: grid; gap: var(--ui-textarea-gap, var(--space-2)); color: var(--ui-textarea-label-color, var(--text-primary)); font-family: var(--ui-textarea-label-font-family, inherit); font-size: var(--ui-textarea-label-font-size, var(--font-size-body-sm)); font-weight: var(--ui-textarea-label-font-weight, var(--font-weight-semibold)); letter-spacing: var(--ui-textarea-label-letter-spacing, 0); text-transform: var(--ui-textarea-label-text-transform, none); }
.ui-textarea__label-detail { color: var(--ui-textarea-label-detail-color, var(--text-muted)); font-family: var(--ui-textarea-label-detail-font-family, inherit); font-size: var(--ui-textarea-label-detail-font-size, var(--font-size-meta)); font-weight: var(--ui-textarea-label-detail-font-weight, var(--font-weight-regular)); letter-spacing: var(--ui-textarea-label-detail-letter-spacing, 0); line-height: var(--ui-textarea-label-detail-line-height, 1.4); text-transform: var(--ui-textarea-label-detail-text-transform, none); }
.ui-textarea textarea { width: 100%; min-height: var(--ui-textarea-min-height, 120px); padding: var(--ui-textarea-padding, var(--space-3)); resize: var(--ui-textarea-resize, vertical); color: var(--ui-textarea-color, var(--text-primary)); background: var(--ui-textarea-background, var(--surface-raised)); border: 1px solid var(--ui-textarea-border-color, var(--border-default)); border-radius: var(--ui-textarea-border-radius, var(--radius-control)); font: var(--ui-textarea-font, var(--font-size-body-sm)/1.55 var(--font-ui)); font-size: var(--ui-textarea-font-size, inherit); font-weight: var(--ui-textarea-font-weight, var(--font-weight-regular)); letter-spacing: var(--ui-textarea-letter-spacing, inherit); line-height: var(--ui-textarea-line-height, inherit); text-transform: var(--ui-textarea-text-transform, none); }
.ui-textarea textarea::placeholder { color: var(--ui-textarea-placeholder-color, var(--text-subtle)); }
.ui-textarea textarea:hover { border-color: var(--border-strong); }
.ui-textarea textarea:focus { border-color: var(--ui-textarea-focus-border-color, var(--color-focus)); outline: var(--ui-textarea-focus-outline, var(--focus-outline)); outline-offset: var(--ui-textarea-focus-offset, 1px); }
.ui-textarea textarea:disabled { cursor: not-allowed; opacity: var(--ui-textarea-disabled-opacity, .6); }
.ui-textarea__hint, .ui-textarea__error { font-family: var(--ui-textarea-hint-font-family, inherit); font-size: var(--ui-textarea-hint-font-size, var(--font-size-ui)); font-weight: var(--ui-textarea-hint-font-weight, var(--font-weight-regular)); letter-spacing: var(--ui-textarea-hint-letter-spacing, 0); line-height: var(--ui-textarea-hint-line-height, 1.45); text-transform: var(--ui-textarea-hint-text-transform, none); }
.ui-textarea__hint { color: var(--ui-textarea-hint-color, var(--text-muted)); }
.ui-textarea__error { color: var(--text-danger); }
}
</style>
