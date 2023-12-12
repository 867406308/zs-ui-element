import { defineStore } from 'pinia';
import { dictTypeSave, dictTypeEdit, getDictTypeById } from '@/api/sys/dict';

export const dictTypeAddOrEditStore = defineStore('dictTypeAddOrEdit', {
  state: () => {
    return {
      dialogFormVisible: false,
      formRef: ref<FormInstance>(),
      form: {
        sysDictTypeId: '',
        dictType: '',
        dictName: '',
        sort: 0,
        status: 1,
      },
    };
  },
  getters: {
    rules() {
      return {
        dictType: [
          { required: true, message: '请输入字典类型', trigger: 'blur' },
        ],
        dictName: [
          { required: true, message: '请输入字典描述', trigger: 'blur' },
        ],
      };
    },
  },
  actions: {
    init() {
      this.dialogFormVisible = true;
      if (this.form.sysDictTypeId) {
        nextTick(async () => {
          await this.getInfoById();
        });
      }
    },
    async getInfoById() {
      const data = await getDictTypeById(this.form.sysDictTypeId);
      Object.assign(this.form, data?.data);
    },
    close() {
      this.formRef.resetFields();
      this.dialogFormVisible = false;
    },
    submit(formRef, emits) {
      if (!formRef) return;
      formRef.validate(async (valid: any, fields: any) => {
        if (valid) {
          if (!this.form.sysDictTypeId) {
            console.log('确定!');
            await dictTypeSave(this.form);
          } else {
            console.log('修改!');
            await dictTypeEdit(this.form);
          }
          this.dialogFormVisible = false;
          emits('dict-type-list');
        } else {
          console.log('error submit!', fields);
        }
      });
    },
  },
});
