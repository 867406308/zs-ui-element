<template>
  <el-drawer
    v-model="assetsInfoAddVisible"
    title="资产预登记"
    @close="useAssetsInfoAddStore.close"
    :close-on-click-modal="false"
    size="50%"
  >
    <el-form
      :model="assetsInfoForm"
      ref="ruleFormAddRef"
      label-width="auto"
      label-position="right"
      :rules="useAssetsInfoAddStore.rules"
    >
      <ZsSection title="基本信息">
        <el-row :gutter="20">
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="资产名称" prop="name">
              <el-input
                v-model="assetsInfoForm.name"
                placeholder="请输入资产名称"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="合同编号" prop="contractNumber">
              <el-input
                v-model="assetsInfoForm.contractNumber"
                placeholder="请输入合同编号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="单价" prop="buyPrice">
              <el-input-number
                v-model="assetsInfoForm.buyPrice"
                :precision="2"
                :step="0.1"
                :min="0"
                controls-position="right"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="数量" prop="num">
              <el-input-number
                v-model="assetsInfoForm.num"
                :min="0"
                controls-position="right"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :xl="8" :lg="8" :md="8" :sm="12" :xs="24">
            <el-form-item label="总价">
              {{ useAssetsInfoAddStore.total }}
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row :gutter="20">
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
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
          </el-col>
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="资产分类" prop="classicId">
              <el-tree-select
                ref="treeRef"
                v-model="assetsInfoForm.classicId"
                :data="classicIds"
                :render-after-expand="false"
                :props="{
                  label: 'name',
                  value: 'id',
                  children: 'children',
                }"
                clearable
                style="width: 100%"
                @node-click="handleNodeClick"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="销售商" prop="manufacturer">
              <el-input
                v-model="assetsInfoForm.manufacturer"
                placeholder="请输入资产销售商名称"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="单位" prop="unit">
              <el-select
                v-model="assetsInfoForm.unit"
                placeholder="请选择计量单位"
                style="width: 100%"
                clearable
              >
                <el-option
                  v-for="item in unitList"
                  :key="item.sysDictDataId"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="规格型号" prop="spec">
              <el-input
                v-model="assetsInfoForm.spec"
                placeholder="请输入资产的规格型号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="品牌" prop="brand">
              <el-input
                v-model="assetsInfoForm.brand"
                placeholder="请输入资产的品牌信息"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="折旧状态" prop="depreciationCode">
              <el-select
                v-model="assetsInfoForm.depreciationCode"
                placeholder="请选择折旧状态"
                style="width: 100%"
                clearable
              >
                <el-option
                  v-for="item in depreciationCodeList"
                  :key="item.sysDictDataId"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="折旧年限(月)" prop="depreciationMonths">
              <el-input-number
                v-model="assetsInfoForm.depreciationMonths"
                placeholder="请输入折旧年限(月)"
                controls-position="right"
                style="width: 100%"
                :min="0"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="已折旧月数" prop="depreciatedMonths">
              <el-input-number
                v-model="assetsInfoForm.depreciatedMonths"
                placeholder="请输入已折旧月数"
                controls-position="right"
                style="width: 100%"
                :min="0"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="已折旧金额" prop="depreciatedPrice">
              <el-input-number
                v-model="assetsInfoForm.depreciatedPrice"
                :precision="2"
                :step="0.1"
                :min="0"
                controls-position="right"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="采购组织形式" prop="formOfProcurementCode">
              <el-select
                v-model="assetsInfoForm.formOfProcurementCode"
                placeholder="请选择采购组织形式"
                style="width: 100%"
                clearable
              >
                <el-option
                  v-for="item in formOfProcurementCodeList"
                  :key="item.sysDictDataId"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="附件" prop="attachedFile">
              <el-upload
                class="upload-demo"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              >
                <el-button type="primary" link>选择文件</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="存放位置" prop="storageLocationDescription">
              <el-input
                v-model="assetsInfoForm.storageLocationDescription"
                type="textarea"
                placeholder="请输入资产的存放位置"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="详细描述" prop="description">
              <el-input
                type="textarea"
                v-model="assetsInfoForm.description"
                placeholder="请输入资产详细描述"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
      </ZsSection>
      <ZsSection title="采购与验收">
        <el-row :gutter="20">
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="采购部门" prop="buyOrgId">
              <el-tree-select
                v-model="assetsInfoForm.buyOrgId"
                :data="deptTreeData"
                check-strictly
                :props="{
                  label: 'deptName',
                  value: 'sysDeptId',
                  children: 'children',
                }"
                style="width: 100%"
                placeholder="请选择父级菜单"
                @change="useAssetsInfoAddStore.changeBuyOrg"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="采购人" prop="buyUserId">
              <el-select
                v-model="assetsInfoForm.buyUserId"
                placeholder="请选择采购人"
                style="width: 100%"
                clearable
              >
                <el-option
                  v-for="item in buyUserList"
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
            <el-form-item label="验收部门" prop="acceptOrgId">
              <el-tree-select
                v-model="assetsInfoForm.acceptOrgId"
                :data="deptTreeData"
                check-strictly
                :props="{
                  label: 'deptName',
                  value: 'sysDeptId',
                  children: 'children',
                }"
                style="width: 100%"
                placeholder="请选择父级菜单"
                @change="useAssetsInfoAddStore.changeAcceptOrg"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="验收人" prop="acceptUserId">
              <el-select
                v-model="assetsInfoForm.acceptUserId"
                placeholder="请选择验收人"
                style="width: 100%"
                clearable
              >
                <el-option
                  v-for="item in acceptUserList"
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
            <el-form-item label="验收日期" prop="acceptDate">
              <el-date-picker
                v-model="assetsInfoForm.acceptDate"
                type="date"
                placeholder="选择日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="验收单号" prop="stockCode">
              <el-input
                v-model="assetsInfoForm.stockCode"
                placeholder="请输入验收单号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </ZsSection>
      <ZsSection title="管理与使用">
        <el-row :gutter="20">
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <el-form-item label="管理部门" prop="manageOrgId">
              <el-tree-select
                v-model="assetsInfoForm.manageOrgId"
                :data="deptTreeData"
                check-strictly
                :props="{
                  label: 'deptName',
                  value: 'sysDeptId',
                  children: 'children',
                }"
                style="width: 100%"
                placeholder="请选择管理部门"
                @change="useAssetsInfoAddStore.changeManageOrg"
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
                :data="deptTreeData"
                check-strictly
                :props="{
                  label: 'deptName',
                  value: 'sysDeptId',
                  children: 'children',
                }"
                style="width: 100%"
                placeholder="请选择使用部门"
                @change="useAssetsInfoAddStore.changeUseOrg"
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
      </ZsSection>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="useAssetsInfoAddStore.close">取消</el-button>
        <el-button
          type="primary"
          @click="useAssetsInfoAddStore.submit(ruleFormAddRef, emits)"
          :loading="loading"
          >确定</el-button
        >
      </span>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
import { assetsInfoAddStore } from '@/store/modules/fixed_assets/assets_management/assets_info/assetsInfoAdd';
import { storeToRefs } from 'pinia';
const useAssetsInfoAddStore = assetsInfoAddStore();
const {
  assetsInfoAddVisible,
  loading,
  assetsInfoForm,
  ruleFormAddRef,
  formOfProcurementCodeList,
  classicIds,
  unitList,
  depreciationCodeList,
  deptTreeData,
  buyUserList,
  acceptUserList,
  manageUserList,
  useUserList,
} = storeToRefs(useAssetsInfoAddStore);
const emits = defineEmits(['query-data']);
const handleNodeClick = (data: any, node: any) => {
  let parentId = getParentId(data, node);
  assetsInfoForm.value.topLevelGbClassicId = parentId ?? '';
};
function getParentId(data: any, node: any) {
  if (!node.parent) {
    return data.gbcId; //data.id;
  } else {
    return getParentId(node.data, node.parent);
  }
}
defineExpose({
  init: useAssetsInfoAddStore.init,
});
</script>
