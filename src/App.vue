<script setup lang="ts">
import { watch } from "vue";
import { RouterView } from "vue-router";
import { useErrorsStore } from "@/common/domain/stores/errorsStore";
import { usePopUpStore } from "@/common/domain/stores/popUpStore";
import AppPopUp from "@/common/views/components/AppPopUp.vue";
import BaseLayout from "@/BaseLayout.vue";
import AppHeader from "@/common/views/components/AppHeader.vue";
import AppNavbar from "@/common/views/components/AppNavbar.vue";
import AppDialog from "@/common/views/components/AppDialog.vue";

import { storeToRefs } from "pinia";
import { useAuthStore } from "@/auth/domain/authStore";
import AppMainLoader from "@/ui-kit/AppMainLoader.vue";
import { useModalStore } from "@/common/domain/stores/modalStore";

const authStore = useAuthStore();
const modalStore = useModalStore();

const { isReady } = storeToRefs(authStore);
if (isReady.value === false) {
  authStore.init();
}

const errorsStore = useErrorsStore();
const popUpStore = usePopUpStore();
watch(
  () => errorsStore.isError,
  () => {
    if (errorsStore.isError) {
      popUpStore.showPopUp(
        [...new Set(errorsStore.errors.map((item) => item.message))].join(", ")
      );
      errorsStore.errors = [];
    }
  }
);
</script>

<template>
  <div>
    <BaseLayout>
      <template #header>
        <AppHeader />
      </template>
      <template #aside>
        <AppNavbar />
      </template>
      <router-view v-slot="{ Component, route }">
        <transition mode="out-in">
          <div :key="route.fullPath" style="height: 100%">
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </BaseLayout>
  </div>
  <AppPopUp v-if="popUpStore.isPopUp" />
  <AppDialog />
  <AppMainLoader v-if="modalStore.isMainLoader"/>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease-out;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.loader {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
