<script setup lang="ts">
defineProps<{
  scopeLabel: string;
  recordCode: string;
  handle: string;
  displayName: string;
  secondary: string;
  facts: readonly { label: string; value: string }[];
  footer: string;
  accessibleLabel: string;
  actionHint?: string;
}>();
</script>

<template>
  <div class="account-record-layout">
    <aside class="account-record-card" :aria-label="accessibleLabel">
      <header><span>{{ scopeLabel }}</span><strong>{{ recordCode }}</strong></header>
      <div class="account-record-principal"><span class="account-record-avatar"><slot name="avatar" /></span><div><span>@{{ handle }}</span><strong>{{ displayName }}</strong><small>{{ secondary }}</small></div></div>
      <dl class="account-record-facts"><div v-for="fact in facts.slice(0, 2)" :key="fact.label"><dt>{{ fact.label }}</dt><dd>{{ fact.value }}</dd></div></dl>
      <footer><span class="settings-ui-signal" aria-hidden="true"></span><span>{{ footer }}</span></footer>
    </aside>
    <div class="account-record-details"><slot /><div v-if="$slots.action" class="settings-section-actions account-record-actions"><slot name="action" /><small v-if="actionHint">{{ actionHint }}</small></div></div>
  </div>
</template>

<style scoped>
.account-record-layout { display: grid; grid-template-columns: minmax(255px, .62fr) minmax(0, 1.48fr); gap: clamp(28px, 3vw, 40px); align-items: stretch; width: min(980px, 100%); padding-right: 7px; }
.account-record-card { position: relative; isolation: isolate; display: grid; grid-template-rows: auto auto 1fr auto; min-width: 0; min-height: 268px; padding: 18px; overflow: hidden; color: var(--inverse-text); background: var(--inverse-surface); border: 1px solid var(--text-primary); border-radius: var(--radius-surface); box-shadow: 7px 7px 0 var(--accent-primary); }
.account-record-card::before { position: absolute; z-index: -1; right: -8px; bottom: 15px; color: var(--inverse-text); content: "AC"; font-family: var(--font-heading); font-size: 118px; font-weight: 620; letter-spacing: -.12em; line-height: .75; opacity: .045; pointer-events: none; }
.account-record-card::after { position: absolute; top: 0; right: 0; left: 0; height: 5px; background: var(--accent-highlight); content: ""; }
.account-record-card > header { display: flex; gap: 12px; align-items: center; justify-content: space-between; min-width: 0; padding-bottom: 14px; border-bottom: 1px solid var(--code-border); font-family: var(--font-code); font-size: var(--font-size-meta); font-weight: var(--font-weight-bold); letter-spacing: .075em; text-transform: uppercase; }
.account-record-card > header span { color: var(--accent-highlight); }.account-record-card > header strong { overflow: hidden; color: var(--inverse-text-muted); font-size: inherit; text-overflow: ellipsis; white-space: nowrap; }
.account-record-principal { position: relative; z-index: 1; display: grid; grid-template-columns: 72px minmax(0, 1fr); gap: 15px; align-items: center; min-width: 0; padding: 22px 0 19px; }
.account-record-avatar { display: grid; place-items: center; width: 70px; height: 70px; overflow: hidden; color: var(--accent-highlight); background: #071713; border: 1px solid var(--inverse-text); border-radius: 50% 50% 16% 50%; box-shadow: 5px 5px 0 var(--accent-highlight); }
.account-record-avatar :deep(.ui-avatar) { width: 100%; height: 100%; }
.account-record-principal > div { display: grid; min-width: 0; gap: 3px; }.account-record-principal > div > span { overflow: hidden; color: var(--accent-highlight); font-family: var(--font-code); font-size: var(--font-size-meta); font-weight: var(--font-weight-bold); text-overflow: ellipsis; white-space: nowrap; }
.account-record-principal > div > strong { overflow: hidden; color: var(--inverse-text); font-family: var(--font-heading); font-size: 25px; font-weight: 620; letter-spacing: -.035em; line-height: 1.05; text-overflow: ellipsis; white-space: nowrap; }.account-record-principal > div > small { overflow: hidden; color: var(--inverse-text-muted); font-family: var(--font-code); font-size: var(--font-size-meta); text-overflow: ellipsis; white-space: nowrap; }
.account-record-facts { position: relative; z-index: 1; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-self: end; margin: 0; border-top: 1px solid var(--code-border); border-bottom: 1px solid var(--code-border); }.account-record-facts > div { min-width: 0; padding: 12px 9px 11px 0; }.account-record-facts > div + div { padding-left: 12px; border-left: 1px solid var(--code-border); }
.account-record-facts dt { color: var(--inverse-text-muted); font-family: var(--font-code); font-size: var(--font-size-meta); font-weight: var(--font-weight-bold); letter-spacing: .05em; text-transform: uppercase; }.account-record-facts dd { margin: 5px 0 0; overflow: hidden; color: var(--inverse-text); font-family: var(--font-code); font-size: var(--font-size-ui); text-overflow: ellipsis; white-space: nowrap; }
.account-record-card > footer { position: relative; z-index: 1; display: flex; gap: 8px; align-items: center; padding-top: 14px; color: var(--inverse-text-muted); font-family: var(--font-code); font-size: var(--font-size-meta); font-weight: var(--font-weight-bold); letter-spacing: .045em; text-transform: uppercase; }.account-record-card > footer .settings-ui-signal { --settings-ui-signal-color: var(--accent-highlight); }
.account-record-details { display: grid; align-content: start; min-width: 0; }.account-record-details :deep(.settings-ui-data-list) { border-top-color: var(--text-primary); }.account-record-actions { display: flex; align-items: center; justify-content: space-between; gap: 9px; margin-top: 16px; }.account-record-actions > small { max-width: 330px; color: var(--text-subtle); font-size: var(--font-size-meta); line-height: 1.4; text-align: right; }
@media (max-width: 1120px) { .account-record-layout { grid-template-columns: 1fr; }.account-record-card { grid-template-columns: minmax(0, 1.2fr) minmax(230px, .8fr); grid-template-rows: auto auto auto; column-gap: 28px; min-height: 0; }.account-record-card > header { grid-column: 1 / -1; }.account-record-principal { grid-column: 1; }.account-record-facts { grid-column: 2; grid-row: 2; align-self: center; }.account-record-card > footer { grid-column: 1 / -1; border-top: 1px solid var(--code-border); } }
@media (max-width: 620px) { .account-record-layout { padding-right: 5px; }.account-record-card { grid-template-columns: 1fr; grid-template-rows: auto auto auto auto; padding: 17px; box-shadow: 5px 5px 0 var(--accent-primary); }.account-record-principal, .account-record-facts, .account-record-card > footer { grid-column: 1; }.account-record-facts { grid-row: 3; }.account-record-card > footer { grid-row: 4; }.account-record-actions { align-items: flex-start; flex-direction: column; }.account-record-actions > small { text-align: left; } }
</style>
