<script lang="ts" setup>
import { computed } from "vue";
import Shield from "@/assets/icons/shield.vue";
import { passwordStrength } from "check-password-strength";
import { PasswordStrength } from "@/home/domain/Password";

const props = defineProps<{
  password: string;
}>();

function checkWeakness(pass: string) {
  return passwordStrength(pass).id;
}

const isCompromised = computed(() => {
  return false;
});
const strength = computed(() => {
  return checkWeakness(props.password);
});
</script>
<template>
  <div class="strength" :class="[`rank-${strength}`]">
    <p class="strength__text body-12">{{ PasswordStrength[strength] }}</p>
    <div class="strength__shield" v-if="strength === 3">
      <Shield type="green" />
    </div>
    <div class="strength__compromised body-12" v-if="isCompromised">
      Compromised
    </div>
  </div>
</template>

<style scoped lang="scss">
.strength {
  display: flex;
  align-items: center;
  &__shield {
    &:deep(svg) {
      width: 24px;
      height: 24px;
    }
  }
  &__text,
  &__compromised {
    padding: rem(4) rem(8);
    border-radius: rem(10);
    color: $color-grey-800;
  }
  &.rank-1 &__text {
    background-color: $color-red-base;
  }
  &.rank-2 &__text {
    background-color: $color-light-lemon;
  }
  &.rank-3 &__text {
    background-color: $color-green-base;
  }
  &__compromised {
    color: $color-red-base;
    border: 1px solid $color-red-base;
    margin-left: 4px;
  }
}
</style>
