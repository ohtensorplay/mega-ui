<script setup lang="ts">
import UiAvatar from "./UiAvatar.vue";
import UiStatusBadge from "./UiStatusBadge.vue";

export type UiCommunityDirectoryItem = {
  key: string;
  to: string;
  displayName: string;
  seed: string;
  avatarUrl?: string | null;
  avatarKind?: "user" | "organization" | "official";
  badge?: string | null;
  meta: string;
  rank?: number;
};

defineProps<{
  titleId: string;
  title: string;
  description: string;
  relatedLabel: string;
  relatedTo: string;
  items: readonly UiCommunityDirectoryItem[];
}>();
</script>

<template>
  <section class="ui-community-directory" :aria-labelledby="titleId">
    <header class="ui-community-directory__hero">
      <span class="ui-community-directory__visual" aria-hidden="true"><slot name="visual" /></span>
      <h1 :id="titleId">{{ title }}</h1>
      <p>{{ description }}</p>
      <small>Also explore our community <RouterLink :to="relatedTo">{{ relatedLabel }}</RouterLink>.</small>
    </header>

    <div class="ui-community-directory__grid" role="list">
      <RouterLink v-for="item in items" :key="item.key" class="ui-community-directory__item" :to="item.to" role="listitem">
        <span class="ui-community-directory__avatar"><UiAvatar :seed="item.seed" :src="item.avatarUrl" :kind="item.avatarKind ?? 'user'" /></span>
        <span class="ui-community-directory__copy">
          <span><strong>{{ item.displayName }}</strong><UiStatusBadge v-if="item.badge">{{ item.badge }}</UiStatusBadge></span>
          <small>{{ item.meta }}</small>
        </span>
        <span v-if="item.rank && item.rank <= 3" class="ui-community-directory__rank" :aria-label="`Rank ${item.rank}`">{{ ["🥇", "🥈", "🥉"][item.rank - 1] }}</span>
      </RouterLink>
    </div>
    <slot />
  </section>
</template>

<style scoped>
@layer components {
  .ui-community-directory { width: min(940px, 100%); margin: 0 auto; padding: clamp(64px, 9vw, 112px) max(var(--page-gutter), env(safe-area-inset-right)) var(--space-20) max(var(--page-gutter), env(safe-area-inset-left)); }
  .ui-community-directory__hero { display: grid; justify-items: center; max-width: 620px; margin: 0 auto clamp(54px, 7vw, 76px); text-align: center; }
  .ui-community-directory__visual { display: grid; width: 58px; height: 58px; place-items: center; margin-bottom: var(--space-4); color: var(--text-primary); background: color-mix(in srgb, var(--accent-highlight) 46%, var(--surface)); border: 1px solid var(--border-subtle); border-radius: 38% 58% 44% 52%; transform: rotate(-4deg); }
  .ui-community-directory__visual :deep(svg) { width: 30px; height: 30px; transform: rotate(4deg); }
  .ui-community-directory__hero h1 { margin: 0; color: var(--text-primary); font-family: var(--font-heading); font-size: clamp(30px, 3vw, 39px); font-weight: 680; letter-spacing: -.035em; line-height: 1.1; }
  .ui-community-directory__hero > p { max-width: 520px; margin: var(--space-4) 0 0; color: var(--text-secondary); font-size: var(--font-size-body-sm); line-height: 1.6; }
  .ui-community-directory__hero > small { margin-top: var(--space-4); color: var(--text-muted); font-size: var(--font-size-meta); }
  .ui-community-directory__hero > small a { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
  .ui-community-directory__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
  .ui-community-directory__item { display: grid; grid-template-columns: 48px minmax(0, 1fr) auto; gap: var(--space-3); align-items: center; min-width: 0; min-height: 70px; padding: 10px 13px; color: var(--text-primary); background: var(--surface-raised); border: 1px solid var(--border-subtle); border-radius: var(--radius-control); box-shadow: 0 1px 3px color-mix(in srgb, var(--text-primary) 5%, transparent); transition: border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard); }
  .ui-community-directory__item:hover { border-color: var(--border-strong); box-shadow: var(--shadow-offset-xs); transform: translate(-1px, -1px); }
  .ui-community-directory__item:focus-visible { outline: var(--focus-outline); outline-offset: 2px; }
  .ui-community-directory__avatar { width: 46px; height: 46px; overflow: hidden; border: 1px solid var(--border-subtle); border-radius: var(--radius-control); }
  .ui-community-directory__copy { display: grid; min-width: 0; gap: 4px; }
  .ui-community-directory__copy > span { display: flex; gap: 8px; align-items: center; min-width: 0; }
  .ui-community-directory__copy strong { overflow: hidden; font-size: var(--font-size-body-sm); font-weight: 680; text-overflow: ellipsis; white-space: nowrap; }
  .ui-community-directory__copy :deep(.settings-status-badge) { min-height: 19px; padding: 2px 6px; font-size: var(--font-size-label); }
  .ui-community-directory__copy > small { overflow: hidden; color: var(--text-muted); font-size: var(--font-size-meta); text-overflow: ellipsis; white-space: nowrap; }
  .ui-community-directory__rank { font-size: 15px; }
  @media (max-width: 680px) {
    .ui-community-directory { padding: 58px max(16px, env(safe-area-inset-right)) 64px max(16px, env(safe-area-inset-left)); }
    .ui-community-directory__hero { margin-bottom: 44px; }
    .ui-community-directory__visual { width: 54px; height: 54px; }
    .ui-community-directory__hero h1 { font-size: 31px; }
    .ui-community-directory__hero > p { font-size: 15px; }
    .ui-community-directory__grid { grid-template-columns: 1fr; gap: 14px; }
    .ui-community-directory__item { min-height: 76px; padding: 11px 13px; }
  }
}
</style>
