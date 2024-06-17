<template>
  <div class="quick-access">
    <div class="header">
      <div class="title">
        <span>快捷入口</span>
      </div>
      <div>
        <ZsIcon icon="arrow-right" />
      </div>
    </div>
    <div class="content">
      <el-space wrap>
        <div v-for="i in 10" :key="i">
          <el-button text> Text button </el-button>
        </div>
      </el-space>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.quick-access {
  height: 260px;
  background-color: var(--zs-bg-color);

  .header {
    height: 30px;
    padding: 10px 10px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      display: flex;
      justify-content: start;
      align-items: center;
      div {
        margin-right: 5px;
      }
    }
  }
  .content {
    padding: 0px 20px;
  }
}
</style>
