<template>
  <div class="schedule-container">
    <el-container>
      <el-header>
        <el-form :model="form" :inline="true" ref="jobFormRef">
          <el-form-item label="任务名称" prop="jobName">
            <el-input v-model="form.jobName" placeholder="请输入任务名称" />
          </el-form-item>
          <el-form-item label="任务分组" prop="jobGroup">
            <el-select
              v-model="form.jobGroup"
              placeholder="请选择任务分组"
              style="width: 200px"
              clearable
            >
              <el-option label="全部" value="" />
              <el-option label="启用" :value="1" />
              <el-option label="暂停" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="任务状态" prop="status">
            <el-select
              v-model="form.status"
              placeholder="请选择任务状态"
              style="width: 200px"
              clearable
            >
              <el-option label="全部" value="" />
              <el-option label="启用" :value="1" />
              <el-option label="暂停" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="useJobStore.queryData()">
              查询
            </el-button>
            <el-button @click="useJobStore.resetForm(jobFormRef)">
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
              @click="useJobStore.handleAddOrEdit"
              v-permission="'sys:job:save'"
              :icon="Plus"
            >
              新增任务
            </el-button>
          </template>
        </ZsToolbar>
        <el-table
          class="table-style"
          :data="jobList"
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
            prop="jobClass"
            label="任务类名"
            width="300"
          />
          <el-table-column
            align="center"
            prop="jobName"
            label="任务名称"
            width="150"
          />
          <el-table-column
            align="center"
            prop="jobGroup"
            label="任务分组"
            width="120"
          />
          <el-table-column
            align="center"
            prop="cronExpression"
            label="cron表达式"
            width="200"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            prop="status"
            label="任务状态"
            width="120"
          >
            <template #default="scope">
              <el-tag v-if="scope.row.status === 1" type="primary">启用</el-tag>
              <el-tag v-if="scope.row.status === 0" type="warning">
                暂停
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="remark"
            label="备注"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            prop="createTime"
            label="创建时间"
            width="200"
          />
          <el-table-column align="center" label="操作" width="340">
            <template #default="scope">
              <el-button
                link
                type="primary"
                @click="useJobStore.handleAddOrEdit(scope.row)"
                v-permission="'sys:job:update'"
              >
                编辑
              </el-button>
              <el-divider direction="vertical" />
              <el-button
                link
                type="primary"
                @click="useJobStore.handleClick(scope.row)"
                :v-permission="
                  scope.row.status === 0 ? 'sys:job:pause' : 'sys:job:resume'
                "
              >
                {{ scope.row.status === 1 ? '暂停' : '恢复' }}
              </el-button>
              <el-divider direction="vertical" />
              <el-button
                link
                type="primary"
                @click="useJobStore.handleRun(scope.row)"
                v-permission="'sys:job:run'"
              >
                执行一次
              </el-button>
              <el-divider direction="vertical" />
              <el-button
                link
                type="primary"
                @click="useJobStore.handleLog(scope.row)"
              >
                执行日志
              </el-button>
              <el-divider direction="vertical" />
              <el-button
                link
                type="danger"
                @click="useJobStore.handleDel(scope.row)"
                v-permission="'sys:job:delete'"
              >
                删除
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
          :hide-on-single-page="true"
          background
          :current-page="form.page"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="form.size"
          :total="total"
          @current-change="useJobStore.handleCurrentChange"
          @size-change="useJobStore.handleSizeChange"
        />
      </el-footer>
    </el-container>
    <job-add-or-edit ref="addEditRef" @query-data="useJobStore.queryData" />
    <job-log ref="logRef" @query-data="useJobStore.queryData" />
  </div>
</template>
<script lang="ts" setup>
import {
  Grid,
  FullScreen,
  Search,
  ArrowDown,
  Plus,
  Delete,
} from '@element-plus/icons-vue';
import JobAddOrEdit from './components/job-add-or-edit.vue';
import JobLog from './components/job-log.vue';
import { jobStore } from '@/store/modules/sys/job/jobStore';
import { storeToRefs } from 'pinia';
const useJobStore = jobStore();
const { jobList, total, form, loading, jobFormRef, addEditRef, logRef } =
  storeToRefs(useJobStore);

onMounted(() => {
  useJobStore.queryData();
});
</script>
