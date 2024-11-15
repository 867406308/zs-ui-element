import { defineStore } from 'pinia';
import { getById } from '@/api/fixed_assets/allot';

// 资产调拨
export const assetsAllotDetailsStore = defineStore('assetsAllotDetails', {
  state: () => {
    return {
      assetsAllotDetailsVisible: false,
      assetsAllot: {
        serialNo: '',
        reason: '',
        createDate: '',
      },
      assetsAllotDetailsFrom: {
        allotId: '',
      },
      loading: false,
      assetsAllotDetails: [],
    };
  },
  actions: {
    init() {
      this.assetsAllotDetailsVisible = true;
      this.query();
    },
    async query() {
      const data = await getById(this.assetsAllotDetailsFrom.allotId);
      this.loading = true;
      this.assetsAllotDetails = data?.data ?? [];
      this.loading = false;
    },
    close() {},
  },
});
