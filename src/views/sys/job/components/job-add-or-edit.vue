<template>
  <el-drawer
    v-model="dialogFormVisible"
    :title="!form.sysJobId ? '新增任务' : '修改任务'"
    :close-on-click-modal="false"
    size="40%"
  >
    <el-form
      :model="form"
      :rules="useJobAddOrEditStore.rules"
      ref="formRef"
      label-width="auto"
    >
      <el-form-item label="任务类名" prop="jobClass">
        <el-input
          v-model="form.jobClass"
          placeholder="请输入任务类名,如：com.zs.quartz.job.QuartzTestJob"
        />
      </el-form-item>
      <el-form-item label="任务名称" prop="jobName">
        <el-input v-model="form.jobName" placeholder="请输入任务名称" />
      </el-form-item>
      <el-form-item label="任务分组" prop="jobGroup">
        <el-select v-model="form.jobGroup" placeholder="请选择">
          <el-option
            v-for="item in jobGroupOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="cron表达式" prop="cronExpression">
        <el-input
          v-model="form.cronExpression"
          placeholder="请输入cron表达式"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="form.remark"
          placeholder="请输入备注"
          show-word-limit
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button
        type="primary"
        @click="useJobAddOrEditStore.submitForm(formRef, emits)"
      >
        提交
      </el-button>
      <el-button @click="useJobAddOrEditStore.cancel">取消</el-button>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
import { jobAddOrEditStore } from '@/store/modules/sys/job/jobAddOrEditStore';
import { storeToRefs } from 'pinia';

const useJobAddOrEditStore = jobAddOrEditStore();
const { dialogFormVisible, form, formRef } = storeToRefs(useJobAddOrEditStore);

const jobGroupOptions = [
  { label: '默认', value: 'DEFAULT' },
  { label: '系统', value: 'SYSTEM' },
];

const emits = defineEmits(['query-data']);
defineExpose({
  init: useJobAddOrEditStore.init,
  form,
});
</script>
