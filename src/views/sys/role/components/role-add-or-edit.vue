<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="!form.sysRoleId ? '新增' : '修改'"
    @close="close"
    :close-on-click-modal="false"
  >
    <el-form :model="form" ref="formRef" label-width="auto" :rules="rules">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="form.sort" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">停用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" :rows="2" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit(formRef)">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { getById, save, edit } from '@/api/sys/role';
import type { FormInstance, FormRules } from 'element-plus';
const emits = defineEmits(['query-data']);
const dialogFormVisible = ref(false);
const formRef = ref<FormInstance>();
const form = reactive({
  sysRoleId: '',
  roleName: '',
  sort: 0,
  status: 1,
  remark: '',
});
const rules = reactive<FormRules>({
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  sort: [{ required: true, message: '请选择排序', trigger: 'blur' }],
});
const init = () => {
  dialogFormVisible.value = true;
  if (form.sysRoleId) {
    nextTick(async () => {
      await getInfoById();
    });
  }
};
const getInfoById = async () => {
  const data = await getById(form.sysRoleId);
  Object.assign(form, data?.data);
  console.log('form', form);
};
const close = () => {
  formRef.value?.resetFields();
  dialogFormVisible.value = false;
};
const submit = (formRef: any) => {
  if (!formRef) return;
  formRef.validate(async (valid: any, fields: any) => {
    if (valid) {
      if (!form.sysRoleId) {
        console.log('保存!');
        await save(form);
      } else {
        console.log('修改!');
        await edit(form);
      }
      dialogFormVisible.value = false;
      emits('query-data');
    } else {
      console.log('error submit!', fields);
    }
  });
};
defineExpose({
  init,
  form,
});
// export default defineComponent({
//   emits: ['query-data'],
//   setup(props, { emit }) {
//     const state = reactive({
//       dialogFormVisible: false,
//       formRef: null,
//       form: {
//         sysRoleId: '',
//         type: 1,
//         name: '',
//         path: '',
//         title: '',
//         component: '',
//         icon: '',
//         permissions: '',
//       },
//       treeData: [],
//       rules: {
//         pid: [{ required: true, message: '请选择父级菜单', trigger: 'change' }],
//         name: [{ required: true, message: '请输入路由名', trigger: 'blur' }],
//         path: [{ required: true, message: '请输入路由路径', trigger: 'blur' }],
//         title: [{ required: true, message: '请输入路由名称', trigger: 'blur' }],
//         component: [{ required: true, message: '请输入vue组件路劲', trigger: 'blur' }],
//         icon: [{ required: true, message: '请选着图标', trigger: 'change' }],
//         permissions: [{ required: true, message: '请输入权限字符', trigger: 'blur' }],
//       },
//     });
//     const init = async () => {
//       state.dialogFormVisible = true;
//       nextTick(() => {
//         getTree();
//         if (state.form.sysRoleId) {
//           console.log('3aa', state);
//           getInfoById();
//         }
//       });
//     };
//     const click = (val) => {
//       state.form.icon = val;
//       state['popoverRef'].hide();
//     };
//     const getInfoById = async () => {
//       const data = await getById(state.form.sysRoleId);
//       state.form = {
//         ...data?.data,
//       };
//     };
//     const getTree = async () => {
//       const data = await getList();
//       state.treeData = [
//         {
//           title: '主类目',
//           sysRoleId: 0,
//           children: data?.data,
//         },
//       ];
//     };
//     const close = () => {
//       state.formRef.resetFields();
//       state.dialogFormVisible = false;
//       state.form = {
//         sysRoleId: '',
//         type: 1,
//         name: '',
//         path: '',
//         title: '',
//         component: '',
//         icon: '',
//         permissions: '',
//       };
//     };
//     const submit = (formRef) => {
//       if (!formRef) return;
//       state['formRef'].validate(async (valid, fields) => {
//         if (valid) {
//           if (!state.form.sysRoleId) {
//             console.log('保存!');
//             await save(state.form);
//           } else {
//             console.log('修改!');
//             await edit(state.form);
//           }
//           state.dialogFormVisible = false;
//           emit('query-data');
//         } else {
//           console.log('error submit!', fields);
//         }
//       });
//     };
//     return {
//       ...toRefs(state),
//       init,
//       getTree,
//       getInfoById,
//       close,
//       submit,
//       click,
//     };
//   },
// });
</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
