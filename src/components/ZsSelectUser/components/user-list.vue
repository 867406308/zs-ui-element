<template>
  <el-container class="user-select-center">
    <el-header>
      <el-form :inline="true">
        <el-form-item>
          <el-input
            v-model="form.realName"
            placeholder="请输入用户名"
            style="width: 240px"
            clearable
            @clear="useUserSelectStore.queryData"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="useUserSelectStore.queryData">
            搜索
          </el-button>
          <!-- <el-button @click="useUserSelectStore.resetData"
                    >重置</el-button
                  > -->
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <div class="user-select-list">
        <el-text>当前共{{ total }}条数据</el-text>
        <el-button
          size="small"
          plain
          @click="useUserSelectStore.addAllSelectedUser"
          >添加当前所有</el-button
        >
      </div>
      <el-table border :data="tableData" height="370" style="width: 100%">
        <el-table-column align="center" label="序号" type="index" width="55" />
        <el-table-column prop="username" label="账号" />
        <el-table-column prop="realName" label="姓名" />
        <el-table-column label="操作" align="center" width="90">
          <template #default="scope">
            <el-button
              size="small"
              color="#626aef"
              plain
              @click="addSelectedUser(scope.row)"
            >
              添加
            </el-button>
          </template>
        </el-table-column>
        <template #empty>
          <ZsEmpty />
        </template>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
        background
        :currentPage="form.page"
        layout="total, prev, pager, next"
        :page-size="form.size"
        :total="total"
        @current-change="useUserSelectStore.handleCurrentChange"
        @size-change="useUserSelectStore.handleSizeChange"
      />
    </el-footer>
  </el-container>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { userSelectStore } from '@/store/modules/sys/user/userSelectStore';
const useUserSelectStore = userSelectStore();
const { tableData, total, form, tableAddUserData } =
  storeToRefs(useUserSelectStore);

const props = defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
});

const addSelectedUser = (row: any) => {
  // 如果是多选模式，则直接添加用户
  if (props.multiple) {
    useUserSelectStore.addSelectedUser(row);
    return;
  }

  // 检查是否已经有用户被添加，如果有则显示警告信息
  if (tableAddUserData.value.length > 0) {
    ElMessage({
      message: '最多只能选择一个用户',
      type: 'warning',
      duration: 2000,
    });
    return;
  }

  // 单选模式并且没有其他用户被添加，则添加用户
  useUserSelectStore.addSelectedUser(row);
};

onMounted(() => {
  useUserSelectStore.queryData();
});
</script>
<style lang="scss" scoped>
.user-select-center {
  height: 100%;
  border: 1px solid #ebeef5;

  .zs-header {
    height: 30px !important;
    margin-bottom: 0px;
  }

  .user-select-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ebeef5;
    padding: 2px 10px;
  }
}
</style>
