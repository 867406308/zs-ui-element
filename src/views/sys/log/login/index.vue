<template>
  <div class="log-container">
    <el-container>
      <el-header>
        <el-form :model="form" :inline="true" ref="loginFormRef">
          <el-form-item label="登录用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入登录用户名" />
          </el-form-item>
          <el-form-item label="登录IP" prop="ipAddress">
            <el-input v-model="form.ipAddress" placeholder="请输入登录ip" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="useLoginLogStore.queryData()">
              查询
            </el-button>
            <el-button @click="useLoginLogStore.resetForm(loginFormRef)">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <ZsToolbar>
          <template #left>
            <el-button
              type="primary"
              @click="useLoginLogStore.handleExport()"
              v-permission="'sys:loglogin:export'"
            >
              <template #icon>
                <ZsIcon icon="download-2" />
              </template>
              <template #default> 导出日志 </template>
            </el-button>
          </template>
        </ZsToolbar>
        <el-table :data="tableData" border v-loading="loading">
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="55"
          />
          <el-table-column
            align="center"
            prop="username"
            label="登录用户名"
            width="120"
          />
          <el-table-column
            align="center"
            prop="loginTime"
            label="登录时间"
            width="180"
          />
          <el-table-column
            align="center"
            prop="ipAddress"
            label="登录IP地址"
            width="150"
          />
          <el-table-column align="center" prop="city" label="登录地址" />
          <el-table-column align="center" prop="loginMethod" label="登录方式">
            <template #default="scope">
              <span v-if="scope.row.loginMethod == 1">用户密码登录</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="loginStatus" label="登录状态">
            <template #default="scope">
              <el-tag
                v-if="scope.row.loginStatus == 1"
                type="success"
                effect="plain"
                >成功</el-tag
              >
              <el-tag
                v-if="scope.row.loginStatus == 2"
                type="danger"
                effect="plain"
                >失败</el-tag
              >
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="userAgent"
            label="代理"
            show-overflow-tooltip
          /> -->
          <el-table-column
            align="center"
            prop="os"
            label="操作系统"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            prop="browser"
            label="浏览器"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            prop="failureReason"
            label="登录失败原因"
            show-overflow-tooltip
          >
            <template #default="scope">
              <span v-if="scope.row.loginStatus == 1">——</span>
              <span v-if="scope.row.loginStatus == 2">{{
                scope.row.failureReason ?? ''
              }}</span>
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
          :current-page="form.page"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="form.size"
          :total="total"
          @current-change="useLoginLogStore.handleCurrentChange"
          @size-change="useLoginLogStore.handleSizeChange"
        />
      </el-footer>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { loginLogStore } from '@/store/modules/sys/log/loginLogStore';
const useLoginLogStore = loginLogStore();
const { loginFormRef, tableData, total, form, loading } =
  storeToRefs(useLoginLogStore);

onMounted(() => {
  useLoginLogStore.queryData();
});
</script>
<style lang="scss" scoped></style>
