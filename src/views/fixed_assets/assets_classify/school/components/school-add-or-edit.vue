<template>
  <el-drawer
    v-model="dialogFormVisible"
    :title="!form.id ? '新增' : '修改'"
    @close="useAssetsClassifySchoolAddOrEditStore.close"
    :close-on-click-modal="false"
  >
    <el-form
      :model="form"
      ref="formRef"
      label-width="auto"
      :rules="useAssetsClassifySchoolAddOrEditStore.rules"
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
      <el-form-item label="折旧年限(月)" prop="depreciationYears">
        <el-input-number
          v-model="form.depreciationYears"
          placeholder="请输入折旧年限"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" :rows="2" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="useAssetsClassifySchoolAddOrEditStore.close"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="useAssetsClassifySchoolAddOrEditStore.submit(formRef, emits)"
          >确定</el-button
        >
      </span>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { assetsClassifySchoolAddOrEditStore } from '@/store/modules/fixed_assets/assets_classify/assetsClassifySchoolAddOrEditStore';
import { storeToRefs } from 'pinia';
const useAssetsClassifySchoolAddOrEditStore =
  assetsClassifySchoolAddOrEditStore();
const { form, formRef, dialogFormVisible, treeData } = storeToRefs(
  useAssetsClassifySchoolAddOrEditStore,
);

const emits = defineEmits(['query-data']);

defineExpose({
  form,
  init: useAssetsClassifySchoolAddOrEditStore.init,
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
