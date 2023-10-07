<script setup lang="ts">
const props = defineProps<{
  checked: boolean;
  label?: string;
  disabled?: boolean;
}>();
const emit = defineEmits(["handleCheckboxClick"]);
function handleCheckboxClick() {
  if (!props.disabled) {
    emit("handleCheckboxClick", props.checked);
  }
}
</script>

<template>
  <div
    class="checkbox-wrapper"
    :class="{ disabled: props.disabled }"
    @click="handleCheckboxClick"
  >
    <span class="checkbox" :class="{ checked: props.checked }">
      <svg v-if="props.checked">
        <use href="@/assets/icons/sprite.svg#check"></use>
      </svg>
    </span>
    <span class="checkbox-label" v-if="props.label">{{ props.label }}</span>
  </div>
</template>

<style lang="scss" scoped>
.checkbox-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  &.disabled {
    cursor: auto;
    .checkbox {
      background-color: $color-grey;
      border: none;
    }
  }
}
.checkbox {
  height: 1.4rem;
  width: 1.4rem;
  margin-right: 1rem;
  border: 1px solid $color-white;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  svg {
    width: 1rem;
    height: 0.7rem;
    fill: $color-black;
  }
  &.checked {
    background-color: $color-white;
  }
  &-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
    line-height: 1.15;
    cursor: pointer;
  }
}
</style>
