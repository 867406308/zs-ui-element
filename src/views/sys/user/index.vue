<template>
  <div class="user-container">
    <el-container>
      <el-aside width="240px">
        <el-scrollbar>
          <ZsDept @node-click="useUserStore.handleNodeClick" />
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header>
          <el-form ref="ruleFormRef" :inline="true" :model="form">
            <el-form-item label="账号名称" prop="username">
              <el-input v-model="form.username" placeholder="请输入账号信息">
              </el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="realName">
              <el-input v-model="form.realName" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="useUserStore.queryData()">
                查询
              </el-button>
              <el-button @click="useUserStore.resetForm(ruleFormRef)">
                重置
              </el-button>
            </el-form-item>
          </el-form>
        </el-header>
        <el-main>
          <ZsToolbar>
            <template #left>
              <el-button
                type="primary"
                v-permission="'sys:user:save'"
                @click="useUserStore.handleAddOrEdit('add', event)"
                :icon="Plus"
              >
                新增用户
              </el-button>
              <el-button
                type="danger"
                v-permission="'sys:user:batchDelete'"
                @click="useUserStore.handleBatchDelete()"
                :icon="Delete"
                :disabled="multipleSelection.length === 0"
              >
                批量删除
              </el-button>
            </template>
            <template #right>
              <el-tooltip content="导出" placement="top">
                <el-button text @click="useUserStore.handleExport">
                  <template #icon>
                    <ZsIcon icon="download-2" />
                  </template>
                </el-button>
              </el-tooltip>
            </template>
          </ZsToolbar>
          <el-table
            class="table-style"
            :data="tableData"
            style="width: 100%"
            border
            :size="size"
            v-loading="loading"
            @sort-change="useUserStore.handleSortChange"
            @selection-change="useUserStore.handleSelectionChange"
          >
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column
              align="center"
              label="序号"
              type="index"
              width="55"
            />
            <el-table-column
              prop="avatar"
              label="头像"
              align="center"
              width="80"
            >
              <template #default="{ row }">
                <el-avatar size="default" fit="cover" shape="square">
                  <template #default>
                    {{ row.avatar ?? row.realName.substring(0, 1) }}
                  </template>
                </el-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="username" label="登录账号" sortable>
              <template #default="{ row }">
                <el-link
                  :underline="false"
                  type="primary"
                  @click="useUserStore.handleAddOrEdit('detail', row)"
                >
                  {{ row.username }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column prop="realName" label="用户姓名" sortable>
            </el-table-column>
            <el-table-column prop="sex" label="性别" sortable>
              <template #default="scope">
                <span v-if="scope.row.sex === 0">男</span>
                <span v-if="scope.row.sex === 1">女</span>
              </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号" sortable />
            <el-table-column
              prop="deptName"
              label="所属部门"
              show-overflow-tooltip
              sortable
            />
            <el-table-column prop="postName" label="岗位" sortable />
            <el-table-column
              prop="status"
              label="状态"
              align="center"
              width="100"
              sortable
            >
              <template #default="scope">
                <el-switch
                  v-model="scope.row.status"
                  inline-prompt
                  active-text="启用"
                  inactive-text="禁用"
                  :active-value="1"
                  :inactive-value="0"
                  @change="useUserStore.handleStatusChange(scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="200"
            >
              <template #default="{ row }">
                <el-button
                  link
                  v-permission="'sys:user:resetpassword'"
                  type="primary"
                  @click="useUserStore.handleResetPassword(row)"
                  >重置密码</el-button
                >
                <el-divider direction="vertical" />
                <el-button
                  link
                  v-permission="'sys:user:update'"
                  type="primary"
                  @click="useUserStore.handleAddOrEdit('edit', row)"
                  >编辑</el-button
                >
                <el-divider direction="vertical" />
                <el-button
                  link
                  v-permission="'sys:user:delete'"
                  type="danger"
                  @click="useUserStore.handleDelete(row)"
                  >删除</el-button
                >
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
            :currentPage="form.page"
            layout="total, prev, pager, next, sizes,jumper"
            :page-size="form.size"
            :total="total"
            @current-change="useUserStore.handleCurrentChange"
            @size-change="useUserStore.handleSizeChange"
          />
        </el-footer>
      </el-container>
    </el-container>
    <user-add-or-edit ref="addEditRef" @query-data="useUserStore.queryData" />
    <user-reset-password @query-data="useUserStore.queryData" />
  </div>
</template>
<script lang="ts" setup>
import { Search, Plus, Delete, RefreshRight } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import UserAddOrEdit from './components/user-add-or-edit.vue';
import UserResetPassword from './components/user-reset-password.vue';
import { userStore } from '@/store/modules/sys/user/userStore';

const size = ref('default');

const useUserStore = userStore();
const {
  addEditRef,
  ruleFormRef,
  tableData,
  deptTreeData,
  expandedKeys,
  total,
  form,
  multipleSelection,
  loading,
} = storeToRefs(useUserStore);

const defaultProps = {
  children: 'children',
  label: 'deptName',
  value: 'sysDeptId',
};

onMounted(() => {
  useUserStore.getDeptList();
  useUserStore.queryData();
});
</script>
<style lang="scss" scoped>
.zs-avatar {
  // --zs-avatar-bg-color: var(--zs-color-primary-light-9);
  --zs-avatar-size: 30px;
  // --zs-avatar-text-color: var(--zs-color-primary);

  :deep(img) {
    box-sizing: border-box;
    padding: var(--zs-main-padding);
  }
}
</style>
