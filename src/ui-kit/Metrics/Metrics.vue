<script setup>
import Metric from "./Metric.vue";

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
</script>
<template>
  <div class="metrics">
    <metric
      v-for="metric in metrics"
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
}
</style>
