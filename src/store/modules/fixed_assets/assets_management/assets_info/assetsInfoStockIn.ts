import { defineStore } from 'pinia';
import { stockIn } from '@/api/fixed_assets/info';

export const assetsInfoStockInStore = defineStore('assetsInfoStockIn', {
  state: () => {
    return {
      ruleFormRef: ref<FormInstance>(),
      assetsInfoStockInVisible: false,
      loading: false,
      assetsInfoStockInForm: {
        // 会计凭证号
        accountingVoucher: '',
        // 入账日期
        entryDate: '',
        // 项目代码
        projectCode: '',
        // 发票号
        invoiceNumber: '',
        // 预登记的资产列表
        assetsInfoList: [],
      },
    };
  },
  getters: {
    rules() {
      return {
        accountingVoucher: [
          {
            required: true,
            message: '会计凭证号不能为空',
            trigger: 'blur',
          },
        ],
        entryDate: [
          {
            required: true,
            message: '入账日期不能为空',
            trigger: 'blur',
          },
        ],
        projectCode: [
          {
            required: true,
            message: '项目代码不能为空',
            trigger: 'blur',
          },
        ],
        invoiceNumber: [
          {
            required: true,
            message: '发票号不能为空',
            trigger: 'blur',
          },
        ],
        assetsInfoList: [
          {
            required: true,
            message: '预登记的资产列表不能为空',
            trigger: 'blur',
          },
        ],
      };
    },
  },
  actions: {
    init() {
      this.assetsInfoStockInVisible = true;
    },
    close() {
      this.assetsInfoStockInVisible = false;
    },
    submit(formRef, emits) {
      if (!formRef) return;
      formRef.validate(async (valid: any, fields: any) => {
        if (valid) {
          try {
            this.loading = true;
            await stockIn(this.assetsInfoStockInForm);
            this.assetsInfoStockInVisible = false;
            emits('query-data');
          } finally {
            this.loading = false;
          }
        } else {
          console.log('error submit!', fields);
        }
      });
    },
    removeRow(index: number) {
      this.assetsInfoStockInForm.assetsInfoList.splice(index, 1);
    },
  },
});
