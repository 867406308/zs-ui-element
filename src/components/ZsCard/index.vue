<template>
  <div class="zs-card">
    <div class="header" :style="headerStyle">
      <div class="left">
        <ZsIcon v-if="icon" :icon="icon" />
        <div v-if="!icon" class="section-divider"></div>
        <span class="title"> {{ title }}</span>
      </div>
      <div v-if="more" class="right">更多 >></div>
    </div>
    <div class="content">
      <slot name="default"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  more: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: true,
  },
});
const headerStyle = {
  'border-bottom': props.border ? '1px solid #ebeef5' : '#fff',
};
</script>
<style lang="scss" scoped>
.zs-card {
  height: 100%;
  background-color: var(--zs-bg-color);
  border: 1px solid var(--zs-border-color);
  .header {
    height: 20px;
    padding: 10px;
    // border-bottom: 1px solid #ebeef5;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;

      .section-divider {
        width: 4px;
        height: 16px;
        background-color: var(--zs-color-primary);
        border-radius: 0px;
        margin-right: 6px;
      }

      .title {
        font-weight: 600;
      }
    }
    .right {
      color: #b1b3b8;
    }
  }

  .content {
    height: calc(100% - 60px);
    padding: 10px;
  }
}
</style>
