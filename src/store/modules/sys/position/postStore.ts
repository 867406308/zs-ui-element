import { defineStore } from 'pinia';
import { postPage, del, getList } from '@/api/sys/post.ts';
import { getDeptTree } from '@/api/sys/dept.ts';

export const postStore = defineStore('post', {
  state: () => {
    return {
      ruleFormRef: ref<FormInstance>(),
      deptRef: ref<InstanceType<typeof ElTree>>(),
      addEditRef: ref<HTMLFormElement | null>(null),
      tableData: [],
      deptTreeData: [],
      expandedKeys: [],
      loading: false,
      total: 0,
      form: {
        sysDeptId: '',
        postName: '',
        status: '',
        page: 1,
        size: 20,
        order: 'asc',
        orderField: 'sort',
      },
      postList: [],
    };
  },
  actions: {
    async queryData() {
      this.loading = true;
      const data = await postPage(this.form);
      this.tableData = data?.data?.list ?? [];
      this.total = data?.data?.total ?? 0;
      this.loading = false;
    },
    async queryList() {
      const data = await getList();
      this.postList = data?.data ?? [];
    },
    handleSizeChange(val: number) {
      this.form.size = val;
      this.queryData();
    },
    handleCurrentChange(val: number) {
      this.form.page = val;
      this.queryData();
    },
    handleAddOrEdit(row: any) {
      if (this.addEditRef) {
        this.addEditRef.form.sysPostId = row?.sysPostId;
        this.addEditRef.init();
      }
    },
    handleDelete(row: any) {
      if (row.sysPostId) {
        ElMessageBox.confirm('您将进行删除操作,是否继续?', '温馨提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            await del(row.sysPostId);
            this.queryData();
          })
          .catch(() => {});
      }
    },

    resetForm(formEl: FormInstance | undefined) {
      if (!formEl) return;
      formEl.resetFields();
      this.queryData();
    },
    /**
     * 获取部门树型结构
     */
    async getDeptList() {
      const data = await getDeptTree();
      const treeData = data?.data ?? [];
      treeData.forEach((element: any) => {
        this.expandedKeys.push(element.sysDeptId as never);
      });
      Object.assign(this.deptTreeData, treeData);
    },
    handleNodeClick(data: any) {
      this.form.sysDeptId = data.sysDeptId;
      this.queryData();
    },
  },
});
