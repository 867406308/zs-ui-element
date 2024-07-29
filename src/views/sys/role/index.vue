<template>
  <div class="role-container">
    <el-container>
      <el-header>
        <el-form ref="ruleFormRef" :model="form" :inline="true">
          <el-form-item label="角色名称" prop="roleName">
            <el-input
              v-model="form.roleName"
              placeholder="请输入角色名称"
              class="input-with-select"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="useRoleStore.queryData"
              >查询</el-button
            >
            <el-button @click="useRoleStore.resetForm(ruleFormRef)"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <ZsToolbar>
          <template #left>
            <el-button
              type="primary"
              v-permission="'sys:role:save'"
              @click="useRoleStore.handleAddOrEdit"
              :icon="Plus"
            >
              新增角色
            </el-button>
            <el-button
              type="danger"
              v-permission="'sys:role:batchDelete'"
              @click="useRoleStore.handleBatchDelete()"
              :icon="Delete"
              :disabled="multipleSelection.length === 0"
            >
              批量删除
            </el-button>
          </template>
          <template #right>
            <el-tooltip content="导出" placement="top">
              <el-button text @click="useRoleStore.handleExport">
                <template #icon>
                  <ZsIcon icon="download-2" v-permission="'sys:role:export'" />
                </template>
              </el-button>
            </el-tooltip>
          </template>
        </ZsToolbar>
        <el-table
          class="table-style"
          :data="tableData"
          style="width: 100%"
          :loading="loading"
          row-key="id"
          border
          @sort-change="useRoleStore.handleSortChange"
          @selection-change="useRoleStore.handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="55"
          />
          <el-table-column prop="roleName" label="角色名称" sortable />
          <el-table-column prop="roleCode" label="角色编码" sortable />
          <el-table-column prop="dataScope" label="数据范围" sortable>
            <template #default="scope">
              <el-text v-if="scope.row.dataScope === 1">全部数据权限</el-text>
              <el-text v-if="scope.row.dataScope === 2">自定义数据权限</el-text>
              <el-text v-if="scope.row.dataScope === 3">本部门数据权限</el-text>
              <el-text v-if="scope.row.dataScope === 4"
                >本部门及以下数据权限</el-text
              >
              <el-text v-if="scope.row.dataScope === 5">仅本人数据权限</el-text>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" />
          <el-table-column
            prop="sort"
            label="排序"
            align="center"
            width="100"
            sortable
          ></el-table-column>
          <el-table-column prop="status" label="状态" width="80">
            <template #default="scope">
              <el-tag
                v-if="scope.row.status === 0"
                type="danger"
                label="禁用"
                effect="plain"
                >禁用</el-tag
              >
              <el-tag
                v-if="scope.row.status === 1"
                type="primary"
                label="启用"
                effect="plain"
                >启用</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="170"
          >
            <template #default="{ row }">
              <el-space wrap>
                <el-button
                  link
                  v-permission="'sys:role:update'"
                  type="primary"
                  @click="useRoleStore.handleAddOrEdit(row)"
                  >编辑</el-button
                >
                <el-button
                  link
                  v-permission="'sys:role:delete'"
                  type="danger"
                  @click="useRoleStore.handleDelete(row)"
                  >删除</el-button
                >
                <el-dropdown>
                  <el-button link type="primary">
                    更多
                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>
                        <el-button
                          link
                          type="primary"
                          @click="useRoleStore.handleDataScope(row)"
                          >数据权限</el-button
                        >
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-space>
            </template>
          </el-table-column>
          <template #empty>
            <ZsEmpty />
          </template>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
          background
          :current-page="form.page"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="form.size"
          :total="total"
          @current-change="useRoleStore.handleCurrentChange"
          @size-change="useRoleStore.handleSizeChange"
        />
      </el-footer>
    </el-container>
    <role-add-or-edit ref="addEditRef" @query-data="useRoleStore.queryData" />
    <RoleDataScope ref="dataScopeRef" />
  </div>
</template>
<script lang="ts" setup>
import {
  Grid,
  FullScreen,
  Search,
  ArrowDown,
  Plus,
  Delete,
} from '@element-plus/icons-vue';
import RoleAddOrEdit from './components/role-add-or-edit.vue';
import RoleDataScope from './components/role-data-scope.vue';
import { roleStore } from '@/store/modules/sys/role/roleStore';
import { storeToRefs } from 'pinia';

const useRoleStore = roleStore();
const {
  ruleFormRef,
  addEditRef,
  dataScopeRef,
  tableData,
  total,
  form,
  loading,
  multipleSelection,
} = storeToRefs(useRoleStore);

onMounted(() => {
  useRoleStore.queryData();
});
</script>
<style lang="scss" scoped></style>
