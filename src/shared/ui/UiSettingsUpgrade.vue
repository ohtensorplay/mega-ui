<script setup lang="ts">
type UpgradePlan = { mark: string; label: string };

defineProps<{ href: string; plans: readonly UpgradePlan[] }>();
</script>

<template>
  <div class="ui-settings-upgrade">
    <span class="ui-settings-upgrade__lead">Upgrade to</span>
    <template v-for="(plan, index) in plans" :key="plan.label">
      <RouterLink class="ui-settings-upgrade__plan" :to="href" :aria-label="`Upgrade to ${plan.label}`"><b aria-hidden="true">{{ plan.mark }}</b><span>{{ plan.label }}</span></RouterLink>
      <span v-if="index < plans.length - 1" class="ui-settings-upgrade__separator">or</span>
    </template>
  </div>
</template>

<style scoped>
@layer components {
.ui-settings-upgrade { display: flex; flex-wrap: nowrap; gap: 5px 7px; align-items: center; color: var(--text-subtle); font-size: var(--font-size-ui); letter-spacing: -.01em; line-height: 1.2; white-space: nowrap; }
.ui-settings-upgrade__lead { color: currentColor; white-space: nowrap; }
.ui-settings-upgrade__plan { --ui-settings-upgrade-plan-color: var(--text-subtle); display: inline-flex; gap: 5px; align-items: center; padding: 2px 0 3px; color: var(--ui-settings-upgrade-plan-color); border-bottom: 1px solid color-mix(in srgb, var(--ui-settings-upgrade-plan-color) 28%, transparent); }
.ui-settings-upgrade__plan:hover { --ui-settings-upgrade-plan-color: var(--text-primary); border-bottom-color: var(--ui-settings-upgrade-plan-color); }
.ui-settings-upgrade__plan:focus-visible { outline: var(--focus-outline); outline-offset: var(--focus-offset); }
.ui-settings-upgrade__plan b { display: grid; place-items: center; width: 20px; height: 16px; color: var(--surface); background: var(--ui-settings-upgrade-plan-color); border-radius: 5px 8px 5px 8px; font-family: var(--font-code); font-size: var(--font-size-meta); font-style: italic; font-weight: var(--font-weight-bold); letter-spacing: -.04em; transform: skew(-10deg); }
.ui-settings-upgrade__plan span { padding-bottom: 1px; }
.ui-settings-upgrade__separator { color: var(--text-subtle); }
}
</style>
