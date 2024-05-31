<template>
  <el-drawer
    v-model="noticeInfoVisible"
    title="详情"
    :close-on-click-modal="false"
    size="50%"
  >
    <h1>{{ noticeInfoForm.title }}</h1>
    <div v-html="noticeInfoForm.content"></div>
  </el-drawer>
</template>
<script setup lang="ts">
import { noticeInfoStore } from '@/store/modules/sys/notice/noticeInfoStore';
import { storeToRefs } from 'pinia';

const useNoticeInfoStore = noticeInfoStore();
const { noticeInfoVisible, noticeInfoForm } = storeToRefs(useNoticeInfoStore);

defineExpose({
  init: useNoticeInfoStore.init,
  noticeInfoForm,
});
</script>
