import { defineStore } from 'pinia';
import { getById, save, edit } from '@/api/sys/job';

export const jobAddOrEditStore = defineStore('jobAddOrEdit', {
  state: () => ({
    formRef: ref<FormInstance>(),
    dialogFormVisible: false,
    form: {
      sysJobId: '',
      jobClass: '',
      jobName: '',
      jobGroup: '',
      cronExpression: '',
      status: '',
      remark: '',
    },
  }),
  getters: {
    rules() {
      return {
        jobClass: [
          { required: true, message: '请输入任务类名', trigger: 'blur' },
          {
            min: 2,
            max: 50,
            message: '长度在 2 到 50 个字符',
            trigger: 'blur',
          },
        ],
        jobName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          {
            min: 2,
            max: 50,
            message: '长度在 2 到 50 个字符',
            trigger: 'blur',
          },
        ],
        jobGroup: [
          { required: true, message: '请选择任务组名', trigger: 'blur' },
        ],
        cronExpression: [
          { required: true, message: '请输入cron表达式', trigger: 'blur' },
        ],
      };
    },
  },
  actions: {
    init() {
      this.dialogFormVisible = true;
      nextTick(async () => {
        if (this.form.sysJobId) {
          await this.getInfoById();
        }
      });
    },
    async getInfoById() {
      const data = await getById(this.form.sysJobId);
      Object.assign(this.form, data?.data);
    },
    submitForm(formRef, emits) {
      console.log('submitForm', formRef);
      if (!formRef) return;
      formRef.validate(async (valid: any, fields: any) => {
        if (valid) {
          console.log('submit!');
          if (!this.form.sysJobId) {
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
    cancel() {
      this.dialogFormVisible = false;
    },
  },
});
