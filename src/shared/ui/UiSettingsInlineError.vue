<script setup lang="ts">
import UiButton from "./UiButton.vue";

withDefaults(defineProps<{ message: string; title?: string; actionLabel?: string }>(), {
  title: "Could not refresh this section.",
  actionLabel: "Try again",
});
defineEmits<{ retry: [] }>();
</script>

<template>
  <div class="settings-inline-error" role="status"><strong>{{ title }}</strong><p>{{ message }}</p><UiButton class="settings-inline-error-retry" variant="quiet" size="sm" @click="$emit('retry')">{{ actionLabel }}</UiButton></div>
</template>

<style scoped>
.settings-inline-error { display: grid; gap: 6px; margin: 0 0 16px; padding: 14px 16px; color: var(--text-primary); background: #fff4df; border: 1px solid #e0b65f; box-shadow: 4px 4px 0 rgba(184, 76, 43, .16); }
.settings-inline-error strong { font-family: var(--font-heading); font-size: 22px; font-weight: 600; letter-spacing: -.04em; }
.settings-inline-error p { margin: 0; color: var(--text-secondary); font-size: var(--font-size-ui); line-height: 1.45; }
.settings-inline-error-retry.ui-button { --ui-button-display: block; --ui-button-min-height: 0; --ui-button-padding-inline: 0; --ui-button-color: var(--text-accent); --ui-button-background: transparent; --ui-button-border-color: currentColor; --ui-button-border-width: 0 0 1px; --ui-button-border-radius: 0; --ui-button-font-size: var(--font-size-meta); --ui-button-font-weight: 700; --ui-button-hover-color: var(--text-primary); --ui-button-hover-background: transparent; --ui-button-hover-shadow: none; --ui-button-hover-transform: none; justify-self: start; margin-top: 3px; }
</style>
