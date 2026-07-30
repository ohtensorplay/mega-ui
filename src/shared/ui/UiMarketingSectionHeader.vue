<script setup lang="ts">
defineProps<{ titleId: string; eyebrow: string; title: string; description: string }>();
</script>

<template>
  <header class="ui-marketing-section-header">
    <div><p>{{ eyebrow }}</p><h2 :id="titleId">{{ title }}</h2></div>
    <p>{{ description }}</p>
  </header>
</template>

<style scoped>
@layer components {
  .ui-marketing-section-header { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(260px, .65fr); gap: 40px; align-items: end; padding-bottom: 25px; border-bottom: 1px solid var(--border-strong); }
  .ui-marketing-section-header div > p { margin: 0; color: var(--ui-marketing-eyebrow-color, var(--text-primary)); font-family: var(--font-code); font-size: var(--font-size-label); font-weight: 750; letter-spacing: .11em; text-transform: uppercase; }
  .ui-marketing-section-header h2 { margin: 11px 0 0; font-family: var(--font-heading); font-size: clamp(38px, 5vw, 72px); font-weight: 570; letter-spacing: -.055em; line-height: .95; }
  .ui-marketing-section-header > p { max-width: 560px; margin: 0; color: var(--text-secondary); line-height: 1.65; }
  @media (max-width: 720px) { .ui-marketing-section-header { grid-template-columns: 1fr; gap: 18px; } }
}
</style>
