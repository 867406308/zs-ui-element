<template>
  <el-config-provider namespace="zs" :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </el-config-provider>
</template>
<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
const locale = ref(zhCn);
</script>
<style lang="scss" scoped>
.app-main {
  height: 100vh;
}
</style>
