<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { resolveAiApplicationLogo } from "../lib/ai-application-logo";

const props = defineProps<{
  name: string;
  logoUrl?: string | null;
  homepageUrl?: string | null;
}>();

const registeredLogoFailed = ref(false);
const libraryLogoFailed = ref(false);
const libraryLogoUrl = ref<string | null>(null);
const initial = computed(() => props.name.trim().slice(0, 1).toLocaleUpperCase() || "A");
const source = computed(() => {
  if (props.logoUrl && !registeredLogoFailed.value) return props.logoUrl;
  if (libraryLogoUrl.value && !libraryLogoFailed.value) return libraryLogoUrl.value;
  return null;
});

let resolution = 0;
watch(
  () => [props.name, props.homepageUrl, props.logoUrl] as const,
  async ([name, homepageUrl]) => {
    const current = ++resolution;
    registeredLogoFailed.value = false;
    libraryLogoFailed.value = false;
    libraryLogoUrl.value = null;
    const resolved = await resolveAiApplicationLogo(name, homepageUrl);
    if (current === resolution) libraryLogoUrl.value = resolved;
  },
  { immediate: true },
);

function handleError(): void {
  if (props.logoUrl && source.value === props.logoUrl) registeredLogoFailed.value = true;
  else libraryLogoFailed.value = true;
}
</script>

<template>
  <span class="oauth-application-logo" :title="name">
    <img v-if="source" :src="source" alt="" referrerpolicy="no-referrer" @error="handleError" />
    <slot v-else name="fallback" :initial="initial"><b aria-hidden="true">{{ initial }}</b></slot>
  </span>
</template>

<style scoped>
.oauth-application-logo {
  display: grid;
  place-items: center;
  overflow: hidden;
}

.oauth-application-logo img {
  width: 72%;
  height: 72%;
  object-fit: contain;
}
</style>
