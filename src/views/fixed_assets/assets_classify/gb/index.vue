<template>
  <div class="assets-classify-school-container">
    <el-container>
      <el-header height="30px">
        <el-form
          ref="ruleFormRef"
          :inline="true"
          :model="form"
          class="demo-form-inline"
        >
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入分类名称" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="useAssetsClassifyGbStore.queryData()"
              >查询</el-button
            >
            <el-button @click="useAssetsClassifyGbStore.resetForm(ruleFormRef)"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <div class="table-body-header">
          <div>
            <el-button
              v-permission="'assets:classifyGb:save'"
              type="primary"
              @click="useAssetsClassifyGbStore.handleAddOrEdit($event)"
            >
              新增
            </el-button>
            <el-button
              type="primary"
              @click="useAssetsClassifyGbStore.toggleExpand"
              >{{ expand ? '收缩' : '展开' }}</el-button
            >
          </div>
        </div>
        <vxe-table
          border
          ref="tableRef"
          :column-config="{ resizable: true }"
          :tree-config="{}"
          :data="tableData"
        >
          <vxe-column field="name" title="国标分类名称" tree-node></vxe-column>
          <vxe-column field="code" title="国标分类编码"></vxe-column>
          <vxe-column field="remark" title="备注"></vxe-column>
          <vxe-column align="center" fixed="right" label="操作" width="200">
            <template #default="{ row }">
              <el-button
                link
                v-permission="'assets:classifySchool:update'"
                type="primary"
                @click="useAssetsClassifyGbStore.handleAddOrEdit(row)"
                >编辑</el-button
              >
              <el-divider direction="vertical" />
              <el-button
                link
                v-permission="'assets:classifySchool:delete'"
                type="danger"
                @click="useAssetsClassifyGbStore.handleDelete(row)"
                >删除</el-button
              >
            </template>
          </vxe-column>
        </vxe-table>
      </el-main>
    </el-container>
    <gb-add-or-edit
      ref="addEditRef"
      @query-data="useAssetsClassifyGbStore.queryData()"
    />
  </div>
</template>
<script lang="ts" setup>
import GbAddOrEdit from './components/gb-add-or-edit.vue';
import { assetsClassifyGbStore } from '@/store/modules/fixed_assets/assets_classify/assetsClassifyGbStore';
import { storeToRefs } from 'pinia';
const useAssetsClassifyGbStore = assetsClassifyGbStore();
const {
  form,
  addEditRef,
  ruleFormRef,
  refreshTable,
  expand,
  loading,
  tableData,
} = storeToRefs(useAssetsClassifyGbStore);

onMounted(() => {
  useAssetsClassifyGbStore.queryData();
});
</script>
