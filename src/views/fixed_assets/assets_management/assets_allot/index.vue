<template>
  <div class="assets-allot-container">
    <el-container>
      <el-header>
        <el-form :inline="true" label-width="auto">
          <el-form-item label="调拨单">
            <el-input
              v-model="assetsAllotForm.serialNo"
              placeholder="请输入调拨单号"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="useAssetsAllotStore.queryData"
              >查询</el-button
            >
            <el-button @click="useAssetsAllotStore.reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <ZsToolbar>
          <template #left>
            <el-button
              type="primary"
              @click="useAssetsAllotStore.handleAddAllot"
              >新增调拨</el-button
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
            fixed="left"
          />
          <el-table-column
            prop="serialNo"
            label="调拨单号"
            width="100"
            fixed="left"
          />
          <el-table-column
            prop="reason"
            label="调拨原因"
            show-overflow-tooltip
          />
          <el-table-column prop="createDate" label="调拨日期" width="200" />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="200"
          >
            <template #default="{ row }">
              <el-button link type="primary">打印调拨单</el-button>
              <el-divider direction="vertical" />
              <el-button
                link
                type="primary"
                @click="useAssetsAllotStore.handleDetail(row)"
                >调拨明细</el-button
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
          :current-page="assetsAllotForm.page"
          layout="total, sizes, prev, pager, next"
          :page-size="assetsAllotForm.size"
          :total="total"
          @current-change="useAssetsAllotStore.handleCurrentChange"
          @size-change="useAssetsAllotStore.handleSizeChange"
        />
      </el-footer>
    </el-container>
  </div>
  <AssetsAllotDetails ref="assetsAllotDetailsRef" />
  <AssetsAllotAdd ref="assetsAllotAddRef" />
</template>
<script lang="ts" setup>
import AssetsAllotAdd from './components/assets_allot_add.vue';
import AssetsAllotDetails from './components/assets_allot_details.vue';
import { Search } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { assetsAllotStore } from '@/store/modules/fixed_assets/assets_management/assets_allot/assetsAllotStore';
const useAssetsAllotStore = assetsAllotStore();
const {
  assetsAllotForm,
  total,
  tableData,
  loading,
  assetsAllotDetailsRef,
  assetsAllotAddRef,
} = storeToRefs(useAssetsAllotStore);
const priceFormatter = (row: any) => {
  return row.totalPrice ? row.totalPrice.toFixed(2) : 0;
};
onMounted(() => {
  useAssetsAllotStore.queryData();
});
</script>
<style lang="scss" scoped>
.zs-table {
  height: calc($main-box-height - 60px) !important;
}
</style>
