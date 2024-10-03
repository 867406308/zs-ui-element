import { defineStore } from 'pinia';
import { randomSm4Key } from '@/utils/cryptoUtils';
console.log('222');
export const cryptoStore = defineStore('cryptoStore', {
  state: () => {
    return {
      sm4Key: '',
    };
  },
  getters: {
    getSm4Key: () => randomSm4Key(),
  },
  actions: {
    setSm4Key(key: string) {
      this.sm4Key = key;
    },
  },
  persist: {
    key: 'cryptoKey',
    storage: localStorage,
  },
});
