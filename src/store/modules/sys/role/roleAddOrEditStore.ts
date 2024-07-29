import { defineStore } from 'pinia';
import { getById, save, edit } from '@/api/sys/role';
import { getList } from '@/api/sys/menu';
import { getDeptTree } from '@/api/sys/dept';

export const roleAddOrEditStore = defineStore('roleAddOrEdit', {
  state: () => {
    return {
      dialogFormVisible: false,
      dataScopeVisible: false,
      treeRef: ref<HTMLFormElement | null>(null),
      deptRef: ref<HTMLFormElement | null>(null),
      formRef: ref<FormInstance>(),
      dataScopeFormRef: ref<FormInstance>(),
      menuData: [],
      deptTree: [] as any,
      form: {
        sysRoleId: '',
        roleName: '',
        roleCode: '',
        sort: 0,
        status: 1,
        remark: '',
        menuList: [],
        dataScope: 1,
        deptList: [],
      },
    };
  },
  getters: {
    rules() {
      return {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
        roleCode: [
          { required: true, message: '请输入角色编码', trigger: 'blur' },
        ],
        sort: [{ required: true, message: '请选择排序', trigger: 'blur' }],
      };
    },
  },
  actions: {
    init() {
      this.dialogFormVisible = true;
      this.getMenuTree();
      if (this.form.sysRoleId) {
        nextTick(async () => {
          await this.getInfoById();
        });
      }
    },
    initDataScope() {
      this.dataScopeVisible = true;
      this.getDeptList();
      if (this.form.sysRoleId) {
        nextTick(async () => {
          await this.getInfoById();
        });
      }
    },
    async getInfoById() {
      const data = await getById(this.form.sysRoleId);
      Object.assign(this.form, data?.data);
      this.treeRef?.setCheckedKeys(this.form.menuList ?? [], false);
    },
    async getMenuTree() {
      const data = await getList();
      this.menuData = data?.data ?? [];
    },
    // 部门树型
    async getDeptList() {
      const data = await getDeptTree();
      this.deptTree = data?.data ?? [];
    },
    handleCheck() {
      this.form.menuList = this.treeRef.getCheckedKeys(false);
    },
    close() {
      this.formRef.resetFields();
      this.dialogFormVisible = false;
    },
    submit(formRef, emits) {
      if (!formRef) return;
      formRef.validate(async (valid: any, fields: any) => {
        if (valid) {
          if (!this.form.sysRoleId) {
            await save(this.form);
          } else {
            await edit(this.form);
          }
          this.dialogFormVisible = false;
          emits('query-data');
        } else {
          console.log('error submit!', fields);
        }
      });
    },
    // 数据范围弹窗关闭
    closeDataScope() {
      this.dataScopeVisible = false;
    },
    // 数据范围保存
    submitDataScope(dataScopeFormRef) {
      if (!dataScopeFormRef) return;
      dataScopeFormRef.validate(async (valid: any, fields: any) => {
        if (valid) {
          await edit(this.form);
          this.dataScopeVisible = false;
        } else {
          console.log('error submit!', fields);
        }
      });
    },
  },
});
