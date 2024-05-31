import { defineStore } from 'pinia';
import { logLoginPage, logLoginToday } from '@/api/sys/log';

export const loginLogStore = defineStore('loginLog', {
  state: () => {
    return {
      loginFormRef: ref<FormInstance>(),
      tableData: [],
      loading: false,
      total: 0,
      form: {
        username: '',
        page: 1,
        size: 20,
        order: 'desc',
        orderField: 'login_time',
      },
      // 今日登录日期
      todayList: [],
    };
  },
  actions: {
    async queryData() {
      this.loading = true;
      const data = await logLoginPage(this.form);
      this.tableData = data?.data?.list ?? [];
      this.total = data?.data?.total ?? 0;
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
    resetForm(formEl: FormInstance | undefined) {
      if (!formEl) return;
      formEl.resetFields();
      this.queryData();
    },
    async queryTodayList() {
      const data = await logLoginToday();
      this.todayList = data?.data ?? [];
    },
  },
});
