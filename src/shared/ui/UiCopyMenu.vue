<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";
import { Check, Copy, FileCode2, MessageCircle, PlugZap } from "@lucide/vue";

import { writeClipboardText } from "../browser/clipboard";
import UiSplitMenu, { type UiSplitMenuAction } from "./UiSplitMenu.vue";
import { useUiNoticeStore } from "./notice";

const props = withDefaults(defineProps<{
  copyLabel: string;
  copyDescription: string;
  pageHref: string;
  markdownHref: string;
  markdown?: string;
  loadMarkdown?: () => Promise<string>;
  copiedNotice?: string;
  copyErrorNotice?: string;
}>(), {
  markdown: undefined,
  loadMarkdown: undefined,
  copiedNotice: "Copied as Markdown.",
  copyErrorNotice: "Clipboard access was blocked. Open the Markdown version to copy it.",
});

const router = useRouter();
const notice = useUiNoticeStore();
const open = ref(false);
const copied = ref(false);
const loading = ref(false);
let copiedTimer: number | undefined;
const prompt = computed(() => encodeURIComponent(`Read from ${new URL(props.pageHref, window.location.origin)} so I can ask questions about it.`));
const actions = computed<UiSplitMenuAction[]>(() => [
  { id: "copy", label: props.copyLabel, description: props.copyDescription, icon: Copy },
  { id: "markdown", label: "View as Markdown", description: "Open this page as plain text", href: props.markdownHref, external: true, icon: FileCode2 },
  { id: "chatgpt", label: "Open in ChatGPT", description: "Ask questions about this page", href: `https://chatgpt.com/?hints=search&q=${prompt.value}`, external: true, icon: MessageCircle },
  { id: "claude", label: "Open in Claude", description: "Ask questions about this page", href: `https://claude.ai/new?q=${prompt.value}`, external: true, icon: MessageCircle },
  { id: "mcp", label: "Connect to MEGA MCP", description: "Set up MEGA in Codex, Cursor, VS Code, and more", icon: PlugZap },
]);

async function copyMarkdown(): Promise<void> {
  if (loading.value) return;
  loading.value = true;
  try {
    const markdown = props.loadMarkdown ? await props.loadMarkdown() : props.markdown ?? "";
    await writeClipboardText(markdown.trim());
    copied.value = true;
    notice.show(props.copiedNotice);
    window.clearTimeout(copiedTimer);
    copiedTimer = window.setTimeout(() => { copied.value = false; }, 2_200);
  } catch {
    notice.show(props.copyErrorNotice);
  } finally {
    loading.value = false;
  }
}

function select(id: string): void {
  if (id === "copy") void copyMarkdown();
  if (id === "mcp") void router.push("/settings/mcp");
}

onBeforeUnmount(() => window.clearTimeout(copiedTimer));
</script>

<template>
  <UiSplitMenu
    :primary-label="copied ? 'Copied' : loading ? 'Preparing…' : copyLabel"
    menu-label="Open copy menu"
    :actions="actions"
    :open="open"
    :disabled="loading"
    @primary="copyMarkdown"
    @toggle="open = !open"
    @close="open = false"
    @select="select"
  >
    <template #primary-icon><Check v-if="copied" :size="15" aria-hidden="true" /><Copy v-else :size="15" aria-hidden="true" /></template>
  </UiSplitMenu>
</template>
