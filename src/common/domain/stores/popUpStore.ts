import { ref } from "vue";
import { defineStore } from "pinia";

export interface Message {
  title?: string;
  description?: string;
  type?: string;
  icon?: string;
}

export const usePopUpStore = defineStore("popUp", () => {
  const isPopUp = ref(false);
  const message = ref<Message>({});

  function showPopUp(text: Message): void {
    isPopUp.value = true;
    message.value = text;
    setTimeout(() => {
      isPopUp.value = false;
      message.value = {};
    }, 3000);
  }

  return { isPopUp, message, showPopUp };
});
