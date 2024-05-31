import { defineStore } from 'pinia';
import { getById, save, edit } from '@/api/sys/user';
import { getDeptTree } from '@/api/sys/dept';
import { getList as getRoleData } from '@/api/sys/role';
import { getList as getPostList } from '@/api/sys/post';
import { da } from 'element-plus/es/locale';

export const userAddOrEditStore = defineStore('userAddOrEditStore', {
  state: () => {
    return {
      dialogFormVisible: false,
      loading: false,
      formRef: ref<FormInstance>(),
      deptRef: ref<TreeSelectInstance>(),
      deptTableRef: ref<TreeSelectInstance>(),
      treeSelectRef: ref<TreeSelectInstance>(),
      deptTree: [] as any,
      postData: [] as any,
      deptPostData: [] as any,
      roleData: [] as any,
      deptPostTableData: [] as any,
      form: {
        sysUserId: '',
        avatar: '',
        username: '',
        password: '',
        realName: '',
        sex: 0,
        age: 0,
        phone: '',
        email: '',
        employeeNumber: '',
        sysDeptId: '',
        sysPostId: '',
        deptPostList: [],
        roleIdList: [],
        status: 1,
      },
      imageUrl: '',
    };
  },
  getters: {
    rules() {
      return {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 5, max: 20, message: '账号长度为5到20', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@#!%^*?&+-])[A-Za-z\d$@#!%^*?&+-]{8,}/,
            message: '密码应当至少8位且含有数字、大小写字母及特殊字符',
          },
        ],
        realName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 15, message: '姓名长度为1到15', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[34578]\d{9}$/,
            message: '手机号格式不正确',
          },
        ],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
      };
    },
  },
  actions: {
    // 初始化
    init() {
      this.dialogFormVisible = true;
      this.getDeptList();
      this.getPostList();
      this.getRoleList();
      if (this.form.sysUserId) {
        nextTick(async () => {
          await this.getInfoById();
        });
      }
    },
    // 获取详情
    async getInfoById() {
      const { data } = await getById(this.form.sysUserId);
      this.deptRef.$emit('change', data.sysDeptId);
      this.deptPostTableData = data.deptPostList.map((newDeptPost) => {
        return this.postData.filter(
          (item) => item.sysDeptId === newDeptPost.sysDeptId,
        );
      });

      Object.assign(this.form, data);
    },
    // 部门树型
    async getDeptList() {
      const data = await getDeptTree();
      this.deptTree = data?.data ?? [];
    },
    // 岗位列表
    async getPostList() {
      const data = await getPostList();
      this.postData = data?.data ?? [];
    },
    // 角色列表
    async getRoleList() {
      const data = await getRoleData();
      this.roleData = data?.data ?? [];
    },
    // 窗口关闭
    close() {
      this.formRef.resetFields();
      this.form.deptPostList = [];
      this.dialogFormVisible = false;
    },
    // 提交
    async submit(formRef, emits) {
      if (!formRef) return;
      formRef.validate(async (valid: any, fields: any) => {
        if (valid) {
          try {
            this.loading = true;
            if (!this.form.sysUserId) {
              await save(this.form);
            } else {
              await edit(this.form);
            }
            this.dialogFormVisible = false;
            this.loading = false;
            this.deptPostTableData = [];
            emits('query-data');
          } finally {
            this.loading = false;
          }
        } else {
          console.log('error submit!', fields);
        }
      });
    },
    handleAvatarSuccess(response, uploadFile) {
      imageUrl.value = URL.createObjectURL(uploadFile.raw!);
    },
    beforeAvatarUpload(rawFile) {
      if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!');
        return false;
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!');
        return false;
      }
      return true;
    },
    // 部门change
    handleDeptChange(value) {
      this.deptPostData = [];
      this.form.sysPostId = '';
      if (value) {
        // 根据部门查询岗位
        this.deptPostData = this.postData.filter((item: any) => {
          return item.sysDeptId === value;
        });
      }
    },
    // 任职信息部门change
    handleDeptTableChange(value, row, index) {
      this.deptPostTableData[index] = [];
      row.sysPostId = '';
      if (value) {
        this.deptPostTableData[index] = this.postData.filter((item: any) => {
          return item.sysDeptId === value;
        });
      }
    },
  },
});
