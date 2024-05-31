import { defineStore } from 'pinia';
import { noticePage, getLimit } from '@/api/sys/notice';

export const noticeStore = defineStore('notice', {
  state: () => ({
    addEditRef: ref<HTMLFormElement | null>(null),
    infoRef: ref<HTMLFormElement | null>(null),
    form: {
      title: '',
      content: '',
      type: '',
      level: '',
      status: '',
      page: 1,
      size: 20,
      order: 'desc',
      orderField: 'create_time',
    },
    total: 0,
    loading: false,
    tableData: [],
    limitData: [],
  }),
  getters: {},
  actions: {
    async queryData() {
      this.loading = true;
      const data = await noticePage(this.form);
      this.tableData = data?.data?.list ?? [];
      this.total = data?.data?.total ?? 0;
      this.loading = false;
    },
    handleSizeChange(val: number) {
      this.form.size = val;
      this.queryData();
    },
    handleCurrentChange(val: number) {
      this.form.page = val;
      this.queryData();
    },
    handleAddOrEdit(row: any) {
      if (this.addEditRef) {
        this.addEditRef.form.sysNoticeId = row?.sysNoticeId;
        this.addEditRef.init();
      }
    },
    handleNoticeInfo(row: any) {
      if (this.infoRef) {
        this.infoRef.noticeInfoForm.sysNoticeId = row?.sysNoticeId;
        this.infoRef.init();
      }
    },
    reset() {
      this.$reset();
      this.queryData();
    },
    async queryLimit() {
      const data = await getLimit(8);
      this.limitData = data?.data ?? [];
    },
  },
});
