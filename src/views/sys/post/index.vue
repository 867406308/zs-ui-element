<template>
  <div class="post-container">
    <el-container>
      <el-aside>
        <!-- <el-scrollbar>
          <el-tree
            ref="deptRef"
            :data="deptTreeData"
            :props="defaultProps"
            :default-expanded-keys="expandedKeys"
            accordion
            node-key="sysDeptId"
            :expand-on-click-node="false"
            @node-click="usePostStore.handleNodeClick"
        /></el-scrollbar> -->
        <ZsDept @node-click="usePostStore.handleNodeClick" />
      </el-aside>
      <el-container>
        <el-main>
          <el-space :fill="true" style="width: 100%; margin-bottom: 8px">
            <el-row justify="space-between">
              <el-col :xl="12" :lg="12" :md="12" :sm="24">
                <div>
                  <el-button
                    type="primary"
                    v-permission="'sys:post:save'"
                    @click="usePostStore.handleAddOrEdit"
                    >新增
                  </el-button>
                </div>
              </el-col>
              <el-col :xl="12" :lg="12" :md="12" :sm="24" class="form-right">
                <el-space>
                  <el-input
                    v-model="form.postName"
                    placeholder="请输入资产岗位名称"
                    class="input-with-select"
                  >
                    <template #append>
                      <el-button
                        :icon="Search"
                        @click="usePostStore.queryData"
                      />
                    </template>
                  </el-input>
                  <el-button type="primary" @click="usePostStore.queryData()">
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
import { Search } from '@element-plus/icons-vue';
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
<style lang="scss" scoped>
.form-right {
  display: flex;
  justify-content: end;
}
</style>
