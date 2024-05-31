import { defineStore } from 'pinia';
import { getList, getById, save, edit } from '@/api/sys/menu';
export const menuAddOrEditStore = defineStore('menuAddOrEdit', {
  state: () => {
    return {
      dialogFormVisible: false,
      formRef: null,
      popoverRef: null,
      form: {
        sysMenuId: '',
        type: 1,
        pid: '',
        name: '',
        path: '',
        title: '',
        component: '',
        icon: '',
        permissions: '',
        sort: 0,
      },
      treeData: [],
    };
  },
  getters: {
    rules() {
      return {
        pid: [{ required: true, message: '请选择父级菜单', trigger: 'change' }],
        name: [{ required: true, message: '请输入路由名', trigger: 'blur' }],
        path: [{ required: true, message: '请输入路由路径', trigger: 'blur' }],
        title: [{ required: true, message: '请输入路由名称', trigger: 'blur' }],
        component: [
          { required: true, message: '请输入vue组件路劲', trigger: 'blur' },
        ],
        icon: [{ required: true, message: '请选着图标', trigger: 'change' }],
        permissions: [
          { required: true, message: '请输入权限字符', trigger: 'blur' },
        ],
      };
    },
  },
  actions: {
    init() {
      this.dialogFormVisible = true;
      nextTick(async () => {
        await this.getTree();
        if (this.form.sysMenuId) {
          await this.getInfoById();
        }
      });
    },
    async getTree() {
      const data = await getList();
      this.treeData = [
        {
          title: '主菜单',
          sysMenuId: '0',
          children: data?.data ?? [],
        },
      ];
    },
    async getInfoById() {
      const data = await getById(this.form.sysMenuId);
      Object.assign(this.form, data?.data);
      // this.form = {
      //   ...data?.data,
      // };
    },

    click(val) {
      this.form.icon = val;
      this.popoverRef.hide();
    },
    close() {
      this.formRef.resetFields();
      this.dialogFormVisible = false;
      this.form = {
        sysMenuId: '',
        type: 1,
        name: '',
        path: '',
        title: '',
        component: '',
        icon: '',
        sort: 0,
        permissions: '',
      };
    },
    submit(formRef, emits) {
      if (!formRef) return;
      formRef.validate(async (valid, fields) => {
        if (valid) {
          if (!this.form.sysMenuId) {
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
