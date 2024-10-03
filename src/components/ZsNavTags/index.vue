<template>
  <div class="nav-tabs">
    <el-tabs
      v-model="currentTabs"
      @tab-click="handleTabsClick"
      @tab-remove="handleTabsRemove"
    >
      <el-tab-pane key="home" label="首页" name="home" :closable="false">
      </el-tab-pane>
      <el-tab-pane
        :key="item.path"
        v-for="(item, index) in currentTabsList"
        :label="item.title"
        :name="item.name"
        :closable="item.name !== 'home'"
      >
        <template #label>
          <div class="nav-tabs-body">
            <div class="nav-tabs-content">
              <ZsIcon :icon="item.icon" v-if="theme.tabsIcon" />
              <span> {{ item.title }}</span>
            </div>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <ZsIcon icon="arrow-down" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="Close" command="closeOther"
            >关闭其他</el-dropdown-item
          >
          <el-dropdown-item :icon="Back" command="closeLeft"
            >关闭左侧</el-dropdown-item
          >
          <el-dropdown-item :icon="Right" command="closeRight"
            >关闭右侧</el-dropdown-item
          >
          <el-dropdown-item :icon="Close" command="closeAll"
            >关闭全部</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts" setup>
import { Close, Back, Right } from '@element-plus/icons-vue';
import { tabsStore } from '@/store/modules/common/tabs';
import { settingStore } from '@/store/modules/config/setting';
import { storeToRefs } from 'pinia';

const useTabsStore = tabsStore();
const { currentTabsList, currentTabs } = storeToRefs(useTabsStore);

const useSettingStore = settingStore();
const { theme } = storeToRefs(useSettingStore);

const router = useRouter();

const handleTabsClick = (tab: any, event: Event) => {
  sessionStorage.setItem('currentTabs', tab.props.name);
  const tabsList = currentTabsList.value.filter((item) => {
    return item.name === tab.props.name;
  });
  sessionStorage.setItem('currentTabsObject', [JSON.stringify(tabsList)]);
  if (tab.props.name === 'home') {
    sessionStorage.removeItem('currentTabsObject');
  }
  router.push({ name: tab.props.name });
};
// 关闭当前标签
const handleTabsRemove = (tab: any) => {
  useTabsStore.closeCurrentTabs(tab);
  router.push({ name: currentTabs.value });
};

// 清除其他tabs
const clearOtherTabs = () => {
  useTabsStore.closeOtherTabs();
};
// 清楚左侧tabs
const clearLeftTabs = () => {
  useTabsStore.closeLeftTabs();
};
// 清楚右侧tabs
const clearRightTabs = () => {
  useTabsStore.closeRightTabs();
};
// 清空所有tabs
const clearAllTabs = () => {
  useTabsStore.closeAllTabs();
  router.push({ name: 'home' });
};
const handleCommand = (command: string | number | object) => {
  switch (command) {
    case 'closeOther':
      clearOtherTabs();
      break;
    case 'closeLeft':
      clearLeftTabs();
      break;
    case 'closeRight':
      clearRightTabs();
      break;
    case 'closeAll':
      clearAllTabs();
      break;
    default:
      break;
  }
};
onBeforeMount(() => {
  currentTabs.value = sessionStorage.getItem('currentTabs') || 'home';
  const tabsString = sessionStorage.getItem('currentTabsObject');
  if (tabsString) {
    currentTabsList.value = JSON.parse(tabsString);
  } else {
    currentTabsList.value = [];
  }
});
</script>
<style lang="scss" scoped>
.nav-tabs {
  padding-left: 20px;
  height: var(--zs-custom-tabs-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--zs-border-color);
  box-sizing: border-box;

  .zs-tabs {
    width: calc(100% - 60px);
    height: var(--zs-custom-tabs-height);
    :deep() {
      .zs-tabs__header {
        border-bottom: none !important;
        margin: 0 !important;

        .zs-tabs__nav-wrap {
          overflow-x: hidden !important;
          .zs-tabs__nav-prev {
            display: flex;
            align-items: center;
            justify-content: center;
            height: var(--zs-custom-tabs-height);
          }
          .zs-tabs__nav-next {
            display: flex;
            align-items: center;
            justify-content: center;
            height: var(--zs-custom-tabs-height);
          }
          .zs-tabs__nav-scroll {
            .zs-tabs__nav {
              border: none !important;
            }
          }
        }

        .zs-tabs__nav-wrap::after {
          background-color: transparent !important;
        }
      }
      .zs-tabs__active-bar {
        background-color: transparent !important;
      }
      .zs-tabs__item {
        height: var(--zs-custom-tabs-height);
        padding-left: 20px !important;
        padding-right: 20px !important;

        .nav-tabs-body {
          .nav-tabs-content {
            display: flex;
            align-items: center;

            .svg-icon {
              margin-right: 5px;
            }
          }
        }

        .is-icon-close {
          width: 14px;
        }
      }
      .is-active {
        background: rgba(78, 136, 243, 0.1) !important;
      }
    }
  }
  .zs-dropdown {
    width: 60px;
    height: 100%;
    display: flex;
    align-items: center;
    border-left: 1px solid #dcdfe6;
    margin-left: 10px;
    justify-content: center;
  }
}
</style>
