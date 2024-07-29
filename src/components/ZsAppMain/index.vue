<template>
  <section class="zs-app-main">
    <!-- 123 -->
    <router-view v-if="isRouterAlive" v-slot="{ Component, route }">
      <transition name="router-fade" mode="out-in">
        <keep-alive>
          <div class="zs-app-main-content">
            <component :is="Component" :key="route.fullPath" />
          </div>
        </keep-alive>
      </transition>
    </router-view>
  </section>

  <!-- <div style="height: 100px">授权</div> -->
</template>
<script setup lang="ts">
import { routersStore } from '@/store/modules/common/router';
import { storeToRefs } from 'pinia';

const useRouterStore = routersStore();
const { isRouterAlive } = storeToRefs(useRouterStore);
</script>
<style lang="scss" scoped>
.zs-app-main {
  position: relative;
  overflow: hidden;
}
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
