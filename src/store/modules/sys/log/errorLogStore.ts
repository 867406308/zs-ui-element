import { defineStore } from 'pinia';
import { logErrorPage, exportExcel } from '@/api/sys/logError';
import download from '@/utils/fileDownload';

export const errorLogStore = defineStore('errorLog', {
  state: () => {
    return {
      errorFormRef: ref<FormInstance>(),
      tableData: [],
      loading: false,
      total: 0,
      form: {
        username: '',
        page: 1,
        size: 20,
        order: 'desc',
        orderField: 'create_time',
      },
    };
  },
  actions: {
    async queryData() {
      this.loading = true;
      const data = await logErrorPage(this.form);
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
    // 导出
    async handleExport() {
      const excelName = '异常日志';
      const data = await exportExcel({
        excelName: excelName,
      });
      download.excel(data, excelName + '.xlsx');
    },
  },
});
