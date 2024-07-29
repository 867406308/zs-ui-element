import { defineStore } from 'pinia';
import { detailsPage } from '@/api/fixed_assets/depreciation';

export const assetsDepreciationDetailsStore = defineStore(
  'assetsDepreciationDetailsStore',
  {
    state: () => {
      return {
        assetsDepreciationDetailsVisible: false,
        loading: false,
        total: 0,
        assetsDepreciationDetailsList: [],
        assetsDepreciationDetailsFrom: {
          depreciationId: '',
          assetsSerialNo: '',
          assetsName: '',
          manageOrgId: '',
          useOrgId: '',
          topLevelGbClassicCode: '',
          schoolClassicId: '',
          depreciationCode: '',
          isCurrentPeriod: '',
          page: 1,
          size: 20,
        },
      };
    },
    actions: {
      init() {
        this.assetsDepreciationDetailsVisible = true;
        this.getDetailsPage();
      },
      async getDetailsPage() {
        this.loading = true;
        const data = await detailsPage(this.assetsDepreciationDetailsFrom);
        this.assetsDepreciationDetailsList = data?.data?.list ?? [];
        this.total = data?.data?.total ?? 0;
        this.loading = false;
      },
      close() {
        this.$reset();
        this.assetsDepreciationDetailsVisible = false;
      },
      handleSizeChange(val: number) {
        this.assetsDepreciationDetailsFrom.size = val;
        this.getDetailsPage();
      },
      handleCurrentChange(val: number) {
        this.assetsDepreciationDetailsFrom.page = val;
        this.getDetailsPage();
      },
      async handleExport() {
        // const excelName = '折旧明细' + this.assetsScrapForm.serialNo;
        // const data = await exportExcel({
        //   scrapId: this.scrapDetailsFrom.scrapId,
        //   excelName: excelName,
        // });
        // download.excel(data, excelName + '.xlsx');
      },
    },
  },
);
