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
          @node-click="handleNodeClick"
        />
      </el-aside>
      <el-container>
        <el-header>
          <el-row>
            <el-col>
              <el-form ref="ruleFormRef" :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="岗位名称" prop="postName">
                  <el-input v-model="form.postName" placeholder="请输入岗位名称" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                  <el-select v-model="form.status" placeholder="请选择">
                    <el-option label="正常" :value="1"></el-option>
                    <el-option label="禁用" :value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="queryData()">查询</el-button>
                  <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <div class="action-bar">
            <ZsRouter />
            <el-space wrap>
              <el-button type="primary" @click="handleAddOrEdit">新增</el-button>
              <el-button type="primary" @click="onSubmitForm">
                <template #icon>
                  <ZsIcon icon="refresh" color="#fff" />
                </template>
              </el-button>
            </el-space>
          </div>
          <el-table class="table-style" :data="tableData" style="width: 100%" row-key="id" border v-loading="loading">
            <el-table-column align="center" label="序号" type="index" width="55" />
            <el-table-column prop="postName" label="岗位名称" />
            <el-table-column prop="remark" label="备注" width="200" />
            <el-table-column prop="sort" label="排序" align="center" width="100"></el-table-column>
            <el-table-column prop="status" align="center" label="状态" width="100">
              <template #default="scope">
                <el-tag v-if="scope.row.status === 0" type="danger" effect="dark" label="禁用">禁用</el-tag>
                <el-tag v-if="scope.row.status === 1" type="success" effect="dark" label="启用">启用</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" fixed="right" label="操作" width="120">
              <template #default="{ row }">
                <el-button link type="primary" @click="handleAddOrEdit(row)">编辑</el-button>
                <el-divider direction="vertical" />
                <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
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
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </el-footer>
      </el-container>
    </el-container>
    <post-add-or-edit ref="addEditRef" :key="+new Date()" @query-data="queryData" />
  </div>
</template>
<script lang="ts" setup>
import { postPage } from '@/api/sys/post.ts';
import { getDeptTree } from '@/api/sys/dept.ts';
import PostAddOrEdit from './components/post-add-or-edit.vue';
import type { FormInstance } from 'element-plus';
import { useRoute } from 'vue-router';
import { ElTree } from 'element-plus';
const reload: any = inject('reload');
// 刷新页面
const onSubmitForm = () => {
  reload();
};

const ruleFormRef = ref<FormInstance>();
const deptRef = ref<InstanceType<typeof ElTree>>();
const addEditRef = ref<HTMLFormElement | null>(null);
const tableData = ref([]);
const deptTreeData = ref([]);
const expandedKeys = ref([]);
const loading = ref(false);
const defaultProps = {
  children: 'children',
  label: 'deptName',
  value: 'sysPostId',
};
const total = ref(10);
const form = reactive({
  sysDeptId: '',
  postName: '',
  status: '',
  page: 1,
  size: 20,
  order: 'asc',
  orderField: 'sort',
});
const queryData = async () => {
  loading.value = true;
  const data = await postPage(form);
  tableData.value = data?.data?.list;
  total.value = data?.data?.total;
  loading.value = false;
};
const handleSizeChange = (val: number) => {
  form.size = val;
  queryData();
};
const handleCurrentChange = (val: number) => {
  form.page = val;
  queryData();
};
const handleAddOrEdit = (row: any) => {
  if (addEditRef.value) {
    addEditRef.value.form.sysPostId = row?.sysPostId;
    addEditRef.value.init();
  }
};
const handleDelete = (row: any) => {};
const onSubmit = () => {
  console.log('submit!');
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  queryData();
};
const handleDetail = () => {};
/**
 * 获取部门树型结构
 */
const getDeptList = async () => {
  const data = await getDeptTree();
  const treeData = data?.data ?? [];
  treeData.forEach((element: any) => {
    expandedKeys.value.push(element.sysDeptId as never);
  });

  Object.assign(deptTreeData.value, treeData);
};
const handleNodeClick = (data: any) => {
  console.log(data);
  form.sysDeptId = data.sysDeptId;
  queryData();
};
onMounted(() => {
  getDeptList();
  queryData();
});
</script>
<style lang="scss" scoped>
.action-bar {
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
.table-style {
  height: calc(#{$app-main-height} - 160px);

  .status {
    display: flex;
    align-items: center;
    > span:first-child {
      margin-right: 10px;
      display: flex;
      width: 10px;
      height: 10px;
      background-color: #67c23a;
      border-radius: 50%;
    }
  }
}
</style>
