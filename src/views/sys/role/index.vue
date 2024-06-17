<template>
  <div class="role-container">
    <el-container>
      <el-main>
        <el-space :fill="true" style="width: 100%; margin-bottom: 8px">
          <el-row justify="space-between">
            <el-col :xl="12" :lg="12" :md="12" :sm="24">
              <div>
                <el-button
                  type="primary"
                  v-permission="'sys:role:save'"
                  @click="useRoleStore.handleAddOrEdit"
                  >新增
                </el-button>
              </div>
            </el-col>
            <el-col :xl="12" :lg="12" :md="12" :sm="24" class="form-right">
              <el-space>
                <el-input
                  v-model="form.roleName"
                  placeholder="请输入角色名称"
                  class="input-with-select"
                >
                  <template #append>
                    <el-button :icon="Search" @click="useRoleStore.queryData" />
                  </template>
                </el-input>
                <el-button type="primary" @click="useRoleStore.queryData()">
                  高级查询
                </el-button>
              </el-space>
            </el-col>
          </el-row>
        </el-space>
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
import { Search } from '@element-plus/icons-vue';
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
.form-right {
  display: flex;
  justify-content: end;
}
</style>
