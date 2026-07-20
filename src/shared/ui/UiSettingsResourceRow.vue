<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  to?: string;
  title: string;
  description: string;
  meta?: string;
  badge?: string;
  badgeTone?: "neutral" | "success" | "warning" | "danger";
}>(), { to: undefined, meta: undefined, badge: undefined, badgeTone: "neutral" });

const component = computed(() => props.to ? "RouterLink" : "article");
</script>

<template>
  <component :is="component" class="settings-ui-resource-row ds-resource-row" :to="to">
    <span class="settings-ui-resource-mark" aria-hidden="true"><slot name="mark" /></span>
    <div class="settings-ui-resource-copy"><strong>{{ title }}</strong><small>{{ description }}<template v-if="meta"> · {{ meta }}</template></small></div>
    <div v-if="$slots.action || badge" class="settings-ui-resource-action"><slot name="action"><span class="settings-ui-badge" :class="badgeTone === 'neutral' ? undefined : `settings-ui-badge--${badgeTone}`">{{ badge }}</span></slot></div>
  </component>
</template>

<style scoped>
.settings-ui-resource-mark :deep(.ui-avatar) { width: 100%; height: 100%; }
</style>
