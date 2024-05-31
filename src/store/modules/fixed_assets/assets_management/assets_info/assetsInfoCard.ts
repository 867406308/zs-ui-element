import { defineStore } from 'pinia';
import { getById } from '@/api/fixed_assets/info';

export const assetsInfoCardStore = defineStore('assetsInfoCard', {
  state: () => {
    return {
      assetsInfoCardVisible: false,
      assetsInfoForm: {
        id: '',
        name: '',
        serialNo: '',
        inNo: '',
        unit: '',
        brand: '',
        spec: '',
        buyPrice: '',
        manufacturer: '',
        assetsStatusDictLabel: '',
        useStatusDictLabel: '',
        manageOrgName: '',
        manageUserName: '',
        storageLocation: '',
        storageLocationDescription: '',
        classifyName: '',
        depreciationCode: '',
        depreciationCodeDictLabel: '',
        depreciationMonths: '',
        depreciatedMonths: '',
        depreciatedPrice: '',
      },
    };
  },
  actions: {
    init() {
      this.assetsInfoCardVisible = true;
      this.queryInfoById();
    },
    async queryInfoById() {
      const data = await getById(this.assetsInfoForm.id);
      Object.assign(this.assetsInfoForm, data?.data);
    },
  },
});
