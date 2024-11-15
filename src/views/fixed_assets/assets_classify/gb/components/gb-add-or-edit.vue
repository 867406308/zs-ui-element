<template>
  <el-drawer
    v-model="dialogFormVisible"
    :title="!form.id ? '新增' : '修改'"
    @close="useAssetsClassifyGbAddOrEditStore.close"
    :close-on-click-modal="false"
  >
    <el-form
      :model="form"
      ref="formRef"
      label-width="auto"
      :rules="useAssetsClassifyGbAddOrEditStore.rules"
    >
      <el-form-item label="父级菜单" prop="pid">
        <el-tree-select
          v-model="form.pid"
          :data="treeData"
          check-strictly
          :props="{
            label: 'name',
            value: 'id',
            children: 'children',
          }"
          style="width: 100%"
          placeholder="请选择父级菜单"
        />
      </el-form-item>
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="分类编码" prop="code">
        <el-input v-model="form.code" placeholder="请输入分类编码"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" :rows="2" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="useAssetsClassifyGbAddOrEditStore.close"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="useAssetsClassifyGbAddOrEditStore.submit(formRef, emits)"
          >确定</el-button
        >
      </span>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { assetsClassifyGbAddOrEditStore } from '@/store/modules/fixed_assets/assets_classify/assetsClassifyGbAddOrEditStore';
import { storeToRefs } from 'pinia';
const useAssetsClassifyGbAddOrEditStore = assetsClassifyGbAddOrEditStore();
const { form, formRef, dialogFormVisible, treeData } = storeToRefs(
  useAssetsClassifyGbAddOrEditStore,
);

const emits = defineEmits(['query-data']);

defineExpose({
  form,
  init: useAssetsClassifyGbAddOrEditStore.init,
});
</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
