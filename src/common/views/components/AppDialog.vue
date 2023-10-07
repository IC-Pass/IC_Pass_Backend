<script setup lang="ts">
import AppButton from "@/ui-kit/AppButton.vue";
import { useDialogStore } from "@/common/domain/stores/dialogStore";
import AppIcon from "@/ui-kit/AppIcon.vue";
import AppLoader from "@/ui-kit/AppLoader.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";

const dialogStore = useDialogStore();

const isLoading = ref(false);

function closeDialog() {
  isLoading.value = false;
  dialogStore.closeDialog();
}

async function runCallback(callback: Function) {
  if (typeof callback !== "function") return;
  try {
    isLoading.value = true;
    closeDialog();
    await callback();
    isLoading.value = false;
  } catch (e) {
    console.log(e);
    isLoading.value = false;
  }
}

function handleESC(event: any) {
  if (event.keyCode == 27) {
    closeDialog();
  }
}

onMounted(() => {
  document.body.style.overflow = "hidden";
  document.addEventListener("keyup", handleESC);
});

onBeforeUnmount(() => {
  document.body.style.overflow = "";
  document.removeEventListener("keyup", handleESC);
});
</script>
<template>
  <div class="dialog" v-if="dialogStore.isDialog" :class="{ loading: isLoading }">
    <div class="dialog__overlay" @click.self="closeDialog">
      <div class="dialog__content">
        <AppIcon
          name="cross"
          size="md"
          @click="closeDialog"
          class="dialog__close"
        />
        <div class="dialog__confirm-text">
          <span>{{ dialogStore.title }}</span>
          <span class="dialog__description" v-if="dialogStore.description">
            {{ dialogStore.description }}
          </span>
        </div>
        <div class="dialog__confirm-btns">
          <AppButton
            :type="dialogStore.onDeclineBtn.type || 'transparent'"
            @handleClick="runCallback(dialogStore.onDeclineBtn.callback())"
            v-if="!dialogStore.onDeclineBtn.isHidden"
          >
            {{ dialogStore.onDeclineBtn.title || "" }}
          </AppButton>
          <AppButton
            :type="dialogStore.onConfirmBtn.type || 'blue'"
            @handleClick="runCallback(dialogStore.onConfirmBtn.callback)"
            v-if="!dialogStore.onConfirmBtn.isHidden"
          >
            {{ dialogStore.onConfirmBtn.title || "" }}
          </AppButton>
        </div>
        <div
          class="dialog__additional-actions"
          v-if="dialogStore.additionalActions.length"
        >
          <AppButton
            v-for="(action, index) in dialogStore.additionalActions"
            :key="index"
            :type="action.type || 'transparent'"
            @handleClick="runCallback(action.callback)"
          >
            {{ action.title || "" }}
          </AppButton>
        </div>
        <div class="dialog__loader" v-if="isLoading">
          <AppLoader />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.dialog {
  overflow: auto;
  @include modal;
  &__description {
    margin-top: 1.2rem;
  }
  &__additional-actions {
    margin-top: 1.6rem;
    display: flex;
    gap: 1.2rem;
    flex-wrap: wrap;
  }
  &__confirm-btns {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    & > * {
      width: 50%;
    }
  }
  &__overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba($color-black, 0.6);
    z-index: 100;
  }
  &__content {
    margin-top: 1rem;
    margin-bottom: 1rem;
    min-width: 40rem;
    max-width: 50rem;
    max-height: 100vh;
    border-radius: 0.4rem;
    padding: 6.8rem 6.4rem;
    background-color: $color-grey;
    position: relative;
    animation: fade 0.3s ease-out;
    transition: all 0.3s ease-out;
  }
  &.loading &__content {
    opacity: 0;
  }
  &__close {
    position: absolute;
    top: 1.4rem;
    right: 1.4rem;
    display: block;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    z-index: 1000;
  }
  &__loader {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
}
@keyframes fade {
  0% {
    opacity: 0;
    transform: scale(0.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>