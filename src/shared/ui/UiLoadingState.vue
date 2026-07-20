<script setup lang="ts">
import UiSpinner from "./UiSpinner.vue";

withDefaults(defineProps<{
  label?: string;
  title?: string;
  description?: string;
  variant?: "page" | "section" | "inline" | "feed";
  tone?: "plain" | "panel";
}>(), {
  label: "Loading",
  title: "Loading...",
  description: undefined,
  variant: "section",
  tone: "plain",
});
</script>

<template>
  <section
    class="ui-loading-state"
    :class="[`ui-loading-state--${variant}`, `ui-loading-state--${tone}`]"
    role="status"
    aria-busy="true"
    aria-live="polite"
  >
    <UiSpinner :label="label" :size="variant === 'inline' || variant === 'feed' ? 'sm' : 'md'" />
    <div class="ui-loading-state__copy">
      <strong>{{ title }}</strong>
      <p v-if="description">{{ description }}</p>
    </div>
  </section>
</template>

<style scoped>
.ui-loading-state {
  display: grid;
  place-items: center;
  align-content: center;
  justify-items: center;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  color: var(--text-muted);
  text-align: center;
}

.ui-loading-state--page {
  min-height: calc(100dvh - var(--layout-header-height));
  padding: var(--space-10) var(--layout-page-gutter);
}

.ui-loading-state--section {
  min-height: 220px;
  padding: var(--space-8);
}

.ui-loading-state--inline {
  min-height: 128px;
  padding: var(--space-5);
}

.ui-loading-state--feed {
  grid-template-columns: auto minmax(0, 1fr);
  justify-items: start;
  min-height: 80px;
  padding: 15px 18px;
  text-align: left;
}

.ui-loading-state--panel {
  background: color-mix(in srgb, var(--surface-muted) 72%, var(--surface));
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-surface);
}

.ui-loading-state__copy {
  display: grid;
  gap: var(--space-2);
  max-width: 520px;
  margin-top: var(--space-4);
}

.ui-loading-state--feed .ui-loading-state__copy,
.ui-loading-state--inline .ui-loading-state__copy {
  gap: var(--space-1);
  margin-top: 0;
}

.ui-loading-state strong {
  color: var(--text-primary);
  font-family: var(--font-code);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-bold);
  letter-spacing: .04em;
  line-height: 1.25;
  text-transform: uppercase;
}

.ui-loading-state p {
  margin: 0;
  color: var(--text-muted);
  font-size: var(--font-size-meta);
  line-height: 1.45;
}

.ui-loading-state--section.ui-loading-state--panel strong {
  font-family: var(--font-heading);
  font-size: var(--font-size-section-document);
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
}

@media (max-width: 560px) {
  .ui-loading-state--section { padding-inline: var(--space-5); }
}
</style>
