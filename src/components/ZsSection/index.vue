<template>
  <div>
    <div class="section">
      <div class="left">
        <div class="section-divider"></div>
        <div class="section-title">{{ title }}</div>
      </div>
      <div class="right">
        <slot name="header-right"></slot>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
});
</script>
<style lang="scss" scoped>
.section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    height: 31px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 0;
    .section-divider {
      width: 5px;
      height: 16px;
      background-color: var(--zs-color-primary);
      border-radius: 0px;
      margin-right: 6px;
    }
  }
}
</style>
