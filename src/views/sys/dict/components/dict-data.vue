<template>
  <el-container>
    <el-header>
      <el-form ref="dictDataFormRef" :model="form" :inline="true">
        <el-form-item label="字典标签" prop="dictLabel">
          <el-input v-model="form.dictLabel" placeholder="请输入字典标签" />
        </el-form-item>
        <el-form-item label="字典键值" prop="dictValue">
          <el-input v-model="form.dictValue" placeholder="请输入字典键值" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="useDictDataStore.queryData"
            :icon="Search"
            >查询</el-button
          >
          <el-button
            @click="useDictDataStore.resetForm(dictDataFormRef)"
            :icon="Refresh"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <ZsToolbar>
        <template #left>
          <el-button
            type="primary"
            v-permission="'sys:dict:save'"
            @click="useDictDataStore.handleAddOrEdit"
            :icon="Plus"
            >新增字典
          </el-button>
          <el-button
            type="danger"
            v-permission="'sys:dict:batchDelete'"
            @click="useDictDataStore.handleBatchDelete()"
            :icon="Delete"
            :disabled="multipleSelection.length === 0"
          >
            批量删除
          </el-button>
        </template>
        <template #right>
          <el-tooltip content="导出" placement="top">
            <el-button text @click="useDictDataStore.handleExport">
              <template #icon>
                <ZsIcon icon="download-2" v-permission="'sys:dict:export'" />
              </template>
            </el-button>
          </el-tooltip>
        </template>
      </ZsToolbar>
      <el-table
        class="table-style"
        :data="tableData"
        style="width: 100%"
        :loading="loading"
        border
        @sort-change="useDictDataStore.handleSortChange"
        @selection-change="useDictDataStore.handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column align="center" label="序号" type="index" width="55" />
        <el-table-column
          prop="dictType"
          label="字典类型"
          align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="dictLabel"
          label="字典标签"
          align="center"
          sortable
        />
        <el-table-column
          prop="dictValue"
          label="字典键值"
          align="center"
          sortable
        />
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
          width="100"
          sortable
        ></el-table-column>
        <el-table-column prop="status" label="状态" width="80" sortable>
          <template #default="scope">
            <el-tag
              v-if="scope.row.status === 0"
              type="danger"
              effect="dark"
              label="禁用"
              >禁用</el-tag
            >
            <el-tag
              v-if="scope.row.status === 1"
              type="primary"
              effect="dark"
              label="启用"
              >启用</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="120">
          <template #default="{ row }">
            <el-button
              link
              v-permission="'sys:dict:update'"
              type="primary"
              @click="useDictDataStore.handleAddOrEdit(row)"
              >编辑</el-button
            >
            <el-divider direction="vertical" />
            <el-button
              link
              v-permission="'sys:dict:delete'"
              type="danger"
              @click="useDictDataStore.handleDelete(row)"
            >
              删除
            </el-button>
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
        layout="total,sizes, prev, pager, next"
        :page-size="form.size"
        :total="total"
        @current-change="useDictDataStore.handleCurrentChange"
        @size-change="useDictDataStore.handleSizeChange"
      />
    </el-footer>
  </el-container>
  <dict-data-add-or-edit
    ref="addEditRef"
    @query-data="useDictDataStore.queryData"
  />
</template>
<script lang="ts" setup>
import { Search, Refresh, Plus, Delete } from '@element-plus/icons-vue';
import DictDataAddOrEdit from './dict-data-add-or-edit.vue';
import { dictDataStore } from '@/store/modules/sys/dict/dictDataStore';
import { storeToRefs } from 'pinia';
const useDictDataStore = dictDataStore();
const {
  dictDataFormRef,
  addEditRef,
  tableData,
  total,
  loading,
  form,
  multipleSelection,
} = storeToRefs(useDictDataStore);

onMounted(() => {
  useDictDataStore.queryData();
});
</script>
<style lang="scss" scoped>
.form-right {
  display: flex;
  justify-content: end;
}
</style>
