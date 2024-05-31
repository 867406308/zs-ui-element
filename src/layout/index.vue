<template>
  <!-- <ZsThemeSetting /> -->
  <component :is="dynamicComponent(theme.layout)" />
</template>
<script setup lang="ts">
import LayoutHorizontal from './LayoutHorizontal/index.vue';
import LayoutVertical from './LayoutVertical/index.vue';
import LayoutColumn from './LayoutColumn/index.vue';
import { storeToRefs } from 'pinia';

import { settingStore } from '@/store/modules/config/setting';
const useSettingStore = settingStore();
const { theme } = storeToRefs(useSettingStore);

// 动态组件
const dynamicComponent = (item: any) => {
  if (item === 'horizontal') {
    return LayoutHorizontal;
  } else if (item === 'vertical') {
    return LayoutVertical;
  } else if (item === 'column') {
    return LayoutColumn;
  }
  return LayoutVertical;
};
</script>
<style lang="scss" scoped>
.main-content {
  width: 100%;
}
</style>
