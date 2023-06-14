<template>
  <div class="dept-container">
    <el-container>
      <el-header height="30px">
        <el-form ref="ruleFormRef" :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="部门名称" prop="deptName">
            <el-input v-model="form.deptName" placeholder="请输入角色名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query">查询</el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <el-row justify="space-between" class="action-bar">
          <el-col :span="12">
            <el-button type="primary" @click="handleAddOrEdit">新增</el-button>
          </el-col>
        </el-row>
        <el-table
          class="table-style"
          :data="tableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          border
          stripe
          default-expand-all
        >
          <el-table-column prop="deptName" label="部门名称" />
          <el-table-column prop="deptHead" label="部门负责人">
            <template #default="{ row }">
              <span v-if="row.deptHead === 0"></span>
              <span v-else>{{ row.deptHead }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="部门状态" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.status === 0" effect="light" type="danger" label="禁用">禁用</el-tag>
              <el-tag v-if="scope.row.status === 1" effect="light" type="success" label="启用">启用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" />
          <el-table-column prop="remark" label="备注" />
          <el-table-column fixed="right" label="操作" header-align="center" align="center" width="100">
            <template #default="{ row }">
              <!-- <el-button link type="primary" size="small" @click="handleAddOrEdit(row)">编辑</el-button>
              <el-button link type="primary" size="small" @click="handleDelete(row)">删除</el-button> -->
              <!-- <zsIcon icon="edit" color="blue" size="16px" />
              <zsIcon icon="delete" color="red" /> -->
              <!-- <el-space :spacer="spacer">
                <zsIcon icon="edit" color="blue" size="16px" />
                <zsIcon icon="delete" color="red" />
              </el-space> -->
              <el-button link type="primary" size="small" @click="handleAddOrEdit(row)">编辑</el-button>
              <el-button link type="danger" size="small" @click="handleDelete(row)">删除</el-button>
            </template>
          </el-table-column>
          <!-- <template #empty>
            <EmptyList />
          </template> -->
        </el-table>
      </el-main>
    </el-container>
    <dept-add-or-edit ref="addEditRef" :key="+new Date()" @query-data="queryData" />
  </div>
</template>
<script lang="ts" setup>
import { getDeptTree, remove } from '@/api/sys/dept.ts';
import DeptAddOrEdit from './components/dept-add-or-edit.vue';
import type { FormInstance } from 'element-plus';
import { h, ref } from 'vue';
import { ElDivider } from 'element-plus';
const spacer = h(ElDivider, { direction: 'vertical' });
const ruleFormRef = ref<FormInstance>();
const addEditRef = ref<HTMLFormElement | null>(null);
const tableData = ref([]);
const form = reactive({
  deptName: '',
  page: 1,
  size: 20,
});
const query = () => {
  console.log('submit!');
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  queryData();
};
const queryData = async () => {
  const data = await getDeptTree();
  tableData.value = data?.data;
};
const handleAddOrEdit = (row: any) => {
  if (addEditRef.value) {
    addEditRef.value.form.sysDeptId = row?.sysDeptId;
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
        await remove(row.sysDeptId);
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
.dept-container {
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
  // height: calc(#{$app-main-height} - 90px);
  :deep() {
    .zs-table__inner-wrapper {
      .zs-table__header-wrapper table thead tr th {
        background-color: #f5f5f5;
        color: #333;
        font-weight: bold;
        font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑',
          Arial, sans-serif;
      }
    }
  }

  .zs-space {
    :deep() {
      span {
        height: 10px;
        width: 1px;
        background-color: #e5e7eb;
      }
    }
  }
}
</style>
