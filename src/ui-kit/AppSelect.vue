<script lang="ts" setup>
import { defineProps, ref } from "vue";
import AppIcon from "@/ui-kit/AppIcon.vue";
const emit = defineEmits(["update:modelValue"]);
const props = withDefaults(
  defineProps<{
    modelValue: {
      label: string;
      value: string | boolean | number;
      icon?: string;
    };
    type?: "primary";
    label?: string;
    options?: {
      label: string;
      value: string | boolean | number;
    }[];
  }>(),
  {
    type: "primary",
  }
);
const isOpen = ref(false);
function toggleSelect() {
  isOpen.value = !isOpen.value;
}
function closeSelect() {
  if (isOpen.value) {
    isOpen.value = false;
  }
}
</script>
<template>
  <div
    class="select"
    @click="toggleSelect"
    v-click-outside="closeSelect"
    :class="{ opened: isOpen }"
  >
    <div class="select__header">
      <div>
        <p class="select__label" v-if="props.label">{{ props.label }}</p>
        <p class="select__title">
          <AppIcon :name="modelValue.icon" size="xxl" v-if="modelValue.icon" />
          {{ modelValue.label }}
        </p>
      </div>
      <AppIcon name="chevron-down" size="xxl" class="select__chevron" />
    </div>
    <ul class="select__options">
      <li
        v-for="(option, index) in props.options"
        :key="index"
        class="select__option"
        @click="emit('update:modelValue', option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/styles/base/typography";
.select {
  position: relative;
  cursor: pointer;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__title {
    @extend .body-16;
    min-height: rem(22);
    display: flex;
    align-items: center;
  }
  &__label {
    @extend .body-12;
    color: $color-grey-200;
    margin-bottom: 4px;
  }
  &__options {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    transition: 0.2s;
    background-color: $color-grey-700;
    width: 100%;
    left: 0;
    top: 100%;
    z-index: 2;
  }
  &__option {
    padding: rem(8);
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background-color: $color-grey-500;
    }
  }
  &.opened &__options {
    opacity: 1;
    visibility: visible;
  }
  &.opened &__chevron {
    transform: rotate(180deg);
  }
}
</style>
