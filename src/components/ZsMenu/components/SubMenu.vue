<template>
  <el-sub-menu
    v-if="menu.children && menu.children.length >= 1"
    :index="getPath(menu.path)"
  >
    <template #title>
      <!-- <div v-if="collapse">
        <div class="icon">
          <el-icon>
            <ZsIcon :icon="menu.meta.icon" color="#fff"></ZsIcon>
          </el-icon>
          <span>{{ menu }}</span>
        </div>
      </div> -->

      <el-icon>
        <ZsIcon :icon="menu.meta.icon" color="#fff"></ZsIcon>
      </el-icon>
      <span>{{ menu.meta.title }}</span>
    </template>
    <SubMenu
      v-for="item in menu.children"
      :key="item.id"
      :menu="item"
      :basePath="getPath(menu.path)"
      :collapse="collapse"
    ></SubMenu>
  </el-sub-menu>
  <el-menu-item v-else :index="getPath(menu.path)" @click="routerChild(menu)">
    <template #title>
      <el-icon>
        <ZsIcon :icon="menu.meta.icon" color="#fff"></ZsIcon>
      </el-icon>
      <span> {{ menu.meta.title }}</span>
    </template>
  </el-menu-item>
</template>
<script setup>
import path from 'path-browserify';
import { tabsStore } from '@/store/modules/common/tabs';
const useTabsStore = tabsStore();
const props = defineProps({
  menu: {
    type: Object,
    required: true,
  },
  basePath: {
    type: String,
    default: '',
  },
  collapse: {
    type: Boolean,
    default: false,
  },
});
const routerChild = (menu) => {
  useTabsStore.addCurrentTabsList(menu);
};
// routepath 为当前菜单的path值
// getpath: 拼接 当前菜单的上一级菜单的path 和 当前菜单的path
const getPath = (routePath) => {
  return path.resolve(props.basePath, routePath);
};
</script>
