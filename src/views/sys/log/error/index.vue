<template>
  <div class="log-error-container">
    <el-container>
      <el-header>
        <el-form
          ref="errorFormRef"
          :inline="true"
          :model="form"
          class="demo-form-inline"
        >
          <el-form-item label="日志名称" prop="roleName">
            <el-input placeholder="请输入角色名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="useErrorStore.queryData()"
              >查询</el-button
            >
            <el-button @click="useErrorStore.resetForm(errorFormRef)"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <div class="table-body-header">
          <div>
            <el-button type="primary">导出</el-button>
          </div>
        </div>
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
          @current-change="useErrorStore.handleCurrentChange"
          @size-change="useErrorStore.handleSizeChange"
        />
      </el-footer>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { errorStore } from '@/store/modules/sys/log/errorStore';
const useErrorStore = errorStore();
const { errorFormRef, tableData, total, form, loading } =
  storeToRefs(useErrorStore);

onMounted(() => {
  useErrorStore.queryData();
});
</script>
<style lang="scss" scoped>
.table-style {
  height: calc(#{$app-main-height} - 150px);

  .status {
    display: flex;
    align-items: center;
    > span:first-child {
      margin-right: 10px;
      display: flex;
      width: 10px;
      height: 10px;
      background-color: #67c23a;
      border-radius: 50%;
    }
  }
}
</style>
