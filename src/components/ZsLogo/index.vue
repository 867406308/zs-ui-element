<template>
  <div class="logo">
    <img
      src="@/assets/logo.png"
      :style="{ height: iconSize, width: iconSize }"
    />
    <div
      v-if="!collapse"
      class="title"
      :style="{ color: titleColor, fontSize: titleSize }"
    >
      {{ title }}
    </div>
  </div>
</template>
<script setup>
import { settingStore } from '@/store/modules/config/setting';
import { storeToRefs } from 'pinia';

const useSettingStore = settingStore();
const { collapse } = storeToRefs(useSettingStore);

const props = defineProps({
  iconSize: {
    type: String,
    default: '30px',
  },
  title: {
    type: String,
    default: '后台管理系统',
  },
  titleColor: {
    type: String,
    default: 'white',
  },
  titleSize: {
    type: String,
    default: '20px',
  },
});
</script>
<style lang="scss" scoped>
.logo {
  height: $nav-height;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $menu-left-bg-color;

  img {
    width: 30px;
    height: 90px;
  }

  .title {
    margin-left: 10px;
    color: #fff;
    font-size: 20px;
  }
}
</style>
