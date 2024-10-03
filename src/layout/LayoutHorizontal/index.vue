<!--顶部横向布局-->
<template>
  <el-container>
    <el-header>
      <div class="header">
        <div class="logoMenu">
          <ZsLogo />
          <ZsMenu mode="horizontal" />
        </div>
        <ZsNavBar />
      </div>
      <ZsNavTags v-if="theme.tabs" />
    </el-header>
    <el-main>
      <ZsAppMain />
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import { settingStore } from '@/store/modules/config/setting';
import { storeToRefs } from 'pinia';
const useSettingStore = settingStore();
const { theme } = storeToRefs(useSettingStore);
</script>
<style lang="scss" scoped>
.zs-container {
  height: 100vh;
  .zs-header {
    padding: 0px;
    height: var(--zs-custom-nav-height) + var(--zs-custom-tabs-height);
    // z-index: 999;
    .header {
      display: flex;
      justify-content: space-between;
      background-color: var(--zs-menu-bg-color);
      border-bottom: 1px solid var(--zs-border-color);
      .logoMenu {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: calc(100% - 350px);
        .logo {
          width: 300px;
        }
        :deep() {
          .zs-menu {
            height: var(--zs-custom-nav-height) !important;
            width: 100%;
            border-bottom: none;
            width: calc(100% - 350px);

            li {
              border-bottom: 0px;
            }
            .zs-sub-menu__title {
              border-bottom: 0px;
            }
          }
        }
      }
      .nav-bar {
        width: 350px;
        background-color: var(--zs-menu-bg-color);
        color: var(--zs-menu-text-color);
        border: none;
      }
    }
  }
  .zs-main {
    background-color: var(--zs-bg-color-page);
    padding: $base-padding;
    height: calc($app-main-height);
  }
}
</style>
