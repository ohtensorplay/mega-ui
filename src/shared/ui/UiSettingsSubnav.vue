<script setup lang="ts">
export type SettingsSubnavItem = {
  value: string;
  label: string;
  to: string;
  current: boolean;
  meta?: string;
};

defineProps<{ label: string; items: readonly SettingsSubnavItem[] }>();
</script>

<template>
  <nav class="settings-ui-subnav" :aria-label="label">
    <RouterLink v-for="item in items" :key="item.value" :to="item.to" :class="{ 'is-active': item.current }" :aria-current="item.current ? 'page' : undefined">
      <span>{{ item.label }}</span><small v-if="item.meta">{{ item.meta }}</small>
    </RouterLink>
  </nav>
</template>
