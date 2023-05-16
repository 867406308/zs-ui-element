import { defineStore } from 'pinia';

export const useRoutersStore = defineStore('routes', {
  state: () => {
    return {
      menuList: [],
    };
  },
  getters: {},
  actions: {
    // 设置菜单
    setMenuList(menuList: any) {
      this.menuList = menuList;
    },
  },
});
