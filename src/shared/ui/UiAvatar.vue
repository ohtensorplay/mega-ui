<script setup lang="ts">
import { computed } from "vue";
import { Atom, Blocks, Braces, Building2, CircuitBoard, Landmark, Mountain, Network, Orbit, Rocket, Sparkles, Waves } from "@lucide/vue";

const props = withDefaults(defineProps<{
  seed: string;
  kind?: "user" | "organization" | "official";
  src?: string | null;
  label?: string;
}>(), {
  kind: "user",
  src: null,
  label: undefined,
});

const userArt = [
  { name: "atom", icon: Atom },
  { name: "circuit", icon: CircuitBoard },
  { name: "spark", icon: Sparkles },
  { name: "wave", icon: Waves },
  { name: "ridge", icon: Mountain },
  { name: "launch", icon: Rocket },
  { name: "syntax", icon: Braces },
  { name: "orbit", icon: Orbit },
] as const;
const organizationArt = [
  { name: "building", icon: Building2 },
  { name: "network", icon: Network },
  { name: "blocks", icon: Blocks },
  { name: "landmark", icon: Landmark },
] as const;

const imageSource = computed(() => props.src || (
  props.kind === "official" || props.seed.trim().toLocaleLowerCase() === "mega"
    ? "/favicon-512.png"
    : null
));
const art = computed(() => {
  const choices = props.kind === "organization" || props.kind === "official" ? organizationArt : userArt;
  return choices[seedIndex(props.seed, choices.length)]!;
});
const avatarClasses = computed(() => {
  const kindClasses = [`avatar-art--${props.kind}`, `ui-avatar--${props.kind}`];
  return imageSource.value
    ? [...kindClasses, "avatar-art--image", "ui-avatar--image"]
    : [...kindClasses, `avatar-art--${art.value.name}`, `ui-avatar--${art.value.name}`];
});

function seedIndex(seed: string, length: number): number {
  let hash = 0;
  for (const character of seed) hash = (hash * 31 + character.charCodeAt(0)) | 0;
  return Math.abs(hash) % length;
}
</script>

<template>
  <span class="avatar-art ui-avatar" :class="avatarClasses" :aria-hidden="label ? undefined : true" :aria-label="label">
    <img v-if="imageSource" :src="imageSource" alt="" width="512" height="512" />
    <component :is="art.icon" v-else class="visual-icon" :stroke-width="1.8" aria-hidden="true" focusable="false" />
  </span>
</template>

<style scoped>
.ui-avatar { display: grid; width: 100%; height: 100%; place-items: center; overflow: visible; color: var(--text-primary); background: var(--accent-highlight); }
.ui-avatar :deep(svg) { flex: 0 0 auto; width: 56%; height: 56%; overflow: visible; stroke-width: 1.8; }
.ui-avatar img { width: 100%; height: 100%; object-fit: cover; }
.ui-avatar--atom { color: var(--accent-highlight); background: var(--text-primary); }
.ui-avatar--circuit { color: var(--text-primary); background: var(--accent-info); }
.ui-avatar--spark { color: #682b18; background: #ffc56a; }
.ui-avatar--wave { color: var(--surface); background: #315d72; }
.ui-avatar--ridge { color: var(--surface); background: #41624c; }
.ui-avatar--launch { color: var(--surface); background: var(--icon-dataset); }
.ui-avatar--syntax { color: var(--text-primary); background: #e4a6d5; }
.ui-avatar--orbit { color: var(--text-primary); background: #d6d0f5; }
.ui-avatar--building { color: var(--surface); background: #3e536c; }
.ui-avatar--network { color: var(--text-primary); background: #d7e597; }
.ui-avatar--blocks { color: var(--surface); background: #7a4e96; }
.ui-avatar--landmark { color: var(--surface); background: #835f35; }
.ui-avatar--image { color: inherit; background: var(--surface); }
</style>
