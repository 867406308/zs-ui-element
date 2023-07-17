<template>
  <div class="route">
    <ZsIcon :icon="(route.meta.icon as string)" size="23px"></ZsIcon>
    <div class="title">{{ route.meta.title }}</div>
  </div>
</template>
<script lang="ts" setup>
const route = useRoute();
</script>
<style lang="scss" scoped>
.route {
  display: flex;
  align-items: center;

  .title {
    margin-left: 5px;
  }
}
</style>
