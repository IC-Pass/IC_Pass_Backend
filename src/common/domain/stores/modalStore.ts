import { ref } from "vue";
import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", () => {
  const isModal = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const name = ref<string>("");
  const isMainLoader = ref(false);
  function showModal(payload: string): void {
    name.value = payload;
    isModal.value = true;
  }
  function closeModal(): void {
    name.value = "";
    isModal.value = false;
  }
  return { isModal, name, showModal, isMainLoader, closeModal, isLoading };
});
