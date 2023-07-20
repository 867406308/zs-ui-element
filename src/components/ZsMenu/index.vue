<template>
  <div class="menu-bar">
    <ZsLogo />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        default-active="2"
        :collapse="collapse"
        :router="true"
        background-color="#fff"
        text-color="#282c34"
        mode="vertical"
        :collapse-transition="false"
        :style="{ width: !collapse ? '200px' : '64px' }"
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
    <div @click="clickCollapse" class="nav-collapse">
      <ZsIcon v-if="!collapse" icon="fold" size="20px" />
      <ZsIcon v-if="collapse" icon="expand" size="20px" />
    </div>
  </div>
</template>
<script setup>
import { useRoutersStore } from '@/store/modules/router';
import { useSettingStore } from '@/store/modules/setting';
import { storeToRefs } from 'pinia';
// 路由状态
const routersStore = useRoutersStore();
// 设置状态
const settingStore = useSettingStore();
const { clickCollapse } = settingStore;
const { collapse } = storeToRefs(settingStore);
const menuList = ref([]);
onMounted(() => {
  menuList.value = routersStore.menuList;
  console.log(menuList.value);
});
</script>
<style lang="scss" scoped>
.menu-bar {
  height: 100%;
  background-color: $nav-bg-color;
  :deep() {
    .zs-scrollbar {
      height: calc($menu-left-height - 50px);

      .zs-scrollbar__view {
        height: 100%;

        .zs-menu {
          border-right: none;
          height: 100%;
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
