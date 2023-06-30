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
        </el-header>
        <el-main>
          <el-row justify="space-between" class="action-bar">
            <el-col :span="12">
              <el-button type="primary" @click="handleAddOrEdit">新增</el-button>
              <el-button type="primary" @click="handleAddOrEdit">删除</el-button>
            </el-col>
          </el-row>
          <el-table
            class="table-style"
            :stripe="true"
            :data="tableData"
            style="width: 100%"
            row-key="id"
            border
            v-loading="loading"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column align="center" label="序号" type="index" width="55" />
            <el-table-column prop="postName" label="岗位名称" />
            <el-table-column prop="sort" label="排序" align="center" width="100"></el-table-column>
            <el-table-column prop="status" align="center" label="状态" width="100">
              <template #default="scope">
                <el-tag v-if="scope.row.status === 0" type="danger" label="禁用">禁用</el-tag>
                <el-tag v-if="scope.row.status === 1" type="success" label="启用">启用</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" width="200" />
            <el-table-column align="center" fixed="right" label="操作" width="120">
              <template #default="{ row }">
                <el-button link type="primary" size="small" @click="handleAddOrEdit(row)">编辑</el-button>
                <el-divider direction="vertical" />
                <el-button link type="primary" size="small" @click="handleDelete(row)">删除</el-button>
              </template>
            </el-table-column>
            <template #empty>
              <el-empty
                image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              />
            </template>
          </el-table>
          <!-- <el-container>
          <el-header height="40px">
            <el-button type="primary" @click="handleAddOrEdit">新增</el-button>
          </el-header>
          <el-main>

          </el-main>
        </el-container> -->
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
const route = useRoute();
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
onMounted(() => {
  console.log('route', route);
  console.log('route', route.meta.title);
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

  &-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
.table-style {
  height: calc(#{$app-main-height} - 160px);
}
</style>
