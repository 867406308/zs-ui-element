<template>
  <el-config-provider namespace="zs" :locale="locale">
    <div id="app">
      <!-- <router-view v-if="isRouter" /> -->
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </el-config-provider>
</template>
<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
const locale = ref(zhCn);
const isRouter = ref(true);
const reload = () => {
  isRouter.value = false;
  nextTick(() => {
    isRouter.value = true;
  });
};
provide('reload', reload);
</script>
<style lang="scss" scoped>
.app-main {
  height: 100vh;
}
</style>
