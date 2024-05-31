import { defineStore } from 'pinia';
import { page, exportExcel } from '@/api/fixed_assets/scrapDetails';
import { getById } from '@/api/fixed_assets/scrap';
import download from '@/utils/fileDownload';

export const assetsScrapDetailsStore = defineStore('assetsScrapDetails', {
  state: () => {
    return {
      assetsScrapDetailsVisible: false,
      loading: false,
      scrapDetailsData: [],
      total: 0,
      scrapDetailsFrom: {
        scrapId: '',
        page: 1,
        size: 10,
      },
      assetsScrapForm: {
        amount: 0,
        applyDate: '',
        applyUser: '',
        approveDate: '',
        approveFile: '',
        approveOrg: '',
        approveSerialNo: '',
        receiver: '',
        scrapDate: '',
        serialNo: '',
        totalPrice: 0,
      },
    };
  },
  actions: {
    init() {
      this.assetsScrapDetailsVisible = true;
      this.queryData();
      this.getScrapById();
    },
    close() {
      this.assetsScrapDetailsVisible = false;
    },
    async getScrapById(id: any) {
      const data = await getById(this.scrapDetailsFrom.scrapId);
      Object.assign(this.assetsScrapForm, data?.data ?? {});
    },
    async queryData() {
      this.loading = true;
      const data = await page(this.scrapDetailsFrom);
      this.scrapDetailsData = data?.data?.list ?? [];
      this.total = data?.data?.total ?? 0;
      this.loading = false;
    },
    handleSizeChange(val: number) {
      this.scrapDetailsFrom.size = val;
      this.queryData();
    },
    handleCurrentChange(val: number) {
      this.scrapDetailsFrom.page = val;
      this.queryData();
    },
    async handleExport() {
      const excelName = '报废明细' + this.assetsScrapForm.serialNo;
      const data = await exportExcel({
        scrapId: this.scrapDetailsFrom.scrapId,
        excelName: excelName,
      });
      download.excel(data, excelName + '.xlsx');
    },
  },
});
