<template>
  <el-drawer
    v-model="assetsAllotAddVisible"
    title="资产调拨"
    @close="useAssetsAllotAddStore.close"
    :close-on-click-modal="false"
    size="70%"
  >
    123321
  </el-drawer>
</template>
<script lang="ts" setup>
import { assetsAllotAddStore } from '@/store/modules/fixed_assets/assets_management/assets_allot/assetsAllotAddStore';
import { init } from 'echarts/types/src/echarts.all.js';
import { storeToRefs } from 'pinia';

const useAssetsAllotAddStore = assetsAllotAddStore();
const { assetsAllotAddVisible } = storeToRefs(useAssetsAllotAddStore);

defineExpose({
  init: useAssetsAllotAddStore.init,
});
</script>
