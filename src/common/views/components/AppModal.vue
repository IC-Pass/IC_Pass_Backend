<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";
import { useModalStore } from "@/common/domain/stores/modalStore";
import AppLoader from "@/ui-kit/AppLoader.vue";
import AppIcon from "@/ui-kit/AppIcon.vue";

const store = useModalStore();
const emit = defineEmits(["onModalClose"]);

const props = defineProps({
  gap: {
    type: String,
    default: () => "",
    validator: (value: string) => {
      return ["", "small", "medium", "large"].indexOf(value) >= 0;
    },
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

function closeModal() {
  emit("onModalClose");
  store.closeModal();
}

function handleESC(event: any) {
  if (event.keyCode == 27) {
    closeModal();
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
  <div class="modal" :class="[props.gap]">
    <div
      class="modal__overlay"
      :class="{ [store.name.split('-')[0]]: store.name }"
      @click="store.name !== 'metricSettings' ? closeModal() : null"
    />
    <div
      class="modal__content"
      :class="{ [store.name.split('-')[0]]: store.name }"
    >
      <AppIcon
        name="cross"
        class="modal__close"
        size="md"
        @click="closeModal"
      />
      <slot />
      <div class="modal__loader" v-if="isLoading">
        <AppLoader />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  &.small &__content {
    padding: 1.8rem 1.6rem;
  }
  &__overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba($color-black, 0.6);
    z-index: 10;
  }
  &__content {
    margin-top: 1rem;
    margin-bottom: 1rem;
    min-width: 40rem;
    max-width: 80vw;
    max-height: calc(100vh - 4rem);
    border-radius: 0.4rem;
    padding: 6.8rem 6.4rem;
    background-color: $color-grey;
    position: relative;
    animation: fade 0.3s ease-out;
    transition: all 0.3s ease-out;
    z-index: 10;
    &.metricSettings,
    &.aggregationSettings,
    &.filterSettings,
    &.metricGroupSettings,
    &.entitySettings,
    &.columnSettings,
    &.sortBySettings {
      padding: 0;
      background-color: $color-grey-dark;
    }
    &.sql {
      margin-top: 10rem;
      padding: 0;
      max-width: 90%;
    }
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
