import { defineStore } from 'pinia';
import { getClassifyGbTree, remove } from '@/api/fixed_assets/classifyGb';
export const assetsClassifyGbStore = defineStore('assetsClassifyGb', {
  state: () => {
    return {
      addEditRef: ref<HTMLFormElement | null>(null),
      ruleFormRef: ref<FormInstance>(),
      tableData: [],
      refreshTable: true,
      expand: false,
      loading: true,
      form: {
        id: '',
        name: '',
        code: '',
      },
    };
  },
  actions: {
    async queryData() {
      this.loading = true;
      const data = await getClassifyGbTree(this.form);
      this.tableData = data?.data ?? [];
      this.loading = false;
    },
    handleAddOrEdit(row: any) {
      if (this.addEditRef) {
        this.addEditRef.form.id = row.id;
        this.addEditRef.init();
      }
    },
    handleDelete(row: any) {
      if (row.id) {
        ElMessageBox.confirm('您将进行删除操作,是否继续?', '温馨提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            await remove(row.id);
            queryData();
          })
          .catch(() => {});
      }
    },
    resetForm(formEl: FormInstance | undefined) {
      if (!formEl) return;
      formEl.resetFields();
      this.queryData();
    },
    toggleExpand() {
      this.refreshTable = false;
      this.expand = !this.expand;
      nextTick(() => {
        this.refreshTable = true;
      });
    },
  },
});
