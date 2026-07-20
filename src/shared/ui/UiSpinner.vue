<script setup lang="ts">
withDefaults(defineProps<{
  label?: string;
  size?: "sm" | "md";
}>(), {
  label: "Loading",
  size: "md",
});
</script>

<template>
  <span class="ui-spinner" :class="`ui-spinner--${size}`" role="status">
    <span class="loading-159" :class="{ 'loading-159--sm': size === 'sm' }" aria-hidden="true"></span>
    <span class="sr-only">{{ label }}</span>
  </span>
</template>

<style scoped>
.ui-spinner {
  display: inline-grid;
  place-items: center;
  width: 40px;
  aspect-ratio: 1;
}

.ui-spinner--sm { width: 28px; }
</style>
