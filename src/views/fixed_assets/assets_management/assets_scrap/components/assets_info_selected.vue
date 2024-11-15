<template>
  <el-dialog
    title="资产信息"
    v-model="assetsScrapSelectedVisible"
    width="70%"
    :show-close="false"
    :align-center="true"
    :fullscreen="fullscreen"
  >
    <template #header="{ close }">
      <div class="my-header">
        <div>资产信息</div>
        <div class="icons">
          <ZsIcon icon="full-screen" @click="fullscreen = !fullscreen" />
          <ZsIcon icon="close" @click="close" />
        </div>
      </div>
    </template>
    <AssetsInfoTable :style="{ height: fullscreen ? '80vh' : '50vh' }" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="assetsScrapSelectedVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="useAssetsScrapSelectedStore.handleSelected(emits)"
          :disabled="useAssetsScrapSelectedStore.selected == 0"
        >
          确认选中
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import AssetsInfoTable from '@/views/fixed_assets/assets_management/assets_info/components/assets_info_table.vue';
import { assetsScrapSelectedStore } from '@/store/modules/fixed_assets/assets_management/assets_scrap/assetsScrapSelectedStore';
import { storeToRefs } from 'pinia';
const useAssetsScrapSelectedStore = assetsScrapSelectedStore();
const { assetsScrapSelectedVisible, selectedNum } = storeToRefs(
  useAssetsScrapSelectedStore,
);

const emits = defineEmits(['selected-change']);
defineExpose({
  init: useAssetsScrapSelectedStore.init,
});

const fullscreen = ref(false);
</script>
<style lang="scss" scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .icons {
    display: flex;
    justify-content: center;
    align-items: center;

    > * {
      margin-left: 15px;
    }
  }
}
.assets-info-table {
  height: 50vh !important;
}
</style>
