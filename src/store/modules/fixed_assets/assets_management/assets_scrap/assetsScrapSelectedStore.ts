import { defineStore } from 'pinia';
import { assetsInfoStore } from '@/store/modules/fixed_assets/assets_management/assets_info/assetsInfoStore';
import { emit } from 'process';
const useAssetsInfoStore = assetsInfoStore();

export const assetsScrapSelectedStore = defineStore('assetsScrapSelected', {
  state: () => {
    return {
      assetsScrapSelectedVisible: false,
      selectedNum: 0,
    };
  },
  getters: {
    selected() {
      this.selectedNum = useAssetsInfoStore.selectedAssetsInfoList.length;
      return this.selectedNum;
    },
  },
  actions: {
    init() {
      this.assetsScrapSelectedVisible = true;
      this.loadAssetsInfo();
    },
    // 加载资产信息
    loadAssetsInfo() {
      useAssetsInfoStore.assetsInfoForm.saveState = '1';
      useAssetsInfoStore.queryData();
    },
    // 资产信息选中
    handleSelected(emits: any) {
      // const newList = useAssetsInfoStore.selectedAssetsInfoList.map(
      //   (item) => item.serialNo,
      // );
      emits('selected-change', useAssetsInfoStore.selectedAssetsInfoList);
      this.assetsScrapSelectedVisible = false;
    },
  },
});
