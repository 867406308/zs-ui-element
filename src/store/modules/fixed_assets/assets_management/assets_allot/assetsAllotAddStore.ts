import { defineStore } from 'pinia';

export const assetsAllotAddStore = defineStore('assetsAllotAddStore', {
  state: () => {
    return {
      assetsAllotAddVisible: false,
    };
  },
  actions: {
    init() {
      // 初始化
      this.assetsAllotAddVisible = true;
    },
    close() {
      // 关闭弹窗
      this.assetsAllotAddVisible = false;
    },
  },
});
