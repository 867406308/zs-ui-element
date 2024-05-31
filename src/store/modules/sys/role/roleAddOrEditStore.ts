import { defineStore } from 'pinia';
import { getById, save, edit } from '@/api/sys/role';
import { getList } from '@/api/sys/menu';

export const roleAddOrEditStore = defineStore('roleAddOrEdit', {
  state: () => {
    return {
      dialogFormVisible: false,
      treeRef: ref<HTMLFormElement | null>(null),
      formRef: ref<FormInstance>(),
      menuData: [],
      form: {
        sysRoleId: '',
        roleName: '',
        sort: 0,
        status: 1,
        remark: '',
        menuList: [],
      },
    };
  },
  getters: {
    rules() {
      return {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
        sort: [{ required: true, message: '请选择排序', trigger: 'blur' }],
      };
    },
  },
  actions: {
    init() {
      this.dialogFormVisible = true;
      if (this.form.sysRoleId) {
        nextTick(async () => {
          await this.getInfoById();
        });
      }
    },
    async getInfoById() {
      const data = await getById(this.form.sysRoleId);
      Object.assign(this.form, data?.data);
      this.treeRef.setCheckedKeys(this.form.menuList ?? [], false);
    },
    async getMenuTree() {
      const data = await getList();
      this.menuData = data?.data ?? [];
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
  },
});
