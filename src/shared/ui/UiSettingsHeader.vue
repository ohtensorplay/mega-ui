<script setup lang="ts">
import { ExternalLink } from "@lucide/vue";
import { computed } from "vue";

const props = defineProps<{
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
  code: string;
  mark: string;
  action?: { href: string; label: string };
}>();

const heading = computed(() => {
  const title = props.title.trim();
  if (props.accent) return { lead: title, accent: props.accent };

  const words = title.split(/\s+/);
  return {
    lead: words.length > 1 ? words.slice(0, -1).join(" ") : "",
    accent: words.at(-1) ?? "",
  };
});
</script>

<template>
  <header class="settings-page-intro">
    <h1 class="settings-page-title">{{ heading.lead }}{{ heading.lead ? " " : "" }}<em>{{ heading.accent }}</em></h1>
    <p class="settings-page-description">{{ description }}</p>
  </header>
  <RouterLink v-if="action" class="settings-header-action" :to="action.href">{{ action.label }}<ExternalLink class="settings-header-action-icon" aria-hidden="true" /></RouterLink>
</template>
