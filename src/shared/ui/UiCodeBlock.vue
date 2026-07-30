<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import { Check, Copy } from "@lucide/vue";

import { writeClipboardText } from "../browser/clipboard";

const props = withDefaults(defineProps<{
  code: string;
  language?: string;
  label?: string;
  copyable?: boolean;
  wrap?: boolean;
}>(), {
  language: undefined,
  label: undefined,
  copyable: true,
  wrap: false,
});
const emit = defineEmits<{ copied: []; copyError: [cause: unknown] }>();
const copied = ref(false);
const status = ref("");
let resetTimer: ReturnType<typeof setTimeout> | undefined;
const caption = computed(() => props.label ?? (props.language ? props.language.toUpperCase() : "Code"));

async function copy(): Promise<void> {
  try {
    await writeClipboardText(props.code);
    copied.value = true;
    status.value = "Code copied";
    emit("copied");
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      copied.value = false;
      status.value = "";
    }, 2_200);
  } catch (cause) {
    status.value = "Could not copy code";
    emit("copyError", cause);
  }
}

onBeforeUnmount(() => clearTimeout(resetTimer));
</script>

<template>
  <figure class="ui-code-block" :class="{ 'ui-code-block--wrap': wrap }">
    <figcaption>
      <span>{{ caption }}</span>
      <button v-if="copyable" type="button" class="ui-code-block__copy" @click="copy">
        <Check v-if="copied" aria-hidden="true" />
        <Copy v-else aria-hidden="true" />
        {{ copied ? "Copied" : "Copy" }}
      </button>
    </figcaption>
    <pre class="ui-code-block__pre" tabindex="0" :aria-label="`${caption} code`"><code :class="language ? `language-${language}` : undefined">{{ code }}</code></pre>
    <span class="sr-only" aria-live="polite">{{ status }}</span>
  </figure>
</template>

<style scoped>
@layer components {
  .ui-code-block {
    max-width: 100%;
    margin: var(--ui-code-block-margin, 1.3em 0);
    overflow: hidden;
    color: var(--inverse-text);
    background: var(--inverse-surface);
    border: 1px solid var(--ui-code-block-border-color, var(--code-border));
    border-radius: var(--ui-code-block-radius, var(--radius-xs));
    box-shadow: var(--ui-code-block-shadow, var(--shadow-offset-sm));
  }
  .ui-code-block figcaption {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 35px;
    padding: 5px 7px 5px 12px;
    color: var(--inverse-text-muted);
    background: color-mix(in srgb, var(--inverse-surface) 88%, white);
    border-bottom: 1px solid var(--code-border);
    font-family: var(--font-code);
    font-size: var(--font-size-meta);
    font-weight: var(--font-weight-bold);
    letter-spacing: .04em;
  }
  .ui-code-block__copy {
    display: inline-flex;
    gap: 6px;
    align-items: center;
    min-height: 27px;
    padding: 0 8px;
    color: var(--inverse-text-muted);
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--radius-xs);
    cursor: pointer;
    font: inherit;
    letter-spacing: 0;
  }
  .ui-code-block__copy:hover {
    color: var(--inverse-text);
    background: color-mix(in srgb, var(--inverse-text) 8%, transparent);
    border-color: var(--code-border);
  }
  .ui-code-block__copy:focus-visible {
    outline: var(--focus-outline);
    outline-offset: 1px;
  }
  .ui-code-block__copy svg { width: 14px; height: 14px; }
  .ui-code-block pre {
    max-width: 100%;
    margin: 0;
    padding: var(--ui-code-block-padding, 17px 18px);
    overflow: auto;
    overscroll-behavior-inline: contain;
    color: inherit;
    background: transparent;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    tab-size: 2;
    user-select: text;
  }
  .ui-code-block pre:focus-visible {
    outline: var(--focus-outline);
    outline-offset: -2px;
  }
  .ui-code-block code {
    display: block;
    min-width: max-content;
    padding: 0;
    color: inherit;
    background: transparent;
    font-family: var(--font-code);
    font-size: var(--ui-code-block-font-size, var(--font-size-meta));
    line-height: 1.55;
    user-select: text;
    white-space: pre;
  }
  .ui-code-block--wrap code {
    min-width: 0;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
  }
}
</style>
