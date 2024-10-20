<template>
  <el-drawer
    v-model="dialogFormVisible"
    :title="titleType"
    @close="useUserAddOrEditStore.close"
    :close-on-click-modal="false"
    size="50%"
  >
    <template #default>
      <el-form
        :model="form"
        ref="formRef"
        label-width="auto"
        label-position="top"
        :rules="rules"
      >
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item label="头像" prop="avatar">
              <div v-if="!form.sysUserId">
                <el-upload
                  class="avatar-uploader"
                  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                  :show-file-list="false"
                  :on-success="useUserAddOrEditStore.handleAvatarSuccess"
                  :before-upload="useUserAddOrEditStore.beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <ZsIcon v-else icon="plus" class="avatar-uploader-icon" />
                </el-upload>
              </div>
              <div v-else>
                <el-avatar>{{ form.realName }}</el-avatar>
              </div>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row :gutter="10">
          <el-col :xl="12" :lg="12">
            <el-form-item label="账号" prop="username">
              <el-input
                v-model="form.username"
                placeholder="请输入账号"
                :formatter="(value) => value.replace(/[\W]/g, '')"
                :parser="(value) => value.replace(/[\W]/g, '')"
                minlength="5"
                maxlength="20"
                type="text"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12">
            <el-form-item
              label="密码"
              disabled
              :prop="!form.sysUserId ? 'password' : ''"
            >
              <el-input
                v-model="form.password"
                placeholder="请输入账号密码"
                type="password"
                :disabled="!form.sysUserId ? false : true"
                show-password
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xl="12" :lg="12">
            <el-form-item label="姓名" prop="realName">
              <el-input
                v-model="form.realName"
                placeholder="请输入姓名"
                minlength="2"
                maxlength="15"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12">
            <el-form-item label="性别" prop="sex">
              <el-select
                v-model="form.sex"
                placeholder="请选择性别"
                style="width: 100%"
              >
                <el-option label="男" :value="0"></el-option>
                <el-option label="女" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xl="12" :lg="12">
            <el-form-item label="手机号" prop="phone">
              <el-input
                v-model="form.phone"
                placeholder="请输入手机号"
                minlength="11"
                maxlength="11"
                :formatter="(value) => value.replace(/\D/g, '')"
                :parser="(value) => value.replace(/\D/g, '')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12">
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="form.email"
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xl="12" :lg="12">
            <el-form-item label="部门" prop="sysDeptId">
              <el-tree-select
                ref="deptRef"
                v-model="form.sysDeptId"
                :data="deptTree"
                :render-after-expand="false"
                :props="{
                  label: 'deptName',
                  value: 'sysDeptId',
                  children: 'children',
                }"
                style="width: 100%"
                placeholder="请选择所属部门"
                @change="useUserAddOrEditStore.handleDeptChange"
              >
              </el-tree-select>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12">
            <el-form-item label="岗位" prop="sysPostId">
              <el-select
                v-model="form.sysPostId"
                placeholder="请选择岗位"
                style="width: 100%"
              >
                <el-option
                  v-for="item in deptPostData"
                  :key="item.sysPostId"
                  :label="item.postName"
                  :value="item.sysPostId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xl="12" :lg="12">
            <el-form-item label="员工编号" prop="employeeNumber">
              <el-input
                v-model="form.employeeNumber"
                placeholder="请输入员工编号"
                minlength="1"
                maxlength="20"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12">
            <el-form-item label="角色" prop="roleIdList">
              <el-select
                v-model="form.roleIdList"
                multiple
                collapse-tags
                collapse-tags-tooltip
                placeholder="请选择角色"
                style="width: 100%"
              >
                <el-option
                  v-for="item in roleData"
                  :key="item.sysRoleId"
                  :label="item.roleName"
                  :value="item.sysRoleId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xl="12" :lg="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio :value="1">启用</el-radio>
                <el-radio :value="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col>
            <el-form-item label="部门任职">
              <user-post-table :dept-post-list="form.deptPostList" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="useUserAddOrEditStore.close">取消</el-button>
        <el-button
          type="primary"
          @click="useUserAddOrEditStore.submit(formRef, emits)"
          :loading="loading"
          >确定</el-button
        >
      </div>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
import { userAddOrEditStore } from '@/store/modules/sys/user/userAddOrEditStore';
import UserPostTable from './user-post-table.vue';
import { storeToRefs } from 'pinia';
const useUserAddOrEditStore = userAddOrEditStore();
const {
  dialogFormVisible,
  loading,
  formRef,
  deptTree,
  deptRef,
  roleData,
  form,
  rules,
  deptPostData,
} = storeToRefs(useUserAddOrEditStore);

const titleType = ref('新增用户');

const emits = defineEmits(['query-data']);

const changeTitle = (type: String) => {
  if (type === 'add') {
    titleType.value = '新增用户';
  } else if (type === 'detail') {
    titleType.value = '基本信息';
  } else if (type === 'edit') {
    titleType.value = '编辑用户';
  }
};

onMounted(async () => {
  // changeTitle();
  await useUserAddOrEditStore.getDeptList();
  await useUserAddOrEditStore.getRoleList();
});

defineExpose({
  init: useUserAddOrEditStore.init,
  form,
  changeTitle: changeTitle,
});
</script>
<style lang="scss" scoped>
.avatar-uploader {
  background-color: #f2f3f5;
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  .avatar-uploader-icon {
    font-size: 30px;
    color: #8c939d;
  }
}
</style>
