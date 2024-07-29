<!--纵向布局-->
<template>
  <el-container>
    <el-aside :width="collapse ? '64px' : '200px'">
      <!--左侧菜单-->
      <ZsLogo />
      <el-scrollbar>
        <ZsMenu />
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <!--顶部-->
        <zs-nav-bar />
        <zs-nav-tags />
      </el-header>
      <el-main>
        <!--内容-->
        <zs-app-main />
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { settingStore } from '@/store/modules/config/setting';
import { storeToRefs } from 'pinia';

const useSettingStore = settingStore();
const { collapse } = storeToRefs(useSettingStore);
</script>
<style lang="scss" scoped>
.zs-container {
  .zs-aside {
    border-right: 1px solid var(--zs-border-color);
    background-color: var(--zs-menu-bg-color);

    .logo {
      color: var(--zs-menu-text-color);
      .title {
        color: var(--zs-menu-text-color);
      }
    }

    .zs-scrollbar {
      // background-color: $menu-left-bg-color;
      height: calc($menu-left-height);
      .zs-scrollbar__wrap {
        .zs-scrollbar__view {
          height: 100%;
          .zs-menu {
            border-right: none;
            height: 100%;
          }
        }
      }
    }
  }
  .zs-container {
    .zs-header {
      padding: 0px;
      height: $nav-height + $tabs-height;
      z-index: 999;
    }
    .zs-main {
      background-color: var(--zs-bg-color-page);
      padding: $base-padding;
      height: calc($app-main-height);
    }
  }
}
</style>
