<template>
  <section class="zs-app-main">
    <router-view v-if="isRouter" v-slot="{ Component, route }">
      <transition name="router-fade" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </section>

  <!-- <div style="height: 100px">授权</div> -->
</template>
<script setup lang="ts">
const isRouter = ref(true);
const reload = () => {
  isRouter.value = false;
  nextTick(() => {
    isRouter.value = true;
  });
};
provide('reload', reload);
</script>

<style lang="scss" scoped>
.zs-app-main {
  position: relative;
  overflow: hidden;
  // height: $app-main-height;
}
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
