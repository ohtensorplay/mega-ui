<script setup lang="ts">
import { ref } from "vue";

withDefaults(defineProps<{
  label: string;
  multiple?: boolean;
  accept?: string;
  disabled?: boolean;
}>(), { multiple: false, accept: undefined, disabled: false });
const emit = defineEmits<{ select: [files: File[]] }>();
const dragging = ref(false);

function select(event: Event): void {
  const input = event.target as HTMLInputElement;
  emit("select", Array.from(input.files ?? []));
  input.value = "";
}
function drop(event: DragEvent): void {
  dragging.value = false;
  if (event.dataTransfer?.files.length) emit("select", Array.from(event.dataTransfer.files));
}
</script>

<template>
  <label class="ui-file-dropzone" :class="{ 'is-dragging': dragging, 'is-disabled': disabled }" @dragenter.prevent="dragging = true" @dragover.prevent="dragging = true" @dragleave.self="dragging = false" @drop.prevent="drop">
    <input class="sr-only" type="file" :aria-label="label" :multiple="multiple" :accept="accept" :disabled="disabled" @change="select" />
    <slot />
  </label>
</template>

<style scoped>
@layer components {
.ui-file-dropzone { cursor: pointer; }
.ui-file-dropzone:focus-within { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
.ui-file-dropzone.is-disabled { cursor: not-allowed; opacity: .6; }
}
</style>
