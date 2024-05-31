<template>
  <el-drawer
    v-model="assetsInventoryAddVisible"
    title="新增"
    @close="useAssetsInventoryAddStore.close"
    :close-on-click-modal="false"
    size="50%"
  >
    <el-form
      :model="assetsInventoryForm"
      ref="ruleFormAddRef"
      label-width="auto"
      label-position="right"
      :rules="useAssetsInventoryAddStore.rules"
    >
      <el-form-item label="盘点任务名称" prop="name">
        <el-input
          v-model="assetsInventoryForm.name"
          placeholder="请输入盘点任务名称"
        />
      </el-form-item>
      <el-form-item label="盘点部门" prop="orgId">
        <el-tree-select
          v-model="assetsInventoryForm.orgId"
          :data="deptTreeData"
          :props="{
            label: 'deptName',
            value: 'sysDeptId',
            children: 'children',
          }"
          style="width: 100%"
          placeholder="请选择盘点部门"
        />
      </el-form-item>
      <el-form-item label="资产分级" prop="levelId">
        <el-select
          v-model="assetsInventoryForm.levelId"
          placeholder="请选择资产分级"
          style="width: 100%"
          clearable
        >
          <el-option label="一级" value="1000"></el-option>
          <el-option label="二级" value="1001"></el-option>
          <el-option label="三级" value="1002"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="盘点人" prop="userId">
        <el-select
          v-model="assetsInventoryForm.userId"
          placeholder="请选择盘点人员"
          style="width: 100%"
          clearable
          filterable
        >
          <el-option
            v-for="item in userData"
            :key="item.sysUserId"
            :label="item.realName"
            :value="item.sysUserId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          v-model="assetsInventoryForm.description"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="请输入盘点描述"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="useAssetsInventoryAddStore.close">取消</el-button>
        <el-button
          type="primary"
          @click="useAssetsInventoryAddStore.submit(ruleFormAddRef, emits)"
          :loading="loading"
          >确定</el-button
        >
      </span>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { assetsInventoryAddStore } from '@/store/modules/fixed_assets/assets_management/assets_inventory/assetsInventoryAddStore';
import { storeToRefs } from 'pinia';

const useAssetsInventoryAddStore = assetsInventoryAddStore();
const {
  assetsInventoryAddVisible,
  ruleFormAddRef,
  loading,
  assetsInventoryForm,
  deptTreeData,
  userData,
} = storeToRefs(useAssetsInventoryAddStore);
const emits = defineEmits(['query-data']);
defineExpose({
  init: useAssetsInventoryAddStore.init,
});
</script>
