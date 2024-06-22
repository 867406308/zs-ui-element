import theme from 'echarts/types/src/theme/dark.js';
import { defineStore } from 'pinia';
import { themeConfig } from '@/config/theme.config.ts';
import { getDarkColor, getLightColor } from '@/utils/theme';

export const settingStore = defineStore('setting', {
  state: () => {
    return {
      settingVisible: false,
      settingRef: ref<HTMLFormElement | null>(null),
      collapse: false,
      theme: JSON.parse(localStorage.getItem('themeConfig')) || themeConfig,
    };
  },
  getters: {},
  actions: {
    // 切换collapse
    clickCollapse() {
      this.collapse = !this.collapse;
    },
    openSetting() {
      this.settingVisible = true;
    },
    // 切换布局
    changeLayout(layout: string) {
      this.theme.layout = layout;
      this.settingVisible = false;
    },
    // 切换主题色
    changeColor(color: string) {
      // document.documentElement 是全局变量时
      const el = document.documentElement;
      // 获取 css 变量
      getComputedStyle(el).getPropertyValue(`--zs-color-primary`);
      // 设置 css 变量
      el.style.setProperty('--zs-color-primary', color);
      el.style.setProperty(
        '--zs-color-primary-dark-2',
        `${getDarkColor(color, 0.1)}`,
      );
      for (let i = 1; i <= 9; i++) {
        el.style.setProperty(
          `--zs-color-primary-light-${i}`,
          `${getLightColor(color, i / 10)}`,
        );
      }
      this.theme.color = color;
    },
    // 面包屑
    changeBreadcrumb(breadcrumb: boolean) {
      this.theme.breadcrumb = breadcrumb;
    },
    // 多标签页
    changeTabs(tabs: boolean) {
      this.theme.tabs = tabs;
    },
    changeTabsIcons(tabsIcons: boolean) {
      this.theme.tabsIcons = tabsIcons;
    },
    saveTheme() {
      localStorage.setItem('themeConfig', JSON.stringify(this.theme));
      this.settingVisible = false;
    },
    resetTheme() {
      this.theme = themeConfig;
      localStorage.removeItem('themeConfig');
      // 重新渲染页面
      location.reload();
    },
    // 初始化主题色
    initTheme() {
      const el = document.documentElement;
      // 获取 css 变量
      getComputedStyle(el).getPropertyValue(`--zs-color-primary`);
      // 设置 css 变量
      el.style.setProperty('--zs-color-primary', this.theme.color);
      el.style.setProperty(
        '--zs-color-primary-dark-2',
        `${getDarkColor(this.theme.color, 0.1)}`,
      );
      for (let i = 1; i <= 9; i++) {
        el.style.setProperty(
          `--zs-color-primary-light-${i}`,
          `${getLightColor(this.theme.color, i / 10)}`,
        );
      }
    },
  },
});
