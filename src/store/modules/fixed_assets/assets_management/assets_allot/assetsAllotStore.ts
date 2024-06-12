import { defineStore } from 'pinia';
import { page } from '@/api/fixed_assets/allot';

export const assetsAllotStore = defineStore('assetsAllot', {
  state: () => {
    return {
      loading: false,
      tableData: [],
      total: 0,
      assetsAllotForm: {
        serialNo: '',
        page: 1,
        size: 20,
        order: 'desc',
        orderField: 'create_date',
      },
      assetsAllotDetailsRef: ref<HTMLFormElement | null>(null),
      assetsAllotAddRef: ref<HTMLFormElement | null>(null),
    };
  },
  actions: {
    async queryData() {
      this.loading = true;
      const data = await page(this.assetsAllotForm);
      this.tableData = data?.data?.list ?? [];
      this.total = data?.data?.total ?? 0;
      this.loading = false;
    },
    handleSizeChange(val: number) {
      this.assetsAllotForm.size = val;
      this.queryData();
    },
    handleCurrentChange(val: number) {
      this.assetsAllotForm.page = val;
      this.queryData();
    },
    handleDetail(row: any) {
      if (this.assetsAllotDetailsRef) {
        this.assetsAllotDetailsRef.assetsAllotDetailsFrom.allotId = row.id;
        this.assetsAllotDetailsRef.assetsAllot.serialNo = row.serialNo;
        this.assetsAllotDetailsRef.assetsAllot.reason = row.reason;
        this.assetsAllotDetailsRef.assetsAllot.createDate = row.createDate;
        this.assetsAllotDetailsRef.init();
      }
    },
    handleAddAllot() {
      if (this.assetsAllotAddRef) {
        this.assetsAllotAddRef.init();
      }
    },
    handleDelete() {},
    reset() {
      this.$reset();
      this.queryData();
    },
  },
});
