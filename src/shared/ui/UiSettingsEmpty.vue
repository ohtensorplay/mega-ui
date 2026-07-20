<script setup lang="ts">
defineProps<{ title: string; description: string }>();
</script>

<template>
  <div class="settings-ui-empty ds-empty-state">
    <span class="settings-ui-empty-mark" aria-hidden="true">+</span>
    <div><strong>{{ title }}</strong><p>{{ description }}</p></div>
    <div v-if="$slots.action" class="settings-ui-empty-action"><slot name="action" /></div>
  </div>
</template>
