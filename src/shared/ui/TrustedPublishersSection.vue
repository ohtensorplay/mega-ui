<script setup lang="ts">
import { computed, ref, type Ref } from "vue";
import { Plus } from "@lucide/vue";

import { formatAccountDate } from "../format/date";
import UiAlert from "./UiAlert.vue";
import UiButton from "./UiButton.vue";
import UiSettingsEmpty from "./UiSettingsEmpty.vue";
import UiSettingsFormSheet from "./UiSettingsFormSheet.vue";
import UiSettingsNotice from "./UiSettingsNotice.vue";
import UiSettingsResourceRow from "./UiSettingsResourceRow.vue";
import UiSettingsSection from "./UiSettingsSection.vue";
import UiTextField from "./UiTextField.vue";
import { useUiNoticeStore } from "./notice";
type CiIdentity = {
  identity_id: string;
  provider: "github-actions";
  repository: string;
  branch: string;
  workflow: string;
  repository_id: string | null;
  repository_owner_id: string | null;
  created_at: string;
  updated_at: string;
  last_used_at: string | null;
};
type TrustedPublisherState = {
  ciIdentities: Ref<CiIdentity[]>;
  ciBusy: Ref<boolean>;
  ciFormOpen: Ref<boolean>;
  ciError: Ref<string | null>;
  createCi(input: {
    provider: "github-actions";
    repository: string;
    branch?: string;
    workflow?: string;
  }): Promise<boolean>;
  deleteCi(identityId: string): Promise<boolean>;
};

const props = withDefaults(defineProps<{
  state: TrustedPublisherState;
  namespace?: string;
  scope?: "personal" | "organization";
}>(), {
  namespace: "",
  scope: "personal",
});
const notice = useUiNoticeStore();
const repository = ref("");
const branch = ref("");
const workflow = ref("");
const namespaceLabel = computed(() => props.namespace ? `@${props.namespace}` : "this namespace");
const sectionDescription = computed(() => props.scope === "organization"
  ? `Allow verified GitHub Actions workflows to publish organization repositories owned by ${namespaceLabel.value}.`
  : `Allow verified GitHub Actions workflows to publish your repositories owned by ${namespaceLabel.value}.`);

function constraints(identity: CiIdentity): string {
  return `${identity.branch ? `branch ${identity.branch}` : "any branch or event ref"} · ${identity.workflow ? `.github/workflows/${identity.workflow}` : "any workflow"}`;
}

async function submit(): Promise<void> {
  const input = { provider: "github-actions" as const, repository: repository.value.trim(), branch: branch.value.trim(), workflow: workflow.value.trim() };
  if (!await props.state.createCi(input)) return;
  repository.value = branch.value = workflow.value = "";
  notice.show("Trusted publisher added.");
}

async function remove(identityId: string): Promise<void> {
  if (await props.state.deleteCi(identityId)) notice.show("Trusted publisher removed.");
}
</script>

<template>
  <UiSettingsSection title="Trusted Publishers" :description="sectionDescription">
    <div class="ci-access" :aria-busy="state.ciBusy.value">
      <UiAlert v-if="state.ciError.value" title="Trusted publishers unavailable">{{ state.ciError.value }}</UiAlert>
      <p class="ci-access-intro">Connect approved GitHub Actions workflows so they can publish without storing account credentials.</p>
      <UiSettingsNotice title="Limited publishing access" :description="`A matching workflow can read and publish repositories inside ${namespaceLabel}. It cannot delete repositories or change account settings.`" tone="success" />
      <div v-if="state.ciIdentities.value.length" class="ci-identity-list ds-collection" aria-label="Trusted GitHub Actions workflows">
        <UiSettingsResourceRow v-for="identity in state.ciIdentities.value" :key="identity.identity_id" :title="identity.repository" :description="constraints(identity)" :meta="identity.last_used_at ? `Last exchanged ${formatAccountDate(identity.last_used_at)}` : 'Not used yet'"><template #mark>GH</template><template #action><UiButton class="text-button ci-remove" variant="quiet" size="sm" :disabled="state.ciBusy.value" @click="remove(identity.identity_id)">Remove access</UiButton></template></UiSettingsResourceRow>
      </div>
      <UiSettingsFormSheet v-if="state.ciFormOpen.value" eyebrow="Trusted Publishers" title="Add a GitHub Actions publisher" description="Choose its source repository and, when needed, limit access to one branch or workflow file.">
        <form class="settings-ui-form-grid ci-identity-form" @submit.prevent="submit"><UiTextField v-model="repository" root-class="settings-ui-field settings-ui-field--wide" label="GitHub repository" name="repository" placeholder="octocat/my-model" autocomplete="off" :spellcheck="false" :maxlength="201" :required="true" :disabled="state.ciBusy.value" /><UiTextField v-model="branch" root-class="settings-ui-field" label="Branch" name="branch" placeholder="main" autocomplete="off" :spellcheck="false" :maxlength="128" :optional="true" :disabled="state.ciBusy.value" hint="Enter the branch name without refs/heads/."><template #hint>Enter the branch name without <code>refs/heads/</code>.</template></UiTextField><UiTextField v-model="workflow" root-class="settings-ui-field" label="Workflow file" name="workflow" placeholder="publish.yml" autocomplete="off" :spellcheck="false" :maxlength="133" :optional="true" :disabled="state.ciBusy.value" hint="Filename in .github/workflows/."><template #hint>Filename in <code>.github/workflows/</code>.</template></UiTextField><div class="settings-ui-form-actions"><UiButton class="settings-primary-action" type="submit" variant="primary" :loading="state.ciBusy.value"><template #leading><Plus class="visual-icon" aria-hidden="true" /></template>Add publisher</UiButton><UiButton class="text-button ci-cancel" variant="quiet" :disabled="state.ciBusy.value" @click="state.ciFormOpen.value = false">Cancel</UiButton></div></form>
      </UiSettingsFormSheet>
      <div v-else-if="state.ciIdentities.value.length" class="ci-add-action"><UiButton class="settings-primary-action" variant="primary" @click="state.ciFormOpen.value = true"><template #leading><Plus class="visual-icon" aria-hidden="true" /></template>Add another publisher</UiButton></div>
      <UiSettingsEmpty v-else title="No trusted publishers" description="Add a GitHub Actions workflow that can publish under this namespace."><template #action><UiButton class="settings-primary-action" variant="primary" @click="state.ciFormOpen.value = true"><template #leading><Plus class="visual-icon" aria-hidden="true" /></template>Add publisher</UiButton></template></UiSettingsEmpty>
    </div>
  </UiSettingsSection>
</template>
