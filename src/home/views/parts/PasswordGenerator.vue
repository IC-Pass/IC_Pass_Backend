<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import {
  containsSpecialChars,
  containsNumber,
  containsUppercase,
  generatePassword,
} from "@/helpers/passwordGenerator";

import HomeCard from "@/home/views/parts/HomeCard.vue";
import AppIcon from "@/ui-kit/AppIcon.vue";
import AppChipsItem from "@/ui-kit/AppChipsItem.vue";
import Shield from "@/assets/icons/shield.vue";
import AppRange from "@/ui-kit/AppRange.vue";
import AppToggle from "@/ui-kit/AppToggle.vue";
import AppButton from "@/ui-kit/AppButton.vue";
const emit = defineEmits(["handleSave", "close"]);
const password = ref("HGsd$!%hdfFk$%#$df090fn");

const isUppercase = ref(true);
const isNumbers = ref(true);
const isSpecialChr = ref(true);
const passwordLength = ref(15);

const isEditPassword = ref(false);

const computedPassword = computed(() => {
  let content = "";
  password.value.split("").forEach((item) => {
    if (containsSpecialChars(item)) {
      content += `<span class="special-chr">${item}</span>`;
    } else if (containsNumber(item)) {
      content += `<span class="number">${item}</span>`;
    } else if (containsUppercase(item)) {
      content += `<span class="uppercase">${item}</span>`;
    } else {
      content += `<span>${item}</span>`;
    }
  });
  return content;
});
function newPassword() {
  password.value = generatePassword({
    passwordLength: passwordLength.value,
    isUppercase: isUppercase.value,
    isNumbers: isNumbers.value,
    isSpecialChr: isSpecialChr.value,
  });
}
onMounted(() => {
  newPassword();
})
</script>
<template>
  <HomeCard class="pass-generator">
    <template #header>
      <div class="pass-generator__back" @click="emit('close')">
        <AppIcon size="xxl" name="chevron-left" />
      </div>
      <h3 class="pass-generator__title subtitle-12">Password Generator</h3>
    </template>
    <div class="pass-generator__content">
      <div class="pass-generator__area generator-area">
        <div class="generator-area__header">
          <span class="generator-area__title">Password</span>
          <AppChipsItem type="green" size="xs" label="Exelent" />
          <shield type="green" />
          <AppIcon name="copy" size="xxl" class="generator-area__copy" />
          <AppIcon
            name="refresh"
            size="xxl"
            class="generator-area__refresh"
            @click="newPassword"
          />
        </div>
        <div class="generator-area__content">
          <div
            class="generator-area__textarea"
            :class="{ edit: isEditPassword }"
          >
            <textarea
              spellcheck="false"
              v-model="password"
              @focus="() => (isEditPassword = true)"
              @blur="() => (isEditPassword = false)"
            />
            <div
              class="generator-area__computed"
              contenteditable="true"
              v-html="computedPassword"
            />
          </div>
          <div class="generator-area__range">
            <AppRange
              label="Length"
              :min="8"
              :max="40"
              v-model="passwordLength"
              @change="newPassword"
            />
          </div>
          <div class="generator-area__options">
            <div class="main-card-list__item generator-area__option">
              <div>
                <p class="generator-area__option-label">Use capital letters</p>
                <p class="generator-area__option-hint uppercase">e.g. A-Z</p>
              </div>
              <AppToggle
                class="generator-area__toggle"
                v-model="isUppercase"
                @input="newPassword"
              />
            </div>
            <div class="main-card-list__item generator-area__option">
              <div>
                <p class="generator-area__option-label">Use digits</p>
                <p class="generator-area__option-hint number">e.g. 0-9</p>
              </div>
              <AppToggle
                class="generator-area__toggle"
                v-model="isNumbers"
                @input="newPassword"
              />
            </div>
            <div class="main-card-list__item generator-area__option">
              <div>
                <p class="generator-area__option-label">Use symbols</p>
                <p class="generator-area__option-hint symbols">e.g. @!$%&*</p>
              </div>
              <AppToggle
                class="generator-area__toggle"
                v-model="isSpecialChr"
                @input="newPassword"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <AppButton type="primary" @click="emit('handleSave', password)">Save password</AppButton>
    </template>
  </HomeCard>
</template>
<style lang="scss" scoped>
@import "@/assets/styles/base/typography";
.pass-generator {
  &__title {
    text-align: center;
    padding: rem(30);
  }
  &__generate-btn {
    margin: rem(10) 0 rem(16);
  }
  & &__generate-btn {
    padding: rem(9) rem(12);
  }
  &__back {
    position: absolute;
    top: rem(22);
    left: rem(24);
    background-color: $color-grey-700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    cursor: pointer;
    @include min-desktop() {
      &:hover {
        background-color: $color-grey-500;
      }
    }
  }
}
.generator-area {
  &__header {
    display: flex;
    align-items: center;
    padding: rem(8) rem(8) rem(8) rem(16);
    background-color: $color-grey-800;
    border-top: 1px solid $color-green-base;
  }
  &__title {
    @extend .body-12;
    margin-right: rem(7.5);
  }
  &__content {
    position: relative;
  }
  &__copy {
    cursor: pointer;
    margin-left: auto;
    border-radius: 50%;
    transition: 0.3s;
    @include min-desktop() {
      &:hover {
        background-color: $color-grey-500;
      }
    }
  }
  &__refresh {
    border-radius: 50%;
    transition: 0.3s;
    cursor: pointer;
    @include min-desktop() {
      &:hover {
        background-color: $color-grey-500;
      }
    }
  }
  &__computed,
  &__content textarea {
    display: block;
    width: 100%;
    height: rem(80);
    resize: none;
    background: transparent;
    border: none;
  }
  &__textarea {
    padding: rem(8) rem(16);
    background-color: $color-grey-800;
    textarea {
      color: transparent;
      font-size: rem(20);
      font-weight: 300;
      line-height: rem(24);
      outline: none;
      font-family: inherit;
    }
    &.edit textarea {
      color: #fff;
    }
  }
  &__textarea.edit &__computed {
    opacity: 0;
    visibility: hidden;
  }
  &__computed {
    position: absolute;
    left: 0;
    top: 0;
    padding: rem(8) rem(16);
    pointer-events: none;
    font-size: rem(20);
    font-weight: 300;
    line-height: rem(24);
    &:deep(.special-chr) {
      color: $color-light-blue;
    }
    &:deep(.number) {
      color: $color-purple;
    }
    &:deep(.uppercase) {
      color: $color-light-lemon;
    }
  }
  &__range {
    border-top: 2px solid $color-grey-900;
    padding: rem(16);
    background-color: $color-grey-800;
    border-radius: 0 0 8px 8px;
  }
  &__options {
    padding: rem(16);
  }
  &__option {
    display: flex;
    align-items: center;
  }
  &__toggle {
    margin-left: auto;
  }
  &__option-label {
    @extend .body-16;
  }
  &__option-hint {
    @extend .body-12;
    margin-top: 4px;
    &.uppercase {
      color: $color-light-lemon;
    }
    &.number {
      color: $color-purple;
    }
    &.symbols {
      color: $color-light-blue;
    }
  }
}
</style>
