<template>
  <div class="login">
    <div class="container">
      <div class="login-body">
        <div class="login-left">
          <ZsLogo />
        </div>
        <div class="login-right">
          <div class="login-title">欢迎登录</div>
          <loginUsername />
        </div>
      </div>
      <div class="login-footer">
        <ZsFooter />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import loginUsername from './components/login-username.vue';
import { storeToRefs } from 'pinia';
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  // background-color: var(--zs-color-primary);
  background-image: url('@/assets/images/bj26.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 643px;
    width: 1000px;
    padding: 0;
    z-index: 1;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    .login-body {
      height: 574px;
      display: flex;
      margin: auto;
      width: inherit;
      position: relative;
      -webkit-box-shadow: 0px 20px 80px 0px rgba(0, 0, 0, 0.3);
      box-shadow: 0px 20px 80px 0px rgba(0, 0, 0, 0.3);

      .login-left {
        margin: 0 auto;
        width: 50%;
        height: 100%;
        box-sizing: border-box;
        color: #fff;
        position: relative;
        padding: 80px 80px 48px;
        // background: linear-gradient(0deg, #3a485a 0%, #607089 100%);
        background-image: url('@/assets/images/d14.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        position: relative;

        &::after {
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-image: url('@/assets/images/c1.png');
          background-repeat: no-repeat;
          background-size: 100%;
          background-position: center;
          position: relative;
        }

        .logo {
          position: absolute;
          top: 10px;
          left: 10px;
        }
      }
      .login-right {
        margin: 0 auto;
        width: 50%;
        height: 100%;
        padding: 64px 70px 48px;
        position: relative;
        box-sizing: border-box;
        background-color: var(--zs-bg-color);

        .login-title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 40px;
          color: var(--zs-text-color-primary);
          text-align: left;
          @media screen and (max-width: 768px) {
            font-size: 18px;
          }
        }
      }
    }
    .login-footer {
      margin-top: 50px;
      text-align: center;
      color: var(--zs-text-color-primary);

      .footer-text {
        background-color: transparent;
      }
    }
  }
}
</style>
