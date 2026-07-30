<template><article class="ui-marketing-page"><slot /></article></template>

<style scoped>
@layer components {
  .ui-marketing-page {
    display: grid;
    gap: var(--ui-marketing-page-gap, clamp(72px, 10vw, 132px));
    width: min(100%, var(--ui-marketing-page-max, 1480px));
    margin: 0 auto;
    padding: var(--ui-marketing-page-padding, clamp(36px, 5vw, 72px) var(--page-gutter) clamp(80px, 11vw, 150px));
  }
  @media (max-width: 720px) {
    .ui-marketing-page { gap: var(--ui-marketing-page-mobile-gap, 72px); padding: var(--ui-marketing-page-mobile-padding, 20px max(16px, env(safe-area-inset-right)) 72px max(16px, env(safe-area-inset-left))); }
  }
}
</style>
