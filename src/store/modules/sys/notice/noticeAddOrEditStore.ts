import { defineStore } from 'pinia';
import { save, edit, getById } from '@/api/sys/notice';

export const noticeAddOrEditStore = defineStore('noticeAddOrEdit', {
  state: () => {
    return {
      noticeAddOrEditVisible: false,
      formRef: ref<FormInstance>(),
      form: {
        sysNoticeId: '',
        title: '',
        content: '',
        type: 1,
        level: 1,
        status: '',
        receivingType: 1,
        // 接收人
        receiverIds: [],
      },
      deptData: [],
    };
  },
  getters: {
    rules() {
      return {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          {
            min: 2,
            max: 50,
            message: '长度在 2 到 50 个字符',
            trigger: 'blur',
          },
        ],
        content: [
          { required: true, message: '请输入消息内容', trigger: 'blur' },
        ],
        type: [{ required: true, message: '请选择消息类型', trigger: 'blur' }],
        level: [{ required: true, message: '请选择消息级别', trigger: 'blur' }],
      };
    },
  },
  actions: {
    async init() {
      this.noticeAddOrEditVisible = true;
      if (this.form.sysNoticeId) {
        nextTick(async () => {
          await this.getInfoById();
        });
      }
    },
    handleData(list: any) {
      const data = list.map((item: any) => {
        return {
          label: item.deptName,
          value: item.sysDeptId,
          children: item.children ? this.handleData(item.children) : [],
        };
      });
      return data;
    },
    async getInfoById() {
      const data = await getById(this.form.sysNoticeId);
      Object.assign(this.form, data?.data);
    },
    handleSaveDraft(formRef, emits) {
      if (!formRef) return;
      formRef.validate(async (valid: any, fields: any) => {
        if (valid) {
          // 草稿状态为1
          this.form.status = 1;
          if (!this.form.sysNoticeId) {
            await save(this.form);
          } else {
            await edit(this.form);
          }
          this.noticeAddOrEditVisible = false;
          emits('query-data');
        } else {
          console.log('error submit!', fields);
        }
      });
    },
    handleReceivingTypeChange(value: any) {
      switch (value) {
        case 1:
          // 全部用户
          this.form.receiverIds = [];
          break;
        case 2:
          // 指定用户
          this.form.receiverIds = [];
          break;
        case 3:
          // 指定角色
          this.form.receiverIds = [];
          break;
        case 4:
          // 指定部门
          this.form.receiverIds = [];
          break;
        case 5:
          // 指定岗位
          this.form.receiverIds = [];
          break;
        default:
      }
    },
  },
});
