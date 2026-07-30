<script setup lang="ts">
import { computed, useSlots } from "vue";

const props = withDefaults(defineProps<{
  title: string;
  description?: string;
  eyebrow?: string;
  variant?: "default" | "inline" | "illustrated";
  align?: "start" | "center";
  headingTag?: "h2" | "h3" | "strong";
}>(), {
  description: undefined,
  eyebrow: undefined,
  variant: "default",
  align: "center",
  headingTag: "h2",
});

const slots = useSlots();
const hasVisual = computed(() => Boolean(slots.visual));
</script>

<template>
  <section class="ui-empty-state ds-empty-state" :class="[`ui-empty-state--${variant}`, `ui-empty-state--${align}`, { 'has-visual': hasVisual }]">
    <span v-if="hasVisual" class="ui-empty-state__visual" aria-hidden="true"><slot name="visual" /></span>
    <div class="ui-empty-state__copy">
      <p v-if="eyebrow" class="ui-empty-state__eyebrow">{{ eyebrow }}</p>
      <component :is="headingTag" class="ui-empty-state__title">{{ title }}</component>
      <p v-if="description" class="ui-empty-state__description">{{ description }}</p>
    </div>
    <div v-if="$slots.action" class="ui-empty-state__action"><slot name="action" /></div>
  </section>
</template>

<style scoped>
@layer components {
  .ui-empty-state { justify-items: var(--ui-empty-state-justify, center); min-height: var(--ui-empty-state-min-height, 190px); padding: var(--ui-empty-state-padding, clamp(26px, 5vw, 48px)); text-align: var(--ui-empty-state-text-align, center); }
  .ui-empty-state--start { --ui-empty-state-justify: start; --ui-empty-state-text-align: left; }
  .ui-empty-state__visual { display: grid; width: var(--ui-empty-state-visual-size, 48px); height: var(--ui-empty-state-visual-size, 48px); margin-bottom: var(--space-2); place-items: center; color: var(--text-primary); background: var(--surface-raised); border: 1px solid var(--border-default); border-radius: var(--radius-control); box-shadow: var(--shadow-hairline); }
  .ui-empty-state__visual :deep(svg) { width: 24px; height: 24px; }
  .ui-empty-state__copy { display: grid; justify-items: inherit; gap: var(--space-2); max-width: var(--ui-empty-state-copy-max, 540px); }
  .ui-empty-state__eyebrow { color: var(--text-muted); font-family: var(--font-code); font-size: var(--font-size-micro); font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
  .ui-empty-state__title { color: var(--text-primary); font-size: var(--font-size-body); font-weight: 690; letter-spacing: -.015em; }
  .ui-empty-state__description { color: var(--text-muted); font-size: var(--font-size-body-sm); line-height: 1.55; }
  .ui-empty-state__action { display: flex; flex-wrap: wrap; gap: var(--space-2); justify-content: inherit; margin-top: var(--space-3); }
  .ui-empty-state--inline { grid-template-columns: auto minmax(0, 1fr) auto; gap: var(--space-4); align-items: center; justify-items: start; min-height: var(--ui-empty-state-min-height, 92px); padding: var(--ui-empty-state-padding, var(--space-5)); text-align: left; }
  .ui-empty-state--inline .ui-empty-state__visual { margin: 0; }
  .ui-empty-state--inline .ui-empty-state__copy { justify-items: start; }
  .ui-empty-state--inline .ui-empty-state__action { margin: 0; }
  .ui-empty-state--illustrated { min-height: var(--ui-empty-state-min-height, 260px); border-style: solid; }
  @media (max-width: 620px) {
    .ui-empty-state--inline { grid-template-columns: auto minmax(0, 1fr); }
    .ui-empty-state--inline .ui-empty-state__action { grid-column: 1 / -1; width: 100%; }
  }
}
</style>
