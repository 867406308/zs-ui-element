<template>
  <div class="menu-container">
    <el-container>
      <el-header height="30px">
        <el-form ref="ruleFormRef" :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="form.menuName" placeholder="请输入菜单名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryData">查询</el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <el-row justify="space-between" class="action-bar">
          <el-col :span="12">
            <el-button type="primary" @click="handleAddOrEdit">新增</el-button>
            <el-button type="primary" @click="toggleExpand">{{ expand ? '收缩' : '展开' }}</el-button>
          </el-col>
        </el-row>
        <el-table
          v-if="refreshTable"
          :data="tableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          stripe
          border
          :default-expand-all="expand"
          v-loading="loading"
        >
          <el-table-column prop="title" label="菜单名称" />
          <el-table-column prop="icon" label="图标">
            <template #default="scope">
              <ZsIcon :icon="scope.row.icon"></ZsIcon>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="路由名称" />
          <el-table-column prop="path" label="路径" />
          <el-table-column prop="component" label="路由" />
          <el-table-column prop="permissions" label="权限标识" />
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
    </el-container>
    <menu-add-or-edit ref="addEditRef" :key="+new Date()" @query-data="queryData" />
  </div>
</template>
<script lang="ts" setup>
import { getList, del } from '@/api/sys/menu';
import MenuAddOrEdit from './components/menu-add-or-edit.vue';
import type { FormInstance } from 'element-plus';
const ruleFormRef = ref<FormInstance>();
const addEditRef = ref<HTMLFormElement | null>(null);
const tableData = ref([]);
const form = reactive({
  menuName: '',
});
const refreshTable = ref(true);
const expand = ref(true);
const loading = ref(true);
const toggleExpand = () => {
  refreshTable.value = false;
  expand.value = !expand.value;
  nextTick(() => {
    refreshTable.value = true;
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  queryData();
};
const queryData = async () => {
  loading.value = true;
  const data = await getList();
  tableData.value = data?.data;
  loading.value = false;
};
const handleAddOrEdit = (row: any) => {
  if (addEditRef.value) {
    addEditRef.value.form.sysMenuId = row.sysMenuId;
    addEditRef.value.init();
  }
};
const handleDelete = (row: any) => {
  if (row.sysDeptId) {
    ElMessageBox.confirm('您将进行删除操作,是否继续?', '温馨提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        await del(row.sysDeptId);
        queryData();
      })
      .catch(() => {});
  }
};
onMounted(() => {
  queryData();
});
</script>
<style lang="scss" scoped>
.menu-container {
  .zs-container {
    :deep() {
      .zs-main {
        height: calc(calc(100vh - 50px - 20px) - 0px) !important;
      }
    }
  }
}
.action-bar {
  padding-bottom: 10px;

  &-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
.table-style {
  height: calc(#{$app-main-height} - 90px);
}
</style>
