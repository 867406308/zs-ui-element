<template>
  <div class="seach-icon">
    <el-input v-model="value" @input="handleInput"> </el-input>
    <el-scrollbar height="200px">
      <el-space wrap :size="0">
        <div v-for="(item, index) in iconsList" :key="index">
          <div class="icon" @click="onClick(item.name)">
            <div v-html="item.svg" class="svg-icon"></div>
            <!-- <div  class="svg-icon-name">{{ item.name }}</div> -->
          </div>
        </div>
      </el-space>
    </el-scrollbar>
    <!-- <el-pagination
      background
      :current-page="page"
      :layout="layout"
      :page-size="size"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    /> -->
  </div>
</template>
<script>
import icons from '@/assets/icons.json';
export default defineComponent({
  props: {},
  emits: ['onClick'],
  setup(props, { emit }) {
    const state = reactive({
      iconsList: [],
      value: '',
      page: 1,
      size: 500,
      total: 0,
      layout: 'total,prev, pager, next',
    });
    const handleInput = (val) => {
      state.iconsList = icons.filter((item) => {
        return item.name.toLowerCase().includes(val.toLowerCase());
      });
    };
    const onClick = (val) => {
      emit('onClick', val);
    };

    const pageData = () => {
      state.total = icons.length;
      state.iconsList = icons.slice(
        (state.page - 1) * state.size,
        state.page * state.size,
      );
    };
    const handleCurrentChange = (val) => {
      state.page = val;
      pageData();
    };
    const handleSizeChange = () => {
      state.size = val;
      pageData();
    };
    onBeforeMount(() => {
      state.iconsList = icons;
    });
    return {
      ...toRefs(state),
      handleInput,
      onClick,
      pageData,
      handleCurrentChange,
      handleSizeChange,
    };
  },
});
</script>
<style lang="scss" scoped>
.seach-icon {
  .zs-input {
    margin-bottom: 15px;
  }
  :deep() {
    .zs-space {
      border-top: 1px solid #f0f0f0;
      border-left: 1px solid #f0f0f0;

      .icon {
        padding: 8px;
        display: flex;
        align-items: center;
        height: 30px;
        width: 30px;
        background: #fff;
        border-right: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
        border-radius: 0px;
        box-sizing: border-box;
        cursor: pointer;
        overflow: hidden;
        flex-direction: column;
        justify-content: space-evenly;

        .svg-icon {
          display: flex;
          //   :deep() {
          //     svg {
          //       width: 30px;
          //       height: 30px;
          //     }
          //   }
        }
        .svg-icon-name {
          font-size: 12px;
        }
        &:hover {
          background-color: var(--zs-border-color-extra-light);
          color: var(--brand-color-light);
        }
      }
    }
  }
}
</style>
