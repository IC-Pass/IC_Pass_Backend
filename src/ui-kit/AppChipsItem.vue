<script setup lang="ts">
import AppIcon from "@/ui-kit/AppIcon.vue";
type propsType = {
  type?: string;
  label?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  icon?: string;
  count?: string | number;
};

const props = withDefaults(defineProps<propsType>(), {
  type: "grey",
  size: "md",
});
const emit = defineEmits(["handleClick"]);
function handleClick() {
  emit("handleClick");
}
</script>

<template>
  <div class="chips-item-wrap">
    <div
      class="chips-item"
      :class="[props.type, props.size]"
      @click="handleClick"
    >
      <AppIcon
        :size="['xl', 'xxl'].includes(props.size)? 'xl' :'md'"
        :name="props.icon"
        v-if="props.icon"
        class="chips-item__icon"
      />
      <p class="chips-item__label">{{ props.label }}</p>
      <p class="chips-item__count" v-if="typeof props.count === 'number'">
        {{ props.count }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/ui/colorsViews.scss";
.chips-item-wrap {
  display: flex;
}
.chips-item {
  font-weight: 400;
  letter-spacing: -0.5px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  &__count {
    background-color: $color-grey-50;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 16px;
    min-width: 20px;
    color: $color-grey-900;
    border-radius: 20px;
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
    margin-left: 8px;
  }
  &__icon {
    margin-right: 6px;
  }
  &.lightGrey {
    background-color: #52555c;
    color: #fff;
  }
  &.grey-50 {
    background-color: $color-grey-50;
    color: $color-grey-900;
  }
  &.grey {
    background-color: $color-grey-700;
    color: $color-white;
  }
  &.green {
    background-color: $color-green-base;
    color: $color-grey-900;
  }
  &.yellow {
    background-color: $color-lemon-base;
    color: $color-grey-900;
  }
  &.red {
    background-color: $color-red-base;
    color: $color-grey-900;
  }
  &.transparent {
    background-color: transparent;
  }
  &.xxl {
    height: auto;
    font-size: 18px;
    padding: 4px 10px 4px 6px;
  }
  &.xl {
    height: auto;
    font-size: 16px;
    padding: 4px 10px 4px 6px;
  }
  &.md {
    padding: 4px 10px 4px 6px;
    font-size: 14px;
    line-height: 16px;
  }
  &.sm {
    padding: 2px 8px;
    line-height: 14px;
    font-size: 12px;
  }
  &.xs {
    padding: 2px 7px;
    line-height: 10px;
    font-size: 10px;
  }
}
</style>
