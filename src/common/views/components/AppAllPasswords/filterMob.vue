<script setup lang="ts">
import AppChipsItem from "@/ui-kit/AppChipsItem.vue";
import { onMounted, ref } from "vue";
import AppIcon from "@/ui-kit/AppIcon.vue";
import { useHomeStore } from "@/home/domain/homeStore";

const emit = defineEmits(["handleChange"]);

const props = defineProps<{
  chips: any;
  currentItem: any;
}>();

const homeStore = useHomeStore();

const isFilterMenu = ref(false);

const dropdownRef = ref();

function close() {
  isFilterMenu.value = false;
}

function clickOutside() {
  if (!(dropdownRef.value == event?.target || dropdownRef.value?.contains(event?.target))) {
    close();
  }
}

onMounted(() => {
  document.addEventListener("click", () => {
    clickOutside();
  });
  document.removeEventListener("click", () => {
    clickOutside();
  });
});
</script>
<template>
  <div class="filter" ref="dropdownRef">
    <div class="filter__header">
      <AppChipsItem
        :key="props.currentItem.title"
        :label="props.currentItem.title"
        :icon="props.currentItem.icon"
        :count="
          homeStore.isWeaknessFilter
            ? undefined
            : props.currentItem.value.length
        "
        size="xl"
        class="passwords__header-chips"
      />
      <div class="filter__arrow" @click="() => (isFilterMenu = !isFilterMenu)">
        <AppIcon name="chevron-down" size="xl" />
      </div>
    </div>
    <div class="filter__dropdown" v-show="isFilterMenu">
      <AppChipsItem
        v-for="chipsItem in props.chips"
        :key="chipsItem.title"
        :label="chipsItem.title"
        :icon="chipsItem.icon"
        :count="homeStore.isWeaknessFilter ? undefined : chipsItem.value.length"
        size="xl"
        v-show="props.currentItem.title !== chipsItem.title"
        @handleClick="emit('handleChange', chipsItem)"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.filter {
  position: relative;
  &__header {
    display: flex;
    align-items: center;
    border-radius: 50px;
    background: $color-grey-700;
    min-width: 248px;
  }
  &__dropdown {
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 16px;
    background-color: $color-grey-600;
    border-radius: 8px;
    white-space: nowrap;
  }
  &__arrow {
    position: relative;
    color: $color-grey-500;
    margin-left: auto;
    &:after {
      position: absolute;
      left: 0;
      top: 8px;
      bottom: 8px;
      border-left: 1px solid $color-grey-500;
      content: "";
    }
  }
}
</style>
