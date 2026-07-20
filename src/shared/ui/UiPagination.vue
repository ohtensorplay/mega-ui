<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ page: number; totalPages: number; label: string }>();
const emit = defineEmits<{ "update:page": [page: number] }>();
const pages = computed<Array<number | "ellipsis">>(() => paginationPages(props.page, props.totalPages));

function paginationPages(page: number, totalPages: number): Array<number | "ellipsis"> {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, index) => index + 1);
  const values: Array<number | "ellipsis"> = [1];
  if (page > 3) values.push("ellipsis");
  for (let current = Math.max(2, page - 1); current <= Math.min(totalPages - 1, page + 1); current += 1) values.push(current);
  if (page < totalPages - 2) values.push("ellipsis");
  values.push(totalPages);
  return values;
}
</script>

<template>
  <nav class="ui-pagination" :aria-label="label">
    <button type="button" :disabled="page === 1" @click="emit('update:page', page - 1)">Previous</button>
    <template v-for="(value, index) in pages" :key="`${value}-${index}`">
      <span v-if="value === 'ellipsis'" aria-hidden="true">…</span>
      <button v-else type="button" :class="{ 'is-active': value === page }" :aria-current="value === page ? 'page' : undefined" @click="emit('update:page', value)">{{ value }}</button>
    </template>
    <button type="button" :disabled="page === totalPages" @click="emit('update:page', page + 1)">Next</button>
  </nav>
</template>

<style scoped>
.ui-pagination { display: flex; gap: 7px; align-items: center; justify-content: center; min-height: 76px; margin-top: 9px; color: var(--text-muted); font-size: var(--font-size-meta); }
.ui-pagination button { min-width: 29px; height: 29px; padding: 0 6px; color: inherit; background: transparent; border: 1px solid transparent; border-radius: var(--radius-control); font: inherit; cursor: pointer; }
.ui-pagination button:hover:not(:disabled) { color: var(--text-primary); background: var(--surface-muted); border-color: var(--border-default); }
.ui-pagination button.is-active { color: var(--text-primary); background: var(--accent-highlight); border-color: var(--text-primary); }
.ui-pagination button:disabled { color: var(--border-default); cursor: default; }
.ui-pagination button:focus-visible { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
@media (max-width: 760px) { .ui-pagination { min-height: 66px; } }
</style>
