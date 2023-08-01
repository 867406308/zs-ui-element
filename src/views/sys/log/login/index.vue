<template>
  <div class="log-container">
    <el-container>
      <el-header>
        <el-form ref="ruleFormRef" :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="日志名称" prop="roleName">
            <el-input placeholder="请输入角色名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryData()">查询</el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <el-row justify="space-between" class="action-bar">
          <el-col :span="12">
            <el-button type="primary">导出</el-button>
            <el-button type="primary" @click="onSubmitForm">
              <template #icon>
                <ZsIcon icon="refresh" color="#fff" />
              </template>
            </el-button>
          </el-col>
        </el-row>
        <el-table class="table-style" :data="tableData" row-key="id" border v-loading="loading">
          <el-table-column align="center" label="序号" type="index" width="55" />
          <el-table-column align="center" prop="username" label="登录用户名" width="120" />
          <el-table-column align="center" prop="loginTime" label="登录时间" width="180" />
          <el-table-column align="center" prop="ipAddress" label="登录IP" width="150" />
          <el-table-column align="center" prop="city" label="登录地址" />
          <el-table-column align="center" prop="loginMethod" label="登录方式">
            <template #default="scope">
              <span v-if="scope.row.loginMethod == 1">用户密码登录</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="loginStatus" label="登录状态">
            <template #default="scope">
              <el-tag v-if="scope.row.loginStatus == 1" type="success" effect="dark">成功</el-tag>
              <el-tag v-if="scope.row.loginStatus == 2" type="danger" effect="dark">失败</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="userAgent" label="代理" show-overflow-tooltip />
          <el-table-column align="center" prop="failureReason" label="登录失败原因" show-overflow-tooltip>
            <template #default="scope">
              <span v-if="scope.row.loginStatus == 1">——</span>
              <span v-if="scope.row.loginStatus == 2">{{ scope.row.failureReason ?? '' }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="failureReason" label="登录原因" show-overflow-tooltip />
          <el-table-column prop="loginMethod" label="登录方式" show-overflow-tooltip />
          <el-table-column prop="loginSource" label="登录来源" show-overflow-tooltip />
          <el-table-column align="center" prop="os" label="操作系统" show-overflow-tooltip width="260" />
          <el-table-column align="center" prop="browser" label="浏览器" />
          <el-table-column prop="userAgent" label="代理" show-overflow-tooltip /> -->
          <template #empty>
            <ZsEmpty />
          </template>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
          background
          :current-page="form.page"
          layout="total, sizes, prev, pager, next"
          :page-size="form.size"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-footer>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { logLoginPage } from '@/api/sys/log.ts';
import type { FormInstance } from 'element-plus';
const reload: any = inject('reload');
// 刷新页面
const onSubmitForm = () => {
  reload();
};
const ruleFormRef = ref<FormInstance>();
const loading = ref(false);
const tableData = ref([]);
const total = ref(0);
const form = reactive({
  page: 1,
  size: 20,
  order: 'desc',
  orderField: 'login_time',
});
const queryData = async () => {
  loading.value = true;
  const data = await logLoginPage(form);
  tableData.value = data?.data?.list;
  total.value = data?.data?.total;
  loading.value = false;
};
const handleSizeChange = (val: number) => {
  form.size = val;
  queryData();
};
const handleCurrentChange = (val: number) => {
  form.page = val;
  queryData();
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  queryData();
};
const handleDetail = () => {};
onMounted(() => {
  queryData();
});
</script>
<style lang="scss" scoped>
.action-bar {
  padding-bottom: 10px;

  &-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
.table-style {
  height: calc(#{$app-main-height} - 160px);
}
</style>
