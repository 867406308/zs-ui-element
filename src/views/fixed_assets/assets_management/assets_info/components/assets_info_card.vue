<template>
  <el-dialog v-model="assetsInfoCardVisible" title="资产卡片">
    <div>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="资产名称">
          <template #default>
            <el-image
              style="width: 100px; height: 100px"
              :preview-src-list="[
                'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
              ]"
              src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
              fit="fill"
          /></template>
        </el-descriptions-item>
        <el-descriptions-item label="资产名称">
          <template #default>{{ assetsInfoForm.name }}</template>
          <template #label>资产名称</template>
        </el-descriptions-item>
        <el-descriptions-item label="资产编号">
          <template #default>{{ assetsInfoForm.serialNo }}</template>
          <template #label>资产编号</template>
        </el-descriptions-item>
        <el-descriptions-item label="入库编号">
          <template #default>{{ assetsInfoForm.inNo }}</template>
          <template #label>入库编号</template>
        </el-descriptions-item>
        <el-descriptions-item label="入库日期">
          <template #default>{{ assetsInfoForm.inNo }}</template>
          <template #label>入库日期</template>
        </el-descriptions-item>
        <el-descriptions-item label="采购日期">
          <template #default>{{ assetsInfoForm.inNo }}</template>
          <template #label>采购日期</template>
        </el-descriptions-item>
        <el-descriptions-item label="采购单价">
          <template #default>{{ assetsInfoForm.buyPrice }}</template>
          <template #label>采购单价</template>
        </el-descriptions-item>
        <el-descriptions-item label="单位">
          <template #default>{{ assetsInfoForm.unit }}</template>
          <template #label>单位</template>
        </el-descriptions-item>
        <el-descriptions-item label="规格型号">
          <template #default>{{ assetsInfoForm.spec }}</template>
          <template #label>规格型号</template>
        </el-descriptions-item>
        <el-descriptions-item label="品牌">
          <template #default>{{ assetsInfoForm.brand }}</template>
          <template #label>品牌</template>
        </el-descriptions-item>
        <el-descriptions-item label="销售商">
          <template #default>{{ assetsInfoForm.manufacturer }}</template>
          <template #label>销售商</template>
        </el-descriptions-item>
        <el-descriptions-item label="资产状态">
          <template #default>{{
            assetsInfoForm.assetsStatusDictLabel
          }}</template>
          <template #label>资产状态</template>
        </el-descriptions-item>
        <el-descriptions-item label="使用状态">
          <template #default>{{ assetsInfoForm.useStatusDictLabel }}</template>
          <template #label>使用状态</template>
        </el-descriptions-item>
        <el-descriptions-item label="管理部门">
          <template #default>{{ assetsInfoForm.manageOrgName }}</template>
          <template #label>管理部门</template>
        </el-descriptions-item>
        <el-descriptions-item label="管理部门负责人">
          <template #default>{{ assetsInfoForm.manageUserName }}</template>
          <template #label>管理部门负责人</template>
        </el-descriptions-item>
        <el-descriptions-item label="资产分级">
          <template #default>{{ assetsInfoForm.useStatusDictLabel }}</template>
          <template #label>资产分级</template>
        </el-descriptions-item>
        <el-descriptions-item label="资产分类">
          <template #default>{{ assetsInfoForm.classifyName }}</template>
          <template #label>资产分类</template>
        </el-descriptions-item>
        <el-descriptions-item label="折旧状态">
          <template #default>{{
            assetsInfoForm.depreciationCodeDictLabel
          }}</template>
          <template #label>折旧状态</template>
        </el-descriptions-item>
        <el-descriptions-item label="折旧年限(月)">
          <template #default>{{ assetsInfoForm.depreciationMonths }}</template>
          <template #label>折旧年限(月)</template>
        </el-descriptions-item>
        <el-descriptions-item label="累计折旧年限(月)">
          <template #default>{{ assetsInfoForm.depreciatedMonths }}</template>
          <template #label>累计折旧年限(月)</template>
        </el-descriptions-item>
        <el-descriptions-item label="累计折旧金额">
          <template #default>{{ assetsInfoForm.depreciatedPrice }}</template>
          <template #label>累计折旧金额</template>
        </el-descriptions-item>
        <el-descriptions-item label="存放位置" :span="3">
          <template #default>{{
            assetsInfoForm.storageLocationDescription
          }}</template>
          <template #label>存放位置</template>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-dialog>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { assetsInfoCardStore } from '@/store/modules/fixed_assets/assets_management/assets_info/assetsInfoCard';
const useAssetsInfoCardStore = assetsInfoCardStore();
const { assetsInfoCardVisible, assetsInfoForm } = storeToRefs(
  useAssetsInfoCardStore,
);
defineExpose({
  assetsInfoForm,
  init: useAssetsInfoCardStore.init,
});
</script>
<style lang="scss" scoped>
.zs-descriptions {
  :deep(.zs-descriptions__body) {
    .zs-descriptions__cell.zs-descriptions__label.is-bordered-label {
      word-break: break-all;
      word-wrap: break-word;
      width: 10%;
    }
    .zs-descriptions__cell.zs-descriptions__content.is-bordered-content {
      word-break: break-all;
      word-wrap: break-word;
      width: 23%;
    }
  }
}
</style>
