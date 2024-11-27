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
      <el-segmented v-model="value" :options="options" />
      <ZsGap height="10" />
      <div v-if="value === '系统图标'">
        <IconSelector
          :icons="allIcons"
          :search="search"
          @onChange="handleChange"
        />
      </div>
      <div v-if="value === '自定义图标'">
        <IconSelector
          :icons="customIcons"
          :search="search"
          @onChange="handleChange"
        />
      </div>
      <!-- <div>
        <div
          v-infinite-scroll="loadMoreIcons"
          @scroll="handleScroll"
          class="infinite-list-container"
        >
          <el-space wrap class="infinite-list" style="overflow: auto">
            <div
              v-for="icon in loadedIcons"
              :key="icon"
              class="icon-item infinite-list-item"
              @click="handleClick(icon)"
              :aria-label="`Select ${icon} icon`"
            >
              <svg viewBox="0 0 24 24" width="24" height="24">
                <use :href="proxy.$iconSprite + '#' + icon" />
              </svg>
            </div>
          </el-space>
        </div>
      </div> -->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash';

onBeforeMount(async () => {
  const symbols = await getSymbolsFromSvg();
  // 将symbols转换为List<string>数组
  const symbolsArray = Object.keys(symbols);
  allIcons.value = symbolsArray;

  const svgNames = await getSvgNames();
  customIcons.value = svgNames;
  console.log('customIcons*', customIcons.value);
});
const { proxy }: any = getCurrentInstance();
const search = ref('');
const visible = ref(false);
const iconsPerPage = 200;
const currentPage = ref(1);
const allIcons = ref([]);
const customIcons = ref([]);
const loadedIcons = ref<string[]>([]);
const value = ref('系统图标');

const options = ['系统图标', '自定义图标'];

const getSvgNames = async () => {
  const svgFiles = import.meta.glob('@/assets/icons/svg/*.svg');
  console.log(svgFiles);
  const svgNames = Object.keys(svgFiles).map((path) => {
    // 获取不带路径和扩展名的文件名
    const filename = path
      .split('/')
      .pop()
      .replace(/\.\w+$/, '');
    return filename;
  });
  return svgNames;
};
// 初始化加载图标
const initializeIcons = () => {
  const initialIcons = allIcons.value.slice(0, iconsPerPage);
  loadedIcons.value = initialIcons;
};

const handleScroll = (event) => {
  const { target } = event;
  if (target.scrollHeight - target.scrollTop === target.clientHeight) {
    loadMoreIcons();
  }
};

const emits = defineEmits(['onChange']);

const loadMoreIcons = debounce(() => {
  let iconsToLoad = allIcons.value;
  if (search.value) {
    iconsToLoad = allIcons.value.filter((icon) => icon.includes(search.value));
  }

  const start = (currentPage.value - 1) * iconsPerPage;
  const end = start + iconsPerPage;
  const newIcons = iconsToLoad.slice(start, end);
  loadedIcons.value = [...loadedIcons.value, ...newIcons];
  currentPage.value++;
}, 300);

const handleChange = (icon) => {
  emits('onChange', icon);
  visible.value = false;
};

const handleClose = () => {
  visible.value = false;
  search.value = '';
};

const getSymbolsFromSvg = async () => {
  const response = await fetch(proxy.$iconSprite);
  const text = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'image/svg+xml');
  const symbols = Array.from(doc.querySelectorAll('symbol')).reduce(
    (acc, symbol) => {
      acc[symbol.id] = symbol.outerHTML;
      return acc;
    },
    {},
  );
  return symbols;
};
defineExpose({
  visible,
});
</script>

<style lang="scss" scoped>
.zs-dialog {
  :deep(.zs-dialog__body) {
    height: 100% !important;
    overflow-y: unset !important;
  }
}
.infinite-list-container {
  height: calc(60vh - 94px);
  overflow-y: auto;
  padding-bottom: 10px;
}
.icon-item {
  cursor: pointer;
  padding: 10px;
  margin: 0px;
  border-radius: 4px;
  border: 1px solid var(--zs-border-color);
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: var(--zs-color-primary);
  }
}
// .zs-segmented {
//   --zs-segmented-item-selected-color: var(--zs-text-color-primary);
//   --zs-segmented-item-selected-bg-color: var(--zs-color-primary);
//   --zs-border-radius-base: 16px;
// }
</style>
