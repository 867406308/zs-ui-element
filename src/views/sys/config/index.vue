<template>
  <div class="config-container">
    <el-container>
      <el-main>
        <el-tabs v-model="activeName" tab-position="top">
          <el-tab-pane label="基本配置" name="base">
            <Website />
          </el-tab-pane>
          <el-tab-pane label="文件配置" name="file">
            <UploadFile />
          </el-tab-pane>
          <el-tab-pane label="短信配置" name="sms">Role</el-tab-pane>
          <el-tab-pane label="邮件配置" name="email">User</el-tab-pane>
          <el-tab-pane label="支付配置" name="pay"> </el-tab-pane>
          <el-tab-pane label="其他配置" name="other"> </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import UploadFile from './components/upload-file.vue';
import Website from './components/website.vue';
const activeName = ref('base');
const data = reactive([
  {
    type: '网站配置',
    isActive: '',
    details: [
      { label: '网站名称', value: '网站名称' },
      { label: '网站logo', value: '网站logo' },
      { label: '网站域名', value: '网站域名' },
      { label: '网站备案号', value: '网站备案号' },
      { label: '网站关键字', value: '网站关键字' },
      { label: '网站描述', value: '网站描述' },
      { label: '网站统计', value: '网站统计' },
      { label: '网站版权', value: '网站版权' },
      { label: '网站状态', value: '网站状态' },
    ],
  },
]);
</script>
<style lang="scss" scoped>
.config-container {
  height: 100% !important;
  min-height: calc($app-main-height);
}
</style>
