import { defineStore } from 'pinia';
import { getList, getById, save, edit } from '@/api/sys/post';
import { getDeptTree } from '@/api/sys/dept';

export const postAddOrEditStore = defineStore('postAddOrEdit', {
  state: () => {
    return {
      dialogFormVisible: false,
      formRef: ref<FormInstance>(),
      treeData: [],
      form: {
        sysPostId: '',
        postName: '',
        sysDeptId: '',
        sort: 0,
        status: 1,
        remark: '',
      },
    };
  },
  getters: {
    rules() {
      return {
        sysDeptId: [
          { required: true, message: '请选择所属部门', trigger: 'change' },
        ],
        postName: [
          { required: true, message: '请输入岗位名称', trigger: 'blur' },
        ],
        sort: [{ required: true, message: '请选择排序', trigger: 'blur' }],
      };
    },
  },
  actions: {
    init() {
      this.dialogFormVisible = true;
      if (this.form.sysPostId) {
        nextTick(async () => {
          await this.getInfoById();
        });
      }
    },
    async getInfoById() {
      const data = await getById(this.form.sysPostId);
      Object.assign(this.form, data?.data);
    },
    async selectDeptTree() {
      const data = await getDeptTree();
      Object.assign(this.treeData, data?.data);
    },
    close() {
      this.formRef.resetFields();
      this.dialogFormVisible = false;
    },
    submit(formRef, emits) {
      if (!formRef) return;
      formRef.validate(async (valid: any, fields: any) => {
        if (valid) {
          if (!this.form.sysPostId) {
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
