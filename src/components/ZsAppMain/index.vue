<template>
  <section class="zs-app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="router-fade" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </section>

  <!-- <div style="height: 100px">授权</div> -->
</template>
<script setup lang="ts"></script>

<style lang="scss" scoped>
.zs-app-main {
  // background-color: $bg-color;
  position: relative;
  overflow: hidden;
  // min-height: $app-main-height;
  // height: 100%;
}
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
