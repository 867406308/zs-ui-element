<template>
  <div class="login-container">
    <div class="login-container-right" :span="12">
      <zs-logo />
      <div class="content">
        <div class="title">Hi,欢迎登录</div>
        <div class="sub-title">您的支持是我最大的动力</div>
        <login-username />
      </div>
      <!-- <div class="footer">
        <el-divider content-position="center">其他方式登录</el-divider>
        <div>
          <img src="@/assets/icons/login/alipay.svg" />
          <img src="@/assets/icons/login/wechat.svg" />
        </div>
      </div> -->
    </div>
    <div class="login-container-left" :span="12">
      <div></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import loginUsername from './components/login-username.vue';
</script>
<style lang="scss" scoped>
.login-container {
  background: white;
  display: flex;
  height: calc(100vh);
  background-image: url('@/assets/zbj1.jpg');
  // background-repeat: round;
  background-size: cover;
  background-position: 100%;
  &-left {
    // background-color: aliceblue !important;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 6;
  }
  &-right {
    position: relative;
    display: flex;
    flex: 4;
    align-items: center;
    justify-content: center;
    padding-bottom: 40px;
    flex-direction: column;

    .logo {
      position: absolute;
      top: 20px;
      left: 20px;
    }
    .content {
      background-color: #fff;
      padding: 30px;
      border-radius: 4px;
      width: 350px;

      .logo {
        margin-bottom: 40px;

        .system-title {
          justify-content: flex-start !important;
        }
      }

      .title {
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 10px;
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
    }
  }
}
</style>
