<script setup lang="ts">
import { useId } from "vue";

export type UiDirectoryItem = {
  title: string;
  description: string;
  to: string;
  featured?: boolean;
  tone?: "accent" | "highlight" | "info" | "model" | "dataset" | "space" | "docs";
};

defineProps<{ label: string; items: readonly UiDirectoryItem[] }>();
const headingId = useId();
</script>

<template>
  <section class="ui-directory-section" :aria-labelledby="headingId">
    <header class="ui-directory-section__header"><h2 :id="headingId">{{ label }}</h2></header>
    <div class="ui-directory-section__grid">
      <RouterLink
        v-for="item in items"
        :key="item.to"
        class="ui-directory-section__item"
        :class="[{ 'ui-directory-section__item--featured': item.featured }, `ui-directory-section__item--${item.tone ?? 'docs'}`]"
        :to="item.to"
      >
        <span class="ui-directory-section__marker" aria-hidden="true"></span>
        <span><strong>{{ item.title }}</strong><small>{{ item.description }}</small></span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
@layer components {
.ui-directory-section { padding-bottom: var(--space-16); border-bottom: 1px solid var(--border-subtle); }
.ui-directory-section__header { padding: var(--space-4); border-bottom: 1px solid var(--border-subtle); }
.ui-directory-section__header h2 { margin: 0; color: var(--text-muted); font-family: var(--font-ui); font-size: var(--font-size-micro); font-weight: var(--font-weight-medium); letter-spacing: .02em; text-transform: uppercase; }
.ui-directory-section__grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-bottom: 1px solid var(--border-subtle); }
.ui-directory-section__item { --ui-directory-marker: var(--icon-docs); display: grid; grid-template-columns: 7px minmax(0, 1fr); gap: var(--space-3); align-content: center; min-width: 0; min-height: 82px; padding: var(--space-5); color: var(--text-primary); border-right: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); }
.ui-directory-section__item:nth-child(3n) { border-right: 0; }
.ui-directory-section__item--featured { grid-row: span 2; }
.ui-directory-section__item:hover { background: var(--surface-muted); }
.ui-directory-section__item:focus-visible { position: relative; z-index: 1; outline: var(--focus-outline); outline-offset: -2px; }
.ui-directory-section__item > span:last-child { display: grid; min-width: 0; gap: var(--space-1); }
.ui-directory-section__marker { width: 6px; height: 6px; margin-top: 7px; background: var(--ui-directory-marker); }
.ui-directory-section__item strong { overflow-wrap: anywhere; font-size: var(--font-size-ui); font-weight: var(--font-weight-semibold); line-height: 1.3; }
.ui-directory-section__item small { overflow-wrap: anywhere; color: var(--text-muted); font-size: var(--font-size-label); line-height: 1.45; }
.ui-directory-section__item--accent { --ui-directory-marker: var(--accent-primary); }
.ui-directory-section__item--highlight { --ui-directory-marker: var(--accent-highlight); }
.ui-directory-section__item--info { --ui-directory-marker: var(--accent-info); }
.ui-directory-section__item--model { --ui-directory-marker: var(--icon-model); }
.ui-directory-section__item--dataset { --ui-directory-marker: var(--icon-dataset); }
.ui-directory-section__item--space { --ui-directory-marker: var(--icon-space); }
.ui-directory-section__item--docs { --ui-directory-marker: var(--icon-docs); }
@media (max-width: 860px) {
  .ui-directory-section__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ui-directory-section__item:nth-child(3n) { border-right: 1px solid var(--border-subtle); }
  .ui-directory-section__item:nth-child(2n) { border-right: 0; }
}
@media (max-width: 560px) {
  .ui-directory-section { padding-bottom: var(--space-10); }
  .ui-directory-section__header { padding-inline: 0; }
  .ui-directory-section__grid { grid-template-columns: 1fr; }
  .ui-directory-section__item,
  .ui-directory-section__item:nth-child(2n),
  .ui-directory-section__item:nth-child(3n) { min-height: 76px; padding-inline: 0; border-right: 0; }
  .ui-directory-section__item--featured { grid-row: auto; }
}
}
</style>
