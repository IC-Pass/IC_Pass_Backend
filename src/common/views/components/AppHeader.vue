<script setup lang="ts">
import Metrics from "@/ui-kit/Metrics/Metrics.vue";
</script>

<template>
  <div class="header">
    <Metrics class="header__metrics" />
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  &__logo {
    width: rem(156);
  }
}
</style>
