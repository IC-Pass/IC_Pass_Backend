<script lang="ts" setup>
import AppLogo from "@/ui-kit/AppLogo.vue";
</script>
<template>
  <div class="main-loader">
    <AppLogo class="main-loader__logo"/>
  </div>
</template>

<style scoped lang="scss">
.main-loader {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(124deg, rgba(19, 20, 20, 1) 13.18%, rgba(9, 9, 9, 1) 71.64%);
  &__logo {
    animation: logoPulse 1s alternate infinite;
  }
}
@keyframes logoPulse {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.5);
  }
}
</style>
