<template>
  <div class="post-container">
    <el-container>
      <el-aside>
        <ZsDept @node-click="usePostStore.handleNodeClick" />
      </el-aside>
      <el-container>
        <el-header>
          <el-form ref="ruleFormRef" :inline="true" :model="form">
            <el-form-item label="岗位名称" prop="postName">
              <el-input
                v-model="form.postName"
                placeholder="请输入岗位名称"
                class="input-with-select"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select
                v-model="form.status"
                :empty-values="[null, undefined]"
                :value-on-clear="null"
                placeholder="请选择状态"
                style="width: 200px"
              >
                <el-option label="全部" value="" />
                <el-option label="启用" value="1" />
                <el-option label="禁用" value="0" />
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="usePostStore.queryData()"
                :icon="Search"
              >
                查询
              </el-button>
              <el-button
                @click="usePostStore.resetForm(ruleFormRef)"
                :icon="Refresh"
              >
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
                v-permission="'sys:post:save'"
                @click="usePostStore.handleAddOrEdit"
                :icon="Plus"
              >
                新增岗位
              </el-button>
              <el-button
                type="danger"
                v-permission="'sys:post:batchDelete'"
                @click="usePostStore.handleBatchDelete()"
                :icon="Delete"
                :disabled="multipleSelection.length === 0"
              >
                批量删除
              </el-button>
            </template>
            <template #right>
              <el-tooltip content="导出" placement="top">
                <el-button text @click="usePostStore.handleExport">
                  <template #icon>
                    <ZsIcon
                      icon="download-2"
                      v-permission="'sys:post:export'"
                    />
                  </template>
                </el-button>
              </el-tooltip>
            </template>
          </ZsToolbar>
          <el-table
            :data="tableData"
            style="width: 100%"
            row-key="id"
            v-loading="loading"
            @sort-change="usePostStore.handleSortChange"
            @selection-change="usePostStore.handleSelectionChange"
            border
          >
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column
              align="center"
              label="序号"
              type="index"
              width="55"
            />
            <el-table-column prop="postName" label="岗位名称" sortable />
            <el-table-column prop="deptName" label="所属部门" sortable />
            <el-table-column prop="remark" label="备注" width="200" />
            <el-table-column
              prop="sort"
              label="排序"
              align="center"
              width="100"
              sortable
            ></el-table-column>
            <el-table-column
              prop="status"
              align="center"
              label="状态"
              width="100"
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
              width="120"
            >
              <template #default="{ row }">
                <el-button
                  link
                  v-permission="'sys:post:update'"
                  type="primary"
                  @click="usePostStore.handleAddOrEdit(row)"
                  >编辑</el-button
                >
                <el-divider direction="vertical" />
                <el-button
                  link
                  v-permission="'sys:post:delete'"
                  type="danger"
                  @click="usePostStore.handleDelete(row)"
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
            @current-change="usePostStore.handleCurrentChange"
            @size-change="usePostStore.handleSizeChange"
          />
        </el-footer>
      </el-container>
    </el-container>
    <post-add-or-edit ref="addEditRef" @query-data="usePostStore.queryData" />
  </div>
</template>
<script lang="ts" setup>
import { Search, Plus, Delete, Refresh } from '@element-plus/icons-vue';
import PostAddOrEdit from './components/post-add-or-edit.vue';
import { postStore } from '@/store/modules/sys/position/postStore';
import { storeToRefs } from 'pinia';

const usePostStore = postStore();
const emits = defineEmits(['query-data']);
const {
  addEditRef,
  ruleFormRef,
  deptRef,
  tableData,
  deptTreeData,
  expandedKeys,
  loading,
  total,
  form,
  multipleSelection,
} = storeToRefs(usePostStore);

const defaultProps = {
  children: 'children',
  label: 'deptName',
  value: 'sysPostId',
};

onMounted(() => {
  usePostStore.getDeptList();
  usePostStore.queryData();
});
</script>
<style lang="scss" scoped></style>
