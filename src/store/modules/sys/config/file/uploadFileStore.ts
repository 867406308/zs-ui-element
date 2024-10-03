import { defineStore } from 'pinia';
import { getUploadConfig, edit } from '@/api/sys/config';
import { ElMessage } from 'element-plus';

export const uploadFileStore = defineStore('uploadFile', {
  state: () => ({
    uploadFileRef: ref<FormInstance>(),
    uploadFileForm: {
      type: 1,
      local: {
        domain: '',
        prefix: '',
        path: '',
      },
      aliyun: {
        domain: '',
        prefix: '',
        endpoint: '',
        accessKeyId: '',
        accessKeySecret: '',
        bucketName: '',
      },
      tencent: {
        domain: '',
        prefix: '',
        path: '',
      },
      qiniu: {
        domain: '',
        prefix: '',
        path: '',
      },
    },
  }),
  getters: {
    rules() {
      return {
        type: [
          { required: true, message: '请选择存储类型', trigger: 'change' },
        ],
        local: {
          domain: [
            { required: true, message: '请输入访问域名', trigger: 'blur' },
          ],
          prefix: [
            { required: true, message: '请输入路径前缀', trigger: 'blur' },
          ],
          path: [
            { required: true, message: '请输入存储路径', trigger: 'blur' },
          ],
        },
        aliyun: {
          domain: [
            { required: true, message: '请输入访问域名', trigger: 'blur' },
          ],
          prefix: [
            { required: true, message: '请输入路径前缀', trigger: 'blur' },
          ],
          endpoint: [
            { required: true, message: '请输入EndPoint', trigger: 'blur' },
          ],
          accessKeyId: [
            { required: true, message: '请输入AccessKeyId', trigger: 'blur' },
          ],
          accessKeySecret: [
            {
              required: true,
              message: '请输入AccessKeySecret',
              trigger: 'blur',
            },
          ],
          bucketName: [
            { required: true, message: '请输入BucketName', trigger: 'blur' },
          ],
        },
        tencent: {},
      };
    },
  },
  actions: {
    async init() {
      const data = await getUploadConfig();
      Object.assign(this.uploadFileForm, data?.data);
    },
    submitForm(formEl: any) {
      if (!formEl) return;
      formEl.validate(async (valid: boolean) => {
        if (valid) {
          const dataForm = {
            configKey: 'sys_config_file',
            configValue: JSON.stringify(this.uploadFileForm),
          };
          await edit(dataForm)
            .then(() => {
              ElMessage({
                message: '保存成功',
                type: 'success',
                plain: true,
              });
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },
  },
});
