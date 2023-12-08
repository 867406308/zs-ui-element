import { defineStore } from 'pinia';
import { getList, del } from '@/api/sys/menu';

export const menuStore = defineStore('menu', {
  state: () => {
    return {
      addEditRef: ref<HTMLFormElement | null>(null),
      ruleFormRef: ref<FormInstance>(),
      tableData: ref([]),
      refreshTable: ref(true),
      expand: ref(false),
      loading: ref(true),
      form: {
        title: '',
      },
    };
  },
  getters: {},
  actions: {
    async queryData() {
      this.loading = true;
      const data = await getList(this.form);
      this.tableData = data?.data ?? [];
      this.loading = false;
    },
    handleAddOrEdit(row: any) {
      if (this.addEditRef) {
        this.addEditRef.form.sysMenuId = row.sysMenuId;
        this.addEditRef.init();
      }
    },
    handleDelete(row: any) {
      if (row.sysMenuId) {
        ElMessageBox.confirm('您将进行删除操作,是否继续?', '温馨提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            await del(row.sysMenuId);
            this.queryData();
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
