<template>
  <el-drawer
    v-model="dialogFormVisible"
    :title="!form.sysPostId ? '新增岗位' : '修改岗位'"
    @close="usePostAddOrEditStore.close"
    :close-on-click-modal="false"
  >
    <el-form :model="form" ref="formRef" label-width="auto" :rules="rules">
      <el-form-item label="岗位名称" prop="postName">
        <el-input
          v-model="form.postName"
          placeholder="请输入岗位名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="所属部门" prop="sysDeptId">
        <el-tree-select
          v-model="form.sysDeptId"
          :data="treeData"
          check-strictly
          :props="{
            label: 'deptName',
            value: 'sysDeptId',
            children: 'children',
          }"
          style="width: 100%"
          placeholder="请选择所属部门"
        />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="form.sort" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :value="1">正常</el-radio>
          <el-radio :value="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" :rows="2" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="usePostAddOrEditStore.close">取消</el-button>
        <el-button
          type="primary"
          @click="usePostAddOrEditStore.submit(formRef, emits)"
          >确定</el-button
        >
      </span>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { postAddOrEditStore } from '@/store/modules/sys/position/postAddOrEditStore';
import { storeToRefs } from 'pinia';
const usePostAddOrEditStore = postAddOrEditStore();
const { form, dialogFormVisible, treeData, formRef, rules } = storeToRefs(
  usePostAddOrEditStore,
);

const emits = defineEmits(['query-data']);
onMounted(() => {
  usePostAddOrEditStore.selectDeptTree();
});

defineExpose({
  init: usePostAddOrEditStore.init,
  form,
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
