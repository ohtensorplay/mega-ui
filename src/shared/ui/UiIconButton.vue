<script setup lang="ts">
import { ref } from "vue";

withDefaults(defineProps<{
  label: string;
  pressed?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}>(), {
  pressed: undefined,
  disabled: false,
  type: "button",
});

const button = ref<HTMLButtonElement | null>(null);
defineExpose({ focus: () => button.value?.focus() });
</script>

<template>
  <button
    ref="button"
    class="ui-icon-button"
    :type="type"
    :aria-label="label"
    :title="label"
    :aria-pressed="pressed"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.ui-icon-button {
  display: inline-grid;
  flex: var(--ui-icon-button-flex, 0 0 var(--ui-icon-button-width, var(--ui-icon-button-size, var(--control-md))));
  place-items: center;
  width: var(--ui-icon-button-width, var(--ui-icon-button-size, var(--control-md)));
  height: var(--ui-icon-button-height, var(--ui-icon-button-size, var(--control-md)));
  padding: var(--ui-icon-button-padding, 0);
  color: var(--ui-icon-button-color, var(--text-secondary));
  background: var(--ui-icon-button-background, transparent);
  border: 1px solid var(--ui-icon-button-border-color, transparent);
  border-width: var(--ui-icon-button-border-width, 1px);
  border-style: var(--ui-icon-button-border-style, solid);
  border-radius: var(--ui-icon-button-radius, var(--radius-control));
  cursor: pointer;
}

.ui-icon-button:hover:not(:disabled) { color: var(--ui-icon-button-hover-color, var(--text-primary)); background: var(--ui-icon-button-hover-background, var(--surface-muted)); border-color: var(--ui-icon-button-hover-border-color, var(--border-subtle)); }
.ui-icon-button:focus-visible { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
.ui-icon-button:disabled { cursor: var(--ui-icon-button-disabled-cursor, not-allowed); opacity: var(--ui-icon-button-disabled-opacity, .5); }
</style>
