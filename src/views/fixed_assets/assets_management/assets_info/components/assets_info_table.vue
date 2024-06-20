<template>
  <el-container>
    <el-table
      ref="assetsInfoTableRef"
      class="table-style"
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
      :row-key="(row) => row.id"
      border
      @selection-change="useAssetsInfoStore.handleSelectionChange"
    >
      <el-table-column
        type="selection"
        align="center"
        width="55"
        :reserve-selection="true"
        fixed="left"
      />
      <el-table-column
        align="center"
        label="序号"
        type="index"
        width="55"
        fixed="left"
      />
      <el-table-column prop="serialNo" label="资产编号" width="120" />
      <el-table-column prop="inNo" label="入库单编号" width="120" />
      <el-table-column prop="name" label="资产名称" width="200" />
      <el-table-column
        prop="levelName"
        label="资产分级"
        align="center"
        width="100"
      />
      <el-table-column
        prop="topClassifyName"
        label="资产大类(国标分类)"
        width="200"
      />
      <el-table-column
        prop="classifyName"
        label="资产分类(学校分类)"
        width="200"
      />
      <el-table-column
        prop="assetsStatusDictLabel"
        label="资产状态"
        width="100"
      />
      <el-table-column prop="useStatusDictLabel" label="使用状态" width="100" />
      <el-table-column prop="manageOrgName" label="管理部门" width="200" />
      <el-table-column
        prop="manageUserName"
        label="管理部门负责人"
        width="150"
      />
      <el-table-column prop="useOrgName" label="使用部门" width="200" />
      <el-table-column prop="useUserName" label="使用人" width="150" />
      <el-table-column prop="entryDate" label="入账日期" width="120" />
      <el-table-column
        prop="buyPrice"
        label="采购单价(元)"
        align="right"
        width="120"
        :formatter="priceFormatter"
      />
      <el-table-column
        prop="storageLocationDescription"
        label="存放位置"
        show-overflow-tooltip
        width="300"
      />
      <el-table-column align="center" fixed="right" label="操作" width="100">
        <template #default="{ row }">
          <el-button
            link
            v-permission="'assets:info:info'"
            type="primary"
            @click="useAssetsInfoStore.handleAssetsInfoCard(row)"
            >资产卡片</el-button
          >
        </template>
      </el-table-column>
      <template #empty>
        <ZsEmpty />
      </template>
    </el-table>
    <el-footer height="40">
      <el-pagination
        background
        :current-page="assetsInfoForm.page"
        layout="total, sizes, prev, pager, next"
        :page-size="assetsInfoForm.size"
        :total="total"
        @current-change="useAssetsInfoStore.handleCurrentChange"
        @size-change="useAssetsInfoStore.handleSizeChange"
      />
    </el-footer>
    <assets-info-card ref="assetsInfoCardRef" />
  </el-container>
</template>
<script lang="ts" setup>
import AssetsInfoCard from './assets_info_card.vue';
import { storeToRefs } from 'pinia';
import { assetsInfoStore } from '@/store/modules/fixed_assets/assets_management/assets_info/assetsInfoStore';
const useAssetsInfoStore = assetsInfoStore();
const {
  loading,
  tableData,
  total,
  assetsInfoForm,
  assetsInfoCardRef,
  selectedAssetsInfoList,
} = storeToRefs(useAssetsInfoStore);
const priceFormatter = (row: any) => {
  return row.buyPrice ? row.buyPrice.toFixed(2) : 0;
};
const assetsInfoTableRef = ref<InstanceType<typeof ElTable>>();

const toggleSelection = (rows?: any[]) => {
  if (rows) {
    rows.forEach((row) => {
      assetsInfoTableRef.value!.toggleRowSelection(row, true);
    });
  } else {
    assetsInfoTableRef.value!.clearSelection();
  }
};

defineExpose({
  toggle: toggleSelection,
  clearSelection() {
    assetsInfoTableRef.value!.clearSelection();
  },
});
</script>
<style lang="scss" scoped>
.table-style {
  height: calc($main-box-height - 60px) !important;
}
.zs-pagination {
  margin-top: 20px;
}
</style>
