export const themeConfig = {
  // 暗黑模式
  dark: localStorage.getItem('darkKey') === 'dark' ? true : false,
  // 布局种类：横向布局horizontal、纵向布局vertical、分栏布局column、综合布局comprehensive、常规布局common、浮动布局float
  layout: 'vertical',
  // 是否开启面包屑的显示
  breadcrumb: true,
  // 是否开启标签页的显示
  tabs: true,
  // 是否开启标签页图标显示
  tabsIcon: true,
  // 主题色
  color: '#0C8A72', //'#16A085',
  // 导航栏主题色
  navTheme: '#000000',
  // 是否开启色弱模式
  colorWeak: false,
  // 是否显示页脚
  footer: true,
};
