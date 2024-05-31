import { defineStore } from 'pinia';
import { rolePage, del, getList } from '@/api/sys/role.ts';

export const roleStore = defineStore('role', {
  state: () => {
    return {
      ruleFormRef: ref<FormInstance>(),
      addEditRef: ref<HTMLFormElement | null>(null),
      tableData: [],
      loading: false,
      total: 0,
      form: {
        roleName: '',
        page: 1,
        size: 20,
      },
      roleList: [],
    };
  },
  actions: {
    async queryData() {
      this.loading = true;
      const data = await rolePage(this.form);
      this.tableData = data?.data?.list ?? [];
      this.total = data?.data?.total ?? 0;
      this.loading = false;
    },
    async queryList() {
      const data = await getList();
      this.roleList = data?.data ?? [];
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
        this.addEditRef.form.sysRoleId = row?.sysRoleId;
        this.addEditRef.init();
      }
    },
    handleDelete(row: any) {
      if (row.sysRoleId) {
        ElMessageBox.confirm('您将进行删除操作,是否继续?', '温馨提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            await del(row.sysRoleId);
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
  },
});
