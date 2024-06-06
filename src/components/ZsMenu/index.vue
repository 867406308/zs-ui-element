<template>
  <el-menu
    default-active="2"
    :collapse="collapse"
    :router="true"
    :collapse-transition="false"
    :mode="theme.layout === 'horizontal' ? 'horizontal' : 'vertical'"
  >
    <SubMenu
      v-for="(item, index) in menuList"
      :key="index"
      :menu="item"
      :basePath="item.path"
      :collapse="collapse"
    ></SubMenu>
  </el-menu>
</template>
<script setup>
import { routersStore } from '@/store/modules/common/router';
import { settingStore } from '@/store/modules/config/setting';
import { storeToRefs } from 'pinia';

// 路由状态
const useRoutersStore = routersStore();
// 设置状态
const useSettingStore = settingStore();
const { collapse, theme } = storeToRefs(useSettingStore);
const menuList = ref([]);
onMounted(() => {
  menuList.value = useRoutersStore.menuList;
});
</script>
<style lang="scss" scoped>
.menu-bar {
  height: 100%;
  background-color: $menu-left-bg-color;
  .nav-collapse {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }
}
</style>
