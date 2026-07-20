<script setup lang="ts">
withDefaults(defineProps<{
  title: string;
  description: string;
  tone?: "neutral" | "success" | "warning" | "danger";
}>(), { tone: "neutral" });
</script>

<template>
  <aside class="settings-ui-notice" :class="`settings-ui-notice--${tone}`" role="note">
    <span class="settings-ui-notice-rail" aria-hidden="true"></span>
    <div><strong>{{ title }}</strong><p>{{ description }}</p></div>
  </aside>
</template>
