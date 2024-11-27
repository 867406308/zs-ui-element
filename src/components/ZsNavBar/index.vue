<template>
  <div class="nav-bar">
    <div
      class="left-side"
      v-if="theme.layout !== 'horizontal' && theme.breadcrumb"
    >
      <ZsBreadcrumb v-if="theme.breadcrumb" />
    </div>
    <div class="right-side">
      <el-space :size="10">
        <ZsIcon icon="ep-search" />
        <el-badge is-dot>
          <ZsIcon icon="ep-bell" />
        </el-badge>
        <ZsIcon icon="ep-setting" @click="useSettingStore.openSetting" />
        <ZsIcon icon="ep-refresh-right" @click="onSubmitForm" />

        <el-switch
          v-model="theme.dark"
          :inactive-action-icon="Sunny"
          :active-action-icon="Moon"
          @change="toggleDark"
        />
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
      </el-space>
    </div>
    <Setting ref="settingRef" />
  </div>
</template>
<script lang="ts" setup>
import { Sunny, Moon } from '@element-plus/icons-vue';
import { settingStore } from '@/store/modules/config/setting';
import { loginStore } from '@/store/modules/common/loginStore';
import { storeToRefs } from 'pinia';
import { isDark, toggleDark } from '@/composables';
import PersonalCenter from '@/views/sys/my/personalCenter/index.vue';
import Layout from '@/layout/index.vue';

import { tabsStore } from '@/store/modules/common/tabs';

import { routersStore } from '@/store/modules/common/router';

const useRouterStore = routersStore();
const { isRouterAlive } = storeToRefs(useRouterStore);
const reload: any = inject('reload');
// 刷新页面
const onSubmitForm = () => {
  console.log('刷新页面');
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
};

const useTabsStore = tabsStore();

// 监听 isDark 的变化
watch(isDark, (newVal) => {
  theme.dark = newVal;
});

const useLoginStore = loginStore();
const { username } = useLoginStore;

const useSettingStore = settingStore();
const { collapse, theme } = storeToRefs(useSettingStore);
const route = useRoute();
const handleCommand = (command: string | number | object) => {
  switch (command) {
    case 'personalCenter':
      personalCenterRouter();
      break;
    case 'logout':
      useLoginStore.logOut();
      break;
    default:
      break;
  }
};

const router = useRouter();
// 个人中心路由拼接
const personalCenterRouter = () => {
  useTabsStore.addCurrentTabsList({
    name: 'personalCenter',
    path: '/personalCenter',
    meta: {
      title: '个人中心',
      icon: 'user-filled',
    },
  });
  router.push('/user/personalCenter');
  // const newRoute = {
  //   component: Layout,
  //   children: [
  //     {
  //       name: 'personalCenter',
  //       path: '/personalCenter',
  //       component: PersonalCenter,
  //       meta: {
  //         title: '个人中心',
  //         icon: 'user-filled',
  //       },
  //     },
  //   ],
  // };
  // // router.addRoute({
  // //   name: 'personalCenter',
  // //   path: '/personalCenter',
  // //   component: PersonalCenter,
  // //   meta: {
  // //     title: '个人中心',
  // //     icon: 'user-filled',
  // //   },
  // // });
  // router.addRoute(newRoute);
  // console.log('所有router', router.getRoutes());
  // // router.replace(router.currentRoute.value.fullPath)
  // router.push('/personalCenter');
  // useTabsStore.addCurrentTabsList({
  //   component: PersonalCenter,
  //   name: 'personalCenter',
  //   path: '/personalCenter',
  //   meta: {
  //     title: '个人中心',
  //     icon: 'user-filled',
  //   },
  // });
};
</script>
<style lang="scss" scoped>
.nav-bar {
  height: var(--zs-custom-nav-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid var(--zs-border-color);

  .left-side {
    width: 100%;
  }
  .right-side {
    margin-right: 10px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

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
                // color: var(--zs-menu-text-color);
              }
            }

            span {
              margin-left: 5px;
            }
          }
        }
        .zs-space__item:hover {
          // background-color: #e9e9eb;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
