import { defineStore } from 'pinia';
import { assetsInfoStore } from '@/store/modules/fixed_assets/assets_management/assets_info/assetsInfoStore';
// 资产选择
export const assetsInfoSelectedStore = defineStore('assetsInfoSelected', {
  state: () => {
    return {
      assetsInfoSelectedVisible: false,
      // 资产选择的列表
      assetsInfoSelectedData: [] as any[],
      selectedNum: 0,
      tableRef: ref<InstanceType<typeof ElTable>>(),
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
      this.assetsInfoSelectedVisible = true;
      if (this.tableRef) {
        this.tableRef.clearSelection();
        this.tableRef.toggle(this.assetsInfoSelectedData);
      }
    },
  },
});
