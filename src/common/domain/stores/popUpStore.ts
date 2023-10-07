import { ref } from "vue";
import { defineStore } from "pinia";

export const usePopUpStore = defineStore("popUp", () => {
  const isPopUp = ref(false);
  const message = ref("");

  function showPopUp(text: string): void {
    isPopUp.value = true;
    message.value = text;
    setTimeout(() => {
      isPopUp.value = false;
      message.value = "";
    }, 3000);
  }

  return { isPopUp, message, showPopUp };
});
