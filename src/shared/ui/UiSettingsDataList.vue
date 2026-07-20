<script setup lang="ts">
defineProps<{ rows: readonly { label: string; value: string }[] }>();
</script>

<template>
  <dl class="settings-ui-data-list"><div v-for="row in rows" :key="row.label"><dt>{{ row.label }}</dt><dd>{{ row.value }}</dd></div></dl>
</template>
