import { defineStore } from "pinia";
import { ref } from "vue";
import type { Password } from "@/home/domain/Password";
import { useHistoryStore } from "@/history/domain/historyStore";
import type { PassListItem } from "@/common/domain/PassListItem";
import { useHomeStore } from "@/home/domain/homeStore";
import { useAuthStore } from "@/auth/domain/authStore";
import { passwordToDto } from "@/home/domain/passwordMapper";

export const usePasswordStore = defineStore("passwordStore", () => {
  const isLoading = ref(false);

  const historyStore = useHistoryStore();

  const homeStore = useHomeStore();

  const authStore = useAuthStore();

  const password = ref<Password | PassListItem>({
    template: {
      value: 0,
      label: "",
      imgSrc: "",
    },
    usernameEmail: "",
    password: "",
    passwordStrength: 0,
    createdAt: "",
    link: "",
    tag: {
      label: "Select Tag",
      value: 0,
    },
    notes: "",
  });

  function setPassword(payload: Password) {
    password.value = payload;
  }
  function resetStore() {
    password.value = {
      template: {
        value: 0,
        label: "",
        imgSrc: "",
      },
      usernameEmail: "",
      password: "",
      passwordStrength: 0,
      createdAt: "",
      link: "",
      tag: {
        label: "Select Tag",
        value: 0,
      },
      notes: "",
    };
  }
  async function createPassword() {
    try {
      if (!authStore.whoamiActor || !authStore.identity) return;
      const data = await passwordToDto({
        ...password.value,
        createdAt: String(new Date()),
      } as any);
      await authStore.whoamiActor
        .addNewAccount(data)
        .then((e) => {
          console.log(e);
        })
        .catch((e) => {
          console.log(e);
        });
      historyStore.historyList.push(
        JSON.parse(JSON.stringify(password.value)) as PassListItem
      );
      resetStore();
      homeStore.activeCard = "";
    } catch (e) {
      console.log(e);
    } finally {
      isLoading.value = false;
    }
  }

  async function updatePassword() {
    try {
      if (!authStore.whoamiActor || !authStore.identity) return;

      const accounts = [...authStore.user.accounts];
      const currentItemIndex = accounts.findIndex((account) => {
        return account.id === password.value.id;
      });

      if (currentItemIndex >= 0) {
        accounts[currentItemIndex] = password.value;
        await authStore.whoamiActor
          .update({
            ...authStore.user,
            accounts: accounts.map(passwordToDto),
          })
          .then((e) => {
            console.log(e);
          })
          .catch((e) => {
            console.log(e);
          });
        resetStore();
        homeStore.activeCard = "";
      }
    } catch (e) {
      console.log(e);
    } finally {
      isLoading.value = false;
    }
  }

  async function deletePassword() {
    try {
      if (!authStore.whoamiActor || !authStore.identity) return;

      const accounts = authStore.user.accounts.filter((account) => {
        return account.id !== password.value.id;
      });
      await authStore.whoamiActor
        .update({
          ...authStore.user,
          accounts: accounts.map(passwordToDto),
        })
        .then((e) => {
          console.log(e);
        })
        .catch((e) => {
          console.log(e);
        });
      resetStore();
      homeStore.activeCard = "";
    } catch (e) {
      console.log(e);
    }
  }
  return {
    password,
    setPassword,
    isLoading,
    createPassword,
    updatePassword,
    deletePassword,
    resetStore,
  };
});
