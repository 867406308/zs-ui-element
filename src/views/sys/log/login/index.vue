<template>
  <div class="log-container">
    <el-container>
      <el-main>
        <el-space :fill="true" style="width: 100%; margin-bottom: 8px">
          <el-row justify="space-between">
            <el-col :xl="12" :lg="12" :md="12" :sm="24">
              <div>
                <el-button type="primary">导出 </el-button>
              </div>
            </el-col>
            <el-col :xl="12" :lg="12" :md="12" :sm="24" class="form-right">
              <el-space>
                <el-input
                  v-model="form.username"
                  placeholder="请输入登录用户名"
                  class="input-with-select"
                >
                  <template #append>
                    <el-button
                      :icon="Search"
                      @click="useLoginLogStore.queryData"
                    />
                  </template>
                </el-input>
              </el-space>
            </el-col>
          </el-row>
        </el-space>
        <el-table
          class="table-style"
          :data="tableData"
          border
          v-loading="loading"
        >
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
            label="登录IP"
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
                effect="dark"
                >成功</el-tag
              >
              <el-tag
                v-if="scope.row.loginStatus == 2"
                type="danger"
                effect="dark"
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
<style lang="scss" scoped>
.form-right {
  display: flex;
  justify-content: end;
}
</style>
@/store/modules/sys/log/loginLogStore
