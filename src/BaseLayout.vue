<script setup lang="ts">
import AppLogo from "@/ui-kit/AppLogo.vue";
import { computed, ref } from "vue";
import AppIcon from "@/ui-kit/AppIcon.vue";
import noise_bg_mob from "@/assets/images/noise_bg_mob.png";
import {useHomeStore} from "@/home/domain/homeStore";
const screenWidth = computed(() => {
  return window.innerWidth || 0;
});

const homeStore = useHomeStore();

const isMenu = ref(false);

const backgroundUrl = computed(() => {
  return isMobile.value ? noise_bg_mob : "";
});

const isMobile = computed(() => {
  return screenWidth.value < 769;
});

function closeStatistics() {
  homeStore.isWeaknessFilter = false;
  homeStore.weaknessFilter = {};
}

function showMenu() {
  document.body.style = "overflow: hidden!important";
  isMenu.value = true;
}

function closeMenu() {
  document.body.style.overflow = "auto";
  isMenu.value = false;
}
</script>
<template>
  <div class="base-layout">

    <div
      class="base-layout__header"
      :style="{ background: `url(${backgroundUrl})` }"
      v-if="!isMobile || (isMobile && !homeStore.activeCard.length)"
    >
      <div class="base-layout__logo">
        <AppIcon
          v-if="homeStore.isWeaknessFilter"
          name="chevron-left"
          size="xl"
          class="base-layout__back"
          @click="closeStatistics"
        />
        <AppLogo v-if="!homeStore.isWeaknessFilter" />
        <p v-else class="subtitle-12 base-layout__statistic-title" v-text="'statistics'" />
        <AppIcon
          name="menu"
          size="xxxl"
          class="base-layout__menu-btn"
          @click="showMenu"
        />
      </div>
      <header>
        <slot name="header" />
      </header>
    </div>
    <div class="base-layout__content">
      <aside
        class="base-layout__navbar"
        :class="{ mob: isMobile }"
        v-show="!isMobile || (isMobile && isMenu)"
      >
        <AppIcon
          name="cross-light"
          class="base-layout__navbar-close"
          v-if="isMobile"
          @click="closeMenu"
        />
        <slot name="aside" />
      </aside>
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-layout {
  display: flex;
  flex-wrap: wrap;
  padding: rem(30) rem(24) rem(30);
  @include max-mob {
    padding: 0;
    min-height: 100vh;
  }
  &__header {
    width: 100%;
    display: flex;
    background-size: 100% 100%;
    @media all and (max-width: 769px) {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  header {
    padding: rem(26) rem(24) rem(28);
    height: rem(172);
    flex-grow: 1;
    @media all and (max-width: 769px) {
      width: 100%;
      justify-content: center;
      display: flex;
      height: auto;
      padding-top: 0;
    }
  }
  main {
    overflow-y: auto;
    flex-grow: 1;
    height: rem(672);
    @include max-mob {
      overflow: visible;
    }
  }
  &__content {
    display: flex;
    width: 100%;
    padding-bottom: rem(30);
    @include max-mob {
      padding: 0;
      flex-direction: column;
    }
  }
  .base-layout__logo {
    width: rem(350);
    height: rem(172);
    padding: rem(52) rem(40) rem(78);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    @include max-mob {
      padding: 0;
      display: flex;
      height: rem(126);
      width: 100%;
    }
  }
  &__statistic-title {
    margin-top: 30px;
  }
  &__menu-btn {
    display: none;
    @include max-mob {
      display: block;
      position: absolute;
      right: 16px;
      top: 42px;
    }
  }
  &__back {
    display: none;
    @include max-mob {
      display: block;
      position: absolute;
      left: 16px;
      top: 48px;
    }
  }
  &__navbar {
    width: rem(350);
    padding: 0 rem(40);
    &.mob {
      width: 100%;
      padding: 0;
      position: fixed;
      z-index: 10;
      top: 0;
      left: 0;
      height: 100vh;
      background-color: #000;
    }
  }
  &__navbar-close {
    position: absolute;
    right: rem(16);
    top: rem(82);
    height: rem(38)!important;
    width: rem(38)!important;
  }
}
</style>
