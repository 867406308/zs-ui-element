<template>
  <div class="dept-container">
    <el-container>
      <el-main>
        <ZsToolbar>
          <template #left>
            <el-button
              type="primary"
              v-permission="'sys:dept:save'"
              @click="useDeptStore.handleAddOrEdit($event)"
              :icon="Plus"
            >
              新增
            </el-button>
            <el-button type="primary" @click="useDeptStore.toggleExpand()">{{
              expand ? '全部收缩' : '全部展开'
            }}</el-button>
          </template>
          <template #right>
            <el-input
              v-model="form.deptName"
              placeholder="请输入部门名称"
              class="input-with-select"
            >
              <template #append>
                <el-button :icon="Search" @click="useDeptStore.queryData" />
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
          <el-table-column prop="deptName" label="部门名称" />
          <el-table-column prop="deptHeadName" label="部门负责人">
          </el-table-column>
          <el-table-column prop="remark" label="备注" />
          <el-table-column
            prop="status"
            label="部门状态"
            align="center"
            width="90"
          >
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
          <el-table-column prop="sort" align="center" label="排序" width="60" />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="200"
          >
            <template #default="{ row }">
              <el-button
                link
                type="primary"
                @click="useDeptStore.handleAddOrEdit(row)"
                >部门成员</el-button
              >
              <el-divider direction="vertical" />
              <el-button
                link
                v-permission="'sys:dept:update'"
                type="primary"
                @click="useDeptStore.handleAddOrEdit(row)"
                >编辑</el-button
              >
              <el-divider direction="vertical" />
              <el-button
                link
                v-permission="'sys:dept:delete'"
                type="danger"
                @click="useDeptStore.handleDelete(row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
          <template #empty>
            <ZsEmpty v-if="!loading" />
          </template>
        </el-table>
      </el-main>
    </el-container>
    <dept-add-or-edit ref="addEditRef" @query-data="useDeptStore.queryData()" />
  </div>
</template>
<script lang="ts" setup>
import { Plus, Search } from '@element-plus/icons-vue';
import DeptAddOrEdit from './components/dept-add-or-edit.vue';
import { deptStore } from '@/store/modules/sys/dept/deptStore';
import { storeToRefs } from 'pinia';

import { cryptoStore } from '@/store/modules/common/cryptoStore';

const useDeptStore = deptStore();
const {
  form,
  addEditRef,
  ruleFormRef,
  refreshTable,
  expand,
  loading,
  tableData,
} = storeToRefs(useDeptStore);

onMounted(() => {
  useDeptStore.queryData();
  console.log('部门aaa: ', cryptoStore().sm4Key);
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
