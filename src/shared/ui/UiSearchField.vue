<script setup lang="ts">
import { ref } from "vue";
import { Search } from "@lucide/vue";

withDefaults(defineProps<{
  id?: string;
  modelValue: string;
  label: string;
  placeholder?: string;
  expanded?: boolean;
  controls?: string;
  activeDescendant?: string;
  shortcut?: string | null;
  combobox?: boolean;
}>(), {
  id: undefined,
  placeholder: "Search",
  expanded: false,
  controls: undefined,
  activeDescendant: undefined,
  shortcut: null,
  combobox: true,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  focus: [];
  blur: [];
  keydown: [event: KeyboardEvent];
}>();
const input = ref<HTMLInputElement | null>(null);

defineExpose({ focus: () => input.value?.focus() });
</script>

<template>
  <label class="ui-search-field">
    <span class="sr-only">{{ label }}</span>
    <Search :size="15" aria-hidden="true" />
    <input
      ref="input"
      :id="id"
      type="search"
      :value="modelValue"
      :placeholder="placeholder"
      autocomplete="off"
      spellcheck="false"
      :role="combobox ? 'combobox' : undefined"
      :aria-autocomplete="combobox ? 'list' : undefined"
      :aria-haspopup="combobox ? 'listbox' : undefined"
      :aria-expanded="combobox ? expanded : undefined"
      :aria-controls="combobox ? controls : undefined"
      :aria-activedescendant="combobox ? activeDescendant : undefined"
      @focus="emit('focus')"
      @blur="emit('blur')"
      @keydown="emit('keydown', $event)"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <kbd v-if="shortcut" aria-hidden="true">{{ shortcut }}</kbd>
  </label>
</template>

<style scoped>
.ui-search-field {
  display: var(--ui-search-display, flex);
  grid-template-columns: var(--ui-search-grid-template-columns, none);
  gap: var(--ui-search-gap, 9px);
  align-items: var(--ui-search-align-items, center);
  justify-content: var(--ui-search-justify-content, normal);
  width: var(--ui-search-width, 100%);
  min-width: var(--ui-search-min-width, 0);
  min-height: var(--ui-search-min-height, 0);
  padding: var(--ui-search-padding, 8px 10px);
  color: var(--ui-search-color, var(--text-muted));
  background: var(--ui-search-background, transparent);
  border: var(--ui-search-border-width, 1px) var(--ui-search-border-style, solid) var(--ui-search-border-color, var(--border-default));
  border-radius: var(--ui-search-border-radius, var(--radius-control));
  box-shadow: var(--ui-search-shadow, none);
  font-size: var(--ui-search-root-font-size, 12px);
}

.ui-search-field:focus-within { border-color: var(--ui-search-focus-border-color, var(--border-strong)); box-shadow: var(--ui-search-focus-shadow, var(--focus-shadow)); }
.ui-search-field > svg { flex: 0 0 auto; width: var(--ui-search-icon-size, 15px); height: var(--ui-search-icon-size, 15px); }
.ui-search-field input { flex: 1 1 auto; min-width: 0; min-height: var(--ui-search-input-min-height, 0); padding: var(--ui-search-input-padding, 0); color: var(--ui-search-input-color, var(--text-primary)); background: var(--ui-search-input-background, transparent); border: var(--ui-search-input-border-width, 0) solid var(--ui-search-input-border-color, transparent); border-radius: var(--ui-search-input-border-radius, 0); outline: 0; font-family: var(--ui-search-input-font-family, var(--font-ui)); font-size: var(--ui-search-input-font-size, var(--ui-search-font-size, 12px)); line-height: var(--ui-search-input-line-height, inherit); letter-spacing: 0; }
.ui-search-field input::placeholder { color: var(--text-muted); }
.ui-search-field input::-webkit-search-cancel-button { display: none; }
.ui-search-field kbd { flex: 0 0 auto; margin-left: auto; padding: 2px 4px; border: 1px solid var(--border-default); border-radius: var(--radius-xs); font-family: var(--font-code); font-size: var(--font-size-micro); }
</style>
