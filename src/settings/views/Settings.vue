<script lang="ts" setup>
import HomeCard from "@/home/views/parts/HomeCard.vue";
import { useProfileStore } from "@/common/domain/stores/profileStore";
import {computed, ref} from "vue";
import AppToggle from "@/ui-kit/AppToggle.vue";
import {useAuthStore} from "@/auth/domain/authStore";
import AppInput from "@/ui-kit/AppInput.vue";
import AppIcon from "@/ui-kit/AppIcon.vue";

const profileStore = useProfileStore();
const authStore = useAuthStore();
const isEmailNotification = ref(false);

const profile = computed(() => authStore.user)

const userLetters = computed(() => {
  console.log(authStore.user);
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
</script>
<template>
  <div class="settings">
    <HomeCard class="settings__config config" :is-loading="!profile">
      <template #header>
        <div class="config__header">
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
            class="generator-area__toggle"
          />
        </div>
        <div class="main-card-list__item">
          <AppToggle
            v-model="isEmailNotification"
            label="System notifications"
            class="generator-area__toggle"
          />
        </div>
        <div class="main-card-list__item">
          <AppToggle
            v-model="isEmailNotification"
            label="Show my wallet number"
            class="generator-area__toggle"
          />
        </div>
      </div>
    </HomeCard>
    <HomeCard class="settings__config config" :is-loading="!profile">
      <template #header>
        <div class="settings__config-header">
          <h3
            class="heading config__title subtitle-12"
            v-text="'Profile details'"
          />
          <AppIcon name="logout" size="xxl" class="settings__config-exit" />
        </div>
      </template>
      <template #default>
        <div class="main-card-list__item d-flex">
          <div class="config__avatar avatar">
            <div class="avatar__photo">
              <div>
                {{ userLetters }}
              </div>
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
            <span class="config__details-plan-name">
              Basic&nbsp;
            </span>
            <span>free forever</span>
            <AppIcon
              size="xl"
              name="info-circle"
              class="config__details-plan-info"
            />
          </p>
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
  &__config {
    width: 50%;
  }
  &__config-header {
    padding: rem(30);
    position: relative;
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
    padding: rem(24);
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
</style>
