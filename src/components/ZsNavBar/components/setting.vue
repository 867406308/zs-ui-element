<template>
  <el-drawer
    v-model="settingVisible"
    :close-on-click-modal="false"
    title="主题配置"
  >
    <ZsSection title="布局设置">
      <el-space fill wrap>
        <el-radio-group v-model="theme.layout">
          <el-radio
            :value="item.value"
            border
            v-for="(item, index) in layoutList"
            :key="index"
          >
            <template #default>
              <img
                :src="item.url ?? ''"
                class="img"
                @click="useSettingStore.changeLayout(item.value)"
              />
            </template>
          </el-radio>
        </el-radio-group>
      </el-space>
    </ZsSection>
  </el-drawer>
</template>
<script setup lang="ts">
import vertical from '@/assets/layout/vertical.jpg';
import horizontal from '@/assets/layout/horizontal.jpg';
import column from '@/assets/layout/column.jpg';
import { settingStore } from '@/store/modules/config/setting';
import { storeToRefs } from 'pinia';
import { url } from 'inspector';

const useSettingStore = settingStore();
const { settingVisible, theme } = storeToRefs(useSettingStore);

const layoutList = [
  {
    label: '横向布局',
    value: 'horizontal',
    url: horizontal,
  },
  {
    label: '纵向布局',
    value: 'vertical',
    url: vertical,
  },
  {
    label: '分栏布局',
    value: 'column',
    url: column,
  },
];
</script>
<style lang="scss" scoped>
.zs-radio-group {
  :deep() {
    .zs-radio {
      height: 60px;
      padding: 2px;
      margin-right: 12px;
      margin-top: 2px;
      .zs-radio__input {
        display: none;
      }
      .zs-radio__label {
        padding-left: 0 !important;
        .img {
          height: 50px;
          width: 80px;
        }
      }
    }
  }
}
</style>
