<script setup lang="ts">
import AppIcon from "@/ui-kit/AppIcon.vue";
import HomeCard from "@/home/views/parts/HomeCard.vue";
import AppButton from "@/ui-kit/AppButton.vue";
const emit = defineEmits(["cancel", "submit"]);
</script>

<template>
  <HomeCard class="logout" auto-height @back="emit('close')">
    <template #header>
      <div class="logout__header">
        <AppIcon name="logout" size="xxxl" />
      </div>
    </template>
    <div>
      <h3 class="heading logout__title" v-text="'Log out'" />
      <p
        class="body-16"
        v-text="'Are you sure you want to log out from Pass?'"
      />
      <div class="logout__btns">
        <AppButton type="danger" @click="emit('submit')">Log out</AppButton>
        <AppButton type="transparent" @click="emit('cancel')">Cancel</AppButton>
      </div>
    </div>
  </HomeCard>
</template>
<style lang="scss" scoped>
.logout {
  &__header {
    padding: 8px 16px;
  }
  &__title {
    margin-bottom: 16px;
  }
  &__btns {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 40px;
    position: relative;
    &:after {
      display: block;
      box-shadow: 0 0 200px 100px rgba($color-red-base, 0.5);
      border-radius: 50%;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      content: "";
    }
  }
}
</style>
