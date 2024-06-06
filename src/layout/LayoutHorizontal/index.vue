<!--顶部横向布局-->
<template>
  <el-container>
    <el-header>
      <div class="header">
        <div class="logoMenu">
          <ZsLogo />
          <ZsMenu />
        </div>
        <ZsNavBar />
      </div>
      <ZsNavTags />
    </el-header>

    <el-main>
      <ZsAppMain />
    </el-main>
  </el-container>
</template>
<style lang="scss" scoped>
.zs-container {
  .zs-header {
    padding: 0px;
    height: $nav-height + $tabs-height;
    z-index: 999;
    .header {
      display: flex;
      justify-content: space-between;
      background-color: $menu-left-bg-color;
      .logoMenu {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        .logo {
          width: 300px;
        }
        :deep() {
          .zs-menu {
            height: $nav-height !important;
            width: 100%;
            border-bottom: none;

            .zs-sub-menu__title {
              border-bottom: 0px;
            }
          }
        }
      }
      .nav-bar {
        background-color: $menu-left-bg-color;
        border: none;
        :deep(.right-side) {
          .zs-space {
            .zs-space__item {
              .svg-icon {
                color: #fff !important;
              }
              .zs-dropdown {
                .userInfo {
                  .username {
                    color: #fff;
                  }
                }
              }
            }
            .zs-space__item:hover {
              background-color: transparent !important;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .zs-main {
    padding: $base-padding;
    height: calc($app-main-height + 20px);
  }
}
</style>
