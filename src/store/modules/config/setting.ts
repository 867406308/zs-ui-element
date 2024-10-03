import theme from 'echarts/types/src/theme/dark.js';
import { defineStore } from 'pinia';
import { themeConfig } from '@/config/theme.config.ts';
import { getDarkColor, getLightColor, hexToRgb } from '@/utils/theme';

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
      const el = document.documentElement;
      this.applyColorStyles(color);
      this.theme.color = color;
    },
    // 切换导航栏主题色
    changeNavTheme(color: string) {
      const el = document.documentElement;
      const textColor = this.calculateTextColor(color); // 自定义的文本颜色计算方法

      el.style.setProperty('--custom-menu-bg-color', color);
      el.style.setProperty('--custom-menu-text-color', textColor);
      this.theme.navTheme = color;
    },
    // 计算适合的文本颜色
    calculateTextColor(bgColor: string) {
      // 这里使用简单的对比，实际项目中可以使用更复杂的算法来确保对比度
      // 例如使用 luminance 计算或者对比度工具
      return this.isDarkColor(bgColor) ? '#fff' : '#000';
    },
    isDarkColor(color: string): boolean {
      // 转换颜色为 RGB
      const rgbs = hexToRgb(color);

      const rgb = {
        r: rgbs[0],
        g: rgbs[1],
        b: rgbs[2],
      };
      if (!rgb) return false; // 如果无法解析颜色，默认返回 false

      // 计算颜色的亮度
      const luminance = this.calculateLuminance(rgb.r, rgb.g, rgb.b);
      // 亮度阈值，根据需要调整
      const DARK_THRESHOLD = 0.5;

      // 判断是否为暗色
      return luminance < DARK_THRESHOLD;
    },
    // 计算颜色亮度
    calculateLuminance(r: number, g: number, b: number) {
      // 规范化 RGB 值并计算亮度
      const a = [r, g, b].map((value) => {
        value /= 255;
        return value <= 0.03928
          ? value / 12.92
          : Math.pow((value + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    },

    // 面包屑切换
    changeBreadcrumb(breadcrumb: boolean) {
      this.theme.breadcrumb = breadcrumb;
    },
    // 多标签页
    changeTabs(tabs: boolean) {
      this.theme.tabs = tabs;
      const el = document.documentElement;
      el.style.setProperty('--zs-custom-tabs-height', tabs ? '40px' : '0px');
    },
    // 多标签页图标
    changeTabsIcons(tabsIcons: boolean) {
      this.theme.tabsIcons = tabsIcons;
    },
    // 保存主题
    saveTheme() {
      localStorage.setItem('themeConfig', JSON.stringify(this.theme));
      this.settingVisible = false;
    },
    // 重置主题
    resetTheme() {
      this.theme = themeConfig;
      localStorage.removeItem('themeConfig');
      // 重新渲染页面
      location.reload();
    },
    // 初始化主题色
    initTheme() {
      const el = document.documentElement;
      const textColor = this.calculateTextColor(this.theme.navTheme); // 自定义的文本颜色计算方法
      this.applyColorStyles(this.theme.color);
      el.style.setProperty('--custom-menu-bg-color', this.theme.navTheme);
      el.style.setProperty('--custom-menu-text-color', textColor);
      // 初始化页脚高度
      this.changeFooter(this.theme.footer);
    },
    // 切换页脚
    changeFooter(footer: boolean) {
      this.theme.footer = footer;
      const el = document.documentElement;
      el.style.setProperty('--zs-auth-footer-height', footer ? '30px' : '0px');
    },
    // 应用主题色
    applyColorStyles(color: string) {
      const el = document.documentElement;
      el.style.setProperty('--zs-color-primary', color);
      el.style.setProperty(
        '--zs-color-primary-dark-2',
        getDarkColor(color, 0.1),
      );
      for (let i = 1; i <= 9; i++) {
        el.style.setProperty(
          `--zs-color-primary-light-${i}`,
          getLightColor(color, i / 10),
        );
      }
    },
  },
});
