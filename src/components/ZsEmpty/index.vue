<template>
  <el-empty :image="img" :description="description" />
</template>
<script setup>
import img from '@/assets/images/empty-list.svg';
defineProps({
  description: {
    type: String,
  },
});
</script>
<style lang="scss" scoped>
.zs-empty {
  width: 100%;
  height: 100%;

  :deep() {
    .zs-empty__image {
      width: 30%;
      height: 30%;
      margin: 0 auto;
      display: block;
    }
  }
}
</style>
