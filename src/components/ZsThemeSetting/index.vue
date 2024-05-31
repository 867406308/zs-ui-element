<template>
  <div>
    <el-button type="primary" @click="useSettingStore.openSetting"
      >主题配置</el-button
    >
  </div>
  <SettingDrawer ref="settingRef" />
</template>
<script lang="ts" setup>
import { Setting } from '@element-plus/icons-vue';
import SettingDrawer from './components/setting-drawer.vue';
import { storeToRefs } from 'pinia';
import { settingStore } from '@/store/modules/config/setting';

const useSettingStore = settingStore();
const { settingRef } = storeToRefs(useSettingStore);
</script>
