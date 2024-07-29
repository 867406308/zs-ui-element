<template>
  <div class="assets-info-container">
    <el-container>
      <el-header class="header-height">
        <el-form :inline="true" label-width="auto">
          <el-form-item label="报废单号">
            <el-input
              v-model="assetsScrapForm.serialNo"
              placeholder="请输入报废单号"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="useAssetsScrapStore.queryData"
              >查询</el-button
            >
            <el-button @click="useAssetsScrapStore.reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <ZsToolbar>
          <template #left>
            <el-button
              type="primary"
              @click="useAssetsScrapStore.handleAdd"
              v-permission="'assets:info:save'"
              >新增报废</el-button
            >
          </template>
        </ZsToolbar>
        <el-table
          class="table-style"
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
          <el-table-column prop="serialNo" label="报废单号" />
          <el-table-column prop="applyDate" label="申请日期" />
          <el-table-column prop="amount" label="资产数量" align="right" />
          <el-table-column
            prop="totalPrice"
            label="总金额"
            align="right"
            :formatter="priceFormatter"
          />
          <el-table-column
            prop="receiver"
            label="接收单位"
            width="260"
            show-overflow-tooltip
          />
          <el-table-column
            prop="approveSerialNo"
            label="批准文号"
            width="200"
          />
          <el-table-column prop="approveOrg" label="批准部门" />
          <el-table-column prop="approveFile" label="批准文件" />
          <el-table-column prop="approveDate" label="批准日期" />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="120"
          >
            <template #default="{ row }">
              <el-button link type="primary">统计</el-button>
              <el-divider direction="vertical" />
              <el-button
                link
                type="primary"
                @click="useAssetsScrapStore.handleDetail(row)"
                >明细</el-button
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
          :current-page="assetsScrapForm.page"
          layout="total, sizes, prev, pager, next"
          :page-size="assetsScrapForm.size"
          :total="total"
          @current-change="useAssetsScrapStore.handleCurrentChange"
          @size-change="useAssetsScrapStore.handleSizeChange"
        />
      </el-footer>
    </el-container>
  </div>
  <AssetsScrapAdd
    ref="assetsScrapAddRef"
    @query-data="useAssetsScrapStore.queryData"
  />
  <AssetsScrapDetails ref="assetsScrapDetailsRef" />
</template>
<script lang="ts" setup>
import AssetsScrapAdd from './components/assets_scrap_add.vue';
import AssetsScrapDetails from './components/assets_scrap_details.vue';
import { Search } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { assetsScrapStore } from '@/store/modules/fixed_assets/assets_management/assets_scrap/assetsScrapStore';
const useAssetsScrapStore = assetsScrapStore();
const {
  assetsScrapForm,
  total,
  tableData,
  loading,
  assetsScrapAddRef,
  assetsScrapDetailsRef,
} = storeToRefs(useAssetsScrapStore);
const priceFormatter = (row: any) => {
  return row.totalPrice ? row.totalPrice.toFixed(2) : 0;
};
onMounted(() => {
  useAssetsScrapStore.queryData();
});
</script>
<style lang="scss" scoped>
.zs-table {
  height: calc($main-box-height - 60px) !important;
}
</style>
