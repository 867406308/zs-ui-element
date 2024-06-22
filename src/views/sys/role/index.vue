<template>
  <div class="role-container">
    <el-container>
      <el-header>
        <el-form :inline="true" label-width="auto">
          <el-form-item label="角色名称">
            <el-input
              v-model="form.roleName"
              placeholder="请输入角色名称"
              class="input-with-select"
            >
              <template #append>
                <el-button :icon="Search" @click="useRoleStore.queryData" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="useRoleStore.queryData"
              >查询</el-button
            >
            <el-button @click="useRoleStore.reset">重置</el-button>
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
              >新增角色</el-button
            >
          </template>
          <template #right>
            <el-space>
              <el-button-group class="ml-4">
                <el-button :icon="Grid" />
                <el-button :icon="FullScreen" />
                <el-button :icon="Search" />
              </el-button-group>
            </el-space>
          </template>
        </ZsToolbar>
        <el-table
          class="table-style"
          :data="tableData"
          style="width: 100%"
          :loading="loading"
          row-key="id"
          border
        >
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="55"
          />
          <el-table-column prop="roleName" label="角色名称" />
          <el-table-column prop="roleName" label="角色标识" />
          <el-table-column prop="roleName" label="数据范围" />
          <el-table-column prop="remark" label="备注" />
          <el-table-column
            prop="sort"
            label="排序"
            align="center"
            width="100"
          ></el-table-column>
          <el-table-column prop="status" label="状态" width="80">
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
                type="success"
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
            width="170"
          >
            <template #default="{ row }">
              <el-button
                link
                v-permission="'sys:role:update'"
                type="primary"
                @click="useRoleStore.handleAddOrEdit(row)"
                >编辑</el-button
              >
              <el-divider direction="vertical" />
              <el-button
                link
                v-permission="'sys:role:delete'"
                type="danger"
                @click="useRoleStore.handleDelete(row.sysRoleId)"
                >删除</el-button
              >
              <el-divider direction="vertical" />
              <el-button
                link
                type="primary"
                @click="useRoleStore.handleAddOrEdit(row)"
                >授权</el-button
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
          :current-page="form.page"
          layout="total, sizes, prev, pager, next"
          :page-size="form.size"
          :total="total"
          @current-change="useRoleStore.handleCurrentChange"
          @size-change="useRoleStore.handleSizeChange"
        />
      </el-footer>
    </el-container>
    <role-add-or-edit
      ref="addEditRef"
      :key="+new Date()"
      @query-data="useRoleStore.queryData"
    />
  </div>
</template>
<script lang="ts" setup>
import { Grid, FullScreen, Search } from '@element-plus/icons-vue';
import RoleAddOrEdit from './components/role-add-or-edit.vue';
import { roleStore } from '@/store/modules/sys/role/roleStore';
import { storeToRefs } from 'pinia';
const useRoleStore = roleStore();
const { ruleFormRef, addEditRef, tableData, total, form, loading } =
  storeToRefs(useRoleStore);

onMounted(() => {
  useRoleStore.queryData();
});
</script>
<style lang="scss" scoped>
.zs-table {
  height: calc($main-box-height - 60px) !important;
}
</style>
