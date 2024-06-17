<template>
  <el-config-provider namespace="zs" :locale="locale">
    <div id="app">
      <router-view v-if="isRouter" />
      <!-- <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view> -->
    </div>
  </el-config-provider>
</template>
<script lang="ts" setup>
import { settingStore } from '@/store/modules/config/setting';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import en from 'element-plus/dist/locale/en.js';
const locale = ref(zhCn);
const isRouter = ref(true);
const reload = () => {
  isRouter.value = false;
  nextTick(() => {
    isRouter.value = true;
  });
};
provide('reload', reload);

const useSettingStore = settingStore();

onMounted(() => {
  useSettingStore.initTheme();
});
</script>
<style lang="scss" scoped>
.app-main {
  height: 100vh;
}
</style>
