<script setup lang="ts">
import Metric from "./Metric.vue";
type metric = {
  title: string;
  value: number;
};
const props = defineProps<{
  metrics: metric[];
}>();
</script>
<template>
  <div class="metrics">
    <Metric
      v-for="metric in props.metrics"
      :key="metric.title"
      :title="metric.title"
      :value="metric.value"
    />
  </div>
</template>
<style lang="scss">
.metrics {
  display: flex;
  gap: rem(40);
  @include max-mob() {
    gap: 0;
  }
}
</style>
