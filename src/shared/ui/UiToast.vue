<script setup lang="ts">
import { watch } from "vue";
import { X } from "@lucide/vue";

const props = defineProps<{ message: string | null }>();
const emit = defineEmits<{ close: [] }>();
let timer: number | undefined;

watch(() => props.message, (message) => {
  window.clearTimeout(timer);
  if (message) timer = window.setTimeout(() => emit("close"), 4_000);
}, { immediate: true });
</script>

<template>
  <Transition name="toast">
    <aside v-if="message" class="ui-toast" role="status" aria-live="polite">
      <span>{{ message }}</span>
      <button type="button" aria-label="Dismiss notification" title="Dismiss notification" @click="emit('close')">
        <X :size="17" aria-hidden="true" />
      </button>
    </aside>
  </Transition>
</template>

<style scoped>
.ui-toast {
  position: fixed;
  z-index: var(--z-notice);
  right: max(var(--space-4), env(safe-area-inset-right));
  bottom: max(var(--space-4), env(safe-area-inset-bottom));
  display: flex;
  gap: var(--space-4);
  align-items: center;
  max-width: min(440px, calc(100vw - var(--space-8)));
  padding: var(--space-3) var(--space-3) var(--space-3) var(--space-4);
  color: var(--inverse-text);
  background: var(--inverse-surface);
  border: 1px solid var(--inverse-text-muted);
  border-radius: var(--radius-control);
  box-shadow: var(--shadow-raised);
  font-size: var(--font-size-body-sm);
}
.ui-toast button { display: grid; place-items: center; width: 32px; height: 32px; padding: 0; color: inherit; background: transparent; border: 0; border-radius: var(--radius-control); cursor: pointer; }
.ui-toast button:hover { background: color-mix(in srgb, var(--inverse-text) 12%, transparent); }
.ui-toast button:focus-visible { outline: 2px solid var(--accent-highlight); outline-offset: 1px; }
.toast-enter-active, .toast-leave-active { transition: opacity var(--duration-standard) var(--ease-standard), transform var(--duration-standard) var(--ease-standard); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(8px); }
</style>
