<script setup lang="ts">
import { useId } from "vue";

withDefaults(defineProps<{
  eyebrow: string;
  title: string;
  description: string;
  tone?: "neutral" | "danger";
}>(), { tone: "neutral" });

const headingId = useId();
</script>

<template>
  <section class="settings-ui-form-sheet" :class="`settings-ui-form-sheet--${tone}`" :aria-labelledby="headingId">
    <header class="settings-ui-form-head"><p>{{ eyebrow }}</p><h3 :id="headingId">{{ title }}</h3><span>{{ description }}</span></header>
    <div class="settings-ui-form-body"><slot /></div>
  </section>
</template>
