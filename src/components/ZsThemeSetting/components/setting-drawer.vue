<template>
  <el-drawer v-model="settingVisible" :close-on-click-modal="false">
    <el-button @click="useSettingStore.changeLayout('horizontal')"
      >横向布局1111</el-button
    >
    <el-button @click="useSettingStore.changeLayout('vertical')"
      >纵向布局</el-button
    >
    <el-button @click="useSettingStore.changeLayout('column')"
      >分栏布局</el-button
    >
  </el-drawer>
</template>
<script setup lang="ts">
import { settingStore } from '@/store/modules/config/setting';
import { storeToRefs } from 'pinia';

const useSettingStore = settingStore();
const { settingVisible } = storeToRefs(useSettingStore);
</script>
