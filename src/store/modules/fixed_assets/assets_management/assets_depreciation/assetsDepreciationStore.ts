import { defineStore } from 'pinia';
import { page, oneKeyDepreciation } from '@/api/fixed_assets/depreciation';
import { assetsDepreciationDetailsStore } from './assetsDepreciationDetailsStore';

export const assetsDepreciationStore = defineStore('assetsDeoreciation', {
  state: () => {
    return {
      loading: false,
      assetsDepreciationStatisticsRef: ref<HTMLFormElement | null>(null),
      assetsDepreciationDetailsRef: ref<HTMLFormElement | null>(null),
      tableData: [],
      total: 0,
      assetsDepreciationForm: {
        name: '',
        page: 1,
        size: 20,
        order: 'desc',
        orderField: 'create_date',
      },
    };
  },
  actions: {
    // 重置表单
    resetForm(formEl: FormInstance | undefined) {
      if (!formEl) return;
      formEl.resetFields();
      this.queryData();
    },
    async queryData() {
      this.loading = true;
      const data = await page(this.assetsDepreciationForm);
      this.tableData = data?.data?.list ?? [];
      this.total = data?.data?.total ?? 0;
      this.loading = false;
    },
    handleSizeChange(val: number) {
      this.assetsDepreciationForm.size = val;
      this.queryData();
    },
    handleCurrentChange(val: number) {
      this.assetsDepreciationForm.page = val;
      this.queryData();
    },
    async handleAddDepreciation() {
      const data = await oneKeyDepreciation({});
      this.queryData();
    },
    handleDelete() {},
    handleStatistics(row: any) {
      if (this.assetsDepreciationStatisticsRef) {
        this.assetsDepreciationStatisticsRef.assetsDepreciationStatisticsFrom.id =
          row.id;
        this.assetsDepreciationStatisticsRef.init();
      }
    },
    handleDetail(row: any) {
      if (this.assetsDepreciationDetailsRef) {
        this.assetsDepreciationDetailsRef.assetsDepreciationDetailsFrom.depreciationId =
          row.id;
        this.assetsDepreciationDetailsRef.init();
      }
    },
    reset() {
      this.$reset();
      this.queryData();
    },
  },
});
