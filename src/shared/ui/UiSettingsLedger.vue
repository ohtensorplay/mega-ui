<script setup lang="ts">
defineProps<{ label: string }>();
</script>

<template><div class="settings-ui-ledger" role="list" :aria-label="label"><slot /></div></template>
