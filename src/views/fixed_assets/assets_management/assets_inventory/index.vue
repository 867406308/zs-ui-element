<template>
  <div class="assets-inventory-container">
    <el-container>
      <el-header class="header-height">
        <el-space :fill="true" style="width: 100%; margin-bottom: 8px">
          <el-row justify="space-between">
            <el-col :xl="12" :lg="12" :md="12" :sm="24">
              <div>
                <el-button
                  type="primary"
                  @click="useAssetsInventoryStore.handleAdd"
                  v-permission="'assets:inventory:createInventoryTask'"
                  >创建盘点任务</el-button
                >
              </div>
            </el-col>
            <el-col :xl="12" :lg="12" :md="12" :sm="24" class="form-right">
              <el-space>
                <el-input
                  v-model="assetsInventoryForm.serialNo"
                  placeholder="请输入报废单号"
                  class="input-with-select"
                  clearable
                  @clear="useAssetsInventoryStore.queryData()"
                >
                  <template #append>
                    <el-button
                      :icon="Search"
                      @click="useAssetsInventoryStore.queryData()"
                    />
                  </template>
                </el-input>
              </el-space>
            </el-col>
          </el-row>
        </el-space>
      </el-header>
      <el-main>
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
          <el-table-column
            prop="name"
            label="盘点任务名称"
            width="220"
            show-overflow-tooltip
          />
          <el-table-column prop="orgName" label="盘点部门" width="180" />
          <el-table-column
            prop="levelName"
            label="资产级别"
            width="90"
            align="center"
          />
          <el-table-column
            prop="userName"
            label="盘点人"
            width="90"
            align="center"
          />
          <el-table-column
            prop="description"
            label="盘点描述"
            show-overflow-tooltip
          />
          <el-table-column
            prop="createDate"
            label="盘点创建时间"
            width="160"
            align="center"
          />
          <el-table-column
            prop="startDate"
            label="盘点开始时间"
            width="160"
            align="center"
          />
          <el-table-column
            prop="finishDate"
            label="盘点完成时间"
            width="160"
            align="center"
          />
          <el-table-column
            prop="status"
            label="盘点状态"
            width="100"
            align="center"
          >
            <template #default="{ row }">
              <el-tag v-if="row.status === 1" type="info">未开始</el-tag>
              <el-tag v-if="row.status === 2" type="primary">盘点中</el-tag>
              <el-tag v-if="row.status === 3" type="success">盘点完成</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="120"
          >
            <template #default="{ row }">
              <el-button
                link
                type="primary"
                @click="useAssetsInventoryStore.handleDetail(row)"
                >导出</el-button
              >
              <el-divider direction="vertical" />
              <el-button
                link
                type="primary"
                @click="useAssetsInventoryStore.handleDetail(row)"
                >详情</el-button
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
          :current-page="assetsInventoryForm.page"
          layout="total, sizes, prev, pager, next"
          :page-size="assetsInventoryForm.size"
          :total="total"
          @current-change="useAssetsInventoryStore.handleCurrentChange"
          @size-change="useAssetsInventoryStore.handleSizeChange"
        />
      </el-footer>
    </el-container>
  </div>
  <AssetsInventoryAdd
    ref="assetsInventoryAddRef"
    @query-data="useAssetsInventoryStore.queryData"
  />
  <AssetsInventoryDetails ref="assetsInventoryDetailsRef" />
</template>
<script lang="ts" setup>
import AssetsInventoryAdd from './components/assets_inventory_add.vue';
import AssetsInventoryDetails from './components/assets_inventory_details.vue';
import { Search } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { assetsInventoryStore } from '@/store/modules/fixed_assets/assets_management/assets_inventory/assetsInventoryStore';
const useAssetsInventoryStore = assetsInventoryStore();
const {
  assetsInventoryForm,
  total,
  tableData,
  loading,
  assetsInventoryAddRef,
  assetsInventoryDetailsRef,
} = storeToRefs(useAssetsInventoryStore);
const priceFormatter = (row: any) => {
  return row.totalPrice ? row.totalPrice.toFixed(2) : 0;
};
onMounted(() => {
  useAssetsInventoryStore.queryData();
});
</script>
<style lang="scss" scoped>
.form-right {
  display: flex;
  justify-content: end;
}
</style>
