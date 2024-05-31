import { defineStore } from 'pinia';
import { page } from '@/api/fixed_assets/inventory';

export const assetsInventoryStore = defineStore('assetsInventoryStore', {
  state: () => ({
    assetsInventoryAddRef: ref<HTMLFormElement | null>(null),
    assetsInventoryDetailsRef: ref<HTMLFormElement | null>(null),
    tableData: [],
    total: 0,
    loading: false,
    assetsInventoryForm: {
      page: 1,
      size: 20,
      order: 'desc',
      orderField: 'create_date',
    },
  }),
  getters: {
    getAssets: (state) => state.assets,
  },
  actions: {
    handleAdd() {
      if (this.assetsInventoryAddRef) {
        this.assetsInventoryAddRef.init();
      }
    },
    handleDetail(row: any) {
      if (this.assetsInventoryDetailsRef) {
        this.assetsInventoryDetailsRef.assetsInventoryDetailsForm.inventoryId =
          row.id;
        this.assetsInventoryDetailsRef.assetsInventoryForm = row;
        this.assetsInventoryDetailsRef.init();
      }
    },
    async queryData() {
      this.loading = true;
      const data = await page(this.assetsInventoryForm);
      this.tableData = data?.data?.list ?? [];
      this.total = data?.data?.total ?? 0;
      this.loading = false;
    },
    handleSizeChange(val: number) {
      this.assetsInventoryForm.size = val;
      this.queryData();
    },
    handleCurrentChange(val: number) {
      this.assetsInventoryForm.page = val;
      this.queryData();
    },
  },
});
