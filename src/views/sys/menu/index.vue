<template>
  <div class="menu-container">
    <el-container>
      <el-header height="30px">
        <el-form
          ref="ruleFormRef"
          :inline="true"
          :model="form"
          class="demo-form-inline"
        >
          <el-form-item label="菜单名称" prop="title">
            <el-input v-model="form.title" placeholder="请输入菜单名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="useMenuStore.queryData()"
              >查询</el-button
            >
            <el-button @click="useMenuStore.resetForm(ruleFormRef)"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <div class="table-body-header">
          <div>
            <el-button
              v-permission="'sys:menu:save'"
              type="primary"
              @click="useMenuStore.handleAddOrEdit($event)"
              >新增</el-button
            >
            <el-button type="primary" @click="useMenuStore.toggleExpand()">{{
              expand ? '收缩' : '展开'
            }}</el-button>
          </div>
        </div>
        <el-table
          v-if="refreshTable"
          :data="tableData"
          row-key="id"
          border
          :default-expand-all="expand"
          v-loading="loading"
        >
          <el-table-column prop="title" label="菜单名称" />
          <el-table-column prop="icon" label="图标">
            <template #default="scope">
              <ZsIcon :icon="scope.row.icon"></ZsIcon>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="菜单类型">
            <template #default="scope">
              <el-tag v-if="scope.row.type == 1" type="" effect="dark"
                >目录</el-tag
              >
              <el-tag v-if="scope.row.type == 2" type="success" effect="dark"
                >菜单</el-tag
              >
              <el-tag v-if="scope.row.type == 3" type="warning" effect="dark"
                >按钮</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="name" label="路由名称" />
          <el-table-column prop="path" label="路径" />
          <el-table-column prop="component" label="路由" />
          <el-table-column
            prop="permissions"
            label="权限标识"
            show-overflow-tooltip
            width="300"
          />
          <el-table-column
            prop="sort"
            label="排序"
            align="center"
            width="100"
          />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="120"
          >
            <template #default="{ row }">
              <el-button
                link
                v-permission="'sys:menu:update'"
                type="primary"
                @click="useMenuStore.handleAddOrEdit(row)"
                >编辑</el-button
              >
              <el-divider direction="vertical" />
              <el-button
                link
                v-permission="'sys:menu:delete'"
                type="danger"
                @click="useMenuStore.handleDelete(row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
          <template #empty>
            <ZsEmpty />
          </template>
        </el-table>
      </el-main>
    </el-container>
    <menu-add-or-edit
      ref="addEditRef"
      :key="+new Date()"
      @query-data="useMenuStore.queryData()"
    />
  </div>
</template>
<script lang="ts" setup>
import MenuAddOrEdit from './components/menu-add-or-edit.vue';
import { menuStore } from '@/store/modules/sys/menu/menuStore';
import { storeToRefs } from 'pinia';
const useMenuStore = menuStore();
const {
  addEditRef,
  ruleFormRef,
  refreshTable,
  expand,
  loading,
  tableData,
  form,
} = storeToRefs(useMenuStore);

onMounted(() => {
  useMenuStore.queryData();
});
</script>
<style lang="scss" scoped></style>
