<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="真实姓名" prop="name">
      <el-input v-model="ruleForm.name" placeholder="请输入真实姓名" />
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-select v-model="ruleForm.sex" placeholder="请选择性别">
        <el-option label="男" :value="0" />
        <el-option label="女" :value="1" />
      </el-select>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model="ruleForm.age" placeholder="请输入年龄" />
    </el-form-item>
    <el-form-item label="员工编号" prop="employeeNumber">
      <el-input
        v-model="ruleForm.employeeNumber"
        placeholder="请输入员工编号"
      />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email" placeholder="请输入邮箱" />
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="ruleForm.phone" placeholder="请输入手机号" />
    </el-form-item>

    <el-form-item label="所在区域" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请选择所在区域">
        <el-option label="北京" value="shanghai" />
        <el-option label="上海" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="个人简介" prop="desc">
      <el-input
        v-model="ruleForm.desc"
        type="textarea"
        placeholder="请输入您的个人简介，最多不超过200字。"
      />
    </el-form-item>
    <el-form-item class="text-center">
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        保存
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { ComponentSize, FormInstance, FormRules } from 'element-plus';

interface RuleForm {
  name: string;
  region: string;
  count: string;
  date1: string;
  date2: string;
  delivery: boolean;
  location: string;
  type: string[];
  resource: string;
  desc: string;
}

const formSize = ref<ComponentSize>('default');
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  username: '',
  name: '',
  sex: '',
  age: '',
  employeeNumber: '',
  email: '',
  phone: '',
  region: '',
  desc: '',
});

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  name: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
  employeeNumber: [
    { required: true, message: '请输入员工编号', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      type: 'email',
      message: 'Please input correct email',
      trigger: ['blur', 'change'],
    },
  ],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
  age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
<style lang="scss" scoped>
.zs-form {
  width: 600px;
  margin: 0 auto;
  padding: var(--zs-main-padding);
  box-sizing: border-box;
}
</style>
