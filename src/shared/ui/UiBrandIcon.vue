<script setup lang="ts">
import { computed } from "vue";
import { faDiscord } from "@fortawesome/free-brands-svg-icons/faDiscord";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons/faLinkedinIn";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons/faXTwitter";

export type UiBrandIconName = "discord" | "github" | "google" | "linkedin" | "x";

const props = defineProps<{ name: UiBrandIconName }>();

const definitions = {
  discord: faDiscord,
  github: faGithub,
  linkedin: faLinkedinIn,
  x: faXTwitter,
} as const;
const definition = computed(() => props.name === "google" ? null : definitions[props.name]);
const viewBox = computed(() => definition.value
  ? `0 0 ${definition.value.icon[0]} ${definition.value.icon[1]}`
  : "0 0 20 20");
const paths = computed(() => {
  const source = definition.value?.icon[4];
  if (!source) return [];
  return Array.isArray(source) ? source : [source];
});
</script>

<template>
  <img
    v-if="name === 'google'"
    class="brand-icon brand-icon--google ui-brand-icon ui-brand-icon--google"
    :src="'/ai-icons/google-color.svg'"
    alt=""
    aria-hidden="true"
    draggable="false"
  />
  <svg
    v-else
    class="brand-icon ui-brand-icon"
    :class="[`brand-icon--${name}`, `ui-brand-icon--${name}`]"
    :viewBox="viewBox"
    width="1em"
    height="1em"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="path in paths" :key="path" fill="currentColor" :d="path" />
  </svg>
</template>
