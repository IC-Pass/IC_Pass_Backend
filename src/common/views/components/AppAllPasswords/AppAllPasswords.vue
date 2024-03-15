<script lang="ts" setup>
import {computed, onBeforeUnmount, onMounted, ref, toRaw, watch} from "vue";

import AppListPass from "@/common/views/components/AppListPass.vue";
import AppChipsItem from "@/ui-kit/AppChipsItem.vue";
import AppButton from "@/ui-kit/AppButton.vue";
import { useHomeStore } from "@/home/domain/homeStore";
import { usePasswordStore } from "@/home/domain/passwordStore";
import { useAuthStore } from "@/auth/domain/authStore";
import FilterMob from "@/common/views/components/AppAllPasswords/filterMob.vue";
import { weaknessChips, categoryChips } from "@/home/helpers/chipMap";

const homeStore = useHomeStore();
const authStore = useAuthStore();
const passwordStore = usePasswordStore();
const chips = computed(() => {
  if (homeStore.isWeaknessFilter) {
    return weaknessChips(authStore.user?.accounts);
  } else {
    return categoryChips(authStore.user?.accounts);
  }
});
const currentList = ref(authStore.user?.accounts);

const currentFilter = ref({
  title: "All",
  value: authStore.user?.accounts || [],
});

const isAllChips = ref(false);

function addPassword() {
  homeStore.activeCard = "createItem";
  passwordStore.password = {
    template: {
      value: 0,
      label: "",
      imgSrc: "",
    },
    usernameEmail: "",
    password: "",
    passwordStrength: 0,
    createdAt: "",
    link: "",
    tag: {
      label: "Select Tag",
      value: 0,
    },
    notes: "",
  };
}

function setPasswordToEdit(item) {
  homeStore.activeCard = "createItem";
  passwordStore.password = structuredClone(toRaw(item));
  passwordStore.password.id = item.id;
}

function setFilter(chip: any) {
  currentFilter.value = chip;
  currentList.value = chip.value;
  if (homeStore.isWeaknessFilter) {
    homeStore.weaknessFilter = chip.strength;
  }
}

const isMobile = computed(() => {
  return window.innerWidth < 769;
});

watch(() => homeStore.weaknessFilter,
  () => {
    if (homeStore.isWeaknessFilter) {
      const data = chips.value?.find((chip) => chip.strength === homeStore.weaknessFilter);
      if (data) {
        currentFilter.value = data;
        currentList.value = data.value;
      }
    }
  }
);

watch(
  () => authStore.user?.accounts,
  () => {
    currentList.value = authStore.user?.accounts || [];
    currentFilter.value.value = authStore.user?.accounts || [];
  }
);
onBeforeUnmount(() => {
  homeStore.weaknessFilter = "";
  homeStore.isWeaknessFilter = false;
  currentList.value = authStore.user?.accounts;
  currentFilter.value = {
    title: "All",
    value: authStore.user?.accounts || [],
  };
});
</script>
<template>
  <div class="passwords">
    <div class="passwords__header">
      <template v-if="!isMobile">
        <AppChipsItem
          v-for="(chipsItem, index) in chips"
          :key="chipsItem.title"
          :label="chipsItem.title"
          :icon="chipsItem.icon"
          :type="chipsItem.title === currentFilter.title ? 'grey-50' : '' "
          :count="chipsItem.value.length"
          v-show="index < 3"
          class="passwords__header-chips"
          @handleClick="setFilter(chipsItem)"
        />
        <div class="passwords__category-dropdown">
          <AppChipsItem
            :label="'+' + (chips.length - 3)"
            @click="isAllChips = !isAllChips"
            class="passwords__header-chips"
          />
          <div class="passwords__category-dropmenu" v-show="isAllChips">
            <AppChipsItem
              v-for="chipsItem in [...chips].splice(3, 5)"
              :key="chipsItem.title"
              :label="chipsItem.title"
              :icon="chipsItem.icon"
              :count="chipsItem.value.length"
              :type="chipsItem.title === currentFilter.title ? 'grey-50' : ''"
              class="passwords__header-chips"
              @handleClick="setFilter(chipsItem)"
            />
          </div>
        </div>
      </template>
      <filterMob
        v-else
        :chips="chips"
        :current-item="currentFilter"
        @handleChange="setFilter"
      />
    </div>
    <div class="passwords__content" v-if="authStore.user">
      <AppListPass
        compressed
        :list="currentList"
        class="passwords__list"
        @edit="(item) => setPasswordToEdit(item)"
        v-if="currentList?.length"
      />
      <p class="passwords__no-content" v-else>No items</p>
    </div>
    <div class="passwords__footer">
      <AppButton icon-left="plus" type="primary" @click="addPassword">
        <span>Add Password</span>
      </AppButton>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.passwords {
  @import "@/assets/styles/ui/colorsViews.scss";
  background: linear-gradient(180deg, #242526 0%, #202021 50.1%);
  border-radius: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  @include max-mob {
    border-radius: 0;
    height: auto;
  }
  &__header {
    padding: rem(24);
    border-bottom: 1px solid $color-grey-700;
    display: flex;
    flex-wrap: wrap;
    gap: rem(6);
    @include max-mob {
      padding: 0;
      margin: 0 auto;
      transform: translateY(-50%);
      z-index: 2;
    }
  }
  &__header-chips {
    cursor: pointer;
    height: 100%;
    white-space: nowrap;
  }
  &__list {
    overflow: auto;
    table {
      height: calc(100% - 100px);
    }
  }
  &__content {

    height: calc(100% - rem(200));
    overflow: auto;
    padding: rem(10) rem(8);
    @include custom-scrollbar-thick;
    @include max-mob {
      height: calc(100% - rem(140));
    }
  }
  &__heading {
    text-align: center;
  }
  &__subtitle {
    text-align: center;
    letter-spacing: -0.5px;
    max-width: rem(367);
    margin: rem(16) auto rem(28);
    color: $color-grey-400;
  }
  &__footer {
    margin-top: auto;
    border-top: 1px solid $color-grey-700;
    padding: rem(24);
  }
  &__no-content {
    text-align: center;
    padding: rem(16);
    font-size: rem(20);
  }
  &__category-dropdown {
    position: relative;
  }
  &__category-dropmenu {
    position: absolute;
    padding: rem(18);
    display: flex;
    flex-direction: column;
    top: 100%;
    left: 0;
    margin-top: 4px;
    gap: 12px;
    background-color: $color-grey-800;
    border-radius: 8px;
  }
}
</style>
