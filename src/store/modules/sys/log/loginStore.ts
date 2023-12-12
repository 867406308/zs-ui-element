import { defineStore } from 'pinia';
import { logLoginPage } from '@/api/sys/log';

export const loginStore = defineStore('login', {
  state: () => {
    return {
      loginFormRef: ref<FormInstance>(),
      tableData: [],
      loading: false,
      total: 0,
      form: {
        page: 1,
        size: 20,
        order: 'desc',
        orderField: 'login_time',
      },
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
  },
});