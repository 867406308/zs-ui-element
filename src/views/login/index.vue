<template>
  <div class="login">
    <div class="login-header">
      <zs-logo />
      <!-- <div>
        <span>app下载</span>
        <span>联系我们</span>
      </div> -->
    </div>
    <div class="login-container">
      <div class="content">
        <div class="title">Hi,欢迎登录</div>
        <div class="sub-title">您的支持是我最大的动力</div>
        <login-username />
      </div>
      <div class="footer">
        <el-divider content-position="center">其他方式登录</el-divider>
        <div class="other-ways">
          <img src="@/assets/icons/login/alipay.svg" />
          <img src="@/assets/icons/login/wechat.svg" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import loginUsername from './components/login-username.vue';
</script>
<style lang="scss" scoped>
.login {
  background: white;
  display: flex;
  height: calc(100vh);
  background-image: url('@/assets/z23.png');
  // background-repeat: round;
  background-size: cover;
  background-position: 100%;

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $nav-height;
    width: 100%;
    .logo {
      display: flex;
      justify-content: flex-start;
      margin-left: 20px;
    }
  }

  &-container {
    position: absolute;
    top: 22%;
    left: 10%;
    min-height: 500px;
    line-height: 22px;

    .content {
      background-color: #fff;
      padding: 30px;
      border-radius: 4px;
      width: 350px;

      .title {
        font-weight: bold;
        font-size: 36px;
        line-height: 50px;
      }

      .sub-title {
        color: #86909c;
      }
    }
    .footer {
      img {
        cursor: pointer;
        margin-left: 10px;
        width: 1.5em;
        height: 1.5em;
      }
      .other-ways {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
