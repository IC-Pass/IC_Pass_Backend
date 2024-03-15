<script setup lang="ts">
import { usePopUpStore } from "@/common/domain/stores/popUpStore";
import AppIcon from "@/ui-kit/AppIcon.vue";
import { computed } from "vue";
const store = usePopUpStore();

const typeIcon = computed(() => {
  switch (store.message.type) {
    case "success":
      return "check";
    case "error":
      return "info-circle";
    default:
      return "info-circle";
  }
});
</script>
<template>
  <div class="pop-up">
    <AppIcon
      :name="store.message.icon || typeIcon"
      v-show="store.message.type?.length"
      size="md"
      class="pop-up__icon"
      :class="store.message.type"
    />
    <div class="pop-up__content">
      <p
        v-if="store.message.title?.length"
        class="pop-up__title body-16"
        v-text="store.message.title"
      />
      <p
        v-if="store.message.description?.length"
        class="pop-up__desc body-14"
        v-text="store.message.description"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
.pop-up {
  position: fixed;
  display: flex;
  top: 48px;
  right: 24px;
  max-width: 376px;
  padding: 16px 50px 16px 8px;
  word-break: break-word;
  background-color: $color-grey-700;
  border-radius: 0.4rem;
  color: $color-grey-darker;
  font-weight: 600;
  line-height: 1.2;
  animation: fade 0.3s ease-out;
  z-index: 1000;
  &__title {
    color: #fff;
  }
  &__desc {
    color: $color-grey-300;
    margin-top: 2px;
  }
  &__icon {
    flex-shrink: 0;
    margin-right: 6px;
    &.success {
      color: $color-green-base;
    }
    &.erroe {
      color: $color-red-base;
    }
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
