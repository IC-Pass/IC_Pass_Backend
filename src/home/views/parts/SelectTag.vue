<script lang="ts" setup>
import { ref } from "vue";
import HomeCard from "@/home/views/parts/HomeCard.vue";
import AppIcon from "@/ui-kit/AppIcon.vue";

const emit = defineEmits(["handleSelect", "close"]);

const props = defineProps<{
  modelValue: string;
}>();
const tagOptions = ref([
  {
    label: "Social Network",
    value: "socials",
    icon: "social",
  },
  {
    label: "Banking",
    value: "banking",
    icon: "banking",
  },
  {
    label: "E-commerce",
    value: "ecommerce",
    icon: "eCommerce",
  },
  {
    label: "Services",
    value: "services",
    icon: "services",
  },
  {
    label: "Education",
    value: "education",
    icon: "education",
  },
  {
    label: "Other",
    value: "other",
    icon: "otherPassCategory",
  },
]);

</script>
<template>
  <HomeCard class="select-tag" isBack auto-height @back="emit('close')">
    <template #header>
      <h3 class="select-tag__title subtitle-12">Select tag</h3>
    </template>
    <ul class="select-tag__list">
      <li
        v-for="tag in tagOptions"
        :key="tag.value"
        class="select-tag__item"
        :class="{ checked: props.modelValue === tag.value }"
        @click="() => $emit('handleSelect', tag)"
      >
        <AppIcon :name="tag.icon" size="xxl" />
        <span class="body-16">{{ tag.label }}</span>
        <AppIcon class="select-tag__check" name="check" size="xl" />
      </li>
    </ul>
  </HomeCard>
</template>
<style lang="scss">
.select-tag {
  &__title {
    text-align: center;
    padding: rem(30);
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: rem(12);
  }
  &__item {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
  }
  &__check {
    margin-left: auto;
    opacity: 0;
    visibility: hidden;
    color: $color-grey-50;
  }
  &__item.checked &__check {
    opacity: 1;
    visibility: visible;
  }
  &__item.checked {
    color: $color-grey-400;
  }
}
</style>
