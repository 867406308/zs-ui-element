<template>
  <div  class="login-container">
    <div class="login-container-left" :span="12"></div>
    <div class="login-container-right" :span="12">
      <div>
        <div class="right-title">智慧校园报修服务平台</div>
        <login-username />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import loginUsername from './components/login-username.vue'
</script>
<style lang="scss" scoped>
.login-container{
  background: white;
  display: flex;
  height: calc(100vh);
  &-left{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    // background-color: #3d7eff;
    background: url('@/assets/bg4.jpg') no-repeat;
    background-repeat: round;
    // background-position: center;
    background-size: contain;
  }
  &-right{
    width: 50%;
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-bottom: 40px;
    .right-title {
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }
  }
}
</style>