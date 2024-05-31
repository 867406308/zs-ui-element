import { defineStore } from 'pinia';
import { userPage } from '@/api/sys/user.ts';

export const userSelectStore = defineStore('userSelectStore', {
  state: () => {
    return {
      total: 0,
      form: {
        sysDeptId: '',
        username: '',
        realName: '',
        sex: '',
        phone: '',
        page: 1,
        size: 20,
        order: 'asc',
        orderField: 'username',
        sysPostId: '',
        sysRoleId: '',
      },
      tableData: [],
      // 已选中用户列表
      selectedData: [],
    };
  },
  actions: {
    async queryData() {
      const data = await userPage(this.form);
      this.tableData = data?.data?.list ?? [];
      this.total = data?.data?.total;
    },
    handleSizeChange(val: number) {
      this.form.size = val;
      this.queryData();
    },
    handleCurrentChange(val: number) {
      this.form.page = val;
      this.queryData();
    },
    handleNodeClick(data: any) {
      this.form.sysPostId = '';
      this.form.sysRoleId = '';
      this.form.sysDeptId = data.sysDeptId;
      this.queryData();
    },
    handlePostNodeClick(data: any) {
      this.form.sysDeptId = '';
      this.form.sysRoleId = '';
      this.form.sysPostId = data.sysPostId;
      this.queryData();
    },
    handleRoleNodeClick(data: any) {
      this.form.sysDeptId = '';
      this.form.sysPostId = '';
      this.form.sysRoleId = data.sysRoleId;
      this.queryData();
    },
    resetData() {
      this.$reset();
      this.queryData();
    },
    addSelectedUser(row: any) {
      if (this.selectedData.some((item) => item.sysUserId === row.sysUserId)) {
        ElMessage({
          message: '该用户已存在,请勿重复添加！',
          type: 'warning',
          plain: true,
        });
        return;
      }
      this.selectedData.push(row);
    },
    addAllSelectedUser() {
      this.selectedData.push(...this.tableData);
    },
    removeSelectedUser(row: any) {
      this.selectedData = this.selectedData.filter(
        (item) => item.sysUserId !== row.sysUserId,
      );
    },
    removeAllSelectedUser() {
      this.selectedData = [];
    },
  },
});
