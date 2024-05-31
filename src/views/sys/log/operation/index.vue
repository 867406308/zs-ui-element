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
                      @click="useOperationStore.queryData"
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
            prop="operationDescription"
            label="操作描述"
            width="150"
          />
          <el-table-column
            align="center"
            prop="operationType"
            label="操作类型"
            width="100"
          />
          <el-table-column
            align="center"
            prop="username"
            label="操作用户名"
            width="120"
          />
          <el-table-column
            align="center"
            prop="requestPath"
            label="请求接口"
            width="200"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            prop="requestMethod"
            label="请求方式"
            width="100"
          />
          <el-table-column
            align="center"
            prop="operationDuration"
            label="请求时长(ms)"
            width="120"
          />
          <el-table-column
            align="center"
            prop="requestParams"
            label="请求参数"
            width="150"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            prop="responseStatusCode"
            label="请求结果"
            width="100"
          />
          <el-table-column
            align="center"
            prop="responseMessage"
            label="请求结果描述"
            width="150"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            prop="ipAddress"
            label="IP地址"
            width="150"
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
          @current-change="useOperationStore.handleCurrentChange"
          @size-change="useOperationStore.handleSizeChange"
        />
      </el-footer>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { operationStore } from '@/store/modules/sys/log/operationStore';
const useOperationStore = operationStore();
const { operationFormRef, tableData, total, form, loading } =
  storeToRefs(useOperationStore);

onMounted(() => {
  useOperationStore.queryData();
});
</script>
<style lang="scss" scoped>
.form-right {
  display: flex;
  justify-content: end;
}
</style>
