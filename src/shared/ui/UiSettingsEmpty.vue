<script setup lang="ts">
import UiEmptyState from "./UiEmptyState.vue";

defineProps<{ title: string; description: string }>();
</script>

<template>
  <UiEmptyState class="settings-ui-empty" :title="title" :description="description" variant="inline" align="start" heading-tag="strong">
    <template #visual><span class="settings-ui-empty-mark">+</span></template>
    <template v-if="$slots.action" #action><div class="settings-ui-empty-action"><slot name="action" /></div></template>
  </UiEmptyState>
</template>
