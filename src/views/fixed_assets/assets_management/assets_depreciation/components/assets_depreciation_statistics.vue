<template>
  <el-dialog v-model="assetsDepreciationStatisticsVisible" title="资产折旧统计"
    >123</el-dialog
  >
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { assetsDepreciationStatisticsStore } from '@/store/modules/fixed_assets/assets_management/assets_depreciation/assetsDepreciationStatisticsStore';
const useAssetsDepreciationStatisticsStore =
  assetsDepreciationStatisticsStore();
const {
  assetsDepreciationStatisticsVisible,
  assetsDepreciationStatisticsFrom,
} = storeToRefs(useAssetsDepreciationStatisticsStore);

defineExpose({
  assetsDepreciationStatisticsFrom,
  init: useAssetsDepreciationStatisticsStore.init,
});
</script>
