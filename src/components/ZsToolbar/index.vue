<template>
  <div class="zs-toolbar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.zs-toolbar {
  width: 100%;
  height: calc($zs-toolbar-height - 5px);
  align-items: center;
  display: flex;
  margin-bottom: 5px;
  justify-content: space-between;

  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    flex-wrap: wrap;
  }

  .right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
    flex-wrap: wrap;
  }
}
</style>
