<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    type?: "default" | "green";
  }>(),
  {
    type: "default",
  }
);
</script>
<template>
  <template v-if="props.type === 'default'">
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 19.877C13 19.877 18.5 17.127 18.5 13.002V8.18945L13 6.12695L7.5 8.18945V13.002C7.5 17.127 13 19.877 13 19.877Z"
        fill="url(#paint0_linear_226_669)"
        fill-opacity="0.5"
        stroke="#272829"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_226_669"
          x1="13"
          y1="6.12695"
          x2="13"
          y2="19.877"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#272829"/>
          <stop offset="1" stop-color="#272829" stop-opacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  </template>
  <template v-if="props.type === 'green'">
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.49967 12.5846C8.49967 12.5846 12.1663 10.7513 12.1663 8.0013V4.79297L8.49967 3.41797L4.83301 4.79297V8.0013C4.83301 10.7513 8.49967 12.5846 8.49967 12.5846Z"
        fill="url(#paint0_linear_48_25592)"
        fill-opacity="0.5"
        stroke="#5CC172"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_48_25592"
          x1="8.49967"
          y1="3.41797"
          x2="8.49967"
          y2="12.5846"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#5CC172"/>
          <stop offset="1" stop-color="#5CC172" stop-opacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  </template>
  
</template>
