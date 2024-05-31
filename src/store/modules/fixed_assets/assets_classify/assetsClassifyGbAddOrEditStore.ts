import { defineStore } from 'pinia';
import {
  getClassifyGbTree,
  getById,
  save,
  edit,
} from '@/api/fixed_assets/classifyGb';

export const assetsClassifyGbAddOrEditStore = defineStore(
  'assetsClassifyGbAddOrEdit',
  {
    state: () => ({
      dialogFormVisible: false,
      formRef: ref<FormInstance>(),
      treeData: [],
      form: {
        id: '',
        pid: '',
        name: '',
        code: '',
        remark: '',
      },
    }),
    getters: {
      rules() {
        return {
          pid: [
            { required: true, message: '请选择父级菜单', trigger: 'change' },
          ],
          name: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
          ],
          code: [
            { required: true, message: '请输入分类编码', trigger: 'blur' },
          ],
        };
      },
    },
    actions: {
      init() {
        this.dialogFormVisible = true;
        nextTick(async () => {
          this.getTree();
          if (this.form.id) {
            await this.getInfoById();
          }
        });
      },
      async getInfoById() {
        const data = await getById(this.form.id);
        Object.assign(this.form, data?.data);
      },
      async getTree() {
        const data = await getClassifyGbTree();
        this.treeData = [
          {
            id: 0,
            name: '主类目',
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
            if (!this.form.id) {
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
  },
);
