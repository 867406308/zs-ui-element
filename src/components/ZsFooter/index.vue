<template>
  <div class="footer-text" v-if="theme.footer">
    <el-text>{{ website?.copyright }}</el-text>
    <el-link :href="website?.icpLink" target="_blank">{{
      website?.icp
    }}</el-link>
  </div>
</template>
<script setup lang="ts">
import { settingStore } from '@/store/modules/config/setting';
import { storeToRefs } from 'pinia';
import { websiteStore } from '@/store/modules/sys/config/website/websiteStore';

const useSettingStore = settingStore();
const { theme } = storeToRefs(useSettingStore);

const useWebsiteStore = websiteStore();
const { website } = storeToRefs(useWebsiteStore);
</script>
<style lang="scss" scoped>
.footer-text {
  height: calc($zs-footer-height - 0px);
  border-radius: var(--zs-border-radius-base);
  display: flex;
  justify-content: center;
  align-items: center;

  .zs-link {
    margin-left: 10px;
  }
}
</style>
