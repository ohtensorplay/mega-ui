<script setup lang="ts">
import { Check } from "@lucide/vue";

export type SubscriptionBenefit = { title: string; description: string };

withDefaults(defineProps<{
  items: readonly SubscriptionBenefit[];
  label?: string;
}>(), { label: "Plan benefits" });
</script>

<template>
  <ul class="ui-subscription-benefits" :aria-label="label">
    <li v-for="item in items" :key="item.title">
      <Check aria-hidden="true" :stroke-width="2.25" />
      <p><strong>{{ item.title }}:</strong> {{ item.description }}</p>
    </li>
  </ul>
</template>

<style scoped>
@layer components {
  .ui-subscription-benefits { display: grid; gap: 15px; margin: 0; padding: 0; color: var(--text-secondary); list-style: none; }
  .ui-subscription-benefits li { display: grid; grid-template-columns: 21px minmax(0, 1fr); gap: 11px; align-items: start; }
  .ui-subscription-benefits svg { width: 19px; height: 19px; margin-top: 3px; color: var(--text-success); }
  .ui-subscription-benefits p { margin: 0; font-size: var(--font-size-body-sm); line-height: 1.5; }
  .ui-subscription-benefits strong { color: var(--text-primary); font-weight: var(--font-weight-semibold); }
}
</style>
