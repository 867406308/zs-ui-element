import { defineStore } from 'pinia';
import { dictDataList } from '@/api/sys/dict';
import { getClassifySchoolTree } from '@/api/fixed_assets/classifySchool';
import { getDeptTree } from '@/api/sys/dept';
import { getUserList } from '@/api/sys/user';
import { save } from '@/api/fixed_assets/info';

export const assetsInfoAddStore = defineStore('assetsInfoAdd', {
  state: () => {
    return {
      assetsInfoAddVisible: false,
      loading: false,
      ruleFormAddRef: ref<FormInstance>(),
      assetsInfoForm: {
        name: '',
        contractNumber: '',
        num: 0,
        buyPrice: 0.0,
        topLevelGbClassicId: '',
        classicId: '',
        levelId: '',
        formOfProcurementCode: '',
        unit: '',
        spec: '',
        brand: '',
        manufacturer: '',
        storageLocationDescription: '',
        // 折旧状态
        depreciationCode: '',
        // 可折旧月数
        depreciationMonths: 0,
        // 已折旧月数
        depreciatedMonths: 0,
        // 已折旧的金额
        depreciatedPrice: 0.0,
        // 附件
        attachedFile: '',
        // 描述
        description: '',
        // 采购部门
        buyOrgId: '',
        // 采购人
        buyUserId: '',
        // 验收部门
        acceptOrgId: '',
        // 验收人
        acceptUserId: '',
        // 验收日期
        acceptDate: '',
        // 验收单号
        stockCode: '',
        // 管理部门
        manageOrgId: '',
        // 管理人
        manageUserId: '',
        // 使用部门
        useOrgId: '',
        // 使用人
        useUserId: '',
      },
      formOfProcurementCodeList: [] as any[],
      unitList: [] as any[],
      depreciationCodeList: [] as any[],
      classicIds: [],
      buyUserList: [] as any[],
      acceptUserList: [] as any[],
      manageUserList: [] as any[],
      useUserList: [] as any[],
      deptTreeData: [],
    };
  },
  getters: {
    rules() {
      return {
        name: [
          {
            required: true,
            message: '请输入资产名称',
            trigger: 'blur',
          },
        ],
        levelId: [
          {
            required: true,
            message: '请选择资产等级',
            trigger: 'change',
          },
        ],
        classicId: [
          {
            required: true,
            message: '请选择资产分类',
            trigger: 'change',
          },
        ],
        formOfProcurementCode: [
          {
            required: true,
            message: '请选择资产采购形式',
            trigger: 'change',
          },
        ],
        depreciationCode: [
          {
            required: true,
            message: '请选择折旧状态',
            trigger: 'change',
          },
        ],
        buyOrgId: [
          {
            required: true,
            message: '请选择采购部门',
            trigger: 'change',
          },
        ],
        buyUserId: [
          {
            required: true,
            message: '请选择采购人',
            trigger: 'change',
          },
        ],
        acceptOrgId: [
          {
            required: true,
            message: '请选择验收部门',
            trigger: 'change',
          },
        ],
        acceptUserId: [
          {
            required: true,
            message: '请选择验收人',
            trigger: 'change',
          },
        ],
        acceptDate: [
          {
            required: true,
            message: '请选择验收日期',
            trigger: 'change',
          },
        ],
        stockCode: [
          {
            required: true,
            message: '请输入验收单号',
            trigger: 'blur',
          },
        ],
        manageOrgId: [
          {
            required: true,
            message: '请选择管理部门',
            trigger: 'change',
          },
        ],
        manageUserId: [
          {
            required: true,
            message: '请选择管理人',
            trigger: 'change',
          },
        ],
        useOrgId: [
          {
            required: true,
            message: '请选择使用部门',
            trigger: 'change',
          },
        ],
        useUserId: [
          {
            required: true,
            message: '请选择使用人',
            trigger: 'change',
          },
        ],
      };
    },
    total() {
      return parseFloat(
        this.assetsInfoForm.num * this.assetsInfoForm.buyPrice,
      ).toFixed(2);
    },
  },
  actions: {
    init() {
      this.assetsInfoAddVisible = true;
      this.queryFormOfProcurementCode();
      this.queryClassifySchoolTree();
      this.queryUnits();
      this.queryDepreciation();
      this.queryDeptTree();
    },
    close() {
      this.ruleFormAddRef.resetFields();
      this.assetsInfoAddVisible = false;
    },
    submit(formRef, emits) {
      if (!formRef) return;
      formRef.validate(async (valid: any, fields: any) => {
        if (valid) {
          try {
            this.loading = true;
            await save(this.assetsInfoForm);
            this.assetsInfoAddVisible = false;
            emits('query-data');
          } finally {
            this.loading = false;
          }
        } else {
          console.log('error submit!', fields);
        }
      });
    },
    // 获取资产分类树
    async queryClassifySchoolTree() {
      const data = await getClassifySchoolTree();
      this.classicIds = data?.data ?? [];
    },
    // 获取组织采购形式
    async queryFormOfProcurementCode() {
      const data = await dictDataList({ dictType: 'formOfProcurementCode' });
      this.formOfProcurementCodeList = data?.data ?? [];
    },
    // 获取计量单位字典
    async queryUnits() {
      const data = await dictDataList({ dictType: 'unit' });
      this.unitList = data?.data ?? [];
    },
    // 获取折旧状态字典
    async queryDepreciation() {
      const data = await dictDataList({ dictType: 'depreciationCode' });
      this.depreciationCodeList = data?.data ?? [];
    },
    // 获取部门树型结构
    async queryDeptTree() {
      const data = await getDeptTree();
      this.deptTreeData = data?.data ?? [];
    },
    // 采购部门change
    async changeBuyOrg(row: any) {
      const data = await getUserList({ sysDeptId: row });
      this.buyUserList = data?.data ?? [];
      this.assetsInfoForm.buyUserId = '';
    },
    // 验收部门change
    async changeAcceptOrg(row: any) {
      const data = await getUserList({ sysDeptId: row });
      this.acceptUserList = data?.data ?? [];
      this.assetsInfoForm.acceptUserId = '';
    },
    // 管理部门change
    async changeManageOrg(row: any) {
      const data = await getUserList({ sysDeptId: row });
      this.manageUserList = data?.data ?? [];
      this.assetsInfoForm.manageUserId = '';
    },
    // 使用部门change
    async changeUseOrg(row: any) {
      const data = await getUserList({ sysDeptId: row });
      this.useUserList = data?.data ?? [];
      this.assetsInfoForm.useUserId = '';
    },
  },
});
