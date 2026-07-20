<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow: string;
  title: string;
  message: string;
  role?: "status" | "alert";
  titleId?: string;
}>(), {
  role: "status",
  titleId: "state-page-title",
});
</script>

<template>
  <section class="ui-state-page" :role="role" :aria-labelledby="titleId">
    <p class="ui-state-page__eyebrow">{{ eyebrow }}</p>
    <div class="ui-state-page__mark" aria-hidden="true"><slot name="visual" /></div>
    <h1 :id="titleId">{{ title }}</h1>
    <p class="ui-state-page__message">{{ message }}</p>
    <div class="ui-state-page__actions"><slot /></div>
  </section>
</template>

<style scoped>
.ui-state-page {
  display: grid;
  align-content: center;
  justify-items: center;
  width: min(760px, calc(100% - 36px));
  min-height: calc(100vh - var(--layout-header-height));
  margin: 0 auto;
  padding: 82px 0;
  text-align: center;
}

.ui-state-page__eyebrow {
  margin: 0 0 23px;
  color: var(--text-accent);
  font-family: var(--font-code);
  font-size: var(--font-size-label);
  text-transform: uppercase;
}

.ui-state-page__mark {
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  margin-bottom: 25px;
  color: var(--surface);
  background: var(--text-primary);
  border: 1px solid var(--text-primary);
  border-radius: 50% 50% 14% 50%;
  transform: rotate(-20deg);
}

.ui-state-page__mark :deep(svg) { transform: rotate(20deg); }
.ui-state-page h1 { max-width: 700px; margin: 0 0 20px; color: var(--text-primary); font-family: var(--font-heading); font-size: clamp(50px, 7vw, 88px); font-weight: 600; letter-spacing: 0; line-height: .87; }
.ui-state-page__message { max-width: 520px; margin: 0 0 30px; color: var(--text-secondary); font-size: 17px; line-height: 1.55; }
.ui-state-page__actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }

@media (max-width: 760px) {
  .ui-state-page { min-height: calc(100vh - 62px); padding: 68px 0; }
}

@media (max-width: 440px) { .ui-state-page h1 { font-size: 51px; } }
</style>
