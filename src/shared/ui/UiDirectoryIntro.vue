<script setup lang="ts">
defineProps<{
  titleId: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
}>();
</script>

<template>
  <section class="ui-directory-intro">
    <div class="ui-directory-intro__copy">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1 :id="titleId">{{ title }}<br /><em>{{ accent }}</em></h1>
    </div>
    <aside class="ui-directory-intro__detail">
      <span class="ui-directory-intro__signal" aria-hidden="true"><slot name="signal" /></span>
      <div><p>{{ description }}</p></div>
    </aside>
  </section>
</template>

<style scoped>
@layer components {
.ui-directory-intro { display: grid; grid-template-columns: minmax(0, 1.16fr) minmax(280px, .64fr); gap: clamp(42px, 8vw, 124px); align-items: end; width: 100%; margin-inline: auto; padding: 66px 0 38px; border-bottom: 1px solid var(--border-default); }
.ui-directory-intro .eyebrow { margin: 0 0 14px; color: var(--text-accent); font-family: var(--font-code); font-size: var(--font-size-label); text-transform: uppercase; }
.ui-directory-intro h1 { max-width: 760px; margin: 0; color: var(--text-primary); font-family: var(--font-heading); font-size: clamp(48px, 5.7vw, 76px); font-weight: 600; letter-spacing: -.065em; line-height: .88; }
.ui-directory-intro h1 em { color: var(--accent-primary); font-weight: 400; }
.ui-directory-intro__detail { display: grid; grid-template-columns: 57px minmax(0, 1fr); gap: 17px; align-items: start; padding: 12px 0 5px 23px; border-left: 1px solid var(--border-default); }
.ui-directory-intro__signal { display: grid; place-items: center; width: 50px; height: 50px; color: var(--accent-contrast); background: var(--accent-highlight); border: 1px solid var(--accent-contrast); border-radius: 50% 50% 16% 50%; font-size: 21px; line-height: 1; }
.ui-directory-intro__signal :deep(svg) { width: 21px; height: 21px; }
.ui-directory-intro__detail p { max-width: 310px; margin: 0 0 12px; color: var(--text-secondary); font-size: 15px; line-height: 1.5; }
@media (max-width: 760px) {
  .ui-directory-intro { display: block; padding: 46px 0 24px; }
  .ui-directory-intro h1 { font-size: clamp(45px, 14vw, 68px); }
  .ui-directory-intro__detail { grid-template-columns: 46px minmax(0, 1fr); gap: 12px; margin-top: 28px; padding: 0; border-top: 1px solid var(--border-default); border-left: 0; }
  .ui-directory-intro__signal { width: 40px; height: 40px; margin-top: 14px; font-size: 18px; }
  .ui-directory-intro__detail > div { padding-top: 14px; }
}
}
</style>
