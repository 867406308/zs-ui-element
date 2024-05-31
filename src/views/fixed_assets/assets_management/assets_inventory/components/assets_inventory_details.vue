<template>
  <el-drawer
    v-model="assetsInventoryDetailsVisible"
    title="盘点详情"
    @close="useAssetsInventoryDetailsStore.close"
    :close-on-click-modal="false"
    size="80%"
    :lock-scroll="true"
  >
    <ZsSection title="基本信息">
      <el-descriptions class="margin-top" :column="2" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">盘点任务名称</div>
          </template>
          {{ assetsInventoryForm.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">盘点部门</div>
          </template>
          {{ assetsInventoryForm.orgName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">盘点人</div>
          </template>
          {{ assetsInventoryForm.userName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">资产级别</div>
          </template>
          {{ assetsInventoryForm.levelName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">任务创建时间</div>
          </template>
          {{ assetsInventoryForm.createDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">任务开始时间</div>
          </template>
          {{ assetsInventoryForm.startDate ?? '——' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">任务完成时间</div>
          </template>
          {{ assetsInventoryForm.finishDate ?? '——' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">盘点状态</div>
          </template>
          <el-tag v-if="assetsInventoryForm.status === 1" type="info"
            >未开始</el-tag
          >
          <el-tag v-if="assetsInventoryForm.status === 2" type="primary"
            >盘点中</el-tag
          >
          <el-tag v-if="assetsInventoryForm.status === 3" type="success"
            >盘点完成</el-tag
          >
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">盘点任务描述</div>
          </template>
          {{ assetsInventoryForm.description }}
        </el-descriptions-item>
      </el-descriptions>
    </ZsSection>
    <ZsSection title="资产明细">
      <el-table
        border
        :data="assetsInventoryDetailsData"
        style="width: 100%"
        :loading="loading"
      >
        <el-table-column align="center" label="序号" type="index" width="55" />
        <el-table-column prop="assetsSerialNo" label="资产编号" width="150" />
        <el-table-column prop="name" label="资产名称" width="200" />
        <el-table-column prop="spec" label="规格" show-overflow-tooltip />
        <el-table-column prop="unit" label="单位" width="60" align="center" />
        <el-table-column prop="useUserName" label="使用人" />
        <el-table-column
          prop="storageLocation"
          label="存放位置"
          show-overflow-tooltip
        />
        <el-table-column prop="assetsStatusLabel" label="资产账面状态" />
        <el-table-column
          prop="assetsResultStatusCodeLabel"
          label="资产盘点结果"
        />
      </el-table>
      <ZsGap />
      <el-pagination
        background
        :current-page="assetsInventoryDetailsForm.page"
        layout="total, sizes, prev, pager, next"
        :page-size="assetsInventoryDetailsForm.size"
        :total="total"
        @current-change="useAssetsInventoryDetailsStore.handleCurrentChange"
        @size-change="useAssetsInventoryDetailsStore.handleSizeChange"
      />
    </ZsSection>
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="useAssetsInventoryDetailsStore.close"
          >取消</el-button
        >
      </span>
    </template> -->
  </el-drawer>
</template>
<script lang="ts" setup>
import { assetsInventoryDetailsStore } from '@/store/modules/fixed_assets/assets_management/assets_inventory/assetsInventoryDetailsStore';
import { init } from 'echarts';
import { storeToRefs } from 'pinia';

const useAssetsInventoryDetailsStore = assetsInventoryDetailsStore();
const {
  assetsInventoryDetailsVisible,
  assetsInventoryForm,
  assetsInventoryDetailsForm,
  assetsInventoryDetailsData,
  total,
  loading,
} = storeToRefs(useAssetsInventoryDetailsStore);

const activeName = ref('first');
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

defineExpose({
  init: useAssetsInventoryDetailsStore.init,
  assetsInventoryForm,
  assetsInventoryDetailsForm,
});
</script>
