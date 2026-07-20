<script setup lang="ts">
type LedgerField = { label: string; value: string; code?: boolean; codeClass?: string; badgeTone?: "neutral" | "success" };

withDefaults(defineProps<{
  mark?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "neutral" | "success" | "warning" | "danger";
  fields?: readonly LedgerField[];
}>(), { mark: "•", eyebrow: undefined, description: undefined, tone: "neutral", fields: () => [] });
</script>

<template>
  <article class="settings-ui-ledger-row" :class="`settings-ui-ledger-row--${tone}`" role="listitem">
    <span class="settings-ui-ledger-mark" aria-hidden="true"><slot name="mark">{{ mark }}</slot></span>
    <div class="settings-ui-ledger-copy"><span v-if="eyebrow" class="settings-ui-ledger-eyebrow">{{ eyebrow }}</span><strong>{{ title }}</strong><p v-if="description">{{ description }}</p></div>
    <dl v-if="fields.length" class="settings-ui-ledger-fields" :class="`settings-ui-ledger-fields--${Math.min(3, fields.length)}`"><div v-for="field in fields.slice(0, 3)" :key="field.label"><dt>{{ field.label }}</dt><dd><code v-if="field.code" :class="field.codeClass">{{ field.value }}</code><span v-else-if="field.badgeTone" class="settings-ui-ledger-badge" :class="`settings-ui-ledger-badge--${field.badgeTone}`">{{ field.value }}</span><template v-else>{{ field.value }}</template></dd></div></dl>
    <div v-if="$slots.action" class="settings-ui-ledger-action"><slot name="action" /></div>
  </article>
</template>
