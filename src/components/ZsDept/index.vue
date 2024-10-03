<template>
  <el-input
    v-model="form.deptName"
    style="max-width: 600px"
    placeholder="请输入关键字进行过滤"
    class="input-with-select"
    @keyup.enter="useDetpStore.queryData"
    @input="useDetpStore.queryData"
  >
    <template #append>
      <el-button :icon="Search" @click="useDetpStore.queryData" />
    </template>
  </el-input>
  <ZsGap height="20" />
  <el-tree
    ref="deptRef"
    :data="tableData"
    :props="defaultProps"
    :default-expanded-keys="expandedKeys"
    accordion
    node-key="sysDeptId"
    :expand-on-click-node="false"
    @node-click="handleNodeClick"
  >
    <template #default="{ node, data }">
      <!-- <ZsIcon
        v-if="data.children.length > 0"
        icon="organization-chart"
        style="margin-right: 8px"
      /> -->
      <ZsIcon
        v-if="data.children.length === 0"
        icon="organization-chart"
        style="margin-right: 8px"
      />
      <span>{{ node.label }}</span>
    </template>
  </el-tree>
</template>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import ZsCustomIcon from '@/components/ZsCustomIcon/index.vue';
import { deptStore } from '@/store/modules/sys/dept/deptStore';
import { storeToRefs } from 'pinia';
const useDetpStore = deptStore();
const { tableData, expandedKeys, form } = storeToRefs(useDetpStore);

const defaultProps = {
  children: 'children',
  label: 'deptName',
  value: 'sysDeptId',
};

const emits = defineEmits(['node-click']);
const handleNodeClick = (data: any) => {
  emits('node-click', data);
};

onMounted(() => {
  useDetpStore.queryData();
});
</script>
<style lang="scss" scoped>
.scrollbar-container {
  width: 100%;
}
</style>
