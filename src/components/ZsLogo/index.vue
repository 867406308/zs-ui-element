<template>
  <div class="logo">
    <div class="logo-icon">
      <img
        src="@/assets/logo.png"
        :style="{ height: iconSize, width: iconSize }"
      />
    </div>
    <span
      v-if="expand && !collapse"
      class="title"
      :style="{ color: titleColor, fontSize: titleSize }"
    >
      {{ title }}
    </span>
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
    default: 'zsadmin',
  },
  titleColor: {
    type: String,
    default: '',
  },
  titleSize: {
    type: String,
    default: '30px',
  },
  expand: {
    type: Boolean,
    default: true,
  },
});
</script>
<style lang="scss" scoped>
.logo {
  height: $nav-height;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: $menu-left-bg-color;

  .logo-icon {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 30px;
      height: 90px;
    }
  }

  .title {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    // color: #fff;
    font-size: 20px;
  }
}
</style>
