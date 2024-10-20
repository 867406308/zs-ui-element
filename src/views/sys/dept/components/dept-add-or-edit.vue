<template>
  <el-drawer
    v-model="dialogFormVisible"
    :title="!form.sysDeptId ? '新增部门' : '修改部门'"
    @close="useDeptAddOrEditStore.close"
    :close-on-click-modal="false"
  >
    <el-form
      :model="form"
      ref="formRef"
      label-width="auto"
      :rules="useDeptAddOrEditStore.rules"
    >
      <el-form-item label="父级菜单" prop="pid">
        <el-tree-select
          v-model="form.pid"
          :data="treeData"
          check-strictly
          :props="{
            label: 'deptName',
            value: 'sysDeptId',
            children: 'children',
          }"
          style="width: 100%"
          placeholder="请选择父级菜单"
        />
      </el-form-item>
      <el-form-item label="部门名称" prop="deptName">
        <el-input
          v-model="form.deptName"
          placeholder="请输入部门名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="sysUserId">
        <ZsSelectUser v-model="form.sysUserId" :multiple="false" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :value="1">启用</el-radio>
          <el-radio :value="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="form.sort" :min="0" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" :rows="2" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="useDeptAddOrEditStore.close">取消</el-button>
        <el-button
          type="primary"
          @click="useDeptAddOrEditStore.submit(formRef, emits)"
          >确定</el-button
        >
      </span>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { deptAddOrEditStore } from '@/store/modules/sys/dept/deptAddOrEditStore';
import DeptHead from '@/components/ZsUser/index.vue';
import { storeToRefs } from 'pinia';
const useDeptAddOrEditStore = deptAddOrEditStore();
const { form, formRef, dialogFormVisible, treeData } = storeToRefs(
  useDeptAddOrEditStore,
);

const emits = defineEmits(['query-data']);
const handleOnClick = (row: any) => {
  form.value.sysUserId = row.sysUserId;
  form.value.deptHeadName = row.realName;
};

defineExpose({
  form,
  init: useDeptAddOrEditStore.init,
});
</script>

<style lang="scss">
.popoverStyle {
  width: 100% !important;
}
</style>
