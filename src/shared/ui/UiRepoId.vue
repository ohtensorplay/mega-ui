<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = withDefaults(defineProps<{
  repoId: string;
  repoPath: string;
  ownerPath?: string | null;
  ownerLabel?: string | null;
  stretched?: boolean;
}>(), { ownerPath: null, ownerLabel: null, stretched: false });

const separator = computed(() => props.repoId.indexOf("/"));
const owner = computed(() => separator.value > 0 ? props.repoId.slice(0, separator.value) : "");
const name = computed(() => separator.value > 0 ? props.repoId.slice(separator.value + 1) : props.repoId);
</script>

<template>
  <span class="ui-repo-id" :title="repoId">
    <template v-if="owner">
      <RouterLink v-if="ownerPath" class="ui-repo-id__owner" :to="ownerPath" :aria-label="ownerLabel ?? `${owner} profile`">{{ owner }}</RouterLink>
      <span v-else class="ui-repo-id__owner">{{ owner }}</span>
      <span class="ui-repo-id__slash" aria-hidden="true">/</span>
    </template>
    <RouterLink class="ui-repo-id__name" :class="{ 'is-stretched': stretched }" :to="repoPath">{{ name }}</RouterLink>
  </span>
</template>

<style scoped>
@layer components {
.ui-repo-id { display: block; min-width: 0; max-width: 100%; overflow: hidden; color: var(--ui-repo-id-color, var(--text-primary)); font-family: var(--font-code); text-overflow: ellipsis; white-space: nowrap; }
.ui-repo-id__owner { position: relative; z-index: 1; color: var(--ui-repo-id-owner-color, var(--text-secondary)); text-decoration: underline; text-decoration-color: transparent; text-underline-offset: 3px; transition: color var(--duration-fast) var(--ease-standard), text-decoration-color var(--duration-fast) var(--ease-standard); }
a.ui-repo-id__owner:hover { color: var(--text-accent); text-decoration-color: currentColor; }
a.ui-repo-id__owner:focus-visible { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
.ui-repo-id__slash { padding: 0 1px; color: var(--text-muted); }
.ui-repo-id__name { color: var(--ui-repo-id-name-color, inherit); transition: color var(--duration-fast) var(--ease-standard); }
.ui-repo-id__name.is-stretched::after { position: absolute; inset: 0; content: ""; }
.ui-repo-id__name:focus-visible { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
}
</style>
