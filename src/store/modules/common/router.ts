import { defineStore } from 'pinia';

export const routersStore = defineStore('routes', {
  state: () => {
    return {
      menuList: [],
      isRouterAlive: true,
    };
  },
  actions: {
    // 设置菜单
    setMenuList(menuList: any) {
      this.menuList = menuList;
    },
    clearRoutes() {
      this.menuList = [];
      this.dynamicMenuList = [];
    },
  },
});
