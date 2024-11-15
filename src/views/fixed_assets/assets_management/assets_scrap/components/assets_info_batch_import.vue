<template>
  <el-dialog
    v-model="assetsInfoBatchImportVisible"
    title="批量导入"
    width="30%"
  >
    <el-input
      v-model="assetsInfoSerialNoImport"
      placeholder="请输入资产编号,每个编号之间用逗号隔开"
      :rows="10"
      type="textarea"
    />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="assetsInfoBatchImportVisible = false"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="useAssetsScrapAddStore.importAssetsInfoSubmit"
        >
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { assetsScrapAddStore } from '@/store/modules/fixed_assets/assets_management/assets_scrap/assetsScrapAddStore';
import { storeToRefs } from 'pinia';
const useAssetsScrapAddStore = assetsScrapAddStore();
const { assetsInfoBatchImportVisible, assetsInfoSerialNoImport } = storeToRefs(
  useAssetsScrapAddStore,
);
</script>
