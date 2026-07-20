<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";

export type UiSettingsNavigationGroup = {
  label: string;
  items: Array<{
    key: string;
    label: string;
    href: string;
    current: boolean;
    meta?: string;
    metaTone?: "neutral" | "new";
  }>;
};

defineProps<{
  navigation: UiSettingsNavigationGroup[];
  navigationLabel: string;
  mobileLabel: string;
  activeLabel: string;
  shellClass?: string;
  previewNotice?: { title: string; description: string };
}>();
</script>

<template>
  <section class="account-shell" :class="shellClass">
    <div class="account-sidebar-column">
      <aside class="account-sidebar">
        <slot name="identity" />
        <nav class="account-sidebar-nav" :aria-label="navigationLabel">
          <div v-for="group in navigation" :key="group.label" class="account-nav-group">
            <p>{{ group.label }}</p>
            <RouterLink v-for="item in group.items" :key="item.key" class="account-nav-item" :class="{ 'is-active': item.current }" :to="item.href" :aria-current="item.current ? 'page' : undefined">
              <span>{{ item.label }}</span><small v-if="item.meta" class="settings-ui-nav-meta" :class="{ 'settings-ui-nav-meta--new': item.metaTone === 'new' }">{{ item.meta }}</small>
            </RouterLink>
          </div>
        </nav>
      </aside>
      <div v-if="$slots['sidebar-upgrade']" class="account-sidebar-upgrade"><slot name="sidebar-upgrade" /></div>
    </div>
    <details class="account-mobile-navigation">
      <summary><span>{{ mobileLabel }}</span><strong>{{ activeLabel }}</strong><ChevronDown aria-hidden="true" /></summary>
      <nav :aria-label="navigationLabel">
        <slot name="mobile-context" />
        <div v-for="group in navigation" :key="group.label" class="account-nav-group">
          <p>{{ group.label }}</p>
          <RouterLink v-for="item in group.items" :key="item.key" class="account-nav-item" :class="{ 'is-active': item.current }" :to="item.href" :aria-current="item.current ? 'page' : undefined">
            <span>{{ item.label }}</span><small v-if="item.meta" class="settings-ui-nav-meta" :class="{ 'settings-ui-nav-meta--new': item.metaTone === 'new' }">{{ item.meta }}</small>
          </RouterLink>
        </div>
      </nav>
    </details>
    <div v-if="$slots['mobile-upgrade']" class="account-mobile-upgrade"><slot name="mobile-upgrade" /></div>
    <div class="account-workspace">
      <aside v-if="previewNotice" class="settings-preview-notice" role="status"><strong>{{ previewNotice.title }}</strong><span>{{ previewNotice.description }}</span></aside>
      <slot />
    </div>
  </section>
</template>
