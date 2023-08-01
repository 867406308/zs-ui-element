<template>
  <div class="nav-bar">
    <div class="left-side">
      <!-- <div @click="clickCollapse" class="nav-collapse">
        <ZsIcon v-if="!collapse" icon="fold" />
        <ZsIcon v-if="collapse" icon="expand" />
      </div> -->
      <div class="nav-breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in route.matched">{{ item.meta.title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="right-side">
      <el-space :size="15">
        <ZsIcon icon="search" />
        <!-- <ZsIcon icon="sunny" /> -->
        <el-badge is-dot>
          <ZsIcon icon="bell-filled" />
        </el-badge>

        <ZsIcon icon="setting" />
        <!-- <el-button circle>
          <template #icon>
            <ZsIcon icon="full-screen" />
          </template>
        </el-button>
        <el-button circle @click="toggleDark()">
          <template #icon>
            <ZsIcon :icon="isDark ? 'moon' : 'sunny'"></ZsIcon>
          </template>
        </el-button>
        <el-button circle>
          <template #icon>
            <ZsIcon icon="bell-filled"></ZsIcon>
          </template>
        </el-button>
        <el-button circle>
          <template #icon>
            <ZsIcon icon="setting"></ZsIcon>
          </template>
        </el-button> -->
        <el-dropdown @command="handleCommand">
          <div class="userInfo">
            <el-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" :size="30" />
            <span class="username">{{ username }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="personalCenter">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-space>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSettingStore } from '@/store/modules/setting';
import { useUserStore } from '@/store/modules/sys/user';
import { storeToRefs } from 'pinia';
import { toggleDark, isDark } from '@/composables';

const userStore = useUserStore();
const { username } = userStore;

const settingStore = useSettingStore();
const { clickCollapse } = settingStore;
const { collapse } = storeToRefs(settingStore);
const route = useRoute();
const handleCommand = (command: string | number | object) => {
  switch (command) {
    case 'personalCenter':
      break;
    case 'logout':
      console.log('退出登录');
      userStore.logOut();
      break;
    default:
      break;
  }
};
</script>
<style lang="scss" scoped>
.nav-bar {
  height: $nav-height;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e6eb;

  .left-side {
    display: flex;
    align-items: center;
    .zs-icon {
      margin-left: 10px;
      cursor: pointer;
    }
  }

  .nav-breadcrumb {
    margin-left: 10px;
  }

  .right-side {
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;

    .zs-space {
      display: flex;
      align-items: center;
      height: 100%;

      :deep() {
        .zs-space__item {
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0px 12px;
          margin-right: 0px !important;
          .zs-dropdown {
            display: flex;
            justify-content: start;
            align-items: center;

            .userInfo {
              display: flex;
              align-items: center;

              .username {
                font-size: 15px;
              }
            }

            span {
              margin-left: 5px;
            }
          }
        }
        .zs-space__item:hover {
          background-color: #e9e9eb;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
