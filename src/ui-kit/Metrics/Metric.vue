<script setup lang="ts">
const props = defineProps<{
  title: string;
  value: number;
}>();
</script>
<template>
  <div class="metric">
    <div class="metric__value">
      {{ props.value }}
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
    @include max-mob() {
      border: none;
      font-size: 40px;
      line-height: 36px;
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
      line-height: 16px;
      display: flex;
      align-items: center;
      gap: 5px;
      &:after {
        line-height: 25px;
        content: " >";
      }
    }
  }
}
</style>
