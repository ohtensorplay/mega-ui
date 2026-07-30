<script setup lang="ts">
import { computed, nextTick, ref, useId } from "vue";
import { ArrowDownUp, ChevronDown, Search } from "@lucide/vue";
import { RouterLink } from "vue-router";

import UiSearchField from "./UiSearchField.vue";
import UiSelectInput from "./UiSelectInput.vue";

export type UiCollectionSortOption = { value: string; label: string };

const props = withDefaults(defineProps<{
  /** Section heading, for example "Models". */
  label: string;
  /** Total number of records the section owns, shown beside the heading. */
  count: number;
  /** Optional destination for the heading, for example a filtered directory route. */
  to?: string | null;
  /** Search text. Omit `searchLabel` to hide the filter control entirely. */
  query?: string;
  searchLabel?: string | null;
  /** Selected sort value. Omit `sortOptions` to hide the sort control. */
  sort?: string;
  sortOptions?: readonly UiCollectionSortOption[];
  sortLabel?: string | null;
  /** Number of records the caller is currently withholding; drives the expand control. */
  hiddenCount?: number;
  expandLabel?: string | null;
}>(), {
  to: null,
  query: "",
  searchLabel: null,
  sort: "",
  sortOptions: () => [],
  sortLabel: null,
  hiddenCount: 0,
  expandLabel: null,
});

const emit = defineEmits<{
  "update:query": [value: string];
  "update:sort": [value: string];
  expand: [];
}>();

const headingId = useId();
const search = ref<InstanceType<typeof UiSearchField> | null>(null);
const searching = ref(false);
const hasTools = computed(() => Boolean(props.searchLabel) || props.sortOptions.length > 0);
const canExpand = computed(() => props.hiddenCount > 0 && Boolean(props.expandLabel));

async function openSearch(): Promise<void> {
  searching.value = true;
  await nextTick();
  search.value?.focus();
}

function closeSearch(): void {
  if (!props.query.trim()) searching.value = false;
}

defineExpose({ openSearch });
</script>

<template>
  <section class="ui-collection-section" :aria-labelledby="headingId">
    <header class="ui-collection-section__head">
      <h3 :id="headingId" class="ui-collection-section__heading">
        <component :is="to ? RouterLink : 'span'" v-bind="to ? { to } : {}">
          <span v-if="$slots.mark" class="ui-collection-section__mark" aria-hidden="true"><slot name="mark" /></span>
          {{ label }}
          <b>{{ count }}</b>
        </component>
      </h3>
      <div v-if="hasTools || $slots.actions" class="ui-collection-section__tools">
        <slot name="actions" />
        <template v-if="searchLabel">
          <UiSearchField
            v-if="searching"
            ref="search"
            class="ui-collection-section__search"
            :model-value="query"
            :label="searchLabel"
            :placeholder="searchLabel"
            :combobox="false"
            @update:model-value="emit('update:query', $event)"
            @blur="closeSearch"
          />
          <button v-else type="button" class="ui-collection-section__tool" :aria-label="searchLabel" @click="openSearch">
            <Search aria-hidden="true" />
          </button>
        </template>
        <label v-if="sortOptions.length" class="ui-collection-section__sort">
          <ArrowDownUp aria-hidden="true" />
          <span aria-hidden="true">Sort:</span>
          <UiSelectInput :model-value="sort" :label="sortLabel ?? `Sort ${label}`" @update:model-value="emit('update:sort', $event)">
            <option v-for="option in sortOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
          </UiSelectInput>
        </label>
      </div>
    </header>

    <div class="ui-collection-section__body"><slot /></div>

    <button v-if="canExpand" type="button" class="ui-collection-section__expand" @click="emit('expand')">
      <ChevronDown aria-hidden="true" />{{ expandLabel }}
    </button>
  </section>
</template>

<style scoped>
@layer components {
.ui-collection-section { --ui-collection-accent: var(--accent-highlight); --ui-collection-mark-color: var(--accent-contrast); min-width: 0; }
.ui-collection-section__head { display: flex; flex-wrap: wrap; gap: 10px 16px; align-items: center; justify-content: space-between; min-height: 32px; }
.ui-collection-section__heading { margin: 0; font-size: var(--ui-collection-heading-size, 15px); font-weight: 750; line-height: 1; }
.ui-collection-section__heading > * { display: inline-flex; gap: 9px; align-items: center; color: var(--text-primary); }
.ui-collection-section__heading a:hover { color: var(--text-accent); }
.ui-collection-section__heading a:focus-visible { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
.ui-collection-section__heading b { display: inline-grid; place-items: center; min-width: 20px; height: 20px; padding: 0 5px; color: var(--text-muted); background: var(--surface-muted); border: 1px solid var(--border-default); border-radius: var(--radius-pill); font-family: var(--font-code); font-size: var(--font-size-micro); font-weight: 700; }
.ui-collection-section__mark { display: grid; place-items: center; width: 24px; height: 24px; color: var(--ui-collection-mark-color); background: var(--ui-collection-accent); border: 1px solid var(--text-primary); border-radius: var(--radius-control); font-family: var(--font-code); font-size: var(--font-size-meta); }

.ui-collection-section__tools { display: flex; flex-wrap: wrap; gap: 7px; align-items: center; }
.ui-collection-section__tool { display: grid; place-items: center; width: 30px; height: 30px; padding: 0; color: var(--text-muted); background: var(--surface-glass); border: 1px solid var(--border-default); border-radius: var(--radius-control); cursor: pointer; transition: color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard); }
.ui-collection-section__tool:hover { color: var(--text-primary); background: var(--surface); border-color: var(--text-primary); }
.ui-collection-section__tool:focus-visible { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
.ui-collection-section__tool svg { width: 15px; height: 15px; }
.ui-collection-section__search { --ui-search-width: clamp(170px, 22vw, 230px); --ui-search-min-height: 30px; --ui-search-padding: 0 9px; --ui-search-icon-size: 14px; --ui-search-background: var(--surface); --ui-search-input-font-size: var(--font-size-meta); }
.ui-collection-section__sort { display: inline-flex; gap: 6px; align-items: center; min-height: 30px; padding: 0 8px 0 9px; color: var(--text-muted); background: var(--surface-glass); border: 1px solid var(--border-default); border-radius: var(--radius-control); font-size: var(--font-size-meta); font-weight: 700; }
.ui-collection-section__sort:focus-within { color: var(--text-primary); border-color: var(--text-primary); }
.ui-collection-section__sort svg { width: 14px; height: 14px; }
.ui-collection-section__sort :deep(.ui-select-input) { min-width: 0; padding: 0; color: var(--text-primary); background: transparent; border: 0; font: inherit; font-weight: 750; cursor: pointer; }

.ui-collection-section__body { min-width: 0; margin-top: var(--ui-collection-body-gap, 14px); }
.ui-collection-section__expand { display: flex; gap: 8px; align-items: center; justify-content: center; width: 100%; min-height: var(--control-sm); margin-top: 12px; padding: 0 12px; color: var(--text-secondary); background: var(--surface-glass); border: 1px solid var(--border-default); border-radius: var(--radius-control); font-family: var(--font-ui); font-size: var(--font-size-meta); font-weight: 750; cursor: pointer; transition: color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard); }
.ui-collection-section__expand:hover { color: var(--text-primary); background: var(--surface); border-color: var(--text-primary); }
.ui-collection-section__expand:focus-visible { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
.ui-collection-section__expand svg { width: 14px; height: 14px; }

@media (max-width: 560px) {
  .ui-collection-section__head { align-items: start; }
  .ui-collection-section__tools { width: 100%; }
  .ui-collection-section__search { --ui-search-width: 100%; }
  .ui-collection-section__sort { flex: 1 1 auto; }
}
}
</style>
