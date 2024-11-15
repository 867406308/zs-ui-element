import { defineStore } from 'pinia';
import Decimal from 'decimal.js';
import { add } from '@/api/fixed_assets/scrap';
import { getBySerialNoList } from '@/api/fixed_assets/info';

export const assetsScrapAddStore = defineStore('assetsScrapAdd', {
  state: () => {
    return {
      assetsInfoSelectedRef: ref<HTMLFormElement | null>(null),
      assetsScrapAddVisible: false,
      ruleFormAddRef: ref<FormInstance>(),
      assetsInfoBatchImportRef: ref<HTMLFormElement | null>(null),
      assetsInfoBatchImportVisible: false,
      assetsScrapForm: {
        amount: 0,
        applyDate: '',
        applyUser: '',
        approveDate: '',
        approveFile: '',
        approveOrg: '',
        approveSerialNo: '',
        receiver: '',
        scrapDate: '',
        serialNo: '',
        totalPrice: new Decimal(0.0).toFixed(2),
        serialNoList: [] as any[],
      },
      submitLoading: false,
      assetsInfoData: [] as set[],
      assetsInfoPageData: [] as any[],
      loading: false,
      total: 0,
      assetsInfoForm: {
        page: 1,
        size: 10,
      },
      // 批量导入
      assetsInfoSerialNoImport: '',
    };
  },
  getters: {
    rules() {
      return {
        applyDate: [
          { required: true, message: '请选择申请日期', trigger: 'change' },
        ],
        applyUser: [
          { required: true, message: '请选择申请人', trigger: 'blur' },
        ],
        receiver: [
          { required: true, message: '请选择领料人', trigger: 'blur' },
        ],
        approveSerialNo: [
          { required: true, message: '请输入批准文号', trigger: 'blur' },
        ],
        approveFile: [
          { required: true, message: '请上传批准文件', trigger: 'change' },
        ],
        approveOrg: [
          { required: true, message: '请输入批准单位', trigger: 'blur' },
        ],
        approveDate: [
          { required: true, message: '请选择批准日期', trigger: 'change' },
        ],
      };
    },
  },
  actions: {
    init() {
      this.$reset();
      this.assetsScrapAddVisible = true;
    },
    close() {},
    handleSizeChange(val: number) {
      this.assetsInfoForm.size = val;
      this.assetsInfoData = this.assetsInfoPageData.slice(
        0,
        this.assetsInfoForm.size,
      );
    },
    handleCurrentChange(val: number) {
      this.assetsInfoForm.page = val;
      this.assetsInfoData = this.assetsInfoPageData.slice(
        (this.assetsInfoForm.page - 1) * this.assetsInfoForm.size,
        this.assetsInfoForm.page * this.assetsInfoForm.size,
      );
    },
    importAssets() {
      this.assetsInfoBatchImportVisible = true;
    },
    openAssetsSelect() {
      if (this.assetsInfoSelectedRef) {
        this.assetsInfoSelectedRef.init();
      }
    },
    handleSelectedChange(val: any) {
      this.assetsInfoData = val;
      this.total = val.length;
      this.assetsScrapForm.serialNoList = val.map((item: any) => item.serialNo);
      this.sumAmount();
    },
    handleRemoveSelected(index: number, row: any) {
      this.assetsInfoData.splice(index, 1);
      this.total = this.assetsInfoData.length;
      this.sumAmount();
    },
    sumAmount() {
      // 计算报废资产金额总计
      let totalBuyPrice = this.assetsInfoData.reduce(
        (accumulator, currentAsset) => {
          return accumulator + (currentAsset.buyPrice || 0);
        },
        0,
      );
      this.assetsScrapForm.totalPrice = new Decimal(totalBuyPrice).toFixed(2);
    },
    /**
     * 批量导入
     */
    async importAssetsInfoSubmit() {
      if (this.assetsInfoSerialNoImport) {
        const serialNoList = this.assetsInfoSerialNoImport
          .trim()
          .replace(/\s*/g, '')
          .split(',');
        // 根据serialNoList查询资产信息
        const data = await getBySerialNoList({
          serialNoList: serialNoList,
        });
        this.assetsInfoData = data.data ?? [];
        this.total = this.assetsInfoData.length;
        this.assetsScrapForm.serialNoList = data.data.map(
          (item: any) => item.serialNo,
        );
        this.sumAmount();
      }
      this.assetsInfoBatchImportVisible = false;
    },
    // 提交
    handleSubmit(formRef, emits) {
      if (!formRef) return;
      formRef.validate(async (valid: any, fields: any) => {
        if (valid) {
          try {
            this.submitLoading = true;
            this.assetsScrapForm.amount = this.assetsInfoData.length;
            const res = await add(this.assetsScrapForm);
            if (res) {
              this.assetsScrapAddVisible = false;
              emits('query-data');
            }
          } finally {
            this.submitLoading = false;
          }
        } else {
          console.log('error submit!', fields);
        }
      });
    },
  },
});
