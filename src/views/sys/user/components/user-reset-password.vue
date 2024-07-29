<template>
  <el-dialog
    v-model="resetPasswordVisible"
    title="密码重置"
    @close="useUserResetPasswordStore.resetPasswordCancel"
    :close-on-click-modal="false"
    width="40%"
  >
    <el-form
      :model="passwordForm"
      ref="passwordFormRef"
      label-width="auto"
      :rules="useUserResetPasswordStore.passwordRules"
    >
      <el-form-item label="新密码" prop="password">
        <el-input
          v-model="passwordForm.password"
          placeholder="请输入新密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="passwordForm.confirmPassword"
          placeholder="请再次输入新密码"
          type="password"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="useUserResetPasswordStore.resetPasswordCancel"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="useUserResetPasswordStore.resetPassword"
          :loading="loading"
          >确定</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { userStore } from '@/store/modules/sys/user/userStore';
import { storeToRefs } from 'pinia';
const useUserResetPasswordStore = userStore();
const { resetPasswordVisible, passwordForm, passwordFormRef, loading } =
  storeToRefs(useUserResetPasswordStore);
</script>
