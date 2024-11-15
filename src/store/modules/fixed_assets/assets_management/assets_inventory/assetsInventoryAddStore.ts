import { FormInstance } from 'element-plus';
import { defineStore } from 'pinia';
import { getDeptTree } from '@/api/sys/dept';
import { getUserList } from '@/api/sys/user';
import { save } from '@/api/fixed_assets/inventory';

export const assetsInventoryAddStore = defineStore('assetsInventoryAddStore', {
  state: () => {
    return {
      assetsInventoryAddVisible: false,
      ruleFormAddRef: ref<FormInstance>(),
      loading: false,
      deptTreeData: [],
      userData: [],
      assetsInventoryForm: {
        name: '',
        orgId: '',
        levelId: '',
        userId: '',
        status: 0, // 盘点状态  1-未开始 2-进行中 3-已完成
        description: '',
      },
    };
  },
  getters: {
    rules() {
      return {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        orgId: [{ required: true, message: '请选择组织', trigger: 'change' }],
        levelId: [{ required: true, message: '请选择级别', trigger: 'change' }],
        userId: [
          { required: true, message: '请选择盘点人', trigger: 'change' },
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' },
        ],
      };
    },
  },
  actions: {
    init() {
      this.$reset();
      this.assetsInventoryAddVisible = true;
      this.queryDeptTree();
      this.queryUserList();
    },
    close() {
      this.assetsInventoryAddVisible = false;
    },
    // 获取部门树型结构
    async queryDeptTree() {
      const data = await getDeptTree();
      this.deptTreeData = data?.data ?? [];
    },
    async queryUserList() {
      const data = await getUserList({});
      this.userData = data?.data ?? [];
    },
    submit(formRef, emits) {
      if (!formRef) return;
      formRef.validate(async (valid: any, fields: any) => {
        if (valid) {
          try {
            this.loading = true;
            const res = await save(this.assetsInventoryForm);
            if (res) {
              this.assetsInventoryAddVisible = false;
              emits('query-data');
            }
          } finally {
            this.loading = false;
          }
        } else {
          console.log('error submit!', fields);
        }
      });
    },
  },
});
