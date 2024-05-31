<template>
  <el-drawer
    v-model="assetsScrapAddVisible"
    title="新增"
    @close="useAssetsScrapAddStore.close"
    :close-on-click-modal="false"
    size="50%"
  >
    <el-form
      :model="assetsScrapForm"
      ref="ruleFormAddRef"
      label-width="auto"
      label-position="right"
      :rules="useAssetsScrapAddStore.rules"
    >
      <ZsSection title="基本信息">
        <el-row :gutter="20">
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="申请日期" prop="applyDate">
              <el-date-picker
                v-model="assetsScrapForm.applyDate"
                type="date"
                placeholder="请选择日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="经办申请人" prop="applyUser">
              <el-input
                v-model="assetsScrapForm.applyUser"
                placeholder="请输入经办申请人"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="接收单位" prop="receiver">
              <el-input
                v-model="assetsScrapForm.receiver"
                placeholder="请输入接收单位"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="批准文号" prop="approveSerialNo">
              <el-input
                v-model="assetsScrapForm.approveSerialNo"
                placeholder="请输入批准文号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="批准部门" prop="approveOrg">
              <el-input
                v-model="assetsScrapForm.approveOrg"
                placeholder="请输入批准部门"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="批准日期" prop="approveDate">
              <el-date-picker
                v-model="assetsScrapForm.approveDate"
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
            <el-form-item label="批准文件" prop="approveFile">
              <el-input
                v-model="assetsScrapForm.approveFile"
                placeholder="请输入批准文件"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="资产合计" prop="totalPrice">
              <div>{{ assetsScrapForm.totalPrice }}</div>
            </el-form-item>
          </el-col>
        </el-row>
      </ZsSection>
      <ZsSection title="资产信息">
        <template #header-right>
          <el-space>
            <el-button
              type="primary"
              size="small"
              @click="useAssetsScrapAddStore.openAssetsSelect"
            >
              资产选择</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="useAssetsScrapAddStore.importAssets"
            >
              批量导入</el-button
            >
          </el-space>
        </template>
        <el-table
          border
          :stripe="true"
          :data="assetsInfoData"
          style="width: 100%"
          height="400"
          v-loading="loading"
          size="small"
        >
          <el-table-column prop="serialNo" label="资产编号" width="120" />
          <el-table-column prop="inNo" label="入库单编号" width="120" />
          <el-table-column prop="name" label="资产名称" width="200" />
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
          <el-table-column label="操作" align="center" fixed="right" width="80">
            <template #default="scope">
              <el-button
                type="danger"
                size="small"
                @click="
                  useAssetsScrapAddStore.handleRemoveSelected(
                    scope.$index,
                    scope.row,
                  )
                "
                >移除</el-button
              >
            </template>
          </el-table-column>
          <template #empty>
            <ZsEmpty />
          </template>
        </el-table>
        <ZsGap />
        <div v-if="total > 0">共 {{ total }} 条</div>
        <!--<el-pagination
          background
          hide-on-single-page
          :current-page="assetsInfoForm.page"
          layout="total, prev, pager, next"
          :page-size="assetsInfoForm.size"
          :total="total"
          @current-change="useAssetsScrapAddStore.handleCurrentChange"
          @size-change="useAssetsScrapAddStore.handleSizeChange"
        /> -->
      </ZsSection>
    </el-form>
    <AssetsInfoSelected
      ref="assetsInfoSelectedRef"
      @selected-change="useAssetsScrapAddStore.handleSelectedChange"
    />
    <AssetsInfoBatchImport ref="assetsInfoBatchImportRef" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="assetsScrapAddVisible = false">取消</el-button>
        <el-button
          type="primary"
          :loading="submitLoading"
          :disabled="assetsInfoData.length === 0"
          @click="useAssetsScrapAddStore.handleSubmit(ruleFormAddRef, emits)"
        >
          提交
        </el-button>
      </span>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import AssetsInfoSelected from './assets_info_selected.vue';
import AssetsInfoBatchImport from './assets_info_batch_import.vue';
import { assetsScrapAddStore } from '@/store/modules/fixed_assets/assets_management/assets_scrap/assetsScrapAddStore';
import { storeToRefs } from 'pinia';
const useAssetsScrapAddStore = assetsScrapAddStore();
const {
  assetsScrapAddVisible,
  assetsScrapForm,
  assetsInfoData,
  loading,
  total,
  assetsInfoForm,
  submitLoading,
  ruleFormAddRef,
  assetsInfoSelectedRef,
  assetsInfoBatchImportRef,
} = storeToRefs(useAssetsScrapAddStore);
const priceFormatter = (row: any) => {
  return row.buyPrice ? row.buyPrice.toFixed(2) : 0;
};
const emits = defineEmits(['query-data']);
defineExpose({
  init: useAssetsScrapAddStore.init,
});
</script>
