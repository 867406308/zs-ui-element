import { defineStore } from 'pinia';
import {
  userPage,
  resetPassword,
  exportExcel,
  del,
  batchDel,
  edit,
} from '@/api/sys/user.ts';
import { getDeptTree } from '@/api/sys/dept.ts';
import download from '@/utils/fileDownload';
import { sm4Decrypt, sm4Encrypt } from '@/utils/cryptoUtils';

export const userStore = defineStore('sysuser', {
  state: () => ({
    addEditRef: ref<HTMLFormElement | null>(null),
    ruleFormRef: ref<FormInstance>(),
    expandedKeys: [],
    tableData: [],
    deptTreeData: [],
    loading: false,
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
    },
    resetPasswordVisible: false,
    passwordFormRef: ref<FormInstance>(),
    passwordForm: {
      sysUserId: '',
      password: '',
      confirmPassword: '',
    },
    multipleSelection: [],
  }),
  getters: {
    passwordRules() {
      return {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@#!%^*?&+-])[A-Za-z\d$@#!%^*?&+-]{8,}/,
            message: '密码应当至少8位且含有数字、大小写字母及特殊字符',
          },
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          {
            validator: (rule: any, value: string, callback: any) => {
              if (value && value !== this.passwordForm.password) {
                callback('两次输入密码不一致!');
              } else {
                callback();
              }
            },
          },
          {
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@#!%^*?&+-])[A-Za-z\d$@#!%^*?&+-]{8,}/,
            message: '密码应当至少8位且含有数字、大小写字母及特殊字符',
            trigger: 'blur',
          },
        ],
      };
    },
  },
  actions: {
    async queryData() {
      this.loading = true;
      const data = await userPage(this.form);
      const decryptData = sm4Decrypt(data?.data);
      this.tableData = decryptData?.list ?? [];
      this.total = decryptData?.total;
      this.loading = false;
    },
    reset() {
      this.$reset();
      this.queryData();
    },
    handleSizeChange(val: number) {
      this.form.size = val;
      this.queryData();
    },
    handleCurrentChange(val: number) {
      this.form.page = val;
      this.queryData();
    },

    // 删除
    handleDelete(row: any) {
      if (row.sysUserId) {
        ElMessageBox.confirm('您将进行删除操作,是否继续?', '温馨提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            await del(row.sysUserId);
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
          const ids = this.multipleSelection.map((item: any) => item.sysUserId);
          await batchDel(ids);
          this.queryData();
        })
        .catch(() => {});
    },
    handleAddOrEdit(type: string, row: any) {
      if (this.addEditRef) {
        this.addEditRef.form.sysUserId = row?.sysUserId;
        this.addEditRef.init();
        this.addEditRef.changeTitle(type);
      }
    },
    // 重置表单
    resetForm(formEl: FormInstance | undefined) {
      if (!formEl) return;
      formEl.resetFields();
      this.queryData();
    },
    // 获取部门树
    async getDeptList() {
      const data = await getDeptTree();
      const treeData = data?.data ?? [];
      treeData.forEach((element: any) => {
        this.expandedKeys.push(element.sysDeptId);
      });
      Object.assign(this.deptTreeData, treeData);
    },
    // 树节点点击
    handleNodeClick(data: any) {
      this.form.sysDeptId = data.sysDeptId;
      this.queryData();
    },
    // 重置密码
    handleResetPassword(row: any) {
      this.resetPasswordVisible = true;
      this.passwordForm.sysUserId = row.sysUserId;
    },
    // 确认重置密码
    resetPassword() {
      if (!this.passwordFormRef) return;
      this.passwordFormRef.validate(async (valid: boolean) => {
        if (valid) {
          // 提交数据
          await resetPassword(this.passwordForm);
          this.resetPasswordVisible = false;
          this.passwordFormRef.resetFields();
        }
      });
    },
    // 取消
    resetPasswordCancel() {
      this.resetPasswordVisible = false;
      this.passwordFormRef.resetFields();
    },
    // 导出
    async handleExport() {
      const excelName = '用户信息';
      const data = await exportExcel({
        excelName: excelName,
      });
      download.excel(data, excelName + '.xlsx');
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
        this.form.orderField = 'username';
      }
      this.queryData();
    },
    // 状态切换
    async handleStatusChange(row: any) {
      await edit(
        sm4Encrypt({
          sysUserId: row.sysUserId,
          status: row.status,
        }),
      );
      this.queryData();
    },
  },
});
