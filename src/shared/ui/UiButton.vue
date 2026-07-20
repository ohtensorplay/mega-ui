<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import UiSpinner from "./UiSpinner.vue";

const props = withDefaults(defineProps<{
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "inverse" | "quiet" | "danger";
  size?: "sm" | "md" | "lg";
  to?: string;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  pressed?: boolean;
}>(), {
  type: "button",
  variant: "secondary",
  size: "md",
  disabled: false,
  loading: false,
  pressed: undefined,
});

const emit = defineEmits<{ click: [event: MouseEvent] }>();
const root = ref<HTMLElement | null>(null);
const componentType = computed(() => props.to ? RouterLink : props.href ? "a" : "button");
const componentProps = computed(() => {
  if (props.to) return { to: props.to };
  if (props.href) return { href: props.href };
  return { type: props.type, disabled: props.disabled || props.loading };
});

function handleClick(event: MouseEvent): void {
  if (props.disabled || props.loading) {
    event.preventDefault();
    return;
  }
  emit("click", event);
}

defineExpose({ focus: () => root.value?.focus() });
</script>

<template>
  <component
    ref="root"
    :is="componentType"
    v-bind="componentProps"
    class="ui-button"
    :class="[`ui-button--${variant}`, `ui-button--${size}`]"
    :aria-disabled="to || href ? disabled || loading : undefined"
    :aria-busy="loading || undefined"
    :aria-pressed="pressed"
    @click="handleClick"
  >
    <UiSpinner v-if="loading" size="sm" label="Working" />
    <slot v-else name="leading" />
    <span class="ui-button__label"><slot /></span>
    <slot name="trailing" />
  </component>
</template>

<style scoped>
.ui-button {
  display: var(--ui-button-display, inline-flex);
  flex: var(--ui-button-flex, initial);
  grid-template-columns: var(--ui-button-grid-template-columns, none);
  gap: var(--ui-button-gap, var(--space-2));
  align-items: var(--ui-button-align-items, center);
  justify-content: var(--ui-button-justify-content, center);
  min-width: var(--ui-button-min-width, 0);
  min-height: var(--ui-button-min-height, var(--control-md));
  padding: 0 var(--ui-button-padding-inline, var(--space-4));
  color: var(--ui-button-color, var(--text-primary));
  background: var(--ui-button-background, var(--surface));
  border: 1px solid var(--ui-button-border-color, var(--border-strong));
  border-width: var(--ui-button-border-width, 1px);
  border-radius: var(--ui-button-border-radius, var(--radius-control));
  font: inherit;
  font-family: var(--ui-button-font-family, inherit);
  font-size: var(--ui-button-font-size, var(--font-size-ui));
  font-weight: var(--ui-button-font-weight, var(--font-weight-control));
  line-height: var(--ui-button-line-height, inherit);
  letter-spacing: 0;
  cursor: pointer;
  transition: background var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard);
}

.ui-button:hover:not(:disabled) {
  color: var(--ui-button-hover-color, var(--ui-button-color, var(--text-primary)));
  background: var(--ui-button-hover-background, var(--ui-button-background, var(--surface)));
  box-shadow: var(--ui-button-hover-shadow, var(--shadow-offset-sm));
  transform: var(--ui-button-hover-transform, translate(-1px, -1px));
}

.ui-button:focus-visible { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
.ui-button:disabled { cursor: var(--ui-button-disabled-cursor, not-allowed); opacity: var(--ui-button-disabled-opacity, .58); }
.ui-button--primary { color: var(--ui-button-color, var(--accent-contrast)); background: var(--ui-button-background, var(--accent-highlight)); }
.ui-button--primary:hover:not(:disabled) { background: var(--ui-button-hover-background, color-mix(in srgb, var(--accent-highlight) 82%, white)); }
.ui-button--inverse { color: var(--ui-button-color, var(--inverse-text)); background: var(--ui-button-background, var(--inverse-surface)); border-color: var(--ui-button-border-color, var(--inverse-surface)); }
.ui-button--inverse:hover:not(:disabled) { color: var(--ui-button-hover-color, var(--inverse-text)); background: var(--ui-button-hover-background, var(--inverse-surface)); }
.ui-button--quiet { background: var(--ui-button-background, transparent); border-color: var(--ui-button-border-color, transparent); }
.ui-button--quiet:hover:not(:disabled) { background: var(--ui-button-hover-background, var(--surface-muted)); box-shadow: var(--ui-button-hover-shadow, none); transform: var(--ui-button-hover-transform, none); }
.ui-button--danger { color: var(--ui-button-color, var(--text-danger)); background: var(--ui-button-background, var(--surface-danger)); border-color: var(--ui-button-border-color, var(--border-danger)); }
.ui-button--sm { min-height: var(--ui-button-min-height, var(--control-sm)); padding-inline: var(--ui-button-padding-inline, var(--space-3)); }
.ui-button--lg { min-height: var(--ui-button-min-height, var(--control-lg)); padding-inline: var(--ui-button-padding-inline, var(--space-5)); font-size: var(--ui-button-font-size, var(--font-size-body-sm)); }
.ui-button__label { min-width: 0; overflow: var(--ui-button-label-overflow, hidden); text-overflow: var(--ui-button-label-text-overflow, ellipsis); white-space: var(--ui-button-label-white-space, nowrap); }
</style>
