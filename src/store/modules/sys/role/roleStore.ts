import { defineStore } from 'pinia';
import {
  rolePage,
  del,
  batchDel,
  getList,
  exportExcel,
} from '@/api/sys/role.ts';
import download from '@/utils/fileDownload';

export const roleStore = defineStore('role', {
  state: () => {
    return {
      ruleFormRef: ref<FormInstance>(),
      addEditRef: ref<HTMLFormElement | null>(null),
      dataScopeRef: ref<HTMLFormElement | null>(null),
      tableData: [],
      loading: false,
      total: 0,
      form: {
        roleName: '',
        page: 1,
        size: 20,
        order: 'asc',
        orderField: 'sort',
      },
      roleList: [],
      multipleSelection: [],
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
          const ids = this.multipleSelection.map((item: any) => item.sysRoleId);
          await batchDel(ids);
          this.queryData();
        })
        .catch(() => {});
    },
    handleDataScope(row: any) {
      if (this.dataScopeRef) {
        this.dataScopeRef.form.sysRoleId = row?.sysRoleId;
        this.dataScopeRef.initDataScope();
      }
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
      const excelName = '角色信息';
      const data = await exportExcel({
        excelName: excelName,
      });
      download.excel(data, excelName + '.xlsx');
    },
  },
});
