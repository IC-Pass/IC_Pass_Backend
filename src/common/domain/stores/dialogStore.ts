import { ref } from "vue";
import { defineStore } from "pinia";
import type { dialogCallback, dialogOptions } from "@/common/common/dialog";

export const useDialogStore = defineStore("dialog", () => {
  const isDialog = ref<boolean>(false);

  const title = ref("");

  const description = ref("");

  const onConfirmBtn = ref<dialogCallback>({
    title: "Ok",
    isHidden: false,
    callback: closeDialog,
  });

  const onDeclineBtn = ref<dialogCallback>({
    title: "Cancel",
    isHidden: false,
    callback: closeDialog,
  });

  const additionalActions = ref<dialogCallback[]>([]);

  function openDialog(payload: dialogOptions): void {
    title.value = payload.title;
    description.value = payload.description || "";
    if (payload.onConfirm) {
      onConfirmBtn.value = { ...onConfirmBtn.value, ...payload.onConfirm };
    }
    if (payload.onDecline) {
      onDeclineBtn.value = { ...onDeclineBtn.value, ...payload.onDecline };
    }
    if (payload.additionalActions) {
      additionalActions.value = payload.additionalActions;
    }
    isDialog.value = true;
  }

  function closeDialog(): void {
    onConfirmBtn.value = {
      title: "Ok",
      callback: closeDialog,
    };
    onDeclineBtn.value = {
      title: "Cancel",
      callback: closeDialog,
    };
    isDialog.value = false;
  }

  return {
    isDialog,
    title,
    description,
    additionalActions,
    onConfirmBtn,
    onDeclineBtn,
    openDialog,
    closeDialog,
  };
});
