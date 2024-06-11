import { defineStore } from 'pinia';

export const tabsStore = defineStore('tabs', {
  state: () => {
    return {
      currentTabs: 'home',
      currentTabsList: [],
    };
  },
  getters: {},
  actions: {
    resetStore() {
      // 重置store中的所有状态
      this.$reset();
      sessionStorage.removeItem('currentTabsObject');
      sessionStorage.removeItem('currentTabs');
    },
    addCurrentTabsList(tabs: any) {
      this.currentTabs = tabs.name;
      const {
        path,
        name,
        meta: { title, icon },
      } = tabs;

      const existingTab = this.currentTabsList.find((tab) => tab.path === path);
      if (!existingTab && name !== 'home') {
        sessionStorage.setItem('currentTabs', tabs.name);
        const tabsList = [{ path, name, title, icon }];
        sessionStorage.setItem('currentTabsObject', [JSON.stringify(tabsList)]);
        this.currentTabsList.push({
          path,
          name,
          title,
          icon,
        });
      }
    },
    closeCurrentTabs(tabs: any) {
      // 根据tabs查找当前tabs在currentTabsList中的索引
      // 删除currentTabsList中对应的tabs
      const tabsIndex = this.currentTabsList.findIndex(
        (tab) => tab.name === tabs,
      );
      this.currentTabsList.splice(tabsIndex, 1);

      if (this.currentTabsList.length > 0) {
        this.currentTabs =
          this.currentTabsList[this.currentTabsList.length - 1].name;
      } else {
        this.currentTabs = 'home';
      }
      if (this.currentTabsList.length === 0) {
        sessionStorage.removeItem('currentTabs');
        sessionStorage.removeItem('currentTabsObject');
      }
    },
    closeOtherTabs() {
      this.currentTabsList = this.currentTabsList.filter(
        (tab) => tab.name === this.currentTabs,
      );
    },
    closeLeftTabs() {
      const index = this.currentTabsList.findIndex(
        (tab) => tab.name === this.currentTabs,
      );
      this.currentTabsList = this.currentTabsList.slice(index);
    },
    closeRightTabs() {
      const index = this.currentTabsList.findIndex(
        (tab) => tab.name === this.currentTabs,
      );
      this.currentTabsList = this.currentTabsList.slice(0, index + 1);
    },
    closeAllTabs() {
      this.currentTabsList = [];
    },
  },
});
