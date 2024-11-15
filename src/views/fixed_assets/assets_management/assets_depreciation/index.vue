<template>
  <div class="assets-info-container">
    <el-container>
      <el-header>
        <el-form
          ref="ruleFormRef"
          :inline="true"
          label-width="auto"
          :model="assetsDepreciationForm"
        >
          <el-form-item label="资产名称" prop="name">
            <el-input
              v-model="assetsDepreciationForm.name"
              placeholder="请输入资产名称"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="useAssetsDepreciationStore.queryData"
              >查询</el-button
            >
            <el-button
              @click="useAssetsDepreciationStore.resetForm(ruleFormRef)"
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
              @click="useAssetsDepreciationStore.handleAddDepreciation"
              >一键折旧</el-button
            >
            <el-button
              type="danger"
              @click="useAssetsDepreciationStore.handleDelete"
              >删除折旧</el-button
            >
          </template>
        </ZsToolbar>
        <el-table
          class="table-style"
          :stripe="true"
          :data="tableData"
          style="width: 100%"
          v-loading="loading"
          border
        >
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="55"
          />
          <el-table-column prop="name" label="折旧/摊销账期" />
          <el-table-column prop="createDate" label="单据时间" />
          <el-table-column prop="amount" label="资产数量" align="right" />
          <el-table-column
            prop="amountPrice"
            label="折旧总额"
            align="right"
            :formatter="priceFormatter"
          />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="180"
          >
            <template #default="{ row }">
              <el-button
                link
                type="primary"
                @click="useAssetsDepreciationStore.handleStatistics(row)"
                >折旧统计</el-button
              >
              <el-divider direction="vertical" />
              <el-button
                link
                type="primary"
                @click="useAssetsDepreciationStore.handleDetail(row)"
                >折旧明细</el-button
              >
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
          :current-page="assetsDepreciationForm.page"
          layout="total, sizes, prev, pager, next"
          :page-size="assetsDepreciationForm.size"
          :total="total"
          @current-change="useAssetsDepreciationStore.handleCurrentChange"
          @size-change="useAssetsDepreciationStore.handleSizeChange"
        />
      </el-footer>
    </el-container>
  </div>
  <assets-depreciation-statistics ref="assetsDepreciationStatisticsRef" />
  <assets-depreciation-details ref="assetsDepreciationDetailsRef" />
</template>
<script lang="ts" setup>
import AssetsDepreciationStatistics from './components/assets_depreciation_statistics.vue';
import AssetsDepreciationDetails from './components/assets_depreciation_details.vue';
import { Plus, Search, Refresh } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { assetsDepreciationStore } from '@/store/modules/fixed_assets/assets_management/assets_depreciation/assetsDepreciationStore';
const useAssetsDepreciationStore = assetsDepreciationStore();
const {
  assetsDepreciationForm,
  ruleFormRef,
  total,
  tableData,
  loading,
  assetsDepreciationStatisticsRef,
  assetsDepreciationDetailsRef,
} = storeToRefs(useAssetsDepreciationStore);
const priceFormatter = (row: any) => {
  return row.amountPrice ? row.amountPrice.toFixed(2) : 0;
};
onMounted(() => {
  useAssetsDepreciationStore.queryData();
});
</script>
