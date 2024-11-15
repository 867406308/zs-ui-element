el-form
<template>
  <el-drawer
    v-model="assetsInfoStockInVisible"
    title="资产入库"
    @close="useAssetsInfoStockInStore.close"
    :close-on-click-modal="false"
    size="60%"
  >
    <el-form
      :model="assetsInfoStockInForm"
      ref="ruleFormRef"
      label-width="auto"
      :rules="useAssetsInfoStockInStore.rules"
    >
      <ZsSection title="基本信息">
        <el-row :gutter="20">
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="会计凭证号" prop="accountingVoucher">
              <el-input
                v-model="assetsInfoStockInForm.accountingVoucher"
                placeholder="请输入会计凭证号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="入账日期" prop="entryDate">
              <el-date-picker
                v-model="assetsInfoStockInForm.entryDate"
                type="date"
                placeholder="请选择日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="项目代码" prop="projectCode">
              <el-input
                v-model="assetsInfoStockInForm.projectCode"
                placeholder="请输入项目代码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="发票号" prop="invoiceNumber">
              <el-input
                v-model="assetsInfoStockInForm.invoiceNumber"
                placeholder="请输入发票号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </ZsSection>
      <ZsSection title="资产信息">
        <el-table
          class="table-style"
          :stripe="true"
          :data="assetsInfoStockInForm.assetsInfoList"
          style="width: 100%"
          border
        >
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
          <el-table-column
            prop="useStatusDictLabel"
            label="使用状态"
            width="100"
          />
          <el-table-column prop="manageOrgName" label="管理部门" width="200" />
          <el-table-column
            prop="manageUserName"
            label="管理部门负责人"
            width="150"
          />
          <el-table-column prop="useOrgName" label="使用部门" width="200" />
          <el-table-column prop="useUserName" label="使用人" width="150" />
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
          <el-table-column label="操作" width="80" align="center" fixed="right">
            <template #default="{ $index }">
              <el-button
                link
                v-permission="'assets:info:info'"
                type="primary"
                @click="useAssetsInfoStockInStore.removeRow($index)"
                >移除</el-button
              >
            </template>
          </el-table-column>
          <template #empty>
            <ZsEmpty />
          </template>
        </el-table>
      </ZsSection>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="useAssetsInfoStockInStore.close">取消</el-button>
        <el-button
          type="primary"
          @click="useAssetsInfoStockInStore.submit(ruleFormRef, emits)"
          :loading="loading"
          >确定</el-button
        >
      </span>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { assetsInfoStockInStore } from '@/store/modules/fixed_assets/assets_management/assets_info/assetsInfoStockIn';
import { storeToRefs } from 'pinia';
const useAssetsInfoStockInStore = assetsInfoStockInStore();
const {
  assetsInfoStockInVisible,
  assetsInfoStockInForm,
  ruleFormRef,
  loading,
} = storeToRefs(useAssetsInfoStockInStore);

const priceFormatter = (row: any) => {
  return row.buyPrice ? row.buyPrice.toFixed(2) : 0;
};
const emits = defineEmits(['query-data']);
defineExpose({
  assetsInfoStockInForm,
  init: useAssetsInfoStockInStore.init,
});
</script>
<style lang="scss" scoped>
.table-style {
  height: calc($main-box-height - 200px) !important;
}
</style>
