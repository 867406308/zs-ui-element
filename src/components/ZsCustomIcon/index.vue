<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path :d="pathData" />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 50,
    },
    pathData: {
      type: String,
      default:
        'M25 0C11.193 0 0 11.193 0 25s11.193 25 25 25 25-11.193 25-25S38.807 0 25 0zm0 45C13.465 45 3 36.535 3 25S13.465 5 25 5 37 13.465 37 25 26.535 37 25 37zm0-35C11.902 5 5 11.902 5 25s6.902 20 15 20 15-6.902 15-20S38.098 5 25 5z',
    },
  },
};
</script>
