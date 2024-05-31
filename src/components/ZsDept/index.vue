<template>
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
      <ZsIcon
        v-if="data.children.length > 0"
        icon="folder-colour"
        style="margin-right: 8px"
      />
      <ZsIcon
        v-if="data.children.length === 0"
        icon="dept"
        style="margin-right: 8px"
      />
      <span>{{ node.label }}</span>
    </template>
  </el-tree>
</template>
<script lang="ts" setup>
import ZsCustomIcon from '@/components/ZsCustomIcon/index.vue';
import { deptStore } from '@/store/modules/sys/dept/deptStore';
import { storeToRefs } from 'pinia';

const useDetpStore = deptStore();
const { tableData, expandedKeys } = storeToRefs(useDetpStore);

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
