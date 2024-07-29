import { defineStore } from 'pinia';
import { page, getById } from '@/api/fixed_assets/scrap';

export const assetsScrapStore = defineStore('assetsScrap', {
  state: () => {
    return {
      loading: false,
      assetsScrapAddRef: ref<HTMLFormElement | null>(null),
      assetsScrapDetailsRef: ref<HTMLFormElement | null>(null),
      tableData: [],
      total: 0,
      assetsScrapForm: {
        serialNo: '',
        page: 1,
        size: 20,
        order: 'desc',
        orderField: 'apply_date',
      },
    };
  },
  actions: {
    async queryData() {
      this.loading = true;
      const data = await page(this.assetsScrapForm);
      this.tableData = data?.data?.list ?? [];
      this.total = data?.data?.total ?? 0;
      this.loading = false;
    },
    reset() {
      this.$reset();
      this.queryData();
    },
    handleSizeChange(val: number) {
      this.assetsScrapForm.size = val;
      this.queryData();
    },
    handleCurrentChange(val: number) {
      this.assetsScrapForm.page = val;
      this.queryData();
    },
    handleAddDepreciation() {},
    handleDelete() {},
    handleAdd() {
      if (this.assetsScrapAddRef) {
        this.assetsScrapAddRef.init();
      }
    },
    handleDetail(row: any) {
      if (this.assetsScrapDetailsRef) {
        this.assetsScrapDetailsRef.scrapDetailsFrom.scrapId = row.id;
        this.assetsScrapDetailsRef.init();
      }
    },
    async queryById(id: any) {
      const data = await getById(id);
      return data?.data ?? {};
    },
  },
});
