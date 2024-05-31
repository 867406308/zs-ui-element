<!--顶部横向布局-->
<template>
  <div class="horizontal">
    <ZsMenu />
    <div class="main-content">
      <ZsNavBar />
      <ZsAppMain />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.horizontal {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.main-content {
  width: 100%;
}
</style>
