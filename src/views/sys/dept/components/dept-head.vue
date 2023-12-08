<template>
  <div class="dept-head">
    <el-form>
      <el-form-item prop="realName">
        <el-input
          v-model="form.realName"
          placeholder="请输入姓名"
          @clear="useUserStore.resetForm(ruleFormRef)"
        >
          <template #append>
            <el-button :icon="Search" @click="useUserStore.queryData()" />
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      @row-click="handleClick"
      style="margin-bottom: 18px"
    >
      <el-table-column prop="realName" label="姓名" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="phone" label="手机号" />
    </el-table>
    <el-pagination
      small
      background
      :currentPage="form.page"
      layout="total,  prev, pager, next"
      :page-size="10"
      :total="total"
      @current-change="useUserStore.handleCurrentChange"
      @size-change="useUserStore.handleSizeChange"
    />
  </div>
</template>
<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { userStore } from '@/store/modules/sys/user/userStore';
import { storeToRefs } from 'pinia';
const useUserStore = userStore();
const { form, total, ruleFormRef, tableData } = storeToRefs(useUserStore);

const emits = defineEmits(['onClick']);
const handleClick = (row: any) => {
  emits('onClick', row);
};

onMounted(() => {
  useUserStore.queryData();
});
</script>
<style scoped lang="scss">
.dept-head {
  padding: 10px;

  :deep() {
    .zs-button {
      background-color: #409eff;
      color: #fff;
      border-color: #409eff;
      border-radius: 0;
    }

    .zs-button:hover {
      background-color: #409eff;
      color: #fff;
      border-color: #409eff;
      border-radius: 0;
    }
  }
}
</style>
