import { defineStore } from 'pinia';
import { noticePage, getLimit, del } from '@/api/sys/notice';

export const noticeStore = defineStore('notice', {
  state: () => ({
    ruleFormRef: ref<FormInstance>(),
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
      console.log(row.sysNoticeId);
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
    // 删除
    handleDelete(row: any) {
      if (row.sysNoticeId) {
        ElMessageBox.confirm('您将进行删除操作,是否继续?', '温馨提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            await del(row.sysNoticeId);
            this.queryData();
          })
          .catch(() => {});
      }
    },
    // 重置表单
    resetForm(formEl: FormInstance | undefined) {
      if (!formEl) return;
      formEl.resetFields();
      this.queryData();
    },
    async queryLimit() {
      const data = await getLimit(8);
      this.limitData = data?.data ?? [];
    },
  },
});
