<script lang="ts" setup>
import AppIcon from "@/ui-kit/AppIcon.vue";
import { computed, ref } from "vue";
import AppLoader from "@/ui-kit/AppLoader.vue";

const props = withDefaults(
  defineProps<{
    isBack?: boolean;
    autoHeight?: boolean;
    narrowContent?: boolean;
    isLoading?: boolean;
  }>(),
  {
    isBack: false,
    autoHeight: false,
    isLoading: false,
  }
);
const headerRef = ref<HTMLDivElement>();
const footerRef = ref<HTMLDivElement>();
const cardRef = ref<HTMLDivElement>();
const contentHeight = computed(() => {
  return (
    (cardRef.value?.clientHeight || 0) -
    (headerRef.value?.clientHeight || 0) -
    (footerRef.value?.clientHeight || 0)
  );
});
</script>
<template>
  <div
    class="home-card"
    :class="{ autoHeight: autoHeight, narrowContent: narrowContent }"
    ref="cardRef"
  >
    <template v-if="!isLoading">
      <div class="home-card__header" ref="headerRef" v-if="$slots.header">
        <div class="home-card__back" v-if="props.isBack" @click="$emit('back')">
          <AppIcon size="xxl" name="chevron-left" />
        </div>
        <slot name="header" />
      </div>
      <div class="home-card__content">
        <slot />
      </div>
      <div class="home-card__footer" ref="footerRef" v-if="$slots.footer">
        <div class="home-card__footer-content">
          <slot name="footer" />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="home-card__loader">
        <AppLoader />
      </div>
    </template>
  </div>
</template>
<style lang="scss">
.home-card {
  background: linear-gradient(180deg, #242526 0%, #202021 50.1%);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: rem(672);
  @include max-mob {
    border-radius: 0;
    height: auto;
    overflow: auto;
  }
  &.autoHeight {
    align-self: flex-end;
  }
  &.narrowContent &__content {
    padding: rem(16) rem(8);
  }
  &__header {
    border-bottom: 1px solid $color-grey-700;
    position: relative;
  }
  &__content {
    padding: rem(32) rem(24);
    overflow: auto;
    @include custom-scrollbar-thick;
    @include max-mob {
      padding: 60px 20px 20px !important;
    }
  }
  &__footer {
    margin-top: auto;
    padding: 0 rem(24);
  }
  &__footer-content {
    padding: rem(24) 0;
    border-top: 1px solid $color-grey-700;
  }
  &__back {
    position: absolute;
    top: rem(22);
    left: rem(24);
    background-color: $color-grey-700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    cursor: pointer;
    @include min-desktop() {
      &:hover {
        background-color: $color-grey-500;
      }
    }
  }
  &__loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
