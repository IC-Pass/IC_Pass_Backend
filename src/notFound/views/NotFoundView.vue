<script setup lang="ts">
import AppIcon from "@/ui-kit/AppIcon.vue";
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p class="not-found__descr">Oops! Looks like the page is gone!</p>
    <p class="not-found__descr">
      404 error. The link is broken or the page has been moved
    </p>
    <router-link class="not-found__link" :to="{ name: 'Home' }">
      <AppIcon name="arrow-left" size="sm" />
      Go back to the main page?
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  font-family: "Inter", sans-serif;
  font-style: normal;
  display: flex;
  position: relative;
  top: 22%;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  max-width: 43.2rem;
  h1 {
    font-weight: 300;
    font-size: 20rem;
    line-height: 24.2rem;
    color: $color-grey-400;
    text-align: center;
    margin-bottom: 4rem;
  }
  &__descr {
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 1.9rem;
    margin-bottom: 0.8rem;
  }
  &__link {
    margin-top: 1.6rem;
    font-size: 1.6rem;
    line-height: 1.9rem;
    text-decoration-line: underline;
    text-transform: uppercase;
    color: $color-green-base;
    gap: 1rem;
    display: flex;
    align-items: center;
  }
}
</style>
