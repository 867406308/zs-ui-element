<template>
  <div class="form-container">
    <el-form
      :model="form"
      ref="formRef"
      class="form"
      :rules="rules"
      label-position="top"
    >
      <el-form-item prop="username" label="用户名">
        <el-input
          v-model="form.username"
          placeholder="用户名"
          class="username"
          size="large"
        >
          <template #prefix>
            <ZsIcon icon="user"></ZsIcon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="密码"
          size="large"
          show-password
        >
          <template #prefix>
            <ZsIcon icon="lock"></ZsIcon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <div class="tools">
          <div>
            <el-checkbox>记住我</el-checkbox>
          </div>
          <div>
            <el-link type="primary" :underline="false">忘记密码</el-link>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          @click="handleLogin()"
          class="w-percent-100"
          style="width: 100%"
          size="large"
          :disabled="!checked"
          >登录</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="checked"></el-checkbox>
        <span style="margin-left: 1px">我已阅读并同意</span>
        <el-link
          type="primary"
          :underline="false"
          @click="handlePrivacyPolicy()"
          >《用户协议》</el-link
        >
        <span style="margin-left: 1px">和</span>
        <el-link
          type="primary"
          :underline="false"
          @click="handleTermsOfService()"
          >《隐私政策》</el-link
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { isPassword } from '@/utils/validator';
import { loginStore } from '@/store/modules/common/loginStore';
export default defineComponent({
  setup() {
    const validateUsername = (rule, value, callback) => {
      if ('' === value) {
        callback(new Error('账号不能为空'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!isPassword(value)) {
        callback(new Error('密码不能少于6位'));
      } else {
        callback();
      }
    };
    const state = reactive({
      checked: false,
      loading: false,
      formRef: null,
      form: {
        username: 'admin',
        password: '123456',
      },
      rules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            validator: validateUsername,
          },
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePassword,
          },
        ],
      },
    });

    const router = useRouter();
    const { login } = loginStore();
    // 表单提交
    const handleLogin = async () => {
      state['formRef'].validate(async (valid) => {
        if (valid)
          try {
            state.loading = true;
            await login(state.form);

            router.push('/home');
          } finally {
            state.loading = false;
          }
      });
    };
    // 隐私政策
    const handlePrivacyPolicy = () => {
      // 在新的页面打开并且显示内容
      window.open('/privacy-policy', '_blank');
    };
    // 服务条款
    const handleTermsOfService = () => {
      // 在新的页面打开并且显示内容
      window.open('/terms-of-service', '_blank');
    };
    return {
      ...toRefs(state),
      handleLogin,
      handlePrivacyPolicy,
      handleTermsOfService,
    };
  },
});
</script>
<style lang="scss" scoped>
.form-container {
  // background-color: #fff;
  // padding: 20px;
  width: 100%;
  .zs-form {
    padding-top: 20px;
    .zs-form-item__content {
      .tools {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }

    .zs-icon {
      height: 1.5em;
      width: 1.5em;
      svg {
        height: 1.5em;
        width: 1.5em;
      }
    }
  }
}
.zs-checkbox {
  margin-right: 5px;
}
</style>
