import { defineStore } from 'pinia';
import { queryAssetsInfoPage } from '@/api/fixed_assets/info';
import { getClassifySchoolTree } from '@/api/fixed_assets/classifySchool';
import { getDeptTree } from '@/api/sys/dept';
import { getUserList } from '@/api/sys/user';
import { userStore } from '@/store/modules/sys/user/userStore';

export const assetsInfoStore = defineStore('assetsInfo', {
  state: () => {
    return {
      ruleFormRef: ref<FormInstance>(),
      assetsInfoAddRef: ref<HTMLFormElement | null>(null),
      assetsInfoQueryRef: ref<HTMLFormElement | null>(null),
      assetsInfoCardRef: ref<HTMLFormElement | null>(null),
      assetsInfoStockInRef: ref<HTMLFormElement | null>(null),
      assetsInfoSelectedVisible: false,
      advancedQueryVisible: false,
      tableData: [],
      loading: false,
      total: 0,
      assetsInfoForm: {
        name: '',
        levelId: '',
        classicIdList: [],
        serialNoStart: '',
        serialNoEnd: '',
        priceStart: 0,
        priceEnd: 0,
        manageOrgId: '',
        manageUserId: '',
        useOrgId: '',
        useUserId: '',
        storageLocationDescription: '',
        entryDateStart: '',
        entryDateEnd: '',
        manufacturer: '',
        saveState: '',
        page: 1,
        size: 20,
        order: 'desc',
        orderField: 'create_datetime',
      },
      classicIds: [],
      deptTree: [],
      inDate: '',
      useUserName: '',
      selectedAssetsInfoList: [],
      manageUserList: [],
      useUserList: [],
    };
  },
  actions: {
    async queryData() {
      this.loading = true;
      const data = await queryAssetsInfoPage(this.assetsInfoForm);
      this.tableData = data?.data?.list ?? [];
      this.total = data?.data?.total ?? 0;
      this.loading = false;
    },
    handleSizeChange(val: number) {
      this.assetsInfoForm.size = val;
      this.queryData();
    },
    handleCurrentChange(val: number) {
      this.assetsInfoForm.page = val;
      this.queryData();
    },
    resetForm(formEl: FormInstance | undefined) {
      if (!formEl) return;
      formEl.resetFields();
      this.queryData();
    },
    resetQueryForm(formEl: FormInstance | undefined) {
      if (!formEl) return;
      formEl.resetFields();
      this.assetsInfoForm.serialNoStart = '';
      this.assetsInfoForm.serialNoEnd = '';
      this.assetsInfoForm.priceStart = 0;
      this.assetsInfoForm.priceEnd = 0;
      this.assetsInfoForm.entryDateStart = '';
      this.assetsInfoForm.entryDateEnd = '';
      this.inDate = '';
      this.queryData();
    },
    handleAdvancedQuery() {
      this.advancedQueryVisible = true;
    },
    close() {
      this.advancedQueryVisible = false;
    },
    // 获取资产分类树
    async queryClassifySchoolTree() {
      const data = await getClassifySchoolTree();
      this.classicIds = data?.data ?? [];
    },
    async querySysDeptTree() {
      const data = await getDeptTree();
      this.deptTree = data?.data ?? [];
    },
    handleDateChange(value) {
      if (!value) {
        this.assetsInfoForm.entryDateStart = '';
        this.assetsInfoForm.entryDateEnd = '';
      } else {
        this.assetsInfoForm.entryDateStart = value[0];
        this.assetsInfoForm.entryDateEnd = value[1];
      }
    },

    // 预登记
    handleAdd() {
      if (this.assetsInfoAddRef) {
        this.assetsInfoAddRef.init();
      }
    },
    // 资产卡片
    handleAssetsInfoCard(row: any) {
      if (this.assetsInfoCardRef) {
        this.assetsInfoCardRef.assetsInfoForm.id = row.id;
        this.assetsInfoCardRef.init();
      }
    },
    handleSelectionChange(val: any) {
      this.selectedAssetsInfoList = val;
    },
    // 资产入库
    handleStockIn(row: any) {
      const saveState = this.selectedAssetsInfoList.filter(
        (item) => item.saveState === 1,
      );
      if (this.selectedAssetsInfoList.length === 0 || saveState.length > 0) {
        ElMessageBox.confirm('请选择未入账得资产进行入库', '温馨提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {})
          .catch(() => {});
      } else {
        this.initStockInForm();
      }
    },
    // 管理部门change
    async changeManageOrg(row: any) {
      if (row) {
        const data = await getUserList({ sysDeptId: row });
        this.manageUserList = data?.data ?? [];
        this.assetsInfoForm.manageUserId = '';
      } else {
        this.manageUserList = [];
        this.assetsInfoForm.manageUserId = '';
      }
    },

    // 使用部门change
    async changeUseOrg(row: any) {
      console.log('change', row);
      if (row) {
        const data = await getUserList({ sysDeptId: row });
        this.useUserList = data?.data ?? [];
        this.assetsInfoForm.useUserId = '';
      } else {
        this.useUserList = [];
        this.assetsInfoForm.useUserId = '';
      }
    },
    initStockInForm() {
      if (this.assetsInfoStockInRef) {
        this.assetsInfoStockInRef.assetsInfoStockInForm.assetsInfoList =
          this.selectedAssetsInfoList;
        this.assetsInfoStockInRef.init();
      }
    },
    selectedInit() {
      console.log('abccba');
      this.$reset();
      this.assetsInfoSelectedVisible = true;
      this.querySysDeptTree();
      this.queryData();
    },
  },
});
