<script lang="ts" setup>
import AppCardPlug from "../../common/views/components/AppCardPlug.vue";
import illustrationSocials from "@/assets/images/IllustrationSocials.png";
import illustrationSocials_mob from "@/assets/images/Illustration_mob.png";
import logoPlace from "@/assets/images/LogoPlace.png";
import AppButton from "@/ui-kit/AppButton.vue";
import { useAuthStore } from "@/auth/domain/authStore";
import { computed} from "vue";
const authStore = useAuthStore();

const isMobile = computed(() => {
  return window.innerWidth < 769;
});
</script>
<template>
  <AppCardPlug
    class="welcome"
    title="Welcome to Pass"
    desc="Connect your Internet Identity and start creating and managing your passwords."
    :img-src="isMobile ? illustrationSocials_mob : illustrationSocials"
  >
    <AppButton
      class="welcome__btn"
      type="white"
      @click="authStore.login"
      v-if="!authStore.isAuthenticated"
    >
      <div class="welcome__btn-content">
        <img :src="logoPlace" alt="" />
        Connect Internet Identity
      </div>
    </AppButton>
  </AppCardPlug>
</template>
<style lang="scss" scoped>
.welcome {
  &:deep(.home-card__content) {
    padding-bottom: rem(24);
    height: 100%;
  }
  &:deep(.card-plug__content) {
    height: 100%;
  }
  &__btn {
    width: 100%;
    margin-top: auto;
    img {
      display: block;
      width: rem(28);
    }
  }
  &__btn-content {
    display: flex;
    gap: rem(12);
    align-items: center;
  }
}
</style>
