<script setup lang="ts">
import { computed, useId, useSlots } from "vue";

const props = withDefaults(defineProps<{ title: string; description: string; danger?: boolean }>(), { danger: false });
const id = useId();
const slots = useSlots();
const classes = computed(() => ({ "settings-ui-section--danger": props.danger }));
</script>

<template>
  <section class="settings-ui-section" :class="classes" :aria-labelledby="id">
    <header class="settings-ui-section-head ds-section-head ds-section-head--compact" :class="{ 'settings-ui-section-head--action': slots.action }">
      <div><h2 :id="id">{{ title }}</h2><p>{{ description }}</p></div><div v-if="slots.action" class="settings-ui-section-action"><slot name="action" /></div>
    </header>
    <div class="settings-ui-section-body"><slot /></div>
  </section>
</template>
