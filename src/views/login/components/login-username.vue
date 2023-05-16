<template>
  <el-form
    :model="form"
    ref="formRef"
    @keyup.enter.native="dataFormSubmitHandle()"
    class="form"
    :rules="rules"
  >
    <el-form-item prop="username">
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
    <el-form-item prop="password">
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
          <el-checkbox>自动登录</el-checkbox>
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
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import { isPassword } from '@/utils/validator'
import { useUserStore } from '@/store/modules/sys/user'
export default defineComponent({
  setup() {
    const validateUsername = (rule, value, callback) => {
      if ('' === value) {
        callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!isPassword(value)) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    const state = reactive({
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
    })

    const router = useRouter()
    const { login } = useUserStore()
    // 表单提交
    const handleLogin = async () => {
      state['formRef'].validate(async (valid) => {
        if (valid)
          try {
            state.loading = true
            await login(state.form)
            router.push('/index')
          } finally {
            state.loading = false
          }
      })
    }
    return {
      ...toRefs(state),
      handleLogin,
    }
  },
})
</script>
<style lang="scss" scoped>
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
</style>
[{id: 1ee3fcb132dc4d40a9689bb88cb55ba5, personCode: 20120001020005, personName: 田可为, classCode: 32001, className: 2001, atSchool: 1, residence: 0, dormitoryNo: null, leaveType: 1, applyTime: 2023-05-16 15:54:02, startTime: 2023-05-16 15:53:00, endTime: 2023-05-16 16:53:00, days: 0.5, reason: 测试1111, status: 1, refuseReason: null, leaveSchoolTime: 2023-05-16 15:53:00, leaveStatus: 0, reviewer: null, phone: 18734804116, creater: 115, createDate: 2023-05-16 15:54:02, updater: 115, updateDate: 2023-05-16 15:54:02}]