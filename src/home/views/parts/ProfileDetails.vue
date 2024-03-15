<script lang="ts" setup>
import { computed, reactive } from "vue";
import { useAuthStore } from "@/auth/domain/authStore";

import HomeCard from "./HomeCard.vue";
import AppIcon from "@/ui-kit/AppIcon.vue";
import AppButton from "@/ui-kit/AppButton.vue";
import AppInput from "@/ui-kit/AppInput.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const authStore = useAuthStore();

const profile = reactive({
  fullName: "",
});
const rules = {
  fullName: { required },
};

const v$ = useVuelidate(rules, profile);

const userLetters = computed(() => {
  if (!profile.fullName) return "";
  const userNameSplit = profile.fullName.split(" ");
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
function createProfile() {
  authStore.createProfile(profile);
}

async function submitForm() {
  if (await v$.value.$validate()) {
    createProfile();
  }
}
</script>
<template>
  <HomeCard class="profile-details">
    <template #header>
      <h3 class="profile-details__title subtitle-12">Profile details</h3>
    </template>
    <div class="profile-details__content profile">
      <div class="profile__avatar avatar">
        <div class="avatar__photo">
          <!--          <img
            v-if="profileStore.profile.avatar.length"
            class="avatar__photo-img"
            :src="profileStore.profile.avatar"
            alt=""
          />-->
          <div>
            {{ userLetters }}
            <!--            <AppIcon name="image" class="avatar__icon" />-->
          </div>
        </div>
        <!--        <div class="avatar__info">
          <p class="avatar__title body-16">Profile picture</p>
          <div class="avatar__btns">
            <label class="avatar__upload">
              <AppButton type="transparent">
                <div class="body-16">
                  <AppIcon name="upload" size="lg" />
                  Upload image
                </div>
              </AppButton>
              <input type="file" />
            </label>
            <AppButton
              class="avatar__remove"
              :disabled="!profileStore.profile.avatar.length"
              type="outline"
              on-hover="danger"
            >
              <div class="body-16">Remove</div>
            </AppButton>
          </div>
          <p class="avatar__ext body-12">
            *.png, *.jpeg files up to 2MB at least 400px by 400px
          </p>
        </div>-->
      </div>
      <div class="profile__details">
        <div class="main-card-list">
          <div class="main-card-list__item">
            <AppInput
              type="text"
              label="Full name"
              placeholder="Enter your name"
              :default="profile.fullName"
              :error="v$.fullName.$errors.length"
              :error-message="v$.fullName.$errors"
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
            <p class="profile__details-plan">
              <span class="profile__details-plan-name">
                Basic&nbsp;
              </span>
              <span>free forever</span>
              <AppIcon
                size="xl"
                name="info-circle"
                class="profile__details-plan-info"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <AppButton type="primary" @click="submitForm">Create Account</AppButton>
    </template>
  </HomeCard>
</template>
<style lang="scss" scoped>
@import "src/assets/styles/base/typography";
.profile-details {
  &__title {
    text-align: center;
    padding: rem(30);
  }
}
.profile {
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
    width: rem(96);
    height: rem(96);
    font-size: rem(32);
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
  &__photo-img {
    object-fit: cover;
    object-position: center;
  }
  &__photo &__icon,
  &__photo-img {
    border-radius: 50%;
    width: rem(73.99);
    height: rem(73.99);
  }
  &__upload {
    position: relative;
    display: block;
    border: 1.5px solid $color-grey-500;
    border-radius: 8px;
    flex-grow: 1;
    flex-shrink: 0;
    cursor: pointer;
    transition: 0.3s;
    &:deep(.btn) {
      padding: rem(11);
      line-height: rem(22);
      pointer-events: none;
    }
    input {
      position: absolute;
      opacity: 0;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      cursor: pointer;
      z-index: 1;
      &::file-selector-button {
        cursor: pointer;
      }
    }
    div {
      display: flex;
      gap: 4px;
      align-items: center;
    }
    @include min-desktop() {
      &:hover {
        background-color: rgba($color-grey-500, 0.4);
      }
    }
  }
  &__title {
    margin-bottom: rem(12);
  }
  &__btns {
    display: flex;
    gap: 8px;
  }
  &__remove {
    flex-shrink: 1;
    padding: rem(11) rem(16);
    line-height: rem(22);
  }
  &__ext {
    margin-top: rem(8);
    color: $color-grey-400;
  }
}
</style>
