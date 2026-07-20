<script setup lang="ts">
defineProps<{ labelledby: string }>();
</script>

<template>
  <section class="ui-directory-page" :aria-labelledby="labelledby">
    <slot name="intro" />
    <div v-if="$slots.search" class="ui-directory-page__search"><slot name="search" /></div>
    <div class="ui-directory-page__content"><slot /></div>
  </section>
</template>

<style scoped>
@layer components {
.ui-directory-page { width: min(var(--layout-page-max), 100%); margin: 0 auto; padding: 0 max(var(--page-gutter), env(safe-area-inset-right)) 80px max(var(--page-gutter), env(safe-area-inset-left)); }
.ui-directory-page__search { position: relative; z-index: 3; padding: var(--space-7) 0 var(--space-8); border-bottom: 1px solid var(--border-default); }
.ui-directory-page__content { min-width: 0; }
@media (max-width: 760px) { .ui-directory-page { padding-inline: max(18px, env(safe-area-inset-right)) max(18px, env(safe-area-inset-left)); } }
}
</style>
