<template>
  <el-aside>
    <el-space>
      <el-input
        v-model="form.dictName"
        placeholder="请输入关键字进行过滤"
        @keyup.enter="useDictTypeStore.dictTypeList"
        @input="useDictTypeStore.dictTypeList"
      >
        <template #append>
          <el-button :icon="Search" @click="useDictTypeStore.dictTypeList" />
        </template>
      </el-input>
      <el-button text bg @click="useDictTypeStore.handleAddOrEdit()">
        <template #icon>
          <zsIcon icon="add" />
        </template>
      </el-button>
    </el-space>
    <ZsGap height="20" />
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
              <el-text
                type="primary"
                @click="useDictTypeStore.handleAddOrEdit(data)"
              >
                编辑
              </el-text>
              <el-text
                style="margin-left: 8px"
                type="danger"
                @click="useDictTypeStore.handleDelete(data)"
              >
                删除
              </el-text>
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
import { Search } from '@element-plus/icons-vue';
import DictTypeAddOrEdit from './dict-type-add-or-edit.vue';
import { storeToRefs } from 'pinia';
import { dictTypeStore } from '@/store/modules/sys/dict/dictTypeStore';
const defaultProps = {
  children: 'children',
  label: 'dictName',
  value: 'sysDictTypeId',
};
const useDictTypeStore = dictTypeStore();
const { dictTypeTreeData, addEditRef, expandedKeys, form } =
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
