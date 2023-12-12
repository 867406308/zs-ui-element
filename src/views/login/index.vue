<template>
  <div class="login">
    <el-row>
      <el-col
        :xl="12"
        :lg="12"
        :md="12"
        :sm="12"
        class="login-background"
      ></el-col>
      <el-col :xl="12" :lg="12" :md="12" :sm="12" class="login-main">
        <div class="login-container">
          <!-- <div class="login-logo">
            <div class="login-title">hello,欢迎登陆ZsAdmin</div>
          </div> -->
          <div class="login-title">用户登录</div>
          <loginUsername />
          <div class="main-footer">
            <el-divider>其他方式登录</el-divider>
            <div class="login-icon">
              <img src="@/assets/icons/login/alipay.svg" />
              <img src="@/assets/icons/login/wechat.svg" />
              <img src="@/assets/icons/login/gitee.svg" />
              <img src="@/assets/icons/login/github.svg" />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import loginUsername from './components/login-username.vue';
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  background-color: #fff;

  .zs-row {
    height: 100%;
    overflow: auto;

    .login-background {
      background-image: url('@/assets/25.png');
      background-repeat: round;
      background-size: contain;
    }

    .login-main {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .login-container {
        width: 50%;
        height: 100%;
        background-color: #fff;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .login-logo {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 20px;
          align-items: center;
          img {
            width: 2em;
            height: 2em;
          }
          .login-title {
            font-size: 2em;
            color: #0064c8;
          }
        }
        .login-title {
          color: #0064c8;
          font-size: 30px;
        }
        .main-footer {
          width: 100%;

          .login-icon {
            display: flex;
            justify-content: space-between;
            img {
              cursor: pointer;
              margin-left: 10px;
              width: 2em;
              height: 2em;
            }
          }
        }
      }
    }
  }
}
</style>
