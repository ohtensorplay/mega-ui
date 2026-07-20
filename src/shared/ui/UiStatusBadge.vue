<template><span class="settings-status-badge"><slot /></span></template>

<style scoped>
.settings-status-badge {
  display: inline-flex;
  align-items: center;
  min-height: 22px;
  padding: 3px 7px;
  color: var(--ui-status-badge-color, var(--text-secondary));
  background: var(--ui-status-badge-background, var(--surface-muted));
  border: 1px solid var(--ui-status-badge-border-color, var(--border-subtle));
  border-radius: var(--radius-pill);
  font-family: var(--font-code);
  font-size: var(--font-size-meta);
  font-weight: 800;
  letter-spacing: .035em;
  line-height: 1;
  text-transform: uppercase;
}
</style>
