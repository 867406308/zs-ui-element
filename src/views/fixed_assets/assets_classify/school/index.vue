<template>
  <div class="assets-classify-school-container">
    <el-container>
      <el-main>
        <el-space :fill="true" style="width: 100%; margin-bottom: 8px">
          <el-row justify="space-between">
            <el-col :xl="12" :lg="12" :md="12" :sm="24">
              <div>
                <el-button
                  v-permission="'sys:dept:save'"
                  type="primary"
                  @click="useAssetsClassifySchoolStore.handleAddOrEdit($event)"
                >
                  新增
                </el-button>
                <el-button
                  type="primary"
                  @click="useAssetsClassifySchoolStore.toggleExpand"
                  >{{ expand ? '收缩' : '展开' }}</el-button
                >
              </div>
            </el-col>
            <el-col :xl="12" :lg="12" :md="12" :sm="24" class="form-right">
              <el-space>
                <el-input
                  v-model="form.name"
                  placeholder="请输入分类名称"
                  class="input-with-select"
                >
                  <template #append>
                    <el-button
                      :icon="Search"
                      @click="
                        useAssetsClassifySchoolStore.queryClassifySchoolTree
                      "
                    />
                  </template>
                </el-input>
              </el-space>
            </el-col>
          </el-row>
        </el-space>
        <el-table
          v-if="refreshTable"
          :data="tableData"
          row-key="id"
          border
          :default-expand-all="expand"
          v-loading="loading"
        >
          <el-table-column prop="name" label="学校分类" />
          <el-table-column prop="depreciationYears" label="折旧年限(月)" />
          <el-table-column prop="gbName" label="国标分类"> </el-table-column>
          <el-table-column prop="remark" label="备注" />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="200"
          >
            <template #default="{ row }">
              <el-button
                link
                v-permission="'assets:classifySchool:update'"
                type="primary"
                @click="useAssetsClassifySchoolStore.handleAddOrEdit(row)"
                >编辑</el-button
              >
              <el-divider direction="vertical" />
              <el-button
                link
                v-permission="'assets:classifySchool:delete'"
                type="danger"
                @click="useAssetsClassifySchoolStore.handleDelete(row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
          <template #empty>
            <ZsEmpty v-if="!loading" />
          </template>
        </el-table>
      </el-main>
    </el-container>
    <school-add-or-edit
      ref="addEditRef"
      @query-data="useAssetsClassifySchoolStore.queryClassifySchoolTree()"
    />
  </div>
</template>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import SchoolAddOrEdit from './components/school-add-or-edit.vue';
import { assetsClassifySchoolStore } from '@/store/modules/fixed_assets/assets_classify/assetsClassifySchoolStore';
import { storeToRefs } from 'pinia';
const useAssetsClassifySchoolStore = assetsClassifySchoolStore();
const {
  form,
  addEditRef,
  ruleFormRef,
  refreshTable,
  expand,
  loading,
  tableData,
} = storeToRefs(useAssetsClassifySchoolStore);

onMounted(() => {
  useAssetsClassifySchoolStore.queryClassifySchoolTree();
});
</script>
<style lang="scss" scoped>
.form-right {
  display: flex;
  justify-content: end;
}
</style>
