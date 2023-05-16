<template>
  <div class="system-title">
    <img src="@/assets/logo.png" />
    <div v-if="!collapse" class="title">Zs Admin</div>
  </div>
</template>
<script setup>
import { useSettingStore } from '@/store/modules/setting';
import { storeToRefs } from 'pinia';
const settingStore = useSettingStore();
const { collapse } = storeToRefs(settingStore);
</script>
<style lang="scss" scoped>
.system-title {
  background-color: $nav-bg-color;
  height: $nav-height;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 30px;
    height: 30px;
  }

  .title {
    margin-left: 10px;
    color: #282c34;
    font-size: 20px;
  }
}
</style>
