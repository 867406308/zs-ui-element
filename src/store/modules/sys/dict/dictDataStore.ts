import { defineStore } from 'pinia';
import {
  dictDataPage,
  getDictTypeList,
  dictDataDelete,
  batchDel,
  exportExcel,
} from '@/api/sys/dict';
import download from '@/utils/fileDownload';

export const dictDataStore = defineStore('dictData', {
  state: () => {
    return {
      dictDataFormRef: ref<FormInstance>(),
      addEditRef: ref<HTMLFormElement | null>(null),
      loading: false,
      tableData: [],
      total: 0,
      form: {
        sysDictTypeId: '',
        dictType: '',
        dictLabel: '',
        dictValue: '',
        status: 1,
        page: 1,
        size: 20,
      },
      multipleSelection: [],
    };
  },
  actions: {
    async queryData() {
      this.loading = true;
      const data = await dictDataPage(this.form);
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
    handleAddOrEdit(row: any) {
      if (this.addEditRef) {
        this.addEditRef.form.sysDictDataId = row?.sysDictDataId;
        this.addEditRef.init();
      }
    },
    handleDelete(row: any) {
      if (row.sysDictDataId) {
        ElMessageBox.confirm('您将进行删除操作,是否继续?', '温馨提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            await dictDataDelete(row.sysDictDataId);
            this.dictDataList();
          })
          .catch(() => {});
      }
    },
    // 选中事件
    handleSelectionChange(val: any) {
      this.multipleSelection = val;
    },
    // 批量删除
    handleBatchDelete() {
      ElMessageBox.confirm('您将进行批量删除操作,是否继续?', '温馨提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const ids = this.multipleSelection.map(
            (item: any) => item.sysDictDataId,
          );
          await batchDel(ids);
          this.queryData();
        })
        .catch(() => {});
    },
    resetForm(formEl: FormInstance | undefined) {
      if (!formEl) return;
      formEl.resetFields();
      this.queryData();
    },
    // 排序
    handleSortChange(data: { column: any; prop: string; order: any }) {
      if (data.order === 'ascending') {
        this.form.order = 'asc';
        this.form.orderField = data.prop;
      } else if (data.order === 'descending') {
        this.form.order = 'desc';
        this.form.orderField = data.prop;
      } else {
        this.form.order = 'asc';
        this.form.orderField = 'sort';
      }
      this.queryData();
    },
    // 导出
    async handleExport() {
      const excelName = '字典信息';
      const data = await exportExcel({
        excelName: excelName,
      });
      download.excel(data, excelName + '.xlsx');
    },
  },
});
