<template>
  <div class="log-error-container">
    <el-container>
      <el-header>
        <el-form :model="form" :inline="true" ref="errorFormRef">
          <el-form-item label="登录用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入操作用户名" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="useErrorLogStore.queryData()">
              查询
            </el-button>
            <el-button @click="useErrorLogStore.resetForm(errorFormRef)">
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
              @click="useErrorLogStore.handleExport()"
              v-permission="'sys:logerror:export'"
            >
              <template #icon>
                <ZsIcon icon="download-2" />
              </template>
              <template #default> 导出日志 </template>
            </el-button>
          </template>
        </ZsToolbar>
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
            label="所属模块"
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
            show-overflow-tooltip
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
            label="请求IP地址"
            width="150"
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
          layout="total, sizes, prev, pager, next, jumper"
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
<style lang="scss" scoped></style>
