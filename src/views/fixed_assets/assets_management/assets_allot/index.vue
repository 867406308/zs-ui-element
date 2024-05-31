<template>
  <div class="assets-info-container">
    <el-container>
      <el-header>
        <el-space :fill="true" style="width: 100%; margin-bottom: 8px">
          <el-row justify="space-between">
            <el-col :xl="12" :lg="12" :md="12" :sm="24">
              <div>
                <el-button
                  type="primary"
                  @click="useAssetsAllotStore.handleAddDepreciation"
                  >新增</el-button
                >
              </div>
            </el-col>
            <el-col :xl="12" :lg="12" :md="12" :sm="24" class="form-right">
              <el-space>
                <el-input
                  v-model="assetsAllotForm.serialNo"
                  placeholder="请输入报废单号"
                  class="input-with-select"
                  clearable
                  @clear="useAssetsAllotStore.queryData()"
                >
                  <template #append>
                    <el-button
                      :icon="Search"
                      @click="useAssetsAllotStore.queryData()"
                    />
                  </template>
                </el-input>
              </el-space>
            </el-col>
          </el-row>
        </el-space>
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
            prop="originalManageOrgName"
            label="原管理部门"
            width="200"
          />
          <el-table-column
            prop="originalManageUserName"
            label="原管理人"
            width="100"
          />
          <el-table-column
            prop="originalUseOrgName"
            label="原使用部门"
            width="200"
          />
          <el-table-column
            prop="originalUseUserName"
            label="原使用人"
            width="100"
          />
          <el-table-column
            prop="originalStorageLocation"
            label="原存放位置"
            width="200"
            show-overflow-tooltip
          />
          <el-table-column
            prop="currentManageOrgName"
            label="新管理部门"
            width="200"
          />
          <el-table-column
            prop="currentManageUserName"
            label="新管理人"
            width="100"
          />
          <el-table-column
            prop="currentUseOrgName"
            label="新使用部门"
            width="200"
          />
          <el-table-column
            prop="currentUseUserName"
            label="新使用人"
            width="100"
          />
          <el-table-column
            prop="currentStorageLocation"
            label="新存放位置"
            width="200"
            show-overflow-tooltip
          />
          <el-table-column
            prop="reason"
            label="调拨原因"
            width="200"
            show-overflow-tooltip
          />
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
                @click="useAssetsAllotStore.handleDetail(row)"
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
</template>
<script lang="ts" setup>
import AssetsAllotDetails from './components/assets_allot_details.vue';
import { Search } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { assetsAllotStore } from '@/store/modules/fixed_assets/assets_management/assets_allot/assetsAllotStore';
const useAssetsAllotStore = assetsAllotStore();
const { assetsAllotForm, total, tableData, loading, assetsAllotDetailsRef } =
  storeToRefs(useAssetsAllotStore);
const priceFormatter = (row: any) => {
  return row.totalPrice ? row.totalPrice.toFixed(2) : 0;
};
onMounted(() => {
  useAssetsAllotStore.queryData();
});
</script>
<style lang="scss" scoped>
.form-right {
  display: flex;
  justify-content: end;
}
</style>
