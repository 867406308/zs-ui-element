import { defineStore } from 'pinia';
import { getById } from '@/api/sys/notice';

export const noticeInfoStore = defineStore('noticeInfo', {
  state: () => {
    return {
      noticeInfoVisible: false,
      noticeInfoForm: {
        sysNoticeId: '',
        title: '',
        content: '',
        type: '',
        level: '',
      },
    };
  },
  actions: {
    init() {
      console.log('init');
      this.noticeInfoVisible = true;
      if (this.noticeInfoForm.sysNoticeId) {
        nextTick(async () => {
          await this.getInfoById();
        });
      }
    },
    async getInfoById() {
      const data = await getById(this.noticeInfoForm.sysNoticeId);
      Object.assign(this.noticeInfoForm, data?.data);
    },
  },
});
