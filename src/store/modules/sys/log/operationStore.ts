import { defineStore } from 'pinia';
import { logOperationPage, exportExcel } from '@/api/sys/logOperation';
import download from '@/utils/fileDownload';

export const operationStore = defineStore('operation', {
  state: () => {
    return {
      operationFormRef: ref<FormInstance>(),
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
      const data = await logOperationPage(this.form);
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
      const excelName = '操作日志';
      const data = await exportExcel({
        excelName: excelName,
      });
      download.excel(data, excelName + '.xlsx');
    },
  },
});
