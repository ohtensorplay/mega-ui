<script setup lang="ts">
import { ref } from "vue";

defineOptions({ inheritAttrs: false });
withDefaults(defineProps<{
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  pressed?: boolean;
}>(), { type: "button", disabled: false, pressed: undefined });
const emit = defineEmits<{ click: [event: MouseEvent] }>();
const control = ref<HTMLButtonElement | null>(null);
defineExpose({ focus: () => control.value?.focus() });
</script>

<template>
  <button ref="control" v-bind="$attrs" class="ui-action-control" :type="type" :disabled="disabled" :aria-pressed="pressed" @click="emit('click', $event)"><slot /></button>
</template>

<style scoped>
@layer components {
.ui-action-control:focus-visible { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
.ui-action-control:disabled { cursor: var(--ui-action-control-disabled-cursor, not-allowed); opacity: var(--ui-action-control-disabled-opacity, .58); }
}
</style>
