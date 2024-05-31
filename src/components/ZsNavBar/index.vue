<template>
  <div class="nav-bar">
    <div class="left-side">
      <div @click="useSettingStore.clickCollapse" class="nav-collapse">
        <ZsIcon v-if="!collapse" icon="fold" />
        <ZsIcon v-if="collapse" icon="expand" />
      </div>
      <div class="nav-breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in route.matched">{{
            item.meta.title
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="right-side">
      <el-space :size="15">
        <ZsIcon icon="refresh" @click="onSubmitForm" />
        <ZsIcon icon="search" />
        <!-- <ZsIcon icon="sunny" /> -->
        <el-badge is-dot>
          <ZsIcon icon="bell-filled" />
        </el-badge>
        <el-dropdown @command="handleCommand">
          <div class="userInfo">
            <el-avatar
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              :size="30"
            />
            <span class="username">{{ username }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="personalCenter"
                >个人中心</el-dropdown-item
              >
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <ZsIcon icon="setting" @click="useSettingStore.openSetting" />
      </el-space>
    </div>
    <Setting ref="settingRef" />
  </div>
</template>
<script lang="ts" setup>
import { settingStore } from '@/store/modules/config/setting';
import { loginStore } from '@/store/modules/common/loginStore';
import { storeToRefs } from 'pinia';
import { toggleDark, isDark } from '@/composables';

const useLoginStore = loginStore();
const { username } = useLoginStore;

const useSettingStore = settingStore();
const { collapse } = storeToRefs(useSettingStore);
const route = useRoute();
const handleCommand = (command: string | number | object) => {
  switch (command) {
    case 'personalCenter':
      break;
    case 'logout':
      useLoginStore.logOut();
      break;
    default:
      break;
  }
};
const reload: any = inject('reload');
// 刷新页面
const onSubmitForm = () => {
  reload();
};
</script>
<style lang="scss" scoped>
.nav-bar {
  height: $nav-height;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(229, 230, 235);
  // filter: drop-shadow(1px 2px 4px hsl(225, 7%, 88%));

  .left-side {
    display: flex;
    align-items: center;
    .nav-collapse {
      padding-left: 20px;
      .zs-icon {
        margin-left: 10px;
        cursor: pointer;
      }
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
