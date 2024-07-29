<template>
  <el-drawer
    v-model="assetsDepreciationDetailsVisible"
    title="折旧详情"
    @close="useAssetsDepreciationDetailsStore.close"
    :close-on-click-modal="false"
    size="75%"
    :lock-scroll="true"
  >
    <ZsSection title="折旧详情">
      <template #header-right>
        <el-button
          type="primary"
          @click="useAssetsDepreciationDetailsStore.handleExport"
        >
          导出
        </el-button>
      </template>
      <el-table
        :data="assetsDepreciationDetailsList"
        style="width: 100%"
        v-loading="loading"
        border
      >
        <el-table-column
          align="center"
          label="序号"
          type="index"
          width="55"
          fixed="left"
        />
        <el-table-column prop="assetsSerialNo" label="资产编号" width="120" />
        <el-table-column
          prop="assetsName"
          label="资产名称"
          align="center"
          width="100"
          show-overflow-tooltip
        />
        <el-table-column
          prop="manageOrgName"
          label="管理部门"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="topClassifyName"
          label="资产大类"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="originalPrice"
          label="资产原值"
          align="right"
          width="120"
          show-overflow-tooltip
          :formatter="
            (val) => {
              return val.originalPrice.toFixed(2);
            }
          "
        />
        <el-table-column
          prop="amount"
          label="本次折旧/摊销金额(元)"
          align="right"
          width="170"
          show-overflow-tooltip
          :formatter="
            (val) => {
              return val.amount.toFixed(2);
            }
          "
        />
        <el-table-column
          prop="accumulatedDepreciation"
          label="累计折旧/摊销金额(元)"
          align="right"
          width="170"
          show-overflow-tooltip
          :formatter="
            (val) => {
              return val.accumulatedDepreciation.toFixed(2);
            }
          "
        />
        <el-table-column
          prop="accumulatedDepreciationMonths"
          label="累计折旧月数(个)"
          align="right"
          width="140"
          show-overflow-tooltip
        />
        <el-table-column
          prop="depreciationCodeDictLabel"
          label="折旧状态"
          align="center"
          width="100"
          show-overflow-tooltip
        />
      </el-table>
    </ZsSection>
    <template #footer>
      <el-pagination
        background
        :current-page="assetsDepreciationDetailsFrom.page"
        layout="total, sizes, prev, pager, next"
        :page-size="assetsDepreciationDetailsFrom.size"
        :total="total"
        @current-change="useAssetsDepreciationDetailsStore.handleCurrentChange"
        @size-change="useAssetsDepreciationDetailsStore.handleSizeChange"
      />
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { assetsDepreciationDetailsStore } from '@/store/modules/fixed_assets/assets_management/assets_depreciation/assetsDepreciationDetailsStore';
import { storeToRefs } from 'pinia';
const useAssetsDepreciationDetailsStore = assetsDepreciationDetailsStore();
const {
  assetsDepreciationDetailsVisible,
  assetsDepreciationDetailsFrom,
  assetsDepreciationDetailsList,
  total,
  loading,
} = storeToRefs(useAssetsDepreciationDetailsStore);
defineExpose({
  assetsDepreciationDetailsFrom,
  init: useAssetsDepreciationDetailsStore.init,
});
</script>
