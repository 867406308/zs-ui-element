<!--垂直混合布局-->
<template>
  <el-container class="verticalMix">
    <el-header class="zs-header-box">
      <div class="header">
        <div class="logoMenu">
          <ZsLogo :expand="false" />
        </div>
        <ZsNavBar />
      </div>
    </el-header>
    <el-main class="zs-main-box">
      <el-container class="zs-custom-container">
        <el-aside class="zs-custom-aside" :width="collapse ? '64px' : '200px'">
          <el-scrollbar>
            <ZsMenu mode="vertical" />
          </el-scrollbar>
          <div @click="useSettingStore.clickCollapse" class="nav-collapse">
            <ZsIcon v-if="!collapse" icon="indent-left" size="1.2em" />
            <ZsIcon v-if="collapse" icon="indent-right" size="1.2em" />
          </div>
        </el-aside>
        <el-main class="zs-custom-main">
          <ZsNavTags v-if="theme.tabs" />
          <ZsAppMain />
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import { settingStore } from '@/store/modules/config/setting';
import { storeToRefs } from 'pinia';
const useSettingStore = settingStore();
const { theme, collapse } = storeToRefs(useSettingStore);

onMounted(() => {
  theme.breadcrumb = true;
});
</script>
<style lang="scss" scoped>
.verticalMix {
  height: 100vh;
  .zs-header-box {
    padding: 0px;
    height: var(--zs-custom-nav-height);
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

        :deep() {
          .left-side {
            display: none;
          }
        }
      }
    }
  }
  .zs-main-box {
    height: calc(100vh - var(--zs-custom-nav-height));
    padding: 0px;

    .zs-custom-aside {
      background-color: var(--zs-menu-bg-color);
      .zs-scrollbar {
        height: calc($menu-left-height - 40px);
        .zs-scrollbar__wrap {
          height: 100%;
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
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--zs-menu-text-color);
        box-shadow: var(--zs-box-shadow);
      }
    }

    .zs-custom-container {
      .zs-custom-main {
        padding: 0px;
        background-color: var(--zs-bg-color-page);

        .nav-tabs {
          background-color: var(--zs-bg-color);
        }

        :deep() {
          .zs-app-main {
            padding: $base-padding;
            height: $app-main-height;
            overflow: auto;
          }
        }

        :deep() {
          .footer-text {
            margin-top: 0px !important;
            margin: 0 $base-padding;
          }
        }
      }
    }
  }
}
</style>
