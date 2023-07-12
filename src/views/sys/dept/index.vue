<template>
  <div class="dept-container">
    <el-container>
      <el-main>
        <el-row justify="space-between" class="action-bar">
          <el-space wrap>
            <el-button type="primary" @click="handleAddOrEdit">新增</el-button>
            <el-button type="primary" @click="expand = true">全部展开</el-button>
            <el-button type="primary" @click="expand = false">全部收缩</el-button>
          </el-space>
        </el-row>
        <el-table
          class="table-style"
          :data="tableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          border
          :default-expand-all="expand"
        >
          <el-table-column prop="deptName" label="部门名称" />
          <el-table-column prop="deptHead" label="部门负责人">
            <template #default="{ row }">
              <span v-if="row.deptHead === 0"></span>
              <span v-else>{{ row.deptHead }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" />
          <el-table-column prop="status" label="部门状态" align="center" width="90">
            <template #default="scope">
              <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" />
            </template>
          </el-table-column>
          <el-table-column prop="sort" align="center" label="排序" width="120" />
          <el-table-column align="center" fixed="right" label="操作" width="120">
            <template #default="{ row }">
              <el-button link type="primary" size="small" @click="handleAddOrEdit(row)">编辑</el-button>
              <el-divider direction="vertical" />
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
const addEditRef = ref<HTMLFormElement | null>(null);
const tableData = ref([]);
const expand = ref(true);
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
  height: calc(#{$app-main-height} - 60px);
  :deep() {
    .zs-table__inner-wrapper {
      .zs-table__header-wrapper table thead tr th {
        background-color: #fafafa;
        color: #333;
        font-weight: bold;
        font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑',
          Arial, sans-serif;
      }
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
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
