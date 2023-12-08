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
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="角色名称" prop="roleName">
              <el-input
                v-model="form.roleName"
                placeholder="请输入角色名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色标识" prop="roleName">
              <el-input
                v-model="form.roleName"
                placeholder="请输入角色名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="排序" prop="sort">
              <el-input-number v-model="form.sort" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio :label="0">停用</el-radio>
                <el-radio :label="1">正常</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="form.remark"
                :rows="2"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-divider content-position="left">菜单权限</el-divider>
      <el-tree
        ref="treeRef"
        :data="menuData"
        show-checkbox
        node-key="id"
        highlight-current
        :props="defaultProps"
        @check="useRoleAddOrEditStore.handleCheck"
      />
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
const { dialogFormVisible, treeRef, formRef, menuData, form, rules } =
  storeToRefs(useRoleAddOrEditStore);

const defaultProps = {
  children: 'children',
  label: 'title',
};
const emits = defineEmits(['query-data']);
const direction = ref('rtl' as any);

onMounted(async () => {
  await useRoleAddOrEditStore.getMenuTree();
});

defineExpose({
  init: useRoleAddOrEditStore.init,
  form,
});
</script>
