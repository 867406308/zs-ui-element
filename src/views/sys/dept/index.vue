<template>
  <div class="dept-container">
    <el-container>
      <el-header height="30px">
        <el-form
          ref="ruleFormRef"
          :inline="true"
          :model="form"
          class="demo-form-inline"
        >
          <el-form-item label="部门名称" prop="deptName">
            <el-input v-model="form.deptName" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="useDeptStore.queryData()"
              >查询</el-button
            >
            <el-button @click="useDeptStore.resetForm(ruleFormRef)"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <div class="table-body-header">
          <div>
            <el-button
              v-permission="'sys:dept:save'"
              type="primary"
              @click="useDeptStore.handleAddOrEdit($event)"
            >
              新增
            </el-button>
            <el-button type="primary" @click="useDeptStore.toggleExpand">{{
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
                effect="dark"
                >禁用</el-tag
              >
              <el-tag
                v-if="scope.row.status === 1"
                type="success"
                label="启用"
                effect="dark"
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
    <dept-add-or-edit
      ref="addEditRef"
      :key="+new Date()"
      @query-data="useDeptStore.queryData()"
    />
  </div>
</template>
<script lang="ts" setup>
import DeptAddOrEdit from './components/dept-add-or-edit.vue';
import { deptStore } from '@/store/modules/sys/dept/deptStore';
import { storeToRefs } from 'pinia';
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
});
</script>
