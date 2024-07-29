<template>
  <el-drawer
    v-model="dialogFormVisible"
    :direction="direction"
    size="50%"
    @close="useRoleAddOrEditStore.close"
  >
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">
        {{ !form.sysRoleId ? '新增角色' : '编辑角色' }}
      </h4>
    </template>
    <template #default>
      <el-form :model="form" ref="formRef" label-width="auto" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            v-model="form.roleName"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="roleCode">
          <el-input
            v-model="form.roleCode"
            placeholder="请输入角色编码"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序号" prop="sort">
          <el-input-number v-model="form.sort" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :value="1">正常</el-radio>
            <el-radio :value="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" :rows="2" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="菜单权限" prop="menuIds">
          <el-tree
            ref="treeRef"
            :data="menuData"
            show-checkbox
            node-key="id"
            highlight-current
            :props="defaultProps"
            @check="useRoleAddOrEditStore.handleCheck"
          />
        </el-form-item>
      </el-form>
      <!-- <el-divider content-position="left">权限设置</el-divider>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="菜单权限" name="1">
          <el-tree
            ref="treeRef"
            :data="menuData"
            show-checkbox
            node-key="id"
            highlight-current
            :props="defaultProps"
            @check="useRoleAddOrEditStore.handleCheck"
          />
        </el-tab-pane>
        <el-tab-pane label="数据权限" name="second">
          <el-select v-model="form.dataScope">
            <el-option label="全部数据权限" :value="1"></el-option>
            <el-option label="自定义数据权限" :value="2"></el-option>
            <el-option label="本部门数据权限" :value="3"></el-option>
            <el-option label="本部门及以下数据权限" :value="4"></el-option>
            <el-option label="仅本人数据权限" :value="5"></el-option>
          </el-select>
          <el-tree-select
            v-if="form.dataScope === 2"
            ref="deptRef"
            v-model="form.deptList"
            :data="deptTree"
            :render-after-expand="false"
            show-checkbox
            :props="{
              label: 'deptName',
              value: 'sysDeptId',
              children: 'children',
            }"
            style="width: 100%"
            placeholder="请选择所属部门"
          >
          </el-tree-select>
        </el-tab-pane>
      </el-tabs> -->
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="useRoleAddOrEditStore.close">取消</el-button>
        <el-button
          type="primary"
          @click="useRoleAddOrEditStore.submit(formRef, emits)"
          >确定</el-button
        >
      </div>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { roleAddOrEditStore } from '@/store/modules/sys/role/roleAddOrEditStore';
import { storeToRefs } from 'pinia';
const useRoleAddOrEditStore = roleAddOrEditStore();
const { dialogFormVisible, treeRef, formRef, menuData, form, rules, deptTree } =
  storeToRefs(useRoleAddOrEditStore);

const activeName = ref('1');
const radio = ref(1);
const defaultProps = {
  children: 'children',
  label: 'title',
};
const emits = defineEmits(['query-data']);
const direction = ref('rtl' as any);

defineExpose({
  init: useRoleAddOrEditStore.init,
  form,
});
</script>
