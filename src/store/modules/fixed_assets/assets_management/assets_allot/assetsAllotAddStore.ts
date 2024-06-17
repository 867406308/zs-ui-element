import { defineStore } from 'pinia';
import { getUserList } from '@/api/sys/user';
import { getDeptTree } from '@/api/sys/dept';

export const assetsAllotAddStore = defineStore('assetsAllotAddStore', {
  state: () => {
    return {
      assetsAllotAddVisible: false,
      ruleFormAddRef: ref<FormInstance>(),
      assetsInfoSelectedRef: ref<HTMLFormElement | null>(null),
      assetsAllotAddForm: {
        // 管理部门
        manageOrgId: '',
        // 管理人
        manageUserId: '',
        // 使用部门
        useOrgId: '',
        // 使用人
        useUserId: '',
      },
      manageUserList: [] as any[],
      useUserList: [] as any[],
      deptTreeData: [],
      assetsInfoData: [] as any[],
      total: 0,
      submitLoading: false,
    };
  },
  actions: {
    init() {
      // 初始化
      this.assetsAllotAddVisible = true;
      this.queryDeptTree();
    },
    close() {
      // 关闭弹窗
      this.assetsAllotAddVisible = false;
    },
    // 获取部门树型结构
    async queryDeptTree() {
      const data = await getDeptTree();
      this.deptTreeData = data?.data ?? [];
    },
    // 管理部门change
    async changeManageOrg(row: any) {
      const data = await getUserList({ sysDeptId: row });
      this.manageUserList = data?.data ?? [];
      this.assetsAllotAddForm.manageUserId = '';
    },
    // 使用部门change
    async changeUseOrg(row: any) {
      const data = await getUserList({ sysDeptId: row });
      this.useUserList = data?.data ?? [];
      this.assetsAllotAddForm.useUserId = '';
    },
    // 打开资产选择框
    openAssetsInfoSelect() {
      console.log('打开资产选择框');
      if (this.assetsInfoSelectedRef) {
        this.assetsInfoSelectedRef.init();
      }
    },
    handleRemoveSelected(index: number, row: any) {
      this.assetsInfoData.splice(index, 1);
      this.total = this.assetsInfoData.length;
    },
    // 提交
    handleSubmit(formRef, emits) {
      if (!formRef) return;
      formRef.validate(async (valid: any, fields: any) => {
        if (valid) {
          try {
            this.submitLoading = true;
            const res = await add(this.assetsAllotAddForm);
            if (res) {
              this.assetsAllotAddVisible = false;
              emits('query-data');
            }
          } finally {
            this.submitLoading = false;
          }
        } else {
          console.log('error submit!', fields);
        }
      });
    },
  },
});
