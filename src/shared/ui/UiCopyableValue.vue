<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import { Check, Copy } from "@lucide/vue";

import { writeClipboardText } from "../browser/clipboard";
import UiIconButton from "./UiIconButton.vue";

const props = withDefaults(defineProps<{
  value: string;
  label: string;
  copyLabel?: string;
  copiedLabel?: string;
  copyable?: boolean;
  wrap?: boolean;
  tone?: "default" | "inverse";
}>(), {
  copyLabel: undefined,
  copiedLabel: undefined,
  copyable: true,
  wrap: true,
  tone: "default",
});
const emit = defineEmits<{ copied: []; copyError: [cause: unknown] }>();
const copied = ref(false);
const status = ref("");
let resetTimer: ReturnType<typeof setTimeout> | undefined;
const idleCopyLabel = computed(() => props.copyLabel ?? `Copy ${props.label}`);
const activeCopyLabel = computed(() => props.copiedLabel ?? `${props.label} copied`);

async function copy(): Promise<void> {
  try {
    await writeClipboardText(props.value);
    copied.value = true;
    status.value = activeCopyLabel.value;
    emit("copied");
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      copied.value = false;
      status.value = "";
    }, 2_200);
  } catch (cause) {
    status.value = `Could not copy ${props.label}`;
    emit("copyError", cause);
  }
}

onBeforeUnmount(() => clearTimeout(resetTimer));
</script>

<template>
  <span
    class="ui-copyable-value"
    :class="[`ui-copyable-value--${tone}`, { 'ui-copyable-value--wrap': wrap }]"
  >
    <code tabindex="0" :aria-label="label">{{ value }}</code>
    <UiIconButton
      v-if="copyable"
      class="ui-copyable-value__copy"
      :label="copied ? activeCopyLabel : idleCopyLabel"
      @click="copy"
    >
      <Check v-if="copied" aria-hidden="true" />
      <Copy v-else aria-hidden="true" />
    </UiIconButton>
    <span class="sr-only" aria-live="polite">{{ status }}</span>
  </span>
</template>

<style scoped>
@layer components {
  .ui-copyable-value {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: stretch;
    min-width: 0;
    overflow: hidden;
    color: var(--ui-copyable-value-color, var(--text-primary));
    background: var(--ui-copyable-value-background, var(--surface-muted));
    border: 1px solid var(--ui-copyable-value-border-color, var(--border-subtle));
    border-radius: var(--ui-copyable-value-radius, var(--radius-control));
  }
  .ui-copyable-value code {
    display: block;
    min-width: 0;
    padding: var(--ui-copyable-value-padding, 9px 11px);
    overflow-x: auto;
    color: inherit;
    background: transparent;
    font-family: var(--font-code);
    font-size: var(--ui-copyable-value-font-size, var(--font-size-meta));
    line-height: 1.45;
    tab-size: 2;
    user-select: text;
    white-space: pre;
  }
  .ui-copyable-value code:focus-visible {
    outline: var(--focus-outline);
    outline-offset: -2px;
  }
  .ui-copyable-value--wrap code {
    overflow-x: visible;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
    word-break: break-word;
  }
  .ui-copyable-value__copy.ui-icon-button {
    --ui-icon-button-width: 38px;
    --ui-icon-button-height: 100%;
    --ui-icon-button-radius: 0;
    --ui-icon-button-border-color: transparent;
    --ui-icon-button-border-width: 0 0 0 1px;
    --ui-icon-button-hover-border-color: var(--border-default);
    color: inherit;
    border-left-color: var(--ui-copyable-value-border-color, var(--border-subtle));
  }
  .ui-copyable-value__copy :deep(svg) { width: 16px; height: 16px; }
  .ui-copyable-value--inverse {
    --ui-copyable-value-color: var(--inverse-text);
    --ui-copyable-value-background: var(--inverse-surface);
    --ui-copyable-value-border-color: var(--code-border);
    --ui-icon-button-hover-background: color-mix(in srgb, var(--inverse-text) 9%, transparent);
    --ui-icon-button-hover-color: var(--accent-highlight);
  }
}
</style>
