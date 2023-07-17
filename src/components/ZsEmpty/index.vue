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
