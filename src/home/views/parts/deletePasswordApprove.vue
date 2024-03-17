<script setup lang="ts">
import AppIcon from "@/ui-kit/AppIcon.vue";
import HomeCard from "@/home/views/parts/HomeCard.vue";
import AppButton from "@/ui-kit/AppButton.vue";
const emit = defineEmits(["cancel", "submit"]);
</script>

<template>
  <HomeCard class="delete-handle" auto-height @back="emit('close')">
    <template #header>
      <div class="delete-handle__header">
        <AppIcon name="logout" size="xxxl" />
      </div>
    </template>
    <div>
      <h3 class="heading delete-handle__title" v-text="'Delete this item?'" />
      <p
        class="body-16"
        v-text="'Are you sure you want to permanently delete this item from Icpass?'"
      />
      <div class="delete-handle__btns">
        <AppButton type="danger" @click="emit('submit')">Yes, delete!</AppButton>
        <AppButton type="transparent" @click="emit('cancel')">Cancel</AppButton>
      </div>
    </div>
  </HomeCard>
</template>
<style lang="scss" scoped>
.delete-handle {
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
  }
}
</style>
