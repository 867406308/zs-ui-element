import { defineStore } from 'pinia';
import { page, del, resume, pause, run } from '@/api/sys/job.ts';

export const jobStore = defineStore('job', {
  state: () => ({
    jobFormRef: ref<FormInstance>(),
    addEditRef: ref<HTMLFormElement | null>(null),
    logRef: ref<HTMLFormElement | null>(null),
    jobList: [],
    loading: false,
    total: 0,
    form: {
      jobName: '',
      jobGroup: '',
      status: '',
      page: 1,
      size: 20,
      order: 'asc',
      orderField: 'createTime',
    },
  }),
  getters: {},
  actions: {
    async queryData() {
      this.loading = true;
      const data = await page(this.form);
      this.jobList = data?.data?.list ?? [];
      this.total = data?.data?.total;
      this.loading = false;
    },
    handleSizeChange(val: number) {
      this.form.size = val;
      this.queryData();
    },
    handleCurrentChange(val: number) {
      this.form.page = val;
      this.queryData();
    },
    // 重置表单
    resetForm(formEl: FormInstance | undefined) {
      if (!formEl) return;
      formEl.resetFields();
      this.queryData();
    },

    handleAddOrEdit(row: any) {
      if (this.addEditRef) {
        this.addEditRef.form.sysJobId = row?.sysJobId;
        this.addEditRef.init();
      }
    },
    async handlePause(row: any) {
      row.status = 0;
      await pause(row);
      this.queryData();
    },
    async handleResume(row: any) {
      row.status = 1;
      await resume(row);
      this.queryData();
    },
    async handleRun(row: any) {
      await run(row);
      this.queryData();
    },
    async handleDel(row: any) {
      if (row?.sysJobId) {
        ElMessageBox.confirm('您将进行删除操作,是否继续?', '温馨提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            await del(row);
            this.queryData();
          })
          .catch(() => {});
      }
    },
    handleClick(row: any) {
      if (row.status == 1) {
        this.handlePause(row);
      } else {
        this.handleResume(row);
      }
    },
    handleLog(row: any) {
      if (this.logRef) {
        this.logRef.form.sysJobId = row?.sysJobId;
        this.logRef.init();
      }
    },
  },
});
