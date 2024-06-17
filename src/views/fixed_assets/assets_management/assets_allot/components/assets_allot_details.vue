<template>
  <el-drawer
    v-model="assetsAllotDetailsVisible"
    title="明细"
    @close="useAssetsScrapDetailsStore.close"
    :close-on-click-modal="false"
    size="70%"
  >
    <div class="header">
      <div>
        <el-text>调拨单号：{{ assetsAllot.serialNo }}</el-text>
      </div>
      <div>
        <el-text>调拨时间：{{ assetsAllot.createDate }}</el-text>
      </div>
      <div>
        <el-text>调拨原因：{{ assetsAllot.reason }}</el-text>
      </div>
    </div>
    <el-table
      class="table-style"
      :data="assetsAllotDetails"
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
        prop="assetsSerialNo"
        label="资产编号"
        width="120"
        fixed="left"
      />
      <el-table-column
        prop="assetsName"
        label="资产名称"
        width="200"
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
      <el-table-column prop="currentUseUserName" label="新使用人" width="100" />
      <el-table-column
        prop="currentStorageLocation"
        label="新存放位置"
        width="200"
        show-overflow-tooltip
      />
      <template #empty>
        <ZsEmpty />
      </template>
    </el-table>
  </el-drawer>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { assetsAllotDetailsStore } from '@/store/modules/fixed_assets/assets_management/assets_allot/assetsAllotDetailsStore';
const useAssetsScrapDetailsStore = assetsAllotDetailsStore();
const {
  loading,
  assetsAllotDetailsVisible,
  assetsAllotDetailsFrom,
  assetsAllotDetails,
  assetsAllot,
} = storeToRefs(useAssetsScrapDetailsStore);

defineExpose({
  assetsAllotDetailsFrom,
  assetsAllot,
  init: useAssetsScrapDetailsStore.init,
});
</script>
<style lang="scss" scoped>
.header {
  margin-bottom: 20px;
}
</style>
