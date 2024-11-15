<template>
  <div class="assets-info-container">
    <el-container>
      <el-header class="header-height">
        <el-space :fill="true" style="width: 100%; margin-bottom: 8px">
          <el-row justify="space-between">
            <el-col :xl="12" :lg="12" :md="12" :sm="24">
              <div>
                <el-button type="primary" @click="useAssetsInfoStore.handleAdd"
                  >预登记</el-button
                >
                <el-button
                  type="primary"
                  @click="useAssetsInfoStore.handleStockIn"
                  >入库</el-button
                >
                <el-button
                  type="primary"
                  @click="useAssetsInfoStore.handleAddOrEdit"
                  >调拨</el-button
                >
                <el-button
                  type="primary"
                  @click="useAssetsInfoStore.handleAddOrEdit"
                  >导出</el-button
                >
              </div>
            </el-col>
            <el-col :xl="12" :lg="12" :md="12" :sm="24" class="form-right">
              <el-space>
                <el-input
                  v-model="assetsInfoForm.name"
                  placeholder="请输入资产名称"
                  class="input-with-select"
                  clearable
                  @clear="useAssetsInfoStore.queryData()"
                >
                  <template #append>
                    <el-button
                      :icon="Search"
                      @click="useAssetsInfoStore.queryData()"
                    />
                  </template>
                </el-input>
                <!-- <el-radio-group
                  v-model="assetsInfoForm.saveState"
                  @change="useAssetsInfoStore.queryData()"
                >
                  <el-radio-button label="">全部</el-radio-button>
                  <el-radio-button label="0">预登记</el-radio-button>
                  <el-radio-button label="1">已入账</el-radio-button>
                </el-radio-group> -->
                <el-button
                  type="primary"
                  :icon="Filter"
                  @click="useAssetsInfoStore.handleAdvancedQuery"
                >
                  高级筛选
                </el-button>
              </el-space>
            </el-col>
          </el-row>
        </el-space>
      </el-header>
      <el-main>
        <!-- <el-alert
          title="已选择0项"
          type="success"
          show-icon
          :closable="false"
        /> -->
        <el-space wrap style="margin-bottom: 8px">
          <el-radio-group
            v-model="assetsInfoForm.saveState"
            @change="useAssetsInfoStore.queryData()"
          >
            <el-radio-button value="">全部</el-radio-button>
            <el-radio-button value="0">未入账</el-radio-button>
            <el-radio-button value="1">已入账</el-radio-button>
          </el-radio-group>
        </el-space>
        <AssetsInfoTable />
      </el-main>
    </el-container>
    <assets-info-add
      ref="assetsInfoAddRef"
      @query-data="useAssetsInfoStore.queryData()"
    />
    <assets-info-query
      ref="assetsInfoQueryRef"
      @query-data="useAssetsInfoStore.queryData()"
    />
    <assets-info-stock-in
      ref="assetsInfoStockInRef"
      @query-data="useAssetsInfoStore.queryData()"
    />
  </div>
</template>
<script lang="ts" setup>
import AssetsInfoTable from './components/assets_info_table.vue';
import AssetsInfoAdd from './components/assets_info_add.vue';
import AssetsInfoQuery from './components/assets_info_query.vue';
import AssetsInfoStatistic from './components/assets_info_statistic.vue';
import AssetsInfoStockIn from './components/assets_info_stock_in.vue';
import { Search, Filter } from '@element-plus/icons-vue';
import { assetsInfoStore } from '@/store/modules/fixed_assets/assets_management/assets_info/assetsInfoStore';
import { storeToRefs } from 'pinia';
const useAssetsInfoStore = assetsInfoStore();
const {
  assetsInfoAddRef,
  assetsInfoQueryRef,
  assetsInfoStockInRef,
  assetsInfoForm,
} = storeToRefs(useAssetsInfoStore);
onMounted(() => {
  useAssetsInfoStore.queryData();
});
</script>
<style lang="scss" scoped>
.header-height {
  height: 50px !important;
  margin-bottom: 10px;
}
.form-right {
  display: flex;
  justify-content: end;
}
.zs-main {
  // height: calc($main-box-height - 0px) !important;
  .zs-alert {
    height: 34px;
    margin-bottom: 8px;
    color: #409eff;
    border: 1px solid #d9ecff;
  }
  .zs-alert--success {
    --zs-alert-bg-color: #ecf5ff;
  }
}
</style>
