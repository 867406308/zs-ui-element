<template>
  <el-button
    type="primary"
    :icon="Plus"
    @click="handleAddDept"
    style="margin-bottom: 10px"
  >
    添加任职
  </el-button>
  <el-table ref="deptTableRef" :data="deptPostList" border style="width: 100%">
    <el-table-column prop="sysDeptId" label="部门" align="center">
      <template #default="{ row, $index }">
        <el-form-item
          :prop="`deptPostList.${$index}.sysDeptId`"
          :rules="{
            required: true,
            message: '请选择所属部门',
            trigger: ['blur', 'change'],
          }"
        >
          <el-tree-select
            ref="treeSelectRef"
            v-model="row.sysDeptId"
            :data="deptTree"
            :render-after-expand="false"
            :props="{
              label: 'deptName',
              value: 'sysDeptId',
              children: 'children',
            }"
            style="width: 100%"
            placeholder="请选择所属部门"
            @change="
              useUserAddOrEditStore.handleDeptTableChange($event, row, $index)
            "
          />
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column prop="sysPostId" label="岗位" align="center">
      <template #default="{ row, $index }">
        <el-form-item
          :prop="`deptPostList.${$index}.sysPostId`"
          :rules="{
            required: true,
            message: '请选择所属岗位',
            trigger: ['blur', 'change'],
          }"
        >
          <el-select
            v-model="row.sysPostId"
            placeholder="请选择岗位"
            style="width: 100%"
          >
            <el-option
              v-for="item in deptPostTableData[$index]"
              :key="item.sysPostId"
              :label="item.postName"
              :value="item.sysPostId"
            >
            </el-option>
          </el-select> </el-form-item
      ></template>
    </el-table-column>
    <el-table-column label="操作" width="180" align="center">
      <template #default="scope">
        <el-button
          type="danger"
          @click="handleDeleteDept(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { Plus } from '@element-plus/icons-vue';
import { userAddOrEditStore } from '@/store/modules/sys/user/userAddOrEditStore';
import { storeToRefs } from 'pinia';
const useUserAddOrEditStore = userAddOrEditStore();
const { deptTree, deptPostTableData, deptTableRef, treeSelectRef } =
  storeToRefs(useUserAddOrEditStore);

const props = defineProps({
  deptPostList: {
    type: Array,
    default: () => [],
  },
});
const handleAddDept = () => {
  props.deptPostList.push({
    sysDeptId: '',
    sysPostId: '',
  });
};
const handleDeleteDept = (index, row) => {
  props.deptPostList.splice(index, 1);
};

defineExpose({ props });
</script>
