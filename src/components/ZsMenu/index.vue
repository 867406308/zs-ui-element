<template>
  <div class="menu-bar">
    <ZsLogo />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        default-active="2"
        :collapse="collapse"
        :router="true"
        :collapse-transition="false"
        :style="{ width: !collapse ? '200px' : '64px' }"
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
    </el-scrollbar>
  </div>
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
const handleSelect = (index, indexPath, item, routeResult) => {
  console.log(index);
  console.log(indexPath);
  console.log(item);
  console.log(routeResult);
};
onMounted(() => {
  menuList.value = useRoutersStore.menuList;
});
</script>
<style lang="scss" scoped>
.menu-bar {
  height: 100%;
  background-color: $menu-left-bg-color;

  :deep() {
    .zs-scrollbar {
      height: calc($menu-left-height);
      .scrollbar-wrapper {
        height: 100%;
        .zs-scrollbar__view {
          height: calc(100vh - 50px);

          .zs-menu {
            border-right: none;
            height: 100%;
          }
        }
      }
    }
  }
  .nav-collapse {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }
}
</style>
