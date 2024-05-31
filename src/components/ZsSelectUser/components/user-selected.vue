<template>
  <div class="user-selected">
    <div class="user-selected-header">
      <el-text>已选用户: </el-text>
      <el-button
        size="small"
        type="danger"
        circle
        link
        @click="useUserSelectStore.removeAllSelectedUser"
        >清空所选</el-button
      >
    </div>
    <el-scrollbar :noresize="true" height="427">
      <div
        v-for="(item, index) in selectedData"
        :key="index"
        class="scrollbar-demo-item"
      >
        <div>
          {{ item.realName }}
        </div>
        <el-button
          size="small"
          type="danger"
          :icon="Delete"
          circle
          link
          @click="useUserSelectStore.removeSelectedUser(item)"
        />
      </div>
    </el-scrollbar>
    <div class="user-selected-footer">
      {{ '共' + selectedData.length + '条' }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Delete } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { userSelectStore } from '@/store/modules/sys/user/userSelectStore';
const useUserSelectStore = userSelectStore();
const { tableData, total, form, formRef, selectedData } =
  storeToRefs(useUserSelectStore);
</script>
<style lang="scss" scoped>
.user-selected {
  border: 1px solid #ebeef5;
  .user-selected-header {
    height: 35px;
    border-bottom: 1px solid #ebeef5;
    display: flex;
    justify-content: space-between;
    padding: 0 15px 0 10px;
  }
  .scrollbar-demo-item {
    display: flex;
    justify-content: space-between;
    padding: 0 15px 0 10px;
  }
  .user-selected-footer {
    height: 35px;
    padding: 0 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-top: 1px solid #ebeef5;
  }
}
</style>
