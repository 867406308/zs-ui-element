<template>
  <div class="user-container">
    <el-container>
      <el-aside>
        <el-scrollbar>
          <ZsDept @node-click="useUserStore.handleNodeClick" />
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-main>
          <el-space :fill="true" style="width: 100%; margin-bottom: 8px">
            <el-row justify="space-between">
              <el-col :xl="12" :lg="12" :md="12" :sm="24">
                <div>
                  <el-button
                    type="primary"
                    v-permission="'sys:user:save'"
                    @click="useUserStore.handleAddOrEdit"
                    >新增
                  </el-button>
                  <el-button type="primary" @click="useUserStore.handleExport"
                    >导出</el-button
                  >
                </div>
              </el-col>
              <el-col :xl="12" :lg="12" :md="12" :sm="24" class="form-right">
                <el-space>
                  <el-input
                    v-model="form.username"
                    placeholder="请输入账号信息"
                  />
                  <el-input v-model="form.realName" placeholder="请输入姓名" />
                  <el-select
                    v-model="form.sex"
                    placeholder="请选择性别"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="男" :value="0"></el-option>
                    <el-option label="女" :value="1"></el-option>
                  </el-select>
                  <el-input v-model="form.phone" placeholder="请输入手机号" />
                  <el-button type="primary" @click="useUserStore.queryData()">
                    查询
                  </el-button>
                </el-space>
              </el-col>
            </el-row>
          </el-space>
          <el-table
            class="table-style"
            :data="tableData"
            style="width: 100%"
            border
          >
            <el-table-column
              align="center"
              label="序号"
              type="index"
              width="55"
            />
            <el-table-column prop="username" label="账号" />
            <el-table-column prop="realName" label="姓名" />
            <el-table-column prop="sex" label="性别">
              <template #default="scope">
                <span v-if="scope.row.sex === 0">男</span>
                <span v-if="scope.row.sex === 1">女</span>
              </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号" />
            <el-table-column prop="deptName" label="所属部门" />
            <el-table-column prop="postName" label="岗位" />
            <el-table-column
              prop="status"
              label="状态"
              align="center"
              width="80"
            >
              <template #default="scope">
                <el-tag
                  v-if="scope.row.status === 0"
                  type="danger"
                  effect="dark"
                  label="禁用"
                  >禁用</el-tag
                >
                <el-tag
                  v-if="scope.row.status === 1"
                  type="primary"
                  effect="dark"
                  label="启用"
                  >启用</el-tag
                >
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
                  @click="useUserStore.handleAddOrEdit(row)"
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
            layout="total, sizes, prev, pager, next"
            :page-size="form.size"
            :total="total"
            @current-change="useUserStore.handleCurrentChange"
            @size-change="useUserStore.handleSizeChange"
          />
        </el-footer>
      </el-container>
    </el-container>
    <user-add-or-edit ref="addEditRef" @query-data="useUserStore.queryData" />
    <user-reset-password
      ref="resetPasswordRef"
      @query-data="useUserStore.queryData"
    />
  </div>
</template>
<script lang="ts" setup>
import { Search, CaretLeft, CaretRight } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import UserAddOrEdit from './components/user-add-or-edit.vue';
import UserResetPassword from './components/user-reset-password.vue';
import { userStore } from '@/store/modules/sys/user/userStore';
const useUserStore = userStore();
const {
  ruleFormRef,
  deptRef,
  addEditRef,
  tableData,
  deptTreeData,
  expandedKeys,
  total,
  form,
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
// .table-style {
//   height: calc(#{$app-main-height} - 140px);
// }
</style>
