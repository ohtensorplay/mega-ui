<script setup lang="ts">
type Metric = { label: string; value: string; detail?: string };

const props = defineProps<{
  label: string;
  title: string;
  description: string;
  mark: string;
  metrics: readonly Metric[];
  ariaLabel?: string;
}>();
</script>

<template>
  <section class="settings-ui-overview-console settings-ui-console" :aria-label="ariaLabel ?? `${title} overview`">
    <div class="settings-ui-overview-primary">
      <span class="settings-ui-overview-kicker">{{ label }}</span>
      <span class="settings-ui-overview-mark" aria-hidden="true">{{ mark }}<small>//</small></span>
      <strong>{{ title }}</strong>
      <p>{{ description }}</p>
    </div>
    <dl class="settings-ui-overview-metrics settings-ui-metric-strip" :class="`settings-ui-overview-metrics--${Math.max(1, Math.min(3, props.metrics.length))}`">
      <div v-for="metric in props.metrics.slice(0, 3)" :key="metric.label"><dt>{{ metric.label }}</dt><dd>{{ metric.value }}</dd><small v-if="metric.detail">{{ metric.detail }}</small></div>
    </dl>
  </section>
</template>
