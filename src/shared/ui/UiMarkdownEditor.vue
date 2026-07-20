<script setup lang="ts">
import { nextTick, ref } from "vue";
import { Bold, Code, Italic, Link, List, ListOrdered, Quote, Sigma } from "@lucide/vue";
import MarkdownContent from "./MarkdownContent.vue";

type MarkdownFormat = "bold" | "italic" | "code" | "link" | "quote" | "bullet-list" | "number-list" | "formula";
const props = withDefaults(defineProps<{
  modelValue: string;
  label: string;
  name?: string;
  placeholder?: string;
  toolbar?: boolean;
  disabled?: boolean;
  staticDisabled?: boolean;
}>(), { name: "body", placeholder: "Write in Markdown…", toolbar: true, disabled: false, staticDisabled: false });
const emit = defineEmits<{ "update:modelValue": [value: string] }>();
const mode = ref<"edit" | "preview">("edit");
const textarea = ref<HTMLTextAreaElement | null>(null);
const controls = [
  { format: "bold" as const, label: "Bold", icon: Bold },
  { format: "italic" as const, label: "Italic", icon: Italic },
  { format: "code" as const, label: "Inline code", icon: Code },
  { format: "link" as const, label: "Link", icon: Link },
  { format: "quote" as const, label: "Quote", icon: Quote },
  { format: "bullet-list" as const, label: "Bulleted list", icon: List },
  { format: "number-list" as const, label: "Numbered list", icon: ListOrdered },
  { format: "formula" as const, label: "Inline formula", icon: Sigma },
];

async function format(kind: MarkdownFormat): Promise<void> {
  const input = textarea.value;
  if (!input) return;
  const start = input.selectionStart;
  const end = input.selectionEnd;
  let replacement: string;
  let selectionStart = start;
  let selectionEnd = end;
  if (kind === "quote" || kind === "bullet-list" || kind === "number-list") {
    const lineStart = props.modelValue.lastIndexOf("\n", Math.max(0, start - 1)) + 1;
    const lineEndIndex = props.modelValue.indexOf("\n", end);
    const lineEnd = lineEndIndex < 0 ? props.modelValue.length : lineEndIndex;
    const source = props.modelValue.slice(lineStart, lineEnd) || (kind === "quote" ? "quoted text" : "list item");
    replacement = source.split("\n").map((line, index) => kind === "quote" ? `> ${line}` : kind === "number-list" ? `${index + 1}. ${line}` : `- ${line}`).join("\n");
    emit("update:modelValue", props.modelValue.slice(0, lineStart) + replacement + props.modelValue.slice(lineEnd));
    selectionStart = lineStart; selectionEnd = lineStart + replacement.length;
  } else {
    const wrappers: Record<Exclude<MarkdownFormat, "quote" | "bullet-list" | "number-list">, [string, string, string]> = {
      bold: ["**", "**", "bold text"], italic: ["_", "_", "italic text"], code: ["`", "`", "code"], link: ["[", "](https://)", "link text"], formula: ["$", "$", "x^2"],
    };
    const [before, after, placeholder] = wrappers[kind];
    const selected = props.modelValue.slice(start, end) || placeholder;
    replacement = before + selected + after;
    emit("update:modelValue", props.modelValue.slice(0, start) + replacement + props.modelValue.slice(end));
    selectionStart = start + before.length; selectionEnd = selectionStart + selected.length;
  }
  await nextTick(); input.focus(); input.setSelectionRange(selectionStart, selectionEnd);
}
async function editableInput(): Promise<HTMLTextAreaElement | null> {
  mode.value = "edit";
  await nextTick();
  return textarea.value;
}
async function insertText(value: string): Promise<void> {
  const input = await editableInput();
  if (!input) return;
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const before = input.value.slice(0, start);
  const after = input.value.slice(end);
  const prefix = before && !before.endsWith("\n") ? "\n" : "";
  const suffix = after && !after.startsWith("\n") ? "\n" : "";
  const insertion = `${prefix}${value}${suffix}`;
  input.setRangeText(insertion, start, end, "end");
  emit("update:modelValue", input.value);
  input.focus();
}
async function removeText(value: string): Promise<void> {
  const input = await editableInput();
  if (!input) return;
  const index = input.value.indexOf(value);
  if (index < 0) return;
  const before = input.value.slice(0, index);
  const after = input.value.slice(index + value.length);
  const replacement = before.endsWith("\n") && after.startsWith("\n") ? "" : before && after ? "\n" : "";
  input.setRangeText(replacement, index - (before.endsWith("\n") ? 1 : 0), index + value.length + (after.startsWith("\n") ? 1 : 0), "end");
  emit("update:modelValue", input.value);
  input.focus();
}
function keydown(event: KeyboardEvent): void {
  if (!(event.ctrlKey || event.metaKey)) return;
  if (event.key.toLowerCase() === "b" || event.key.toLowerCase() === "i") { event.preventDefault(); void format(event.key.toLowerCase() === "b" ? "bold" : "italic"); }
}
defineExpose({ focus: () => textarea.value?.focus(), insertText, removeText });
</script>

<template>
  <div :class="staticDisabled ? ['discussion-editor', 'is-disabled'] : ['markdown-editor', { 'markdown-editor--tabs-only': !toolbar }]">
    <template v-if="staticDisabled"><div class="discussion-editor-tabs"><span class="is-active">Edit</span><span>Preview</span></div><textarea :value="modelValue" :aria-label="label" :placeholder="placeholder" disabled></textarea></template>
    <template v-else>
      <div class="markdown-editor-header"><div class="markdown-editor-tabs discussion-editor-tabs" role="tablist" aria-label="Markdown editor"><button :class="{ 'is-active': mode === 'edit' }" type="button" role="tab" :aria-selected="mode === 'edit'" @click="mode = 'edit'">Edit</button><button :class="{ 'is-active': mode === 'preview' }" type="button" role="tab" :aria-selected="mode === 'preview'" @click="mode = 'preview'">Preview</button></div><div v-if="toolbar" class="markdown-editor-toolbar" role="toolbar" aria-label="Markdown formatting"><button v-for="control in controls" :key="control.format" type="button" :aria-label="control.label" :title="control.label" :disabled="disabled" @click="format(control.format)"><component :is="control.icon" class="visual-icon" :stroke-width="1.8" aria-hidden="true" /></button><slot name="toolbar-after" /></div></div>
      <textarea v-if="mode === 'edit'" ref="textarea" :name="name" :value="modelValue" :aria-label="label" :placeholder="placeholder" :disabled="disabled" required maxlength="20000" @keydown="keydown" @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"></textarea>
      <MarkdownContent v-else-if="modelValue.trim()" class="markdown-editor-preview discussion-editor-preview" :source="modelValue" />
      <div v-else class="markdown-body markdown-editor-preview discussion-editor-preview"><p>Nothing to preview.</p></div>
      <slot name="after-editor" />
    </template>
  </div>
</template>

<style scoped>
.markdown-editor :deep(.markdown-editor-preview) { width: 100%; max-width: none; }
</style>
