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
    <ZsToolbar>
      <template #left>
        <el-text>配色</el-text>
      </template>
      <template #right>
        <el-color-picker
          v-model="theme.color"
          show-alpha
          color-format="hex"
          :predefine="predefineColors"
          @active-change="activeChange"
        />
      </template>
    </ZsToolbar>
    <ZsToolbar>
      <template #left>
        <el-text>开始暗黑模式</el-text>
      </template>
      <template #right>
        <el-switch v-model="theme.dark" @change="toggleDark" />
      </template>
    </ZsToolbar>
    <ZsToolbar>
      <template #left>
        <el-text>是否开启面包屑</el-text>
      </template>
      <template #right>
        <el-switch v-model="theme.breadcrumb" @change="changeBreadcrumb" />
      </template>
    </ZsToolbar>
    <ZsToolbar>
      <template #left>
        <el-text>是否开启多标签页</el-text>
      </template>
      <template #right>
        <el-switch v-model="theme.tabs" @change="changeTabs" />
      </template>
    </ZsToolbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="useSettingStore.saveTheme">
          保存配置
        </el-button>
        <el-button @click="useSettingStore.resetTheme">恢复默认</el-button>
      </span>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
import vertical from '@/assets/layout/vertical.jpg';
import horizontal from '@/assets/layout/horizontal.jpg';
import column from '@/assets/layout/column.jpg';
import { settingStore } from '@/store/modules/config/setting';
import { storeToRefs } from 'pinia';
import { url } from 'inspector';
import { toggleDark } from '@/composables';

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
const color = ref('#409eff');
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
]);

const activeChange = (color: string) => {
  useSettingStore.changeColor(color);
};
const changeBreadcrumb = (val: boolean) => {
  useSettingStore.changeBreadcrumb(val);
};
const changeTabs = (val: boolean) => {
  useSettingStore.changeTabs(val);
};
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
