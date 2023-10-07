<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    label?: string;
    modelValue: number;
    min?: number;
    max?: number;
  }>(),
  {
    min: 0,
    max: 100,
  }
);
const backgroundSize = computed(() => {
  return (
    ((props.modelValue - props.min) * 100) / (props.max - props.min) + "% 100%"
  );
});
</script>
<template>
  <div class="range">
    <div class="range__header">
      <p class="range__label body-16" v-if="props.label">{{ props.label }}</p>
      <p class="range__value body-12">{{ props.modelValue }}</p>
    </div>
    <input
      :style="{ backgroundSize }"
      ref="inputRef"
      type="range"
      :min="props.min"
      :max="props.max"
      :value="props.modelValue"
      class="range__range"
      @input="(e) => $emit('update:modelValue', Number(e.target.value))"
      @change="() => $emit('change')"
    />
  </div>
</template>
<style lang="scss" scoped>
.range {
  width: 100%;
  padding-bottom: 9px;
  &__header {
    margin-bottom: rem(8);
    display: flex;
    align-items: center;
  }
  &__value {
    color: $color-grey-400;
    margin-left: auto;
  }
  &__range {
    width: 100%;
    -webkit-appearance: none;
    background: $color-grey-700;
    background-image: linear-gradient($color-grey-50, $color-grey-50);
    background-repeat: no-repeat;
    &:focus {
      outline: none;
    }
    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 1px;
      cursor: pointer;
      box-shadow: none;
      background: none;
      border-radius: 1px;
      border: none;
      outline: none;
    }
    &::-webkit-slider-thumb {
      box-shadow: none;
      border: 1px solid $color-grey-50;
      height: 20px;
      width: 20px;
      border-radius: 25px;
      background: $color-grey-800;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -9px;
    }
    &:focus::-webkit-slider-runnable-track {
      background: transparent;
    }
    &::-moz-range-track {
      width: 100%;
      height: 1px;
      cursor: pointer;
      background: transparent;
      border-radius: 1px;
      border: none;
    }
    &::-moz-range-thumb {
      box-shadow: none;
      border: 1px solid $color-grey-50;
      height: 18px;
      width: 18px;
      border-radius: 25px;
      background: $color-grey-800;
      cursor: pointer;
    }
    &::-ms-track {
      width: 100%;
      height: 1px;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      color: transparent;
    }
    &::-ms-fill-lower {
      background: transparent;
      border: none;
      border-radius: 2px;
      box-shadow: none;
    }
    &::-ms-fill-upper {
      background: transparent;
      border: none;
      border-radius: 2px;
      box-shadow: none;
    }
    &::-ms-thumb {
      margin-top: 1px;
      box-shadow: none;
      border: 1px solid $color-grey-50;
      height: 18px;
      width: 18px;
      border-radius: 25px;
      background: $color-grey-800;
      cursor: pointer;
    }
    &:focus::-ms-fill-lower {
      background: transparent;
    }
    &:focus::-ms-fill-upper {
      background: transparent;
    }
  }
}
</style>
