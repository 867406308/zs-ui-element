<template>
  <el-drawer
    v-model="advancedQueryVisible"
    title="高级查询"
    @close="useAssetsInfoStore.close"
    :close-on-click-modal="false"
    size="40%"
  >
    <el-form :model="assetsInfoForm" ref="ruleFormRef" label-width="auto">
      <el-form-item label="资产名称" prop="name">
        <el-input
          v-model="assetsInfoForm.name"
          placeholder="请输入资产名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="资产编号" prop="code">
        <el-col :span="11">
          <el-input
            v-model="assetsInfoForm.serialNoStart"
            placeholder="请输入资产编号"
          ></el-input>
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">~</span>
        </el-col>
        <el-col :span="11">
          <el-input
            v-model="assetsInfoForm.serialNoEnd"
            placeholder="请输入资产编号"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="资产分级" prop="levelId">
        <el-select
          v-model="assetsInfoForm.levelId"
          placeholder="请选择资产分级"
          style="width: 100%"
          clearable
        >
          <el-option label="一级" value="1000"></el-option>
          <el-option label="二级" value="1001"></el-option>
          <el-option label="三级" value="1002"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资产分类" prop="classicIdList">
        <el-tree-select
          v-model="assetsInfoForm.classicIdList"
          :data="classicIds"
          multiple
          :render-after-expand="false"
          show-checkbox
          collapse-tags
          :props="{
            label: 'name',
            value: 'id',
            children: 'children',
          }"
          style="width: 100%"
        />
        <!-- <el-cascader
          v-model="assetsInfoForm.classicIdList"
          placeholder="请选择资产分类"
          :options="classicIds"
          :props="props"
          collapse-tags
          clearable
          style="width: 100%"
        /> -->
      </el-form-item>
      <el-form-item label="价格范围">
        <el-col :span="11">
          <el-input
            v-model="assetsInfoForm.priceStart"
            :formatter="
              (value: any) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            "
            :parser="(value: any) => value.replace(/\D/g, '')"
          />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">~</span>
        </el-col>
        <el-col :span="11">
          <el-input
            v-model="assetsInfoForm.priceEnd"
            :formatter="
              (value: any) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            "
            :parser="(value: any) => value.replace(/\D/g, '')"
          />
        </el-col>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
          <el-form-item label="管理部门" prop="manageOrgId">
            <el-tree-select
              v-model="assetsInfoForm.manageOrgId"
              :render-after-expand="false"
              :data="deptTree"
              :props="{
                label: 'deptName',
                value: 'sysDeptId',
                children: 'children',
              }"
              style="width: 100%"
              placeholder="请选择管理部门"
              @change="useAssetsInfoStore.changeManageOrg"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
          <el-form-item label="管理部门负责人" prop="manageUserId">
            <el-select
              v-model="assetsInfoForm.manageUserId"
              placeholder="请选择管理部门负责人"
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
          <el-form-item label="使用部门" prop="useOrgId">
            <el-tree-select
              v-model="assetsInfoForm.useOrgId"
              :data="deptTree"
              :render-after-expand="false"
              check-strictly
              :props="{
                label: 'deptName',
                value: 'sysDeptId',
                children: 'children',
              }"
              style="width: 100%"
              placeholder="请选择使用部门"
              @change="useAssetsInfoStore.changeUseOrg"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
          <el-form-item label="使用人" prop="useUserId">
            <el-select
              v-model="assetsInfoForm.useUserId"
              placeholder="请选择管理部门负责人"
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
      <el-form-item label="存放位置" prop="storageLocationDescription">
        <el-input
          v-model="assetsInfoForm.storageLocationDescription"
          placeholder="请输入存放位置"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="入库日期" prop="inDate">
        <el-date-picker
          v-model="inDate"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="useAssetsInfoStore.handleDateChange"
        />
      </el-form-item>
      <el-form-item label="销售商" prop="manufacturer">
        <el-input
          v-model="assetsInfoForm.manufacturer"
          placeholder="请输入销售商"
          clearable
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="useAssetsInfoStore.close">取消</el-button>
        <el-button
          type="primary"
          @click="useAssetsInfoStore.resetQueryForm(ruleFormRef)"
          >重置</el-button
        >
        <el-button type="primary" @click="useAssetsInfoStore.queryData"
          >查询</el-button
        >
      </span>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import ZsUser from '@/components/ZsUser/index.vue';
import { userStore } from '@/store/modules/sys/user/userStore';
const useUserStore = userStore();
const { form, total, ruleFormRef, tableData } = storeToRefs(useUserStore);

import { storeToRefs } from 'pinia';
import { assetsInfoStore } from '@/store/modules/fixed_assets/assets_management/assets_info/assetsInfoStore';
const useAssetsInfoStore = assetsInfoStore();
const {
  advancedQueryVisible,
  assetsInfoForm,
  useUserName,
  inDate,
  classicIds,
  deptTree,
  manageUserList,
  useUserList,
} = storeToRefs(useAssetsInfoStore);

onMounted(() => {
  useAssetsInfoStore.queryClassifySchoolTree();
  useAssetsInfoStore.querySysDeptTree();

  form.value.size = 5;
  useUserStore.queryData();
});

const emits = defineEmits(['onClick']);

const handleOnClick = (row: any) => {
  assetsInfoForm.value.useUserId = row.sysUserId;
  useUserName.value = row.realName;
};
const handleOnClear = () => {
  assetsInfoForm.value.useUserId = '';
  useUserName.value = '';
};
</script>
<style lang="scss">
.popoverStyle {
  width: 100% !important;
}
</style>
