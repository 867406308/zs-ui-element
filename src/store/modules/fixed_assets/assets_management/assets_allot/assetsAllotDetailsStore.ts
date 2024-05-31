import { defineStore } from 'pinia';
// 资产调拨
export const assetsAllotDetailsStore = defineStore('assetsAllotDetails', {
  state: () => {
    return {
      assetsAllotDetailsVisible: false,
      assetsAllotDetailsFrom: {
        allotId: '',
        page: 1,
        size: 10,
      },
    };
  },
  actions: {
    init() {
      this.assetsAllotDetailsVisible = true;
    },
    close() {},
  },
});
