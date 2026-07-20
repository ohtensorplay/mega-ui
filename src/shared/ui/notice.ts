import { ref } from "vue";
import { defineStore } from "pinia";

export const useUiNoticeStore = defineStore("ui-notice", () => {
  const message = ref<string | null>(null);

  function show(value: string): void {
    message.value = value;
  }

  function clear(): void {
    message.value = null;
  }

  return { message, show, clear };
});
