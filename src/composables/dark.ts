import { useDark, useToggle } from '@vueuse/core';

export const isDark = useDark({
  // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
  storageKey: 'darkKey',
  // 暗黑class名字
  valueDark: 'dark',
  // 高亮class名字
  valueLight: 'light',
  // 初始值
  // initialValue: 'light',
  emitAuto: false,
});
export const toggleDark = useToggle(isDark);
