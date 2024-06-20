<template>
  <el-drawer
    v-model="assetsAllotAddVisible"
    title="资产调拨"
    @close="useAssetsAllotAddStore.close"
    :close-on-click-modal="false"
    size="50%"
  >
    <el-form
      :model="assetsAllotAddForm"
      ref="ruleFormAddRef"
      label-width="auto"
      label-position="right"
      :rules="rules"
    >
      <ZsSection title="基础信息">
        <el-row :gutter="20">
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="转入管理部门" prop="manageOrgId">
              <el-tree-select
                v-model="assetsAllotAddForm.manageOrgId"
                :render-after-expand="false"
                :data="deptTreeData"
                :props="{
                  label: 'deptName',
                  value: 'sysDeptId',
                  children: 'children',
                }"
                style="width: 100%"
                placeholder="请选择转入的管理部门"
                @change="useAssetsAllotAddStore.changeManageOrg"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="转入负责人" prop="manageUserId">
              <el-select
                v-model="assetsAllotAddForm.manageUserId"
                placeholder="请选择转入管理部门负责人"
                style="width: 100%"
                clearable
              >
                <el-option
                  v-for="item in manageUserList"
                  :key="item.sysUserId"
                  :label="item.realName"
                  :value="item.sysUserId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="转入使用部门" prop="useOrgId">
              <el-tree-select
                v-model="assetsAllotAddForm.useOrgId"
                :render-after-expand="false"
                :data="deptTreeData"
                :props="{
                  label: 'deptName',
                  value: 'sysDeptId',
                  children: 'children',
                }"
                style="width: 100%"
                placeholder="请选择转入使用部门"
                @change="useAssetsAllotAddStore.changeUseOrg"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="转入使用人" prop="useUserId">
              <el-select
                v-model="assetsAllotAddForm.useUserId"
                placeholder="请选择转入管理部门负责人"
                style="width: 100%"
                clearable
              >
                <el-option
                  v-for="item in useUserList"
                  :key="item.sysUserId"
                  :label="item.realName"
                  :value="item.sysUserId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="调拨原因" prop="reason">
              <el-input
                v-model="assetsAllotAddForm.reason"
                :rows="2"
                type="textarea"
                placeholder="请输入资产调拨原因"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </ZsSection>
      <ZsSection title="调拨明细">
        <template #header-right>
          <el-space>
            <el-button
              type="primary"
              size="small"
              @click="useAssetsAllotAddStore.openAssetsInfoSelect"
              >添加资产</el-button
            >
          </el-space>
        </template>
        <el-table
          :data="assetsInfoData"
          style="width: 100%"
          height="400"
          border
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
          <el-table-column label="操作" align="center" fixed="right" width="80">
            <template #default="scope">
              <el-button
                type="danger"
                size="small"
                @click="
                  useAssetsAllotAddStore.handleRemoveSelected(
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
      </ZsSection>
    </el-form>
    <AssetsInfoSelected
      ref="assetsInfoSelectedRef"
      @onSelected="handleSelected"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="assetsAllotAddVisible = false">取消</el-button>
        <el-button
          type="primary"
          :loading="submitLoading"
          :disabled="assetsInfoData.length === 0"
          @click="useAssetsAllotAddStore.handleSubmit(ruleFormAddRef, emits)"
        >
          提交
        </el-button>
      </span>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import AssetsInfoSelected from '@/views/fixed_assets/assets_management/assets_info/components/assets_info_selected.vue';
import { assetsAllotAddStore } from '@/store/modules/fixed_assets/assets_management/assets_allot/assetsAllotAddStore';
import { storeToRefs } from 'pinia';

const rules = {
  manageOrgId: [
    { required: true, message: '请选择转入管理部门', trigger: 'blur' },
  ],
  manageUserId: [
    { required: true, message: '请选择转入管理部门负责人', trigger: 'blur' },
  ],
  useOrgId: [
    { required: true, message: '请选择转入使用部门', trigger: 'blur' },
  ],
  useUserId: [{ required: true, message: '请选择转入使用人', trigger: 'blur' }],
  assetsInfoData: [{ required: true, message: '请选择资产', trigger: 'blur' }],
  reason: [{ required: true, message: '请输入调拨原因', trigger: 'blur' }],
};
const priceFormatter = (row: any) => {
  return row.buyPrice ? row.buyPrice.toFixed(2) : 0;
};
const useAssetsAllotAddStore = assetsAllotAddStore();
const {
  assetsAllotAddVisible,
  assetsAllotAddForm,
  ruleFormAddRef,
  manageUserList,
  useUserList,
  deptTreeData,
  assetsInfoData,
  submitLoading,
  assetsInfoSelectedRef,
} = storeToRefs(useAssetsAllotAddStore);

const emits = defineEmits(['query-data']);

const handleSelected = (data: any) => {
  assetsInfoData.value = data;
};

defineExpose({
  init: useAssetsAllotAddStore.init,
});
</script>
