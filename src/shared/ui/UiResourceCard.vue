<script setup lang="ts">
withDefaults(defineProps<{
  /** Renders the card as a plain block when a row reads better than a framed card. */
  variant?: "card" | "row";
}>(), { variant: "card" });
</script>

<template>
  <article class="ui-resource-card" :class="`ui-resource-card--${variant}`">
    <span v-if="$slots.mark" class="ui-resource-card__mark"><slot name="mark" /></span>
    <span class="ui-resource-card__body">
      <span class="ui-resource-card__title"><slot name="title" /></span>
      <span v-if="$slots.meta" class="ui-resource-card__meta"><slot name="meta" /></span>
      <slot />
    </span>
  </article>
</template>

<style scoped>
@layer components {
.ui-resource-card {
  position: relative;
  display: flex;
  gap: var(--ui-resource-card-gap, 10px);
  align-items: var(--ui-resource-card-align, flex-start);
  min-width: 0;
  min-height: var(--ui-resource-card-min-height, 74px);
  padding: var(--ui-resource-card-padding, 12px);
  color: var(--ui-resource-card-color, var(--text-primary));
  background: var(--ui-resource-card-background, var(--surface));
  border: 1px solid var(--ui-resource-card-border-color, var(--border-default));
  border-radius: var(--ui-resource-card-border-radius, var(--radius-control));
  box-shadow: var(--ui-resource-card-shadow, none);
  transition: background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard);
}

.ui-resource-card--row { --ui-resource-card-background: transparent; --ui-resource-card-border-radius: 0; border-width: 0 0 1px; }
.ui-resource-card:hover { z-index: 1; --ui-repo-id-name-color: var(--ui-resource-card-hover-accent, var(--text-accent)); background: var(--ui-resource-card-hover-background, var(--ui-resource-card-background, var(--surface))); border-color: var(--ui-resource-card-hover-border-color, var(--text-primary)); box-shadow: var(--ui-resource-card-hover-shadow, var(--shadow-offset-sm)); transform: var(--ui-resource-card-hover-transform, translate(-1px, -1px)); }
.ui-resource-card:focus-within { z-index: 1; border-color: var(--ui-resource-card-hover-border-color, var(--text-primary)); }
.ui-resource-card__mark { display: grid; flex: 0 0 auto; place-items: center; width: var(--ui-resource-card-mark-size, 25px); height: var(--ui-resource-card-mark-size, 25px); overflow: hidden; color: var(--ui-resource-card-mark-color, var(--accent-contrast)); background: var(--ui-resource-card-mark-background, var(--accent-highlight)); border: var(--ui-resource-card-mark-border, 1px solid var(--text-primary)); border-radius: var(--ui-resource-card-mark-radius, var(--radius-xs)); font-family: var(--font-code); font-size: var(--font-size-label); }
.ui-resource-card__mark :where(img, svg) { width: 100%; height: 100%; }
.ui-resource-card__body { display: grid; align-content: center; gap: var(--ui-resource-card-body-gap, 6px); min-width: 0; flex: 1 1 auto; }
.ui-resource-card__title { min-width: 0; font-size: var(--ui-resource-card-title-size, var(--font-size-meta)); font-weight: var(--ui-resource-card-title-weight, 700); line-height: 1.3; }
.ui-resource-card__meta { display: flex; flex-wrap: wrap; gap: 4px 9px; align-items: center; min-width: 0; color: var(--text-muted); font-size: var(--ui-resource-card-meta-size, var(--font-size-label)); line-height: 1.3; }
.ui-resource-card__meta > :where(span, time, small) { display: inline-flex; gap: 3px; align-items: center; white-space: nowrap; }
.ui-resource-card__meta :where(svg) { width: 11px; height: 11px; stroke-width: 1.7; }
}
</style>
