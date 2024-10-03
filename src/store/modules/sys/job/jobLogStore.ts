import { defineStore } from 'pinia';
import { logPage } from '@/api/sys/job';
import { page } from '@/api/fixed_assets/allot';

export const jobLogStore = defineStore('jobLog', {
  state: () => ({
    dialogFormVisible: false,
    jobLogFormRef: ref<FormInstance>(),
    addEditRef: ref<HTMLFormElement | null>(null),
    jobLogList: [],
    loading: false,
    total: 0,
    form: {
      sysJobId: '',
      jobName: '',
      jobGroup: '',
      status: '',
      page: 1,
      size: 20,
    },
  }),
  getters: {},
  actions: {
    init() {
      this.dialogFormVisible = true;
      nextTick(async () => {
        if (this.form.sysJobId) {
          await this.pageLogList();
        }
      });
    },
    async pageLogList() {
      this.loading = true;
      const data = await logPage(this.form);
      this.jobLogList = data?.data?.list ?? [];
      this.total = data?.data?.total;
      this.loading = false;
    },
    handleSizeChange(val: number) {
      this.form.size = val;
      this.pageLogList();
    },
    handleCurrentChange(val: number) {
      this.form.page = val;
      this.pageLogList();
    },
    close() {
      this.$reset();
      this.dialogFormVisible = false;
    },
  },
});
