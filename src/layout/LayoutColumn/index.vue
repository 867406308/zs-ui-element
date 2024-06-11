<template>
  <el-container class="column-layout">
    <el-aside>
      <el-scrollbar>
        <ZsLogo />
        <el-tabs tab-position="left" :stretch="true" class="demo-tabs">
          <el-tab-pane v-for="(item, index) in menuList" :key="index">
            <template #label>
              <div class="zs-tab-pane-label">
                <ZsIcon :icon="item.meta.icon" color="#fff"></ZsIcon>
                <div class="zs-tab-pane-label-text">
                  {{ item.meta.title }}
                </div>
              </div>
            </template>
            <div class="zs-tab-pane-content">
              <el-menu
                default-active="1"
                :router="true"
                :collapse-transition="false"
                :collapse="false"
              >
                <SubMenu
                  v-for="(it, indexs) in item.children"
                  :key="indexs"
                  :menu="it"
                  :basePath="item.path"
                >
                </SubMenu>
              </el-menu>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </el-aside>
    <el-main>
      <el-container class="right-box">
        <el-header>
          <ZsNavBar />
          <ZsNavTags />
        </el-header>
        <el-main>
          <!--内容-->
          <zs-app-main />
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import { routersStore } from '@/store/modules/common/router';
import { storeToRefs } from 'pinia';

const useRouterStore = routersStore();
const { menuList } = storeToRefs(useRouterStore);

onMounted(() => {
  console.log(menuList.value);
});
</script>
<style lang="scss" scoped>
.column-layout {
  height: 100%;
  .zs-aside {
    text-align: center;
    height: 100%;
    color: #fff;
    border-right: 1px solid rgb(229, 230, 235);

    .zs-scrollbar {
      height: 100%;
      .logo {
        justify-content: unset !important;
        background-color: #fff !important;
        :deep() {
          .logo-icon {
            width: 80px;
            background-color: #161823;
          }
          .title {
            width: calc(100% - 80px) !important;
            color: #161823 !important;

            border-bottom: 1px solid rgb(229, 230, 235);
            box-sizing: border-box;
            margin-left: 0 !important;
          }
        }
      }
      .zs-tabs {
        height: calc(100vh - $nav-height) !important;

        :deep() {
          .zs-tabs__header {
            background-color: #161823;
            margin-right: 0 !important;
            .zs-tabs__nav-wrap {
              margin-right: 0px !important;
              .zs-tabs__nav-scroll {
                .zs-tabs__nav {
                  height: calc(100vh - $nav-height) !important;
                  overflow-y: auto;
                  width: 80px;
                  .zs-tabs__active-bar {
                    display: none;
                  }
                  .zs-tabs__item {
                    margin: 4px 0 !important;
                    padding: 30px 6px !important;
                    .zs-tab-pane-label {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      flex-direction: column;
                      width: 100%;
                      cursor: pointer;
                      border-radius: 4px;
                      padding: 10px 0;

                      &:hover {
                        background-color: #409eff;
                      }

                      &-text {
                        font-size: 14px;
                        font-weight: 500;
                        color: #fff;
                        line-height: 28px;
                      }
                    }
                  }
                  .zs-tabs__item.is-active {
                    .zs-tab-pane-label {
                      background-color: #409eff;
                    }
                  }
                }
              }
            }
            ::after {
              width: 0px !important;
            }
          }

          .zs-tabs__content {
            background-color: #fff;
            height: 100%;

            .zs-tab-pane {
              .zs-tab-pane-content {
                margin-top: 10px;

                .zs-menu {
                  background-color: #fff;
                  border-right: 0px !important;
                  .zs-menu-item {
                    height: 50px;
                    color: #161823;
                    margin: 0 10px 5px 10px;
                    border-radius: 4px;
                    .zs-icon {
                      .svg-icon {
                        color: #161823 !important;
                      }
                    }
                  }
                  .zs-sub-menu {
                    .zs-sub-menu__title {
                      height: 50px;
                      color: #161823;
                      margin: 0 10px 5px 10px;
                      border-radius: 4px;
                      .zs-icon {
                        .svg-icon {
                          color: #161823 !important;
                        }
                      }
                    }
                    .zs-sub-menu__title:hover {
                      color: #fff;

                      .zs-icon {
                        .svg-icon {
                          color: #fff !important;
                        }
                      }
                    }
                  }
                  .zs-menu-item.is-active {
                    color: #fff;
                    background-color: #79bbff;

                    .zs-icon {
                      .svg-icon {
                        color: #fff !important;
                      }
                    }
                  }
                  .zs-menu-item.is-active:hover {
                    background-color: #79bbff;
                    color: #fff !important;
                  }
                  .zs-menu-item:hover {
                    background-color: #79bbff;
                    color: #fff !important;
                    .zs-icon {
                      .svg-icon {
                        color: #fff !important;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    ::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
  }
  .zs-main {
    padding: 0 !important;
    .right-box {
      .zs-header {
        padding: 0px;
        height: $nav-height + $tabs-height;
        z-index: 999;

        :deep(.nav-collapse) {
          display: none;
        }
      }
      .zs-main {
        padding: $base-padding !important;
        height: calc($app-main-height + 20px);
      }
    }
  }
}
</style>
