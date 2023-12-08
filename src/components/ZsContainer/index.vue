<template>
  <div class="zs-container">
    <div class="header-box">
      <slot name="header"></slot>
    </div>
    <div class="main-box">
      <slot name="main"></slot>
    </div>
    <div class="footer-box">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.zs-container {
  min-height: $app-main-height;
  width: 100%;
  padding: $base-padding;
  background-color: #fff;
  margin-right: 10px;
  border-radius: $border-radius;
  flex-direction: column;

  .header-box {
    height: $header-box-height;
  }

  .main-box {
    overflow: hidden;
    height: $main-box-height;
    background-color: white;
    border-top-right-radius: $border-radius;
    border-top-left-radius: $border-radius;
  }
  .footer-box {
    position: absolute;
    bottom: 0;
    height: $footer-box-height;
    background-color: white;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
