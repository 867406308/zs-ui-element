import { defineStore } from 'pinia';

export const assetsDepreciationStatisticsStore = defineStore(
  'assetsDepreciationStatistics',
  {
    state: () => {
      return {
        assetsDepreciationStatisticsVisible: false,
        assetsDepreciationStatisticsFrom: {
          id: '',
        },
      };
    },
    actions: {
      init() {
        this.assetsDepreciationStatisticsVisible = true;
      },
    },
  },
);
