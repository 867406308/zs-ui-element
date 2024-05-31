import { defineStore } from 'pinia';
import {
  dictDataSave,
  dictDataEdit,
  getDictDataById,
  getDictTypeList,
} from '@/api/sys/dict';

export const dictDataAddOrEditStore = defineStore('dictDataAddOrEdit', {
  state: () => {
    return {
      dialogFormVisible: false,
      formRef: ref<FormInstance>(),
      dictTypeList: [] as any[],
      form: {
        sysDictDataId: '',
        sysDictTypeId: '',
        dictType: '',
        dictLabel: '',
        dictValue: '',
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
        dictLabel: [
          { required: true, message: '请输入字典标签', trigger: 'blur' },
        ],
        dictValue: [
          { required: true, message: '请输入字典键值', trigger: 'blur' },
        ],
      };
    },
  },
  actions: {
    init() {
      this.dialogFormVisible = true;
      this.queryDictTypeList();
      if (this.form.sysDictDataId) {
        nextTick(async () => {
          await this.getInfoById();
        });
      }
    },
    async getInfoById() {
      const data = await getDictDataById(this.form.sysDictDataId);
      Object.assign(this.form, data?.data);
    },
    async queryDictTypeList() {
      const data = await getDictTypeList();
      this.dictTypeList = data?.data ?? [];
    },
    handleDictTypeChange(val: string) {
      this.form.dictType = this.dictTypeList.find(
        (item) => item.sysDictTypeId === val,
      )?.dictType;
    },
    close() {
      this.formRef.resetFields();
      this.form.sysDictTypeId = '';
      this.dialogFormVisible = false;
    },
    submit(formRef, emits) {
      if (!formRef) return;
      formRef.validate(async (valid: any, fields: any) => {
        if (valid) {
          if (!this.form.sysDictDataId) {
            await dictDataSave(this.form);
          } else {
            await dictDataEdit(this.form);
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
