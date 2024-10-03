<template>
  <div class="jmreport-container">
    <iframe
      :src="url"
      frameborder="0"
      width="100%"
      height="100%"
      class="iframe"
    />
  </div>
</template>
<script lang="ts" setup>
const url = import.meta.env.VITE_BASE_URL + '/jmreport/list';
</script>
<style lang="scss" scoped>
.jmreport-container {
  height: 100vh;

  .iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
