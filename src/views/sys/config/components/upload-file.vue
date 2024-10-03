<template>
  <el-container>
    <el-main>
      <el-form
        ref="uploadFileRef"
        label-width="130px"
        :model="uploadFileForm"
        :rules="useUploadFileStore.rules"
        status-icon
      >
        <el-form-item label="上传类型">
          <el-radio-group v-model="uploadFileForm.type">
            <el-radio-button label="本地上传" :value="1" />
            <el-radio-button label="阿里云" :value="2" />
            <el-radio-button label="腾讯云" :value="3" />
            <el-radio-button label="七牛云" :value="4" />
          </el-radio-group>
        </el-form-item>
        <el-row v-if="uploadFileForm.type === 1">
          <el-col :span="12">
            <el-form-item label="访问域名" prop="local.domain">
              <el-input
                v-model="uploadFileForm.local.domain"
                placeholder="访问的域名，如:http://localhost:8080"
              />
            </el-form-item>
            <el-form-item label="路径前缀">
              <el-input
                v-model="uploadFileForm.local.prefix"
                placeholder="文件访问前缀"
              />
            </el-form-item>
            <el-form-item label="存储路径" prop="local.path">
              <el-input
                v-model="uploadFileForm.local.path"
                placeholder="如：D:/upload"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="uploadFileForm.type === 2">
          <el-col :span="12">
            <el-form-item label="访问域名">
              <el-input
                v-model="uploadFileForm.aliyun.domain"
                placeholder="请输入内容"
              />
            </el-form-item>
            <el-form-item label="路径前缀">
              <el-input
                v-model="uploadFileForm.aliyun.prefix"
                placeholder="请输入内容"
              />
            </el-form-item>
            <el-form-item label="EndPoint">
              <el-input
                v-model="uploadFileForm.aliyun.endPoint"
                placeholder="请输入内容"
              />
            </el-form-item>
            <el-form-item label="AccessKeyId">
              <el-input
                v-model="uploadFileForm.aliyun.accessKeyId"
                placeholder="请输入内容"
              />
            </el-form-item>
            <el-form-item label="AccessKeySecret">
              <el-input
                v-model="uploadFileForm.aliyun.accessKeySecret"
                placeholder="请输入内容"
              />
            </el-form-item>
            <el-form-item label="BucketName">
              <el-input
                v-model="uploadFileForm.aliyun.bucketName"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="uploadFileForm.type === 3">
          <el-col :span="12">
            <el-form-item label="访问域名">
              <el-input
                v-model="uploadFileForm.tencent.domain"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button
            type="primary"
            @click="useUploadFileStore.submitForm(uploadFileRef)"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import { uploadFileStore } from '@/store/modules/sys/config/file/uploadFileStore';
import { storeToRefs } from 'pinia';

const useUploadFileStore = uploadFileStore();
const { uploadFileRef, uploadFileForm } = storeToRefs(useUploadFileStore);

onMounted(() => {
  useUploadFileStore.init();
});
</script>
