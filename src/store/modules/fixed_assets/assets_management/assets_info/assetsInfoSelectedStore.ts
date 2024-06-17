// 资产选择
export const assetsInfoSelectedStore = defineStore('assetsInfoSelected', {
  state: () => {
    return {
      assetsInfoSelectedVisible: false,
      // 资产选择的列表
      assetsInfoSelectedData: [] as any[],
      selectedNum: 0,
    };
  },
  getters: {
    selected() {
      this.selectedNum = useAssetsInfoStore.selectedAssetsInfoList.length;
      return this.selectedNum;
    },
  },
});
