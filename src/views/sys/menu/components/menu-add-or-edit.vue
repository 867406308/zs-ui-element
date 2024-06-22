<template>
  <el-drawer
    v-model="dialogFormVisible"
    :title="!form.sysMenuId ? '新增' : '修改'"
    @close="useMenuAddOrEditStore.close"
    :close-on-click-modal="false"
  >
    <el-form
      :model="form"
      ref="formRef"
      label-width="auto"
      :rules="useMenuAddOrEditStore.rules"
    >
      <el-row>
        <el-col>
          <el-form-item label="菜单类型">
            <el-radio-group v-model="form.type">
              <el-radio :value="1">目录</el-radio>
              <el-radio :value="2">菜单</el-radio>
              <el-radio :value="3">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="父级菜单" prop="pid">
            <el-tree-select
              v-model="form.pid"
              :data="treeData"
              check-strictly
              :props="{
                label: 'title',
                value: 'sysMenuId',
                children: 'children',
              }"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="菜单名称" prop="title">
            <el-input
              v-model="form.title"
              placeholder="请输入菜单名称"
            ></el-input> </el-form-item
        ></el-col>
      </el-row>

      <el-row>
        <el-col v-if="form.type === 1 || form.type === 2">
          <el-form-item label="路由名" prop="name">
            <el-input
              v-model="form.name"
              placeholder="请输入路由名，如: sys"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col v-if="form.type === 1 || form.type === 2">
          <el-form-item label="路由路径" prop="path">
            <el-input
              v-model="form.path"
              placeholder="请输入路由路径地址，如: /sys/menu,如是目录直接输入: Layout"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col v-if="form.type === 1 || form.type === 2">
          <el-form-item label="组件路径" prop="component">
            <el-input
              v-model="form.component"
              placeholder="前端组件路径,如: /sys/role/index,如是一级目录直接输入: Layout, 二级目录输入: /sys/role"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col v-if="form.type === 1 || form.type === 2">
          <el-form-item label="图标" prop="icon">
            <el-input
              v-model="form.icon"
              style="width: 100%"
              placeholder="请选择图标"
              :readonly="true"
            >
              <template #append>
                <el-button type="primary" @click="openIconDialog"
                  >选择</el-button
                >
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-if="form.type === 3">
          <el-form-item label="权限" prop="permissions">
            <el-input
              v-model="form.permissions"
              placeholder="多个用逗号隔开，如: sys:menu:save,sys:menu:list"
            ></el-input
          ></el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="排序" prop="sort">
            <el-input-number v-model="form.sort" placeholder="请输入排序" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="useMenuAddOrEditStore.close">取消</el-button>
        <el-button
          type="primary"
          @click="useMenuAddOrEditStore.submit(formRef, emits)"
          >确定</el-button
        >
      </span>
    </template>
  </el-drawer>
  <ZsSelectIcon ref="selectIconRef" @on-change="(val) => (form.icon = val)" />
</template>
<script lang="ts" setup>
import { menuAddOrEditStore } from '@/store/modules/sys/menu/menuAddOrEditStore';
import { storeToRefs } from 'pinia';
const useMenuAddOrEditStore = menuAddOrEditStore();
const { dialogFormVisible, formRef, popoverRef, form, treeData } = storeToRefs(
  useMenuAddOrEditStore,
);
const selectIconRef = ref();
const openIconDialog = () => {
  selectIconRef.value.visible = true;
};
const emits = defineEmits(['query-data']);
defineExpose({
  form,
  init: useMenuAddOrEditStore.init,
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
