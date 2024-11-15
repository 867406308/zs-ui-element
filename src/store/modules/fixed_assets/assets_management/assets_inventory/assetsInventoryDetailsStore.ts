import { defineStore } from 'pinia';
import { getById } from '@/api/fixed_assets/inventory';
import { page } from '@/api/fixed_assets/inventoryDetails';

export const assetsInventoryDetailsStore = defineStore(
  'assetsInventoryDetailsStore',
  {
    state: () => {
      return {
        assetsInventoryDetailsVisible: false,
        assetsInventoryForm: {
          id: '',
          createDate: '',
          description: '',
          finishDate: '',
          levelId: '',
          levelName: '',
          name: '',
          orgId: '',
          orgName: '',
          startDate: '',
          status: 1,
          userId: '',
          userName: '',
        },
        assetsInventoryDetailsForm: {
          id: '',
          inventoryId: '',
          createDate: '',
          description: '',
          finishDate: '',
          levelId: '',
          levelName: '',
          name: '',
          orgId: '',
          orgName: '',
          startDate: '',
          status: 1,
          userId: '',
          userName: '',
          page: 1,
          size: 20,
        },
        assetsInventoryDetailsData: [],
        total: 0,
        loading: false,
      };
    },
    actions: {
      init() {
        this.assetsInventoryDetailsVisible = true;
        this.queryAssetsInventoryDetails();
      },
      close() {},
      // // 获取盘点任务详情
      // async queryAssetsInventory() {
      //   const data = await getById(this.assetsInventoryForm.id);
      //   Object.assign(this.assetsInventoryForm, data?.data ?? {});
      // },
      // 盘点资产列表详情
      async queryAssetsInventoryDetails() {
        this.loading = true;
        const data = await page(this.assetsInventoryDetailsForm);
        this.assetsInventoryDetailsData = data?.data?.list ?? [];
        this.total = data?.data?.total ?? 0;
        this.loading = false;
      },
      handleSizeChange(val: number) {
        this.assetsInventoryDetailsForm.size = val;
        this.queryAssetsInventoryDetails();
      },
      handleCurrentChange(val: number) {
        this.assetsInventoryDetailsForm.page = val;
        this.queryAssetsInventoryDetails();
      },
    },
  },
);
