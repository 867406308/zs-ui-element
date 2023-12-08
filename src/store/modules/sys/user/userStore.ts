import { defineStore } from 'pinia';
import { userPage, resetPassword } from '@/api/sys/user.ts';
import { getDeptTree } from '@/api/sys/dept.ts';

export const userStore = defineStore('sysuser', {
  state: () => {
    return {
      ruleFormRef: ref<FormInstance>(),
      deptRef: ref<InstanceType<typeof ElTree>>(),
      addEditRef: ref<HTMLFormElement | null>(null),
      expandedKeys: [],
      tableData: [],
      deptTreeData: [],
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
      resetPasswordRef: ref<InstanceType<typeof ElMessageBox>>(),
      resetPasswordVisible: false,
      passwordFormRef: ref<FormInstance>(),
      passwordForm: {
        sysUserId: '',
        password: '',
        confirmPassword: '',
      },
    };
  },
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
    handleAddOrEdit(row: any) {
      if (this.addEditRef) {
        this.addEditRef.form.sysUserId = row?.sysUserId;
        this.addEditRef.init();
      }
    },
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
    resetForm(formEl: FormInstance | undefined) {
      if (!formEl) return;
      formEl.resetFields();
      this.queryData();
    },
    async getDeptList() {
      const data = await getDeptTree();
      const treeData = data?.data ?? [];
      treeData.forEach((element: any) => {
        this.expandedKeys.push(element.sysDeptId as never);
      });
      Object.assign(this.deptTreeData, treeData);
    },
    handleNodeClick(data: any) {
      this.form.sysDeptId = data.sysDeptId;
      this.queryData();
    },
    handleResetPassword(row: any) {
      this.resetPasswordVisible = true;
      this.passwordForm.sysUserId = row.sysUserId;
    },
    // 重置密码
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
      console.log(this.passwordFormRef);
      console.log(this.passwordForm);
    },
    resetPasswordCancel() {
      this.resetPasswordVisible = false;
      this.passwordFormRef.resetFields();
    },
  },
});
