import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useErrorsStore = defineStore("apiErrors", () => {
  const errors = ref<any[]>([]);

  const isError = computed<boolean>(() => {
    return errors.value.length > 0;
  });

  return { errors, isError };
});
