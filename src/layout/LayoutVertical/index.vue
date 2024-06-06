<!--纵向布局-->
<template>
  <el-container>
    <el-aside>
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
<style lang="scss" scoped>
.zs-container {
  .zs-aside {
    width: var(--zs-aside-width, 300px) important;

    .zs-scrollbar {
      background-color: $menu-left-bg-color;
      height: calc($menu-left-height);
      .zs-scrollbar__wrap {
        .zs-scrollbar__view {
          .zs-menu {
            border-right: none;
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
      padding: $base-padding;
      height: calc($app-main-height + 20px);
    }
  }
}
</style>
