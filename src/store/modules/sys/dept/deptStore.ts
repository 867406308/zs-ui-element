import { defineStore } from 'pinia';
import { getDeptTree, remove } from '@/api/sys/dept.ts';

export const deptStore = defineStore('dept', {
  state: () => ({
    addEditRef: ref<HTMLFormElement | null>(null),
    ruleFormRef: ref<FormInstance>(),
    tableData: [],
    refreshTable: true,
    expand: true,
    loading: true,
    expandedKeys: [],
    form: {
      deptId: '',
      deptName: null,
    },
  }),
  actions: {
    async queryData() {
      this.loading = true;
      const data = await getDeptTree(this.form);
      this.tableData = data?.data ?? [];
      this.tableData.forEach((element: any) => {
        this.expandedKeys.push(element.sysDeptId as never);
      });
      this.loading = false;
    },
    handleAddOrEdit(row: any) {
      if (this.addEditRef) {
        this.addEditRef.form.sysDeptId = row.sysDeptId;
        this.addEditRef.init();
      }
    },
    handleDelete(row: any) {
      if (row.sysDeptId) {
        ElMessageBox.confirm('您将进行删除操作,是否继续?', '温馨提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            await remove(row.sysDeptId);
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
