<template>
  <el-aside>
    <el-button
      type="primary"
      @click="useDictTypeStore.handleAddOrEdit"
      style="width: 100%; margin-bottom: 8px"
    >
      新增字典类型
    </el-button>
    <div class="custom-tree-node">
      <el-tree
        style="width: 100%"
        ref="dictTypeRef"
        :data="dictTypeTreeData"
        :props="defaultProps"
        :default-expanded-keys="expandedKeys"
        node-key="sysDictTypeId"
        :expand-on-click-node="false"
        @node-click="useDictTypeStore.handleNodeClick"
      >
        <template #default="{ node, data }">
          <div class="custom-tree-node">
            <div>{{ node.label }}</div>
            <div v-if="data.sysDictTypeId !== ''" class="operate">
              <zsIcon
                icon="edit"
                color="#409eff"
                @click="useDictTypeStore.handleAddOrEdit(data)"
              />
              <zsIcon
                style="margin-left: 8px"
                color="#F00000"
                icon="delete"
                @click="useDictTypeStore.handleDelete(data)"
              />
            </div>
          </div>
        </template>
      </el-tree>
    </div>
  </el-aside>
  <dict-type-add-or-edit
    ref="addEditRef"
    @dict-type-list="useDictTypeStore.dictTypeList()"
  />
</template>
<script lang="ts" setup>
import DictTypeAddOrEdit from './dict-type-add-or-edit.vue';
import { storeToRefs } from 'pinia';
import { dictTypeStore } from '@/store/modules/sys/dict/dictTypeStore';
const defaultProps = {
  children: 'children',
  label: 'dictName',
  value: 'sysDictTypeId',
};
const useDictTypeStore = dictTypeStore();
const { dictTypeTreeData, addEditRef, expandedKeys } =
  storeToRefs(useDictTypeStore);

onMounted(() => {
  useDictTypeStore.dictTypeList();
});
</script>
<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;

  .operate {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
