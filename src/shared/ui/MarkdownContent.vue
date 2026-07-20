<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";

import { renderMarkdownDocument, type MarkdownHeading, type MarkdownRenderOptions } from "../content/markdown-renderer";
import { renderMarkdownMath } from "../content/markdown-math";

const props = withDefaults(defineProps<{
  source: string;
  resolveUrl?: MarkdownRenderOptions["resolveUrl"];
}>(), {
  resolveUrl: undefined,
});
const emit = defineEmits<{ headings: [headings: MarkdownHeading[]] }>();
const root = ref<HTMLElement | null>(null);
const document = computed(() => renderMarkdownDocument(props.source, { resolveUrl: props.resolveUrl }));
const MarkdownNodes = () => document.value.nodes;

async function enhance(): Promise<void> {
  emit("headings", document.value.headings);
  await nextTick();
  if (root.value) await renderMarkdownMath(root.value);
}

onMounted(() => void enhance());
watch(() => props.source, () => void enhance());
</script>

<template>
  <article ref="root" class="markdown-body"><MarkdownNodes /></article>
</template>

<style src="./markdown-content.css"></style>
