<script setup lang="ts">
export type UiMarketingStat = { label: string; value: string; glyph?: string };
defineProps<{ intro?: string; items: readonly UiMarketingStat[] }>();
</script>

<template>
  <section class="ui-marketing-stat-strip" aria-label="Plan highlights">
    <p v-if="intro">{{ intro }}</p>
    <div v-for="item in items" :key="`${item.label}:${item.value}`">
      <span v-if="item.glyph" aria-hidden="true">{{ item.glyph }}</span>
      <strong>{{ item.value }}</strong><small>{{ item.label }}</small>
    </div>
  </section>
</template>

<style scoped>
@layer components {
  .ui-marketing-stat-strip { display: grid; grid-template-columns: var(--ui-marketing-stat-columns, minmax(150px, .8fr) repeat(4, 1fr)); border-block: 1px solid var(--border-subtle); }
  .ui-marketing-stat-strip > p,
  .ui-marketing-stat-strip > div { display: grid; min-height: 82px; place-content: center; justify-items: center; margin: 0; padding: 13px 16px; text-align: center; border-right: 1px solid var(--border-subtle); }
  .ui-marketing-stat-strip > :last-child { border-right: 0; }
  .ui-marketing-stat-strip > p { justify-items: start; color: var(--text-muted); font-size: var(--font-size-meta); line-height: 1.45; text-align: left; }
  .ui-marketing-stat-strip span { font-size: 17px; }
  .ui-marketing-stat-strip strong { margin-top: 3px; color: var(--text-primary); font-size: var(--font-size-ui); font-weight: 680; }
  .ui-marketing-stat-strip small { margin-top: 2px; color: var(--text-muted); font-size: var(--font-size-label); }
  @media (max-width: 700px) {
    .ui-marketing-stat-strip { grid-template-columns: repeat(2, 1fr); }
    .ui-marketing-stat-strip > p { grid-column: 1 / -1; min-height: 52px; justify-items: center; text-align: center; border-right: 0; border-bottom: 1px solid var(--border-subtle); }
    .ui-marketing-stat-strip > div { min-height: 74px; }
    .ui-marketing-stat-strip > div:nth-of-type(2n) { border-right: 0; }
  }
}
</style>
