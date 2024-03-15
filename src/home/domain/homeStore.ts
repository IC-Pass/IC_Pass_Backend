import { defineStore } from "pinia";
import { ref } from "vue";
type cards = "onboarding" | "profileDetails" | "createItem" | "";

export const useHomeStore = defineStore("homeStore", () => {
  const activeCard = ref("onboarding");
  const isWelcomePass = ref(true);
  const isWeaknessFilter = ref(false);
  const weaknessFilter = ref();

  function setActiveCard(value: cards) {
    activeCard.value = value;
  }
  return {
    activeCard,
    isWelcomePass,
    isWeaknessFilter,
    setActiveCard,
    weaknessFilter,
  };
});
