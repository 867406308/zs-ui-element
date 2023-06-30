<template>
  <div class="role-container">
    <el-container>
      <el-header>
        <el-form ref="ruleFormRef" :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="form.roleName" placeholder="请输入角色名称" />
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
        <el-table class="table-style" :stripe="true" :data="tableData" style="width: 100%" row-key="id" border>
          <el-table-column type="selection" width="55" />
          <el-table-column align="center" label="序号" type="index" width="55" />
          <el-table-column prop="roleName" label="角色名称" />
          <el-table-column prop="remark" label="备注" />
          <el-table-column prop="status" label="状态" width="80">
            <template #default="scope">
              <el-tag v-if="scope.row.status === 0" effect="light" type="danger" label="禁用">禁用</el-tag>
              <el-tag v-if="scope.row.status === 1" effect="light" type="success" label="启用">启用</el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="sort" label="排序" align="center" width="100"></el-table-column>
          <el-table-column align="center" prop="createTime" label="创建时间" width="160" />
          <el-table-column align="center" prop="updateTime" label="修改时间" width="160" />
          <el-table-column align="center" fixed="right" label="操作" width="150">
            <template #default="{ row }">
              <el-space>
                <el-button link type="primary" size="small" @click="handleAddOrEdit(row)">编辑</el-button>
                <el-button link type="primary" size="small" @click="handleDetail">删除</el-button>
                <el-button link type="primary" size="small" @click="handleDetail">授权</el-button>
              </el-space>
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
    <role-add-or-edit ref="addEditRef" :key="+new Date()" @query-data="queryData" />
  </div>
</template>
<script lang="ts" setup>
import { rolePage } from '@/api/sys/role.ts';
import RoleAddOrEdit from './components/role-add-or-edit.vue';
import type { FormInstance } from 'element-plus';
import { useRoute } from 'vue-router';
import { ElTree } from 'element-plus';
const route = useRoute();
const ruleFormRef = ref<FormInstance>();
const addEditRef = ref<HTMLFormElement | null>(null);
const tableData = ref([]);
const total = ref(10);
const form = reactive({
  roleName: '',
  page: 1,
  size: 20,
});
onMounted(() => {
  console.log('route', route);
  console.log('route', route.meta.title);
});
const queryData = async () => {
  const data = await rolePage(form);
  tableData.value = data?.data?.list;
  total.value = data?.data?.total;
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
    addEditRef.value.form.sysRoleId = row?.sysRoleId;
    addEditRef.value.init();
  }
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  queryData();
};
const handleDetail = () => {};
onMounted(() => {
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
