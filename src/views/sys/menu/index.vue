<template>
  <div class="menu-container">
    <el-container>
      <el-main>
        <ZsToolbar>
          <template #left>
            <el-button
              type="primary"
              v-permission="'sys:post:save'"
              @click="useMenuStore.handleAddOrEdit"
              :icon="Plus"
              >新增菜单
            </el-button>
            <el-button
              type="primary"
              @click="useMenuStore.toggleExpand()"
              :icon="expand ? SortUp : SortDown"
              >{{ expand ? '全部收缩' : '全部展开' }}</el-button
            >
          </template>
          <template #right>
            <el-input
              v-model="form.title"
              placeholder="请输入菜单名称"
              class="input-with-select"
            >
              <template #append>
                <el-button :icon="Search" @click="useMenuStore.queryData" />
              </template>
            </el-input>
          </template>
        </ZsToolbar>
        <el-table
          v-if="refreshTable"
          :data="tableData"
          row-key="id"
          :default-expand-all="expand"
          v-loading="loading"
        >
          <el-table-column prop="title" label="菜单名称" />
          <el-table-column prop="icon" label="图标" width="60">
            <template #default="scope">
              <ZsIcon :icon="scope.row.icon"></ZsIcon>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="菜单类型"
            width="90"
            align="center"
          >
            <template #default="scope">
              <el-tag v-if="scope.row.type == 1" effect="plain">目录</el-tag>
              <el-tag v-if="scope.row.type == 2" type="success" effect="plain"
                >菜单</el-tag
              >
              <el-tag v-if="scope.row.type == 3" type="warning" effect="plain"
                >按钮</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="name" label="路由名称" />
          <el-table-column prop="path" label="路由路径" />
          <el-table-column
            prop="component"
            label="组件路径"
            width="400"
            show-overflow-tooltip
          />
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
import { Plus, Search, SortUp, SortDown } from '@element-plus/icons-vue';
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
<style lang="scss" scoped>
.input-with-select {
  width: 300px !important;
}
.zs-table {
  height: calc(
    $main-box-height + $header-box-height + $footer-box-height
  ) !important;
}
</style>
