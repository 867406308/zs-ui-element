import { defineStore } from 'pinia';
import { dictDataPage, getDictTypeList, dictDataDelete } from '@/api/sys/dict';

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
        status: 1,
        page: 1,
        size: 20,
      },
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
    resetForm(formEl: FormInstance | undefined) {
      if (!formEl) return;
      formEl.resetFields();
      this.queryData();
    },
  },
});
