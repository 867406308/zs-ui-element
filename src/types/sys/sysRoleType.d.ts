declare interface sysRoleType {
  sysRoleForm: sysRoleAddType;
  ruleFormRef: any;
  tableData: any;
  total: any;
  dialogFormVisible: any;
  formRef: any;
}

declare interface sysRoleAddType {
  // 主键id
  sysRoleId: number;
  // 角色名称
  roleName: string;
  // 备注
  remark?: string;
  // 排序
  sort?: number;
  // 状态
  status: number;
}
