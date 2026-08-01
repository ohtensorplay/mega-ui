<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from "vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<{
  modelValue: string;
  label: string;
  name: string;
  length?: number;
  autocomplete?: string;
  hint?: string;
  error?: string | null;
  disabled?: boolean;
  required?: boolean;
  submitOnComplete?: boolean;
  rootClass?: string;
}>(), {
  length: 6,
  autocomplete: "one-time-code",
  hint: undefined,
  error: null,
  disabled: false,
  required: false,
  submitOnComplete: false,
  rootClass: undefined,
});

const emit = defineEmits<{ "update:modelValue": [value: string] }>();
const inputId = useId();
const input = ref<HTMLInputElement | null>(null);
const completedValue = ref("");
const normalizedLength = computed(() => Math.max(1, Math.min(8, Math.trunc(props.length))));
const characters = computed(() => Array.from(
  { length: normalizedLength.value },
  (_, index) => props.modelValue[index] ?? "",
));
const activeIndex = computed(() => Math.min(props.modelValue.length, normalizedLength.value - 1));

async function update(event: Event): Promise<void> {
  const target = event.target as HTMLInputElement;
  const value = target.value.replace(/[^0-9]/g, "").slice(0, normalizedLength.value);
  target.value = value;
  emit("update:modelValue", value);
  if (value.length < normalizedLength.value) {
    completedValue.value = "";
    return;
  }
  if (!props.submitOnComplete || completedValue.value === value) return;
  completedValue.value = value;
  await nextTick();
  input.value?.form?.requestSubmit();
}

function moveCaretToEnd(): void {
  const position = input.value?.value.length ?? 0;
  input.value?.setSelectionRange(position, position);
}

watch(() => props.modelValue, (value) => {
  if (value.length < normalizedLength.value) completedValue.value = "";
});

defineExpose({ focus: () => input.value?.focus() });
</script>

<template>
  <label class="ui-verification-code-field" :class="[rootClass, { 'is-disabled': disabled, 'has-error': error }]" :for="inputId">
    <span class="ui-verification-code-field__label">{{ label }}</span>
    <span
      class="ui-verification-code-field__control"
      :style="`--ui-verification-code-length: ${normalizedLength}`"
      :data-complete="modelValue.length === normalizedLength || undefined"
    >
      <span class="ui-verification-code-field__digits" aria-hidden="true">
        <span
          v-for="(character, index) in characters"
          :key="index"
          class="ui-verification-code-field__digit"
          :class="{ 'is-filled': character, 'is-active': index === activeIndex }"
        >{{ character }}</span>
      </span>
      <input
        ref="input"
        :id="inputId"
        v-bind="$attrs"
        class="ui-verification-code-field__input"
        :name="name"
        type="text"
        :value="modelValue"
        :autocomplete="autocomplete"
        inputmode="numeric"
        :pattern="`[0-9]{${normalizedLength}}`"
        :minlength="normalizedLength"
        :maxlength="normalizedLength"
        autocapitalize="off"
        spellcheck="false"
        :disabled="disabled"
        :required="required"
        :aria-invalid="Boolean(error)"
        :aria-describedby="error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined"
        @input="update"
        @focus="moveCaretToEnd"
        @click="moveCaretToEnd"
      />
    </span>
    <span v-if="error" :id="`${inputId}-error`" class="ui-verification-code-field__error" role="alert">{{ error }}</span>
    <small v-else-if="hint" :id="`${inputId}-hint`" class="ui-verification-code-field__hint">{{ hint }}</small>
  </label>
</template>

<style scoped>
.ui-verification-code-field {
  display: grid;
  gap: var(--ui-field-gap, var(--space-2));
  min-width: 0;
  color: var(--ui-field-color, var(--text-primary));
}

.ui-verification-code-field__label {
  color: var(--ui-field-label-color, inherit);
  font-family: var(--ui-field-label-font-family, inherit);
  font-size: var(--ui-field-label-font-size, var(--font-size-body-sm));
  font-weight: var(--ui-field-label-font-weight, var(--font-weight-semibold));
}

.ui-verification-code-field__control {
  position: relative;
  display: block;
  width: min(100%, var(--ui-verification-code-width, 22rem));
}

.ui-verification-code-field__digits {
  display: grid;
  grid-template-columns: repeat(var(--ui-verification-code-length), minmax(0, 1fr));
  gap: var(--ui-verification-code-gap, var(--space-2));
}

.ui-verification-code-field__digit {
  display: grid;
  place-items: center;
  min-width: 0;
  min-height: var(--control-lg);
  aspect-ratio: 1;
  color: var(--text-primary);
  background: var(--surface-raised);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-control);
  font-family: var(--font-code);
  font-size: clamp(1.125rem, 4vw, 1.5rem);
  font-variant-numeric: tabular-nums;
  font-weight: var(--font-weight-bold);
  line-height: 1;
  transition: border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard);
}

.ui-verification-code-field__digit.is-filled { border-color: var(--border-strong); }
.ui-verification-code-field__control:hover .ui-verification-code-field__digit { border-color: var(--border-strong); }
.ui-verification-code-field__control:focus-within .ui-verification-code-field__digit.is-active {
  border-color: var(--color-focus);
  outline: var(--focus-outline);
  outline-offset: 1px;
}

.ui-verification-code-field.has-error .ui-verification-code-field__digit { border-color: var(--text-danger); }
.ui-verification-code-field.is-disabled { opacity: .62; }
.ui-verification-code-field.is-disabled .ui-verification-code-field__control { cursor: not-allowed; }

.ui-verification-code-field .ui-verification-code-field__input {
  position: absolute;
  z-index: 1;
  inset: 0;
  width: 100%;
  height: 100%;
  min-height: 0;
  margin: 0;
  padding: 0;
  color: transparent;
  caret-color: transparent;
  background: transparent;
  border: 0;
  border-radius: 0;
  opacity: .01;
  cursor: text;
}

.ui-verification-code-field .ui-verification-code-field__input:focus,
.ui-verification-code-field .ui-verification-code-field__input:focus-visible,
.ui-verification-code-field .ui-verification-code-field__input:hover {
  background: transparent;
  border: 0;
  outline: 0;
  box-shadow: none;
}

.ui-verification-code-field__error,
.ui-verification-code-field__hint {
  font-size: var(--ui-field-hint-font-size, var(--font-size-ui));
  line-height: var(--ui-field-hint-line-height, 1.45);
}

.ui-verification-code-field__error { color: var(--text-danger); }
.ui-verification-code-field__hint { color: var(--ui-field-hint-color, var(--text-muted)); }
</style>
