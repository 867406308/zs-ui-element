<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col>
          <el-form
            ref="dictDataFormRef"
            :inline="true"
            :model="form"
            class="demo-form-inline"
          >
            <el-form-item label="字典类型" prop="dictType">
              <el-input v-model="form.dictType" placeholder="请输入字典类型" />
            </el-form-item>
            <el-form-item label="字典标签" prop="dictLabel">
              <el-input v-model="form.dictLabel" placeholder="请输入字典标签" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="useDictDataStore.queryData()"
                >查询</el-button
              >
              <el-button @click="useDictDataStore.resetForm(dictDataFormRef)"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="table-body-header">
        <div>
          <el-button
            type="primary"
            v-permission="'sys:dict:save'"
            @click="useDictDataStore.handleAddOrEdit"
            >新增</el-button
          >
        </div>
      </div>
      <el-table
        class="table-style"
        :stripe="true"
        :data="tableData"
        style="width: 100%"
        :loading="loading"
        border
      >
        <el-table-column align="center" label="序号" type="index" width="55" />
        <el-table-column prop="dictType" label="字典类型" align="center">
        </el-table-column>
        <el-table-column prop="dictLabel" label="字典标签" align="center" />
        <el-table-column prop="dictValue" label="字典键值" align="center" />
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column prop="status" label="状态" width="80">
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
              type="success"
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
              @click="useDictDataStore.handleDelete(row.sysRoleId)"
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
        layout="total, sizes, prev, pager, next"
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
import DictDataAddOrEdit from './dict-data-add-or-edit.vue';
import { dictDataStore } from '@/store/modules/sys/dict/dictDataStore';
import { storeToRefs } from 'pinia';
const useDictDataStore = dictDataStore();
const { dictDataFormRef, addEditRef, tableData, total, loading, form } =
  storeToRefs(useDictDataStore);

onMounted(() => {
  useDictDataStore.queryData();
});
</script>
