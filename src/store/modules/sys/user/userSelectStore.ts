import { defineStore } from 'pinia';
import { userPage, getUserListByIds } from '@/api/sys/user.ts';
import { sm4Decrypt } from '@/utils/cryptoUtils';

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
      // 选择用户中已选用户列表
      tableAddUserData: [],
      // 已添加的用户列表
      selectedUser: [],
    };
  },
  actions: {
    async queryData() {
      const data = await userPage(this.form);
      const decryptData = sm4Decrypt(data?.data);
      this.tableData = decryptData?.list ?? [];
      this.total = decryptData?.total;
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
      if (
        this.tableAddUserData.some((item) => item.sysUserId === row.sysUserId)
      ) {
        ElMessage({
          message: '该用户已存在,请勿重复添加！',
          type: 'warning',
          plain: true,
        });
        return;
      }
      this.tableAddUserData.push(row);
      console.log('bbb', this.tableAddUserData);
    },
    addAllSelectedUser() {
      this.tableAddUserData.push(...this.tableData);
    },
    removeSelectedUser(row: any) {
      this.tableAddUserData = this.tableAddUserData.filter(
        (item) => item.sysUserId !== row.sysUserId,
      );
    },
    removeAllSelectedUser() {
      this.tableAddUserData = [];
    },
    async initSelectedData(val: Array | String) {
      const array = val instanceof Array ? val : [val];
      const data = await getUserListByIds(array ?? []);
      this.tableAddUserData = data?.data ?? [];
      this.selectedUser = [...this.tableAddUserData];
    },
    handleRemove(val: any) {
      // 移除
      this.selectedUser.splice(val, 1);
      this.tableAddUserData.splice(val, 1);
    },
  },
});
