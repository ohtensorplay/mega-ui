<script setup lang="ts">
import megaCreditLogoUrl from "../../assets/brand/mega-coin.png";

withDefaults(defineProps<{ label?: string; size?: "sm" | "md" | "lg" }>(), {
  label: undefined,
  size: "md",
});
</script>

<template>
  <span
    class="mega-coin-mark"
    :class="`mega-coin-mark--${size}`"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
    role="img"
  >
    <img :src="megaCreditLogoUrl" alt="" width="512" height="512" />
  </span>
</template>

<style scoped>
@layer components {
  .mega-coin-mark { display: inline-grid; flex: 0 0 auto; width: 26px; height: 26px; place-items: center; overflow: hidden; border-radius: 50%; }
  .mega-coin-mark--sm { width: 16px; height: 16px; }
  .mega-coin-mark--lg { width: 42px; height: 42px; }
  .mega-coin-mark img { width: 100%; height: 100%; object-fit: contain; }
}
</style>
