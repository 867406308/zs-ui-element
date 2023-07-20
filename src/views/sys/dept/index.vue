<template>
  <div class="dept-container">
    <el-container>
      <el-main>
        <div class="main-bar">
          <el-space wrap>
            <el-button type="primary" @click="handleAddOrEdit">新增</el-button>
            <el-button type="primary" @click="toggleExpand">{{ expand ? '收缩' : '展开' }}</el-button>
            <el-button type="primary" @click="onSubmitForm">
              <template #icon>
                <ZsIcon icon="refresh" color="#fff" />
              </template>
            </el-button>
          </el-space>
        </div>
        <el-table
          class="table-style"
          v-if="refreshTable"
          :data="tableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          stripe
          border
          :default-expand-all="expand"
          v-loading="loading"
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
              <el-tag v-if="scope.row.status === 0" type="danger" label="禁用" effect="dark">禁用</el-tag>
              <el-tag v-if="scope.row.status === 1" type="success" label="启用" effect="dark">启用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sort" align="center" label="排序" width="60" />
          <el-table-column align="center" fixed="right" label="操作" width="120">
            <template #default="{ row }">
              <el-button link type="primary" size="small" @click="handleAddOrEdit(row)">
                <template #icon>
                  <ZsIcon icon="edit" color="#409EFF" />
                </template>
              </el-button>
              <el-divider direction="vertical" />
              <el-button link type="danger" size="small" @click="handleDelete(row)">
                <template #icon>
                  <ZsIcon icon="delete" color="#F56C6C" />
                </template>
              </el-button>
            </template>
          </el-table-column>
          <template #empty>
            <ZsEmpty v-if="!loading" />
          </template>
        </el-table>
      </el-main>
    </el-container>
    <dept-add-or-edit ref="addEditRef" :key="+new Date()" @query-data="queryData" />
  </div>
</template>
<script lang="ts" setup>
import { getDeptTree, remove } from '@/api/sys/dept.ts';
import DeptAddOrEdit from './components/dept-add-or-edit.vue';
const reload: any = inject('reload');
// 刷新页面
const onSubmitForm = () => {
  reload();
};
const addEditRef = ref<HTMLFormElement | null>(null);
const tableData = ref([]);
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
const queryData = async () => {
  loading.value = true;
  const data = await getDeptTree();
  tableData.value = data?.data;
  loading.value = false;
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
.main-bar {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}

.table-style {
  height: calc(#{$app-main-height} - 60px);
}
</style>
