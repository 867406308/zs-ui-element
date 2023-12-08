<template>
  <div class="post-container">
    <el-container>
      <el-aside width="200px">
        <el-tree
          ref="deptRef"
          :data="deptTreeData"
          :props="defaultProps"
          :default-expanded-keys="expandedKeys"
          node-key="sysDeptId"
          :expand-on-click-node="false"
          @node-click="usePostStore.handleNodeClick"
        />
      </el-aside>
      <el-container>
        <el-header>
          <el-row>
            <el-col>
              <el-form
                ref="ruleFormRef"
                :inline="true"
                :model="form"
                class="demo-form-inline"
              >
                <el-form-item label="岗位名称" prop="postName">
                  <el-input
                    v-model="form.postName"
                    placeholder="请输入岗位名称"
                  />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                  <el-select v-model="form.status" placeholder="请选择">
                    <el-option label="正常" :value="1"></el-option>
                    <el-option label="禁用" :value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="usePostStore.queryData()"
                    >查询</el-button
                  >
                  <el-button @click="usePostStore.resetForm(ruleFormRef)"
                    >重置</el-button
                  >
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <div class="table-body-header">
            <div>
              <el-button
                type="primary"
                v-permission="'sys:post:save'"
                @click="usePostStore.handleAddOrEdit"
                >新增
              </el-button>
            </div>
          </div>
          <el-table
            class="table-style"
            :data="tableData"
            style="width: 100%"
            row-key="id"
            border
            v-loading="loading"
          >
            <el-table-column
              align="center"
              label="序号"
              type="index"
              width="55"
            />
            <el-table-column prop="postName" label="岗位名称" />
            <el-table-column prop="remark" label="备注" width="200" />
            <el-table-column
              prop="sort"
              label="排序"
              align="center"
              width="100"
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
    <post-add-or-edit
      ref="addEditRef"
      :key="+new Date()"
      @query-data="usePostStore.queryData"
    />
  </div>
</template>
<script lang="ts" setup>
import PostAddOrEdit from './components/post-add-or-edit.vue';
import { postStore } from '@/store/modules/sys/position/postStore';
import { storeToRefs } from 'pinia';

const usePostStore = postStore();
const emits = defineEmits(['query-data']);
const {
  ruleFormRef,
  deptRef,
  addEditRef,
  tableData,
  deptTreeData,
  expandedKeys,
  loading,
  total,
  form,
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
