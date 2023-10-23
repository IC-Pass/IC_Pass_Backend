<script setup lang="ts">
import { computed } from "vue";
import Metrics from "@/ui-kit/Metrics/Metrics.vue";

const screenWidth = computed(() => {
  return window.innerWidth || 0;
});
const metrics = [
  {
    title: "All passwords",
    value: 0,
  },
  {
    title: "Excellent",
    value: 0,
  },
  {
    title: "Good",
    value: 0,
  },
  {
    title: "Weak",
    value: 0,
  },
  {
    title: "Compromised",
    value: 0,
  },
  {
    title: "Reused",
    value: 0,
  },
];
const mobMetrics = [
  {
    title: "All Items",
    value: 0,
  },
  {
    title: "Weak items",
    value: 0,
  },
  {
    title: "members",
    value: 0,
  },
];
</script>

<template>
  <div class="header">
    <Metrics
      class="header__metrics"
      :metrics="screenWidth > 769 ? metrics : mobMetrics"
    />
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  @include max-mob() {
    width: 100%;
  }
  &__logo {
    width: rem(156);
  }
  &__metrics {
    @include max-mob() {
      &:deep(.metric) {
        width: 33%;
      }
      width: 100%;
    }
  }
}
</style>
