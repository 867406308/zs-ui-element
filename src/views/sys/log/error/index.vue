<template>
  <div class="log-error-container">
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
                  placeholder="请输入操作用户名"
                  class="input-with-select"
                >
                  <template #append>
                    <el-button
                      :icon="Search"
                      @click="useErrorLogStore.queryData"
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
          row-key="id"
          border
          v-loading="loading"
        >
          <el-table-column
            fixed
            align="center"
            label="序号"
            type="index"
            width="55"
          />
          <el-table-column
            align="center"
            prop="module"
            label="模块"
            width="150"
          />
          <el-table-column
            align="center"
            prop="username"
            label="登录用户名"
            width="120"
          />
          <el-table-column
            align="center"
            prop="requestPath"
            label="请求接口"
            width="200"
          />
          <el-table-column
            align="center"
            prop="requestMethod"
            label="请求方式"
            width="120"
          />
          <el-table-column
            align="center"
            prop="requestParams"
            label="请求参数"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            prop="ipAddress"
            label="IP地址"
            width="120"
          />
          <el-table-column
            align="center"
            prop="exceptionType"
            label="错误类型"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            prop="exceptionMessage"
            label="错误详情"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            prop="createTime"
            label="请求时间"
            width="200"
          />
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
          background
          :current-page="form.page"
          layout="total, sizes, prev, pager, next"
          :page-size="form.size"
          :total="total"
          @current-change="useErrorLogStore.handleCurrentChange"
          @size-change="useErrorLogStore.handleSizeChange"
        />
      </el-footer>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { errorLogStore } from '@/store/modules/sys/log/errorLogStore';
const useErrorLogStore = errorLogStore();
const { errorFormRef, tableData, total, form, loading } =
  storeToRefs(useErrorLogStore);

onMounted(() => {
  useErrorLogStore.queryData();
});
</script>
<style lang="scss" scoped>
.form-right {
  display: flex;
  justify-content: end;
}
</style>
