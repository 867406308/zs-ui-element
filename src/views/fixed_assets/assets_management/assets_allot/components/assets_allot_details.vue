<template>
  <el-drawer
    v-model="assetsAllotDetailsVisible"
    title="明细"
    @close="useAssetsScrapDetailsStore.close"
    :close-on-click-modal="false"
    size="50%"
  >
    <div>111222</div>
  </el-drawer>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { assetsAllotDetailsStore } from '@/store/modules/fixed_assets/assets_management/assets_allot/assetsAllotDetailsStore';
const useAssetsScrapDetailsStore = assetsAllotDetailsStore();
const { assetsAllotDetailsVisible, assetsAllotDetailsFrom } = storeToRefs(
  useAssetsScrapDetailsStore,
);

defineExpose({
  assetsAllotDetailsFrom,
  init: useAssetsScrapDetailsStore.init,
});
</script>
