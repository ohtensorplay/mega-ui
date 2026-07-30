<script setup lang="ts">
defineProps<{ eyebrow: string; description: string }>();
</script>

<template>
  <section class="ui-marketing-cta">
    <div><p>{{ eyebrow }}</p><h2><slot name="title" /></h2></div>
    <div><p>{{ description }}</p><slot /></div>
  </section>
</template>

<style scoped>
@layer components {
  .ui-marketing-cta { position: relative; display: grid; grid-template-columns: 1.15fr .55fr; gap: 80px; align-items: end; padding: clamp(34px, 5vw, 70px); overflow: hidden; color: var(--ui-marketing-cta-color, var(--text-primary)); background: var(--ui-marketing-cta-background, var(--accent-highlight)); border: 1px solid var(--text-primary); border-radius: var(--radius-surface); box-shadow: var(--shadow-offset-sm); }
  .ui-marketing-cta::after { position: absolute; top: -55px; right: 36%; width: 190px; height: 190px; content: ""; border: 36px solid color-mix(in srgb, var(--text-primary) 12%, transparent); border-radius: 50%; }
  .ui-marketing-cta > * { position: relative; z-index: 1; }
  .ui-marketing-cta div:first-child > p { margin: 0; font-family: var(--font-code); font-size: var(--font-size-label); font-weight: 750; letter-spacing: .11em; text-transform: uppercase; }
  .ui-marketing-cta h2 { margin: 11px 0 0; font-family: var(--font-heading); font-size: clamp(38px, 5vw, 72px); font-weight: 570; letter-spacing: -.055em; line-height: .95; }
  .ui-marketing-cta > div:last-child { display: grid; justify-items: start; gap: 22px; }
  .ui-marketing-cta > div:last-child > p { margin: 0; line-height: 1.6; }
  @media (max-width: 720px) { .ui-marketing-cta { grid-template-columns: 1fr; gap: 28px; padding: 30px 22px; } }
}
</style>
