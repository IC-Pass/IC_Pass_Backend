import { defineStore } from "pinia";
import {computed, ref, toRaw} from "vue";
import { AuthClient } from "@dfinity/auth-client";
// @ts-ignore
import { createActor, canisterId } from "@/common/declarations/icpass_backend";
import { useHomeStore } from "@/home/domain/homeStore";

import type { ActorMethod, ActorSubclass, Identity } from "@dfinity/agent";
import type { Result_1 } from "@/common/declarations/icpass_backend/icpass.did";
import type { Profile } from "@/auth/domain/profile";
import { userFromDto } from "@/auth/domain/userMapper";
import { useModalStore } from "@/common/domain/stores/modalStore";
import { PasswordStrength } from "@/home/domain/Password";

export type StoredKey = string | any;
export class AuthClientStorage {
  async get(key: string): Promise<StoredKey | null> {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  async set(key: string, value: StoredKey): Promise<void> {
    await localStorage.setItem(key, JSON.stringify(value));
  }

  async remove(key: string): Promise<void> {
    await localStorage.removeItem(key);
  }
}

declare const ECDSA_KEY_LABEL = "ECDSA";
declare const ED25519_KEY_LABEL = "Ed25519";
declare type BaseKeyType = typeof ECDSA_KEY_LABEL | typeof ED25519_KEY_LABEL;

const defaultOptions = {
  createOptions: {
    keyType: "Ed25519" as BaseKeyType,
    storage: new AuthClientStorage(),
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true,
    },
  },
  loginOptions: {
    identityProvider: "https://identity.ic0.app/#authorize",
  },
};

function actorFromIdentity(identity: Identity) {
  return createActor(canisterId, {
    agentOptions: {
      identity,
    },
  });
}

export const useAuthStore = defineStore("auth", () => {
  const homeStore = useHomeStore();
  const modalStore = useModalStore();

  const isReady = ref(false);

  const isAuthenticated = ref(false);

  const authClient = ref<AuthClient | null>(null);

  const identity = ref<Identity | null>(null);

  const user = ref<Profile | null>(null);

  const whoamiActor = ref<ActorSubclass<
    Record<string, ActorMethod<unknown[], unknown>>
  > | null>(null);

  const accountMetrics = computed(() => {
    let excellent: number = 0;
    let good: number = 0;
    let weak: number = 0;
    user.value?.accounts?.forEach((item) => {
      switch (PasswordStrength[item.passwordStrength]) {
        case "Good":
          good++;
          break;
        case "Excellent":
          excellent++;
          break;
        case "Weak":
        case "Too_weak":
          weak++;
          break;
      }
    });
    return {
      excellent,
      good,
      weak,
    };
  });

  async function init() {
    try {
      modalStore.isMainLoader = true;

      authClient.value = await AuthClient.create(defaultOptions.createOptions);

      isAuthenticated.value = await authClient.value.isAuthenticated();

      identity.value = isAuthenticated.value
        ? authClient.value.getIdentity()
        : null;

      whoamiActor.value = identity.value
        ? await actorFromIdentity(identity.value)
        : null;
      isReady.value = true;
      if (isAuthenticated.value && whoamiActor.value && identity.value) {
        homeStore.isWelcomePass = false;
        await getUser();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        modalStore.isMainLoader = false;
      }, 1000);
    }
  }

  function runCreatedUser() {
    homeStore.setActiveCard("");
  }

  async function login() {
    const client = toRaw(authClient.value);
    client?.login({
      ...defaultOptions.loginOptions,
      onSuccess: async () => {
        isAuthenticated.value = await client.isAuthenticated();
        identity.value = isAuthenticated.value ? client.getIdentity() : null;
        whoamiActor.value = identity.value
          ? await actorFromIdentity(identity.value)
          : null;
        homeStore.isWelcomePass = false;
        await getUser();
      },
    });
  }

  async function createProfile(profile: any) {
    try {
      await whoamiActor.value.create(profile).catch((e) => {
        console.log(e);
      });
      await getUser();
    } catch (e) {
      console.log(e);
    }
  }

  async function getUser() {
    const result: Result_1 = (await whoamiActor.value.get(
      identity.value.getPrincipal()
    )) as Result_1;
    if (result.ok) {
      user.value = userFromDto(result.ok);
      runCreatedUser();
    } else {
      homeStore.isWelcomePass = true;
      homeStore.setActiveCard("profileDetails");
    }
  }

  async function logout() {
    const client = toRaw(authClient.value);
    await client?.logout();
    isAuthenticated.value = false;
    identity.value = null;
    whoamiActor.value = null;
  }

  return {
    user,
    isReady,
    isAuthenticated,
    authClient,
    identity,
    whoamiActor,
    accountMetrics,
    init,
    createProfile,
    getUser,
    login,
    logout,
  };
});
