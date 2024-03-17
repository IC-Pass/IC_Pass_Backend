<script lang="ts" setup>
import HomeCard from "@/home/views/parts/HomeCard.vue";
import { useProfileStore } from "@/common/domain/stores/profileStore";
import {computed, ref} from "vue";
import AppToggle from "@/ui-kit/AppToggle.vue";
import {useAuthStore} from "@/auth/domain/authStore";
import AppInput from "@/ui-kit/AppInput.vue";
import AppIcon from "@/ui-kit/AppIcon.vue";
import Logout from "@/settings/views/Logout.vue";
import router from "@/infrastructure/router";
import AppChipsItem from "@/ui-kit/AppChipsItem.vue";

const profileStore = useProfileStore();
const authStore = useAuthStore();

const isEmailNotification = ref(false);
const isLogout = ref(false);

const profile = computed(() => authStore.user);

const userLetters = computed(() => {
  if (!profile.value?.fullName) return "";
  const userNameSplit = profile.value.fullName.split(" ");
  let abbr = "";
  if (userNameSplit.length > 1) {
    for (let i = 0; i < 2; i++) {
      abbr += userNameSplit[i][0];
    }
  } else {
    abbr += userNameSplit[0][0];
  }
  return abbr;
});

const isMobile = computed(() => {
  return window.innerWidth < 769;
});

const isDetails = ref(false);

async function logout() {
  await authStore.logout();
  router.push({ name: "Home" });
  isLogout.value = false;
}
</script>
<template>
  <div class="settings">
    <HomeCard
      v-if="(isMobile && !isDetails) || !isMobile"
      class="settings__config config"
      :is-loading="!profile"
    >
      <template #header>
        <div class="config__header">
          <div v-if="isMobile" @click="() => (isDetails = true)">
            <AppChipsItem
              label="Edit profile"
              icon="profile"
              size="xxl"
              class="config__profile-btn"
            >
              <template #custom-slot>
                <AppIcon name="chevrone_right" size="xxs" style="margin-left: auto;" />
              </template>
            </AppChipsItem>
          </div>
          <h1 class="heading config__title">{{ profile.fullName }}</h1>
          <p class="subtitle-10 config__subtitle">
            use pass since {{ profileStore.profile.createdDate }}
          </p>
        </div>
      </template>
      <div>
        <div class="main-card-list__item">
          <AppToggle
            v-model="isEmailNotification"
            label="Email Notification"
            disabled
            class="generator-area__toggle"
          />
        </div>
        <div class="main-card-list__item">
          <AppToggle
            v-model="isEmailNotification"
            disabled
            label="System notifications"
            class="generator-area__toggle"
          />
        </div>
        <div class="main-card-list__item">
          <AppToggle
            v-model="isEmailNotification"
            disabled
            label="Show my wallet number"
            class="generator-area__toggle"
          />
        </div>
      </div>
    </HomeCard>
    <HomeCard
      v-if="(isMobile && isDetails) || !isMobile"
      class="settings__config config"
      :is-loading="!profile"
    >
      <template #header>
        <div class="settings__config-header">
          <AppIcon
            v-if="isMobile"
            name="chevron-left"
            size="xxl"
            class="settings__config-back"
            @click="() => (isDetails = false)"
          />
          <h3
            class="heading config__title subtitle-12"
            v-text="'Profile details'"
          />
          <AppIcon
            name="logout"
            size="xxl"
            class="settings__config-exit"
            @click="() => (isLogout = true)"
          />
        </div>
      </template>
      <template #default>
        <div class="main-card-list__item d-flex">
          <div class="config__avatar avatar">
            <div class="avatar__photo">
              <div v-text="userLetters" />
            </div>
          </div>
          <AppInput
            type="text"
            label="Full name"
            placeholder="Enter your name"
            :default="profile.fullName"
            disabled
            @handleInputValue="(e) => (profile.fullName = e)"
          />
        </div>
        <div class="main-card-list__item">
          <AppInput
            type="text"
            default="587a6b8ed07707248cce...9b0db46"
            label="Wallet"
            placeholder="Enter your Wallet"
            locked
          />
        </div>
        <div class="main-card-list__item">
          <p class="main-card-list__item-label">Your plan</p>
          <p class="config__details-plan">
            <span class="config__details-plan-name" v-text="'Basic'" />
            <span v-text="'free forever'" />
            <AppIcon
              size="xl"
              name="info-circle"
              class="config__details-plan-info"
            />
          </p>
        </div>
        <div class="logout-overlay" :class="{ active: isLogout }">
          <div class="logout-overlay__content">
            <Logout
              class="logout-overlay__logout"
              @submit="logout"
              @cancel="() => (isLogout = false)" />
          </div>
        </div>
      </template>
    </HomeCard>
  </div>
</template>
<style lang="scss" scoped>
.settings {
  width: 100%;
  display: flex;
  gap: rem(10);
  @include max-mob {
    height: 100%;
  }
  &__config {
    width: 50%;
    @include max-mob {
      width: 100%;
    }
  }
  &__config-header {
    padding: rem(30);
    position: relative;
  }
  &__config-back {
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  &__config-exit {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    width: rem(38)!important;
    height: rem(38)!important;
    cursor: pointer;
  }
}
.config {
  &__header {
    position: relative;
    padding: rem(24);
    @include max-mob {
      padding-bottom: rem(40);
    }
  }
  &__profile-btn {
    width: 200px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    z-index: 2;
  }
  &__title {
    text-align: center;
  }
  &__subtitle {
    margin-top: rem(12);
    text-align: center;
    color: $color-grey-200;
  }
  &__details {
    margin-top: rem(40);
  }
  &__details-plan {
    @extend .body-16 !optional;
    display: flex;
  }
  &__details-plan-name {
    color: $color-green-light;
  }
  &__details-plan-info {
    margin-left: auto;
  }
}
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  &__photo {
    width: rem(42);
    height: rem(42);
    font-size: 12px;
    text-transform: uppercase;
    border-radius: 50%;
    border: 1.5px dashed $color-grey-500;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: rem(32);
    div {
      background-color: $color-grey-700;
      border-radius: 50%;
      width: 80%;
      height: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.logout-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
  background-color: rgba(#000, 0.7);
  transition: opacity 0.3s;
  opacity: 0;
  visibility: hidden;
  display: flex;
  overflow: hidden;
  &.active {
    visibility: visible;
    opacity: 1;
  }
  &__content {
    width: 100%;
    transform: translateY(100%);
    transition: 0.5s;
  }
  &.active &__content {
    transform: translateY(0);
  }
  &__logout {
    height: auto;
  }
}
</style>
