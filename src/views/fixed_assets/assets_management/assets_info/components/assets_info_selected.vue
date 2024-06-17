<template>
  <el-dialog
    title="资产信息"
    v-model="assetsInfoSelectedVisible"
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
    <div class="assets-info">
      <el-form :model="assetsInfoForm" ref="ruleFormRef" label-width="auto">
        <el-form-item label="资产名称" prop="name">
          <el-input
            v-model="assetsInfoForm.name"
            placeholder="请输入资产名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="资产编号" prop="code">
          <el-col :span="11">
            <el-input
              v-model="assetsInfoForm.serialNoStart"
              placeholder="请输入资产编号"
            ></el-input>
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">~</span>
          </el-col>
          <el-col :span="11">
            <el-input
              v-model="assetsInfoForm.serialNoEnd"
              placeholder="请输入资产编号"
            ></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <AssetsInfoTable class="assets-info-table" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="assetsInfoSelectedVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="useAssetsInfoStore.handleSelectionChange"
        >
          确认选中
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import AssetsInfoTable from '@/views/fixed_assets/assets_management/assets_info/components/assets_info_table.vue';
import { assetsInfoStore } from '@/store/modules/fixed_assets/assets_management/assets_info/assetsInfoStore';
import { storeToRefs } from 'pinia';
const useAssetsInfoStore = assetsInfoStore();
const { assetsInfoSelectedVisible, assetsInfoForm } =
  storeToRefs(useAssetsInfoStore);

const emits = defineEmits(['selected-change']);
defineExpose({
  init: useAssetsInfoStore.selectedInit,
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
  height: 100%;
  .assets-info {
    :deep(.zs-table) {
      height: 100% !important;
    }
  }
}
</style>
