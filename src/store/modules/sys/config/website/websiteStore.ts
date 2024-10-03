import { defineStore } from 'pinia';
import { getWebsiteInfo, edit } from '@/api/sys/config';
import { ElMessage } from 'element-plus';

export const websiteStore = defineStore('website', {
  state: () => ({
    formRef: null,
    website: {
      websiteName: 'My Website',
      description: 'This is my website',
      logo: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      favicon: 'https://via.placeholder.com/32',
      version: 'v1.0.0',
      copyright: '© 2023 My Website',
      // 备案号
      icp: '京ICP备00000000号',
      // 备案号链接
      icpLink: 'https://beian.miit.gov.cn/',
      // 隐私政策
      privacyPolicy: 'https://example.com/privacy-policy',
      // 服务条款
      termsOfService: 'https://example.com/terms-of-service',
    },
  }),
  getters: {
    rules() {
      return {
        websiteName: [
          { required: true, message: '请输入网站名称', trigger: 'blur' },
        ],
        description: [
          { required: true, message: '请输入网站描述', trigger: 'blur' },
        ],
        logo: [{ required: true, message: '请上传网站logo', trigger: 'blur' }],
      };
    },
  },
  actions: {
    setWebsite(website: any) {
      this.website = website;
    },
    async init() {
      const data = await getWebsiteInfo();
      Object.assign(this.website, data?.data);
    },
    async save() {
      const dataForm = {
        configKey: 'sys_config_website',
        configValue: JSON.stringify(this.website),
      };
      await edit(dataForm);
      ElMessage({
        message: '保存成功',
        type: 'success',
        plain: true,
      });
    },
  },
});
