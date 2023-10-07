<script setup lang="ts">
import { usePopUpStore } from "@/common/domain/stores/popUpStore";
const store = usePopUpStore();
</script>
<template>
  <div class="pop-up">
    {{ store.message }}
  </div>
</template>
<style scoped lang="scss">
.pop-up {
  position: fixed;
  bottom: 5rem;
  left: calc(50% - 26rem);
  width: 52rem;
  padding: 2rem 4rem;
  word-break: break-word;
  background-color: $color-white;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $color-grey-darker;
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
  animation: fade 0.3s ease-out;
  z-index: 1000;
}
@keyframes fade {
  0% {
    opacity: 0;
    transform: scale(0.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
