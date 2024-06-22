<template>
  <div class="icon-select">
    <el-dialog
      title="选择图标"
      v-model="visible"
      :align-center="true"
      @close="handleClose"
      width="900px"
      :show-close="false"
      :fullscreen="fullscreen"
    >
      <template #header="{ close }">
        <div class="my-header">
          <div>选择图标</div>
          <div class="icons">
            <ZsIcon icon="full-screen" @click="handleFullScreen" />
            <ZsIcon icon="close" @click="close" />
          </div>
        </div>
      </template>
      <ZsGap height="10" />
      <el-input v-model="state.iconName" @input="updateFilteredIcons">
      </el-input>
      <div class="icon-body">
        <el-space class="icon-list">
          <div
            v-for="(icon, index) in iconsList"
            :key="index"
            class="icon-item"
            @click="handleClick(icon)"
          >
            <div class="icon-wrapper">
              <div class="icon-svg" v-html="icon.svg ?? ''"></div>
              <div class="icon-name">{{ icon.name }}</div>
            </div>
          </div>
        </el-space>
      </div>
      <template #footer>
        <el-pagination
          background
          :currentPage="state.page"
          :page-size="state.size"
          :total="total"
          :layout="layout"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
        <div>
          <span class="dialog-footer">
            <el-button @click="handleClose">取消</el-button>
          </span>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import icons from '@/assets/icons.json';
import {
  quicklyValidateIconSet,
  parseIconSet,
  iconToSVG,
  getIconData,
  iconToHTML,
  replaceIDs,
} from '@iconify/utils';
const fullscreen = ref(false);
const visible = ref(false);

const iconsList = ref([]);
const total = ref(0);
const layout = ref('total,prev, pager, next');

const state = reactive({
  iconName: '',
  page: 1,
  size: 100,
});
const value = ref('');
const newIcons = ref([]);

// 初始化处理图标数据
const processIcons = () => {
  icons.forEach((icon) => {
    const iconSet = quicklyValidateIconSet(icon);
    if (iconSet) {
      parseIconSet(icon, (iconName, data) => {
        const renderData = iconToSVG(data, { height: '1.5em', width: '1.5em' });
        const svg = iconToHTML(
          replaceIDs(renderData.body),
          renderData.attributes,
        );
        newIcons.value.push({ name: iconName, svg: svg });
      });
    }
  });
};

const pageData = () => {
  // 过滤掉没有 svg 的图标
  // 使用 iconName 进行过滤
  const filteredIcons = ref([]);
  filteredIcons.value = state.iconName
    ? newIcons.value.filter((icon) => icon.name.includes(state.iconName))
    : newIcons.value;

  // 更新 total 的值
  total.value = filteredIcons.value.length;

  // 切片得到当前页的数据
  iconsList.value = filteredIcons.value.slice(
    (state.page - 1) * state.size,
    state.page * state.size,
  );
};

const updateFilteredIcons = (val) => {
  state.page = 1;
  pageData();
};

const handleCurrentChange = (val) => {
  state.page = val;
  pageData();
};
const handleSizeChange = () => {
  state.size = val;
  pageData();
};

const emits = defineEmits(['onChange']);

const handleClick = (icon) => {
  emits('onChange', icon?.name);
  visible.value = false;
};

const handleClose = () => {
  state.iconName = '';
  state.page = 1;
  fullscreen.value = false;
  state.size = 100;
  visible.value = false;
  pageData();
};

const handleFullScreen = () => {
  fullscreen.value = !fullscreen.value;
  state.size = fullscreen.value ? 120 : 100;
  pageData();
};

onMounted(() => {
  processIcons();
  pageData();
});

defineExpose({
  visible,
});
</script>
<style lang="scss" scoped>
// 全屏
.icon-select :deep(.zs-dialog.is-fullscreen) {
  .zs-dialog__header {
    height: auto;
  }
  .icon-body {
    height: calc(100vh - 160px);
  }
}

// 非全屏
.icon-select :deep(.zs-dialog) {
  .zs-dialog__body {
    padding: 0 var(--zs-dialog-padding-primary);
  }
  .zs-dialog__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

// 头部
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .icons {
    display: flex;
    justify-content: center;
    align-items: center;

    > * {
      margin-left: 15px;
    }
  }
}
// 内容
.icon-body {
  height: 50vh;
  overflow: auto;
  .icon-list {
    padding: 16px 16px 16px 0;
    border-radius: 4px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    grid-gap: 8px !important;
    align-items: unset !important;

    .icon-item {
      width: 140px;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover {
        background: #f5f7fa;
      }

      .icon-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: 1px solid var(--zs-border-color);

        .icon-svg {
        }

        .icon-name {
          margin-top: 8px;
          font-size: 13px;
          color: var(--zs-text-color-regular);
          text-align: center;
        }
      }
      .icon-wrapper:hover {
        background-color: var(--zs-color-primary);
      }
    }
  }
}
</style>
