<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, onUnmounted, ref, useAttrs, watch } from "vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<{
  open: boolean;
  title: string;
  eyebrow?: string;
  description?: string;
  tone?: "neutral" | "warning" | "danger";
  size?: "compact" | "standard" | "wide";
  mobile?: "contained" | "fullscreen";
  headingScale?: "display" | "compact";
  bodyPadding?: "default" | "flush";
  dialogClass?: string;
  bodyClass?: string;
  busy?: boolean;
  dismissible?: boolean;
  closeLabel?: string;
}>(), { eyebrow: undefined, description: undefined, tone: "neutral", size: "standard", mobile: "contained", headingScale: "compact", bodyPadding: "default", dialogClass: undefined, bodyClass: undefined, busy: false, dismissible: true, closeLabel: "Close dialog" });
const emit = defineEmits<{ close: [] }>();
const attrs = useAttrs();
const dialogId = computed(() => String(attrs.id ?? "ui-dialog"));
const canDismiss = computed(() => props.dismissible && !props.busy);
const panel = ref<HTMLElement | null>(null);
let returnFocus: HTMLElement | null = null;

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type=hidden])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[contenteditable=true]",
].join(",");

function close(): void { if (canDismiss.value) emit("close"); }

function isTopmostDialog(): boolean {
  const dialogs = document.querySelectorAll<HTMLElement>("[data-ui-dialog]");
  return dialogs[dialogs.length - 1] === panel.value;
}

function focusableElements(): HTMLElement[] {
  if (!panel.value) return [];
  return Array.from(panel.value.querySelectorAll<HTMLElement>(focusableSelector)).filter((element) => {
    const style = window.getComputedStyle(element);
    return !element.hasAttribute("hidden")
      && element.getAttribute("aria-hidden") !== "true"
      && style.display !== "none"
      && style.visibility !== "hidden";
  });
}

function focusInitial(): void {
  if (!props.open || !isTopmostDialog() || !panel.value) return;
  const focusPanelOnMobile = props.mobile === "fullscreen" && window.matchMedia?.("(max-width: 600px)").matches;
  const preferred = panel.value.querySelector<HTMLElement>("[data-dialog-autofocus]");
  (focusPanelOnMobile ? panel.value : preferred ?? panel.value).focus();
}

function trapFocus(event: KeyboardEvent): void {
  if (!props.open || !isTopmostDialog() || event.key !== "Tab") return;
  const focusable = focusableElements();
  if (focusable.length === 0) {
    event.preventDefault();
    panel.value?.focus();
    return;
  }

  const current = document.activeElement instanceof HTMLElement ? focusable.indexOf(document.activeElement) : -1;
  if (event.shiftKey && current <= 0) {
    event.preventDefault();
    focusable.at(-1)?.focus();
  } else if (!event.shiftKey && (current < 0 || current === focusable.length - 1)) {
    event.preventDefault();
    focusable[0]?.focus();
  }
}

function keydown(event: KeyboardEvent): void {
  if (!props.open || !isTopmostDialog()) return;
  if (event.key === "Escape") close();
  else trapFocus(event);
}

function containFocus(event: FocusEvent): void {
  if (!props.open || !isTopmostDialog() || !panel.value || event.target instanceof Node && panel.value.contains(event.target)) return;
  void nextTick(focusInitial);
}

function syncDocumentState(): void {
  const hasOpenDialog = Boolean(document.querySelector("[data-ui-dialog]"));
  document.body.classList.toggle("has-ui-dialog", hasOpenDialog);
  const shell = document.querySelector<HTMLElement>(".site-shell");
  if (hasOpenDialog) shell?.setAttribute("inert", "");
  else shell?.removeAttribute("inert");
}

watch(() => props.open, (open, wasOpen) => {
  if (open && !wasOpen) {
    returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  }

  syncDocumentState();
  if (open) focusInitial();
  else if (wasOpen) {
    const target = returnFocus;
    returnFocus = null;
    if (target?.isConnected) target.focus();
  }
}, { flush: "post", immediate: true });

onMounted(() => {
  window.addEventListener("keydown", keydown);
  document.addEventListener("focusin", containFocus);
  syncDocumentState();
  if (props.open) focusInitial();
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", keydown);
  document.removeEventListener("focusin", containFocus);
});

onUnmounted(syncDocumentState);
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="ds-dialog-overlay" :class="`ds-dialog-overlay--mobile-${mobile}`" data-ui-dialog-overlay>
      <button class="ds-dialog-backdrop" type="button" :aria-label="closeLabel" :disabled="!canDismiss" @click="close"></button>
      <section
        :id="dialogId"
        ref="panel"
        class="ds-dialog"
        :class="[`ds-dialog--${tone}`, `ds-dialog--${size}`, `ds-dialog--heading-${headingScale}`, `ds-dialog--mobile-${mobile}`, dialogClass]"
        data-ui-dialog
        :data-dialog-focus-panel-mobile="mobile === 'fullscreen' ? '' : undefined"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`${dialogId}-title`"
        :aria-describedby="description ? `${dialogId}-description` : undefined"
        :aria-busy="busy"
        tabindex="-1"
      >
        <header class="ds-dialog-head">
          <div class="ds-dialog-heading">
            <p v-if="eyebrow" class="ds-dialog-eyebrow">{{ eyebrow }}</p>
            <h2 :id="`${dialogId}-title`" class="ds-dialog-title">{{ title }}</h2>
            <p v-if="description" :id="`${dialogId}-description`" class="ds-dialog-description">{{ description }}</p>
          </div>
          <button class="ds-dialog-close" type="button" :aria-label="closeLabel" :disabled="!canDismiss" @click="close">×</button>
        </header>
        <div class="ds-dialog-body" :class="[`ds-dialog-body--${bodyPadding}`, bodyClass]"><slot /></div>
      </section>
    </div>
  </Teleport>
</template>
