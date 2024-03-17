<script setup lang="ts">
import { computed } from "vue";
import { useHomeStore } from "@/home/domain/homeStore";
import router from "@/infrastructure/router";

const homeStore = useHomeStore();

const props = defineProps<{
  title: string;
  value?: number;
  type?: "indigo" | "red" | "green" | "yellow";
  strength?: number;
  percentage?: number;
}>();

const percentageFill = computed(() => {
  if(props.percentage || props.percentage === 0) {
    return {
      borderLeftColor: props?.percentage < 1 ? "#313233" : "",
      borderTopColor: props?.percentage < 50 ? "#313233" : "",
      borderRightColor: props?.percentage < 100 ? "#313233" : "",
      borderBottomColor: props?.percentage !== 100 ? "#313233" : "",
    };
  }
});

function setWeaknessFilter() {
  router.push({ name: "Home" });
  homeStore.isWeaknessFilter = true;
  homeStore.weaknessFilter = props;
}
</script>
<template>
  <div class="metric" :class="{ [props.type]: props.type }" @click="setWeaknessFilter">
    <div
      class="metric__value"
      :style="percentageFill"
      :class="{ [props.type]: props.type }"
    >
      <span>
        {{ props.value || 0 }}
      </span>
    </div>
    <p class="metric__title">
      {{ props.title }}
    </p>
  </div>
</template>
<style lang="scss">
.metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: rem(99);
  position: relative;
  @include max-mob() {
    &:not(:last-child) {
      &:after {
        position: absolute;
        right: 0;
        top: 6px;
        height: 40px;
        border-right: 1px solid $color-grey-500;
        content: "";
      }
    }
  }
  &.indigo &__value {
    border-color: $color-indigo;
    color: #fff;
  }
  &.green &__value {
    border-color: $color-green-base;
    color: #fff;
  }
  &.red &__value {
    border-color: $color-red-base;
    color: #fff;
  }
  &.yellow &__value {
    border-color: $color-lemon-base;
    color: #fff;
  }
  &__value {
    width: rem(88);
    height: rem(88);
    border: 3px solid $color-grey-700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-grey-700;
    font-weight: 300;
    font-size: rem(40);
    line-height: 36px;
    transform: rotate(-45deg);
    span {
      transform: rotate(45deg);
    }
    @include max-mob() {
      border: none;
      font-size: 40px;
      line-height: 24px;
      height: rem(60);
    }
  }
  &__title {
    font-style: normal;
    font-weight: 300;
    font-size: rem(10);
    margin-top: rem(12);
    line-height: rem(16);
    text-align: center;
    letter-spacing: rem(1.5);
    text-transform: uppercase;
    white-space: nowrap;
    color: $color-grey-400;
    @include max-mob() {
      border: none;
      font-size: 10px;
      line-height: 12px;
      display: flex;
      align-items: center;
      gap: 5px;
      color: #fff;
      margin-top: 0;
      &:after {
        line-height: 25px;
        content: " >";
      }
    }
  }
}
</style>
