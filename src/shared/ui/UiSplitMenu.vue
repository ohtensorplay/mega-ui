<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, type Component } from "vue";
import { RouterLink } from "vue-router";
import { ChevronDown } from "@lucide/vue";

export type UiSplitMenuAction = {
  id: string;
  label: string;
  description: string;
  href?: string;
  external?: boolean;
  icon?: Component;
};

const props = withDefaults(defineProps<{
  primaryLabel: string;
  menuLabel: string;
  actions: readonly UiSplitMenuAction[];
  open?: boolean;
  disabled?: boolean;
}>(), { open: false, disabled: false });
const emit = defineEmits<{ primary: []; toggle: []; close: []; select: [id: string] }>();
const root = ref<HTMLElement | null>(null);
const menuId = useId();

const componentFor = (action: UiSplitMenuAction) => action.href && !action.external ? RouterLink : action.href ? "a" : "button";
const propsFor = (action: UiSplitMenuAction) => action.href && !action.external
  ? { to: action.href }
  : action.href
    ? { href: action.href, target: "_blank", rel: "noopener noreferrer" }
    : { type: "button" };
const expanded = computed(() => props.open && !props.disabled);

function choose(action: UiSplitMenuAction): void {
  emit("select", action.id);
  emit("close");
}

function outside(event: PointerEvent): void {
  if (expanded.value && event.target instanceof Node && !root.value?.contains(event.target)) emit("close");
}

function escape(event: KeyboardEvent): void {
  if (expanded.value && event.key === "Escape") emit("close");
}

onMounted(() => {
  document.addEventListener("pointerdown", outside);
  document.addEventListener("keydown", escape);
});
onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", outside);
  document.removeEventListener("keydown", escape);
});
</script>

<template>
  <div ref="root" class="ui-split-menu">
    <div class="ui-split-menu__trigger">
      <button class="ui-split-menu__primary" type="button" :disabled="disabled" aria-live="polite" @click="emit('primary')">
        <slot name="primary-icon" /><span>{{ primaryLabel }}</span>
      </button>
      <button class="ui-split-menu__toggle" type="button" :disabled="disabled" :aria-label="menuLabel" aria-haspopup="menu" :aria-expanded="expanded" :aria-controls="menuId" @click="emit('toggle')">
        <ChevronDown :size="15" aria-hidden="true" />
      </button>
    </div>
    <div v-if="expanded" :id="menuId" class="ui-split-menu__menu" role="menu" :aria-label="menuLabel">
      <component
        :is="componentFor(action)"
        v-for="action in actions"
        :key="action.id"
        v-bind="propsFor(action)"
        class="ui-split-menu__item"
        role="menuitem"
        @click="choose(action)"
      >
        <span class="ui-split-menu__icon"><component :is="action.icon" v-if="action.icon" :size="16" aria-hidden="true" /></span>
        <span><strong>{{ action.label }}</strong><small>{{ action.description }}</small></span>
        <span v-if="action.external" class="ui-split-menu__external" aria-hidden="true">↗</span>
      </component>
    </div>
  </div>
</template>

<style scoped>
.ui-split-menu { position: var(--ui-split-menu-position, relative); z-index: var(--ui-split-menu-z-index, var(--z-popover)); width: var(--ui-split-menu-width, 100%); }
.ui-split-menu__trigger { display: grid; grid-template-columns: minmax(0, 1fr) 36px; align-items: stretch; width: 100%; }
.ui-split-menu__primary, .ui-split-menu__toggle { display: inline-flex; min-height: var(--control-md); align-items: center; justify-content: center; color: var(--text-secondary); background: var(--surface); border: 1px solid var(--border-subtle); font-size: var(--font-size-meta); font-weight: var(--font-weight-control); cursor: pointer; }
.ui-split-menu__primary { gap: 7px; padding: 0 11px; overflow: hidden; border-radius: var(--radius-control) 0 0 var(--radius-control); text-align: left; }
.ui-split-menu__primary span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ui-split-menu__toggle { padding: 0; border-left: 0; border-radius: 0 var(--radius-control) var(--radius-control) 0; }
.ui-split-menu__toggle svg { transition: transform var(--duration-fast) var(--ease-standard); }
.ui-split-menu__toggle[aria-expanded="true"] svg { transform: rotate(180deg); }
.ui-split-menu__primary:hover, .ui-split-menu__toggle:hover { color: var(--text-primary); background: var(--surface-muted); border-color: var(--border-strong); }
.ui-split-menu__primary:focus-visible, .ui-split-menu__toggle:focus-visible, .ui-split-menu__item:focus-visible { position: relative; z-index: 1; outline: var(--focus-outline); outline-offset: 2px; }
.ui-split-menu__menu { position: absolute; top: calc(100% + 8px); right: 0; display: grid; gap: 2px; width: min(336px, calc(100vw - 48px)); max-height: min(420px, calc(100vh - 48px)); padding: 5px; overflow-y: auto; background: var(--surface); border: 1px solid var(--border-strong); border-radius: var(--radius-surface); box-shadow: var(--shadow-raised); }
.ui-split-menu__item { display: grid; grid-template-columns: 34px minmax(0, 1fr) auto; gap: 9px; align-items: center; width: 100%; min-height: 54px; padding: 7px; color: var(--text-secondary); background: transparent; border: 1px solid transparent; border-radius: var(--radius-control); font-family: var(--font-ui); text-align: left; text-decoration: none; cursor: pointer; }
.ui-split-menu__item:hover { color: var(--text-primary); background: var(--surface-muted); border-color: var(--border-subtle); }
.ui-split-menu__item > span:nth-child(2) { display: grid; min-width: 0; gap: 2px; }
.ui-split-menu__item strong, .ui-split-menu__item small { overflow-wrap: anywhere; white-space: normal; }
.ui-split-menu__item strong { color: var(--text-primary); font-size: var(--font-size-meta); line-height: 1.2; }
.ui-split-menu__item small { color: var(--text-muted); font-size: var(--font-size-label); line-height: 1.35; }
.ui-split-menu__icon { display: grid; place-items: center; width: 30px; height: 30px; color: var(--text-secondary); background: var(--surface-muted); border: 1px solid var(--border-subtle); border-radius: var(--radius-control); }
.ui-split-menu__external { color: var(--text-muted); }
.ui-split-menu :disabled { cursor: not-allowed; opacity: .55; }

@media (prefers-reduced-motion: reduce) { .ui-split-menu__toggle svg { transition: none; } }
</style>
