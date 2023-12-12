import { defineStore } from 'pinia';
import { getDeptTree, getById, save, edit } from '@/api/sys/dept';

export const deptAddOrEditStore = defineStore('deptAddOrEdit', {
  state: () => ({
    dialogFormVisible: false,
    formRef: ref<FormInstance>(),
    deptHeadRef: ref<HTMLInputElement | null>(null),
    treeData: [],
    form: {
      sysDeptId: '',
      pid: '',
      deptName: '',
      sysUserId: '',
      status: 1,
      remark: '',
      sort: 0,
    },
    deptHeadName: '',
  }),
  getters: {
    rules() {
      return {
        pid: [{ required: true, message: '请选择父级菜单', trigger: 'change' }],
        deptName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
        ],
      };
    },
  },
  actions: {
    init() {
      this.dialogFormVisible = true;
      nextTick(async () => {
        await this.getTree();
        if (this.form.sysDeptId) {
          await this.getInfoById();
        }
      });
    },
    async getInfoById() {
      const data = await getById(this.form.sysDeptId);
      Object.assign(this.form, data?.data);
      this.deptHeadName = data?.data?.deptHeadName;
    },
    async getTree() {
      const data = await getDeptTree();
      this.treeData = [
        {
          sysDeptId: '0',
          deptName: '主类目',
          pid: 0,
          children: data?.data ?? [],
        },
      ];
    },
    close() {
      this.formRef.resetFields();
      this.dialogFormVisible = false;
    },
    submit(formRef, emits) {
      if (!formRef) return;
      formRef.validate(async (valid: any, fields: any) => {
        if (valid) {
          if (!this.form.sysDeptId) {
            console.log('确定!');
            await save(this.form);
          } else {
            console.log('修改!');
            await edit(this.form);
          }
          this.dialogFormVisible = false;
          emits('query-data');
        } else {
          console.log('error submit!', fields);
        }
      });
    },
    handleOnClick(row: any) {
      console.log('aaa', row);
      this.form.sysUserId = row.sysUserId;
      this.deptHeadName = row.realName;
      if (this.deptHeadRef) {
        this.form.realName = '';
        this.deptHeadRef.blur();
      }
    },
  },
});
