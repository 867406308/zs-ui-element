<template>
  <el-drawer v-model="dataScopeVisible" title="数据权限">
    <el-form
      :model="form"
      ref="dataScopeFormRef"
      :rules="rules"
      label-width="auto"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="角色编码" prop="roleCode">
        <el-input v-model="form.roleCode" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="数据范围" prop="dataScope">
        <el-select v-model="form.dataScope">
          <el-option label="全部数据权限" :value="1"></el-option>
          <el-option label="自定义数据权限" :value="2"></el-option>
          <el-option label="本部门数据权限" :value="3"></el-option>
          <el-option label="本部门及以下数据权限" :value="4"></el-option>
          <el-option label="仅本人数据权限" :value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据权限" prop="deptList" v-if="form.dataScope == 2">
        <el-tree-select
          ref="deptRef"
          v-model="form.deptList"
          :data="deptTree"
          multiple
          show-checkbox
          collapse-tags
          node-key="sysDeptId"
          :props="defaultProps"
          style="width: 100%"
          placeholder="请选择所属部门"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="useRoleAddOrEditStore.closeDataScope"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="useRoleAddOrEditStore.submitDataScope(dataScopeFormRef)"
        >
          确定
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { roleAddOrEditStore } from '@/store/modules/sys/role/roleAddOrEditStore';
import { storeToRefs } from 'pinia';
const useRoleAddOrEditStore = roleAddOrEditStore();
const { dataScopeVisible, form, deptTree, deptRef, dataScopeFormRef } =
  storeToRefs(useRoleAddOrEditStore);
const rules = {
  deptList: [{ required: true, message: '请选择数据权限', trigger: 'change' }],
};
const defaultProps = {
  children: 'children',
  label: 'deptName',
};

defineExpose({
  initDataScope: useRoleAddOrEditStore.initDataScope,
  form,
});
</script>
