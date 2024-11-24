<template>
  <div class="icon-select">
    <el-dialog
      title="图标选择"
      v-model="visible"
      align-center
      @close="handleClose"
      width="50%"
      :show-close="true"
    >
      <el-input
        v-model="search"
        placeholder="请输入搜索内容"
        clearable
        style="width: 100%; height: 32px"
      >
      </el-input>
      <ZsGap height="10" />
      <el-tabs :tab-position="tabPosition" class="demo-tabs">
        <el-tab-pane
          v-for="(iconSet, index) in filteredIconSets"
          :key="index"
          :label="iconSet.label"
        >
          <icon-selector
            :icons="iconSet.icons"
            :prefix="iconSet.prefix"
            @select="handleClick"
          />
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import { Icon } from '@iconify/vue';
import { icons as antDesignIcons } from '@iconify-json/ant-design';
import { icons as epIcons } from '@iconify-json/ep';
import { icons as icIcons } from '@iconify-json/ic';
import { icons as tdesignIcons } from '@iconify-json/tdesign';

const search = ref('');
const visible = ref(false);
const tabPosition = ref('top');

const iconSets = computed(() => [
  {
    label: 'Element plus图标',
    icons: Object.keys(epIcons.icons),
    prefix: 'ep',
  },
  {
    label: 'Ant Design图标',
    icons: Object.keys(antDesignIcons.icons),
    prefix: 'ant-design',
  },
  {
    label: 'Tdesign图标',
    icons: Object.keys(tdesignIcons.icons),
    prefix: 'tdesign',
  },
  {
    label: 'Google Material Icons图标',
    icons: Object.keys(icIcons.icons),
    prefix: 'ic',
  },
]);

const filteredIconSets = computed(() => {
  if (!search.value) {
    return iconSets.value;
  }
  return iconSets.value.map((iconSet) => ({
    ...iconSet,
    icons: iconSet.icons.filter((iconName) => iconName.includes(search.value)),
  }));
});

const emits = defineEmits(['onChange']);

const handleClick = (icon) => {
  emits('onChange', icon);
  visible.value = false;
};

const handleClose = () => {
  visible.value = false;
  search.value = '';
};

defineExpose({
  visible,
});
</script>
<style lang="scss" scoped>
.zs-tabs {
  height: calc(100% - 42px);

  :deep(.zs-tabs__content) {
    overflow-y: auto;
  }
}
</style>
