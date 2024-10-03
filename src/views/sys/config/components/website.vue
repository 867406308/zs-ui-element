<template>
  <div class="website">
    <el-container>
      <el-main>
        <el-form
          ref="formRef"
          :model="website"
          label-width="auto"
          label-position="top"
          :rules="useWebsiteStore.rules"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="系统logo">
                <el-upload
                  class="logo-uploader"
                  action="#"
                  :show-file-list="false"
                  list-type="picture"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                >
                  <img v-if="website.logo" :src="website.logo" class="logo" />
                  <el-icon v-else class="logo-uploader-icon">
                    <Plus />
                  </el-icon>
                  <template #tip>
                    <div class="el-upload__tip">
                      建议尺寸：100*100像素，支持jpg，jpeg，png格式
                    </div>
                  </template>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                  <img w-full :src="website.logo" alt="Preview Image" />
                </el-dialog>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="系统名称" prop="websiteName">
                <el-input
                  v-model="website.websiteName"
                  maxlength="20"
                  show-word-limit
                  placeholder="请输入系统名称"
                  @input="handleWebsiteNameInput"
                />
              </el-form-item>
              <el-form-item label="系统描述">
                <el-input
                  v-model="website.description"
                  maxlength="100"
                  show-word-limit
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  placeholder="请描述系统"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="系统版本">
                <el-input v-model="website.version" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="系统版权">
                <el-input v-model="website.copyright" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="系统备案">
                <el-input v-model="website.icp" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备案链接">
                <el-input v-model="website.icpLink" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="隐私政策">
                <ZsEditor
                  ref="privacyPolicyRef"
                  v-model="website.privacyPolicy"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="服务条款">
                <ZsEditor
                  ref="termsOfServiceRef"
                  v-model="website.termsOfService"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="useWebsiteStore.save(website)">
              保存
            </el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { websiteStore } from '@/store/modules/sys/config/website/websiteStore';
import { storeToRefs } from 'pinia';
import { useTitle } from '@vueuse/core';

const useWebsiteStore = websiteStore();
const { website, formRef } = storeToRefs(useWebsiteStore);

const dialogVisible = ref(false);

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  website.logo.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/gif'
  ) {
    ElMessage.error('Avatar picture must be JPG format!');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }
  return true;
};
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  website.logo.value = uploadFile.url!;
  dialogVisible.value = true;
};

const privacyPolicyRef = ref(null);
const termsOfServiceRef = ref(null);

const handleWebsiteNameInput = (value: string) => {
  useTitle(value);
};

onMounted(() => {
  useWebsiteStore.init();
});
</script>
<style lang="scss" scoped>
.website {
  background-color: var(--zs-bg-color);
}
.logo {
  height: 100px;
  width: 100px;
}

.logo-uploader {
  :deep() {
    .zs-upload {
      --zs-upload-picture-card-size: 100px;
    }
  }
  .el-upload__tip {
    color: var(--zs-text-color-placeholder);
  }
}
</style>
