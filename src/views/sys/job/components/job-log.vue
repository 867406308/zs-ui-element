<template>
  <el-drawer
    v-model="dialogFormVisible"
    title="执行日志"
    @close="useJobLogStore.close"
    :close-on-click-modal="false"
    size="55%"
    :lock-scroll="true"
  >
    <ZsSection title="日志详情">
      <el-table :data="jobLogList" border v-loading="loading">
        <el-table-column
          fixed
          align="center"
          label="序号"
          type="index"
          width="55"
        />
        <el-table-column
          align="center"
          prop="jobName"
          label="任务名称"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="jobGroup"
          label="任务分组"
          width="120"
        >
          <template #default="scope">
            <span v-if="scope.row.jobGroup === 'DEFAULT'">默认</span>
            <span v-if="scope.row.jobGroup === 'SYSTEM'">系统</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="jobClass"
          label="任务类名"
          width="120"
          show-overflow-tooltip
        />
        <el-table-column align="center" prop="status" label="状态" width="80">
          <template #default="scope">
            {{ scope.row.status }}
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          prop="jobMessage"
          label="日志信息"
          width="300"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="startTime"
          label="开始执行时间"
          width="200"
        />
        <el-table-column
          align="center"
          prop="endTime"
          label="结束执行时间"
          width="200"
        />
        <el-table-column
          align="center"
          prop="duration"
          label="耗时(ms)"
          width="100"
        />
        <el-table-column
          align="center"
          prop="exceptionInfo"
          label="异常信息"
          width="100"
          show-overflow-tooltip
        />
      </el-table>
    </ZsSection>
    <template #footer>
      <el-pagination
        background
        :current-page="form.page"
        layout="total, sizes, prev, pager, next"
        :page-size="form.size"
        :total="total"
        @current-change="useJobLogStore.handleCurrentChange"
        @size-change="useJobLogStore.handleSizeChange"
      />
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { jobLogStore } from '@/store/modules/sys/job/jobLogStore';
const useJobLogStore = jobLogStore();
const { dialogFormVisible, form, jobLogList, loading, total } =
  storeToRefs(useJobLogStore);

defineExpose({
  init: useJobLogStore.init,
  form,
});
</script>
