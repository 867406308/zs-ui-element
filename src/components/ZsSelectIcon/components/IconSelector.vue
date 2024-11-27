<template>
  <div>
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
          <svg-icon :icon="icon" />
        </div>
      </el-space>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { debounce } from 'lodash';
onMounted(() => {
  allIcons.value = props.icons;
});
const props = defineProps({
  icons: {
    type: Array,
    required: true,
    default: () => [],
  },
  search: {
    type: String,
    default: '',
  },
});

const iconsPerPage = 200;
const currentPage = ref(1);
const allIcons = ref([]);
const loadedIcons = ref<string[]>([]);

const loadMoreIcons = debounce(() => {
  let iconsToLoad = allIcons.value;
  if (props.search) {
    iconsToLoad = allIcons.value.filter((icon) => icon.includes(props.search));
  }

  const start = (currentPage.value - 1) * iconsPerPage;
  const end = start + iconsPerPage;
  const newIcons = iconsToLoad.slice(start, end);
  loadedIcons.value = [...loadedIcons.value, ...newIcons];
  currentPage.value++;
}, 300);

const handleScroll = (event) => {
  const { target } = event;
  if (target.scrollHeight - target.scrollTop === target.clientHeight) {
    loadMoreIcons();
  }
};

const emits = defineEmits(['onChange']);
const handleClick = (icon) => {
  console.log('aaaa', icon);
  emits('onChange', icon);
};

watch(
  () => props.search,
  (newSearchValue) => {
    if (newSearchValue) {
      console.log('a');
      // 清空已加载的图标列表
      loadedIcons.value = [];
      currentPage.value = 1;
      // 加载新的图标列表
      loadMoreIcons();
    } else {
      // 如果没有搜索词，恢复加载全部图标
      // 设置初始状态
      loadedIcons.value = [];
      currentPage.value = 1;
      loadMoreIcons();
    }
  },
);
</script>
<style lang="scss" scoped>
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
</style>
