<script setup lang="ts">
import { AlertCircle, Info } from "@lucide/vue";

withDefaults(defineProps<{
  tone?: "danger" | "info";
  title?: string;
}>(), {
  tone: "danger",
  title: undefined,
});
</script>

<template>
  <div class="ui-alert" :class="`ui-alert--${tone}`" role="alert">
    <AlertCircle v-if="tone === 'danger'" :size="18" aria-hidden="true" />
    <Info v-else :size="18" aria-hidden="true" />
    <div>
      <strong v-if="title">{{ title }}</strong>
      <p><slot /></p>
    </div>
  </div>
</template>

<style scoped>
.ui-alert {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  color: var(--text-secondary);
  background: var(--surface-muted);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-control);
  font-size: var(--font-size-body-sm);
}

.ui-alert--danger { color: var(--text-danger); background: var(--surface-danger); border-color: var(--border-danger); }
.ui-alert svg { margin-top: 2px; }
.ui-alert strong { display: block; margin-bottom: var(--space-1); }
.ui-alert p { margin: 0; color: inherit; }
</style>
