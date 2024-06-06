import { defineStore } from 'pinia';

export const settingStore = defineStore('setting', {
  state: () => {
    return {
      settingVisible: false,
      settingRef: ref<HTMLFormElement | null>(null),
      collapse: false,
      theme: {
        // 布局种类：横向布局horizontal、纵向布局vertical、分栏布局column、综合布局comprehensive、常规布局common、浮动布局float
        layout: 'vertical',
        // 面包屑的显示
        breadcrumb: true,
      },
    };
  },
  getters: {},
  actions: {
    // 切换collapse
    clickCollapse() {
      this.collapse = !this.collapse;
    },
    openSetting() {
      console.log('openSetting');
      this.settingVisible = true;
    },
    // 切换布局
    changeLayout(layout: string) {
      this.theme.layout = layout;
      this.settingVisible = false;
    },
  },
});
