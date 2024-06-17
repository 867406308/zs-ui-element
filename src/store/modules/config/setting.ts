import theme from 'echarts/types/src/theme/dark.js';
import { defineStore } from 'pinia';
import { themeConfig } from '@/config/theme.config.ts';

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
    },
  },
});
