<script setup lang="ts">
withDefaults(defineProps<{
  mark?: string;
  title: string;
  description: string;
  badge?: string;
  tone?: "neutral" | "success" | "warning" | "danger";
}>(), { mark: undefined, badge: undefined, tone: "neutral" });
</script>

<template>
  <div class="settings-ui-status" :class="`settings-ui-status--${tone}`">
    <span v-if="mark" class="settings-ui-status-mark" aria-hidden="true"><slot name="mark">{{ mark }}</slot></span>
    <span v-else class="settings-ui-status-signal" aria-hidden="true"></span>
    <div class="settings-ui-status-copy"><strong>{{ title }}</strong><p>{{ description }}</p></div>
    <span v-if="badge" class="settings-ui-badge">{{ badge }}</span>
    <div v-if="$slots.action" class="settings-ui-status-action"><slot name="action" /></div>
  </div>
</template>
