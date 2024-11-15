<template>
  <el-drawer
    v-model="assetsScrapDetailsVisible"
    title="明细"
    @close="useAssetsScrapDetailsStore.close"
    :close-on-click-modal="false"
    size="50%"
  >
    <ZsSection title="基本信息">
      <el-descriptions :column="3">
        <el-descriptions-item label="报废单号" label-align="right">
          {{ assetsScrapForm.serialNo }}
        </el-descriptions-item>
        <el-descriptions-item label="申请日期" label-align="right">
          {{ assetsScrapForm.applyDate }}
        </el-descriptions-item>
        <el-descriptions-item label="资产数量" label-align="right">{{
          assetsScrapForm.amount
        }}</el-descriptions-item>
        <el-descriptions-item label="资产金额" label-align="right">
          {{ assetsScrapForm.totalPrice }}
        </el-descriptions-item>
        <el-descriptions-item label="接收单位" label-align="right">
          {{ assetsScrapForm.receiver }}
        </el-descriptions-item>
        <el-descriptions-item label="批准文号" label-align="right">
          {{ assetsScrapForm.approveSerialNo }}
        </el-descriptions-item>
        <el-descriptions-item label="批准部门" label-align="right">
          {{ assetsScrapForm.approveOrg }}
        </el-descriptions-item>
        <el-descriptions-item label="批准日期" label-align="right">
          {{ assetsScrapForm.approveDate }}
        </el-descriptions-item>
        <el-descriptions-item label="批准文件" label-align="right">
          {{ assetsScrapForm.approveFile }}
        </el-descriptions-item>
      </el-descriptions>
    </ZsSection>
    <ZsSection title="资产明细">
      <template #header-right>
        <el-button
          type="primary"
          @click="useAssetsScrapDetailsStore.handleExport"
        >
          导出
        </el-button>
      </template>
      <el-table
        :data="scrapDetailsData"
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
        <el-table-column prop="unit" label="单位" align="center" width="60" />
        <el-table-column
          prop="spec"
          label="型号"
          align="center"
          width="200"
          show-overflow-tooltip
        />
        <el-table-column prop="entryDate" label="入库日期" width="100" />
        <el-table-column prop="manageOrgName" label="管理部门" width="200" />
        <el-table-column prop="manageUserName" label="管理人员" width="100" />
        <el-table-column
          prop="buyPrice"
          label="采购单价"
          width="100"
          :formatter="buyPriceFormatter"
        />
        <el-table-column
          prop="depreciatedPrice"
          label="已折旧金额"
          width="100"
          :formatter="depreciatedPriceFormatter"
        />
      </el-table>
      <ZsGap />
      <el-pagination
        background
        :current-page="scrapDetailsFrom.page"
        layout="total, sizes, prev, pager, next"
        :page-size="scrapDetailsFrom.size"
        :total="total"
        @current-change="useAssetsScrapDetailsStore.handleCurrentChange"
        @size-change="useAssetsScrapDetailsStore.handleSizeChange"
      />
    </ZsSection>
  </el-drawer>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { assetsScrapDetailsStore } from '@/store/modules/fixed_assets/assets_management/assets_scrap/assetsScrapDetailsStore';
const useAssetsScrapDetailsStore = assetsScrapDetailsStore();
const {
  assetsScrapDetailsVisible,
  scrapDetailsData,
  total,
  scrapDetailsFrom,
  assetsScrapForm,
  loading,
} = storeToRefs(useAssetsScrapDetailsStore);

const buyPriceFormatter = (row: any) => {
  return row.buyPrice ? row.buyPrice.toFixed(2) : 0;
};

const depreciatedPriceFormatter = (row: any) => {
  return row.depreciatedPrice ? row.depreciatedPrice.toFixed(2) : 0;
};

defineExpose({
  scrapDetailsFrom,
  init: useAssetsScrapDetailsStore.init,
});
</script>
