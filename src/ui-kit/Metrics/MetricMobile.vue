<script lang="ts" setup>
import {computed} from "vue";

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
</script>
<template>
  <div class="metric-mobile" :class="{ [props.type]: props.type }">
    <div class="metric-mobile__wrap" :style="percentageFill">
      <p class="metric-mobile__value" v-text="props.value" />
      <p class="metric-mobile__text subtitle-10" v-text="'passwords'" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.metric-mobile {
  width: 254px;
  height: 170px;
  max-width: 100%;
  overflow: hidden;
  &__value {
    font-size: 52px;
    line-height: 64px;
    text-align: center;
    font-weight: 300;
    margin-top: -40px;
  }
  &__wrap {
    border-radius: 50%;
    border-width: 4px;
    border-style: solid;
    width: 254px;
    max-width: 100%;
    height: 254px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:after {
      width: 168px;
      height: 168px;
      border-radius: 50%;
      position: absolute;
      bottom: -40px;
      content: "";
    }
  }
  &.indigo &__wrap {
    border-color: $color-indigo;
    color: #fff;
    &:after {
      background: radial-gradient(rgba($color-indigo, 0.16), rgba($color-indigo, 0));
      box-shadow: 0 0 60px 0 rgba($color-indigo, 0.1);
    }
  }
  &.green &__wrap {
    border-color: $color-green-base;
    color: #fff;
    &:after {
      background: radial-gradient(rgba($color-green-base, 0.16), rgba($color-green-base, 0));
      box-shadow: 0 0 60px 0 rgba($color-green-base, 0.1);
    }
  }
  &.red &__wrap {
    border-color: $color-red-base;
    color: #fff;
    &:after {
      background: radial-gradient(rgba($color-red-base, 0.16), rgba($color-red-base, 0));
      box-shadow: 0 0 60px 0 rgba($color-red-base, 0.1);
    }
  }
  &.yellow &__wrap {
    border-color: $color-lemon-base;
    color: #fff;
    &:after {
      background: radial-gradient(rgba($color-lemon-base, 0.16), rgba($color-lemon-base, 0));
      box-shadow: 0 0 60px 0 rgba($color-lemon-base, 0.1);
    }
  }
}
</style>
