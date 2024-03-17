<script setup lang="ts">
import { computed } from "vue";
import Metrics from "@/ui-kit/Metrics/Metrics.vue";
import { useAuthStore } from "@/auth/domain/authStore";
import violet_blow from "@/assets/images/violet_blow.png";
import { PasswordStrength } from "@/home/domain/Password";
import { useHomeStore } from "@/home/domain/homeStore";
import MetricMobile from "@/ui-kit/Metrics/MetricMobile.vue";
import {useRoute} from "vue-router";

const authStore = useAuthStore();

const homeStore = useHomeStore();

const route = useRoute();

const screenWidth = computed(() => {
  return window.innerWidth || 0;
});

const chosenMetricValue = computed(() => {
  if (Array.isArray(homeStore.weaknessFilter.value)) {
    return homeStore.weaknessFilter.value.length;
  } else {
    return homeStore.weaknessFilter?.value || 0;
  }
});

const isMobile = computed(() => {
  return window.innerWidth < 769;
});

const metrics = computed(() => {
  return [
    {
      title: "All Items",
      value: authStore.user?.accounts?.length,
      percentage: 100,
      type: "indigo",
    },
    {
      title: "Excellent",
      value: authStore.accountMetrics.excellent,
      percentage: authStore.accountMetrics.excellent
        ? (authStore.accountMetrics.excellent /
            (authStore.user?.accounts?.length || 0)) *
          100
        : 0,
      strength: 3,
      type: "green",
    },
    {
      title: "Good",
      value: authStore.accountMetrics.good,
      percentage: authStore.accountMetrics.good
        ? (authStore.accountMetrics.good /
            (authStore.user?.accounts?.length || 0)) *
          100
        : 0,
      type: "yellow",
      strength: 2,
    },
    {
      title: "Weak",
      value: authStore.accountMetrics.weak,
      percentage: authStore.accountMetrics.weak
        ? (authStore.accountMetrics.weak /
            (authStore.user?.accounts?.length || 0)) *
          100
        : 0,
      strength: 1,
      type: "red",
    },
  ];
});
</script>

<template>
  <div class="header">
    <Metrics
      class="header__metrics"
      :metrics="screenWidth > 769 ? metrics : [...metrics].splice(0, 3)"
      v-if="(isMobile && !homeStore.isWeaknessFilter && route.name === 'Home') || !isMobile"
    />

    <MetricMobile
      v-else-if="route.name === 'Home'"
      class="header__metric-mobile"
      :title="homeStore.weaknessFilter?.title"
      :value="chosenMetricValue"
      :type="homeStore.weaknessFilter.type"
      :strength="homeStore.weaknessFilter.strength"
      :percentage="homeStore.weaknessFilter.percentage"
    />
    <div id="headerPoint" />
    <img :src="violet_blow" alt="" class="header__violet-blow" />
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  position: relative;
  @include max-mob() {
    width: 100%;
  }
  &__logo {
    width: rem(156);
    @include max-mob {
      width: rem(10);
    }
  }
  &__metric-mobile {
    margin: 0 auto;
  }
  &__metrics {
    @include max-mob() {
      &:deep(.metric) {
        width: 33.3333333333333333%;
      }
      width: 100%;
    }
  }
  &__violet-blow {
    display: none;
    @include max-mob {
      width: rem(168);
      height: rem(168);
      position: absolute;
      pointer-events: none;
      bottom: rem(-61);
      display: block;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
