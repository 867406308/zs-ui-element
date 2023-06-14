<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="!form.sysPostId ? '新增' : '修改'"
    @close="close"
    :close-on-click-modal="false"
  >
    <el-form :model="form" ref="formRef" label-width="auto" :rules="rules">
      <el-form-item label="岗位名称" prop="postName">
        <el-input v-model="form.postName" placeholder="请输入岗位名称"></el-input>
      </el-form-item>
      <el-form-item label="所属部门" prop="sysDeptId">
        <el-tree-select
          v-model="form.sysDeptId"
          :data="treeData"
          check-strictly
          :props="{
            label: 'deptName',
            value: 'sysDeptId',
            children: 'children',
          }"
          style="width: 100%"
          placeholder="请选择所属部门"
        />
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
import { getList, getById, save, edit } from '@/api/sys/post';
import { getDeptTree } from '@/api/sys/dept';
import type { FormInstance, FormRules } from 'element-plus';
const emits = defineEmits(['query-data']);
const dialogFormVisible = ref(false);
const formRef = ref<FormInstance>();
let treeData: any[] = [];
const form = reactive({
  sysPostId: '',
  postName: '',
  sysDeptId: '',
  sort: 0,
  status: 1,
  remark: '',
});
const rules = reactive<FormRules>({
  sysDeptId: [{ required: true, message: '请选择所属部门', trigger: 'change' }],
  postName: [{ required: true, message: '请输入岗位名称', trigger: 'blur' }],
  sort: [{ required: true, message: '请选择排序', trigger: 'blur' }],
});
onMounted(() => {
  selectDeptTree();
});
const init = () => {
  dialogFormVisible.value = true;
  if (form.sysPostId) {
    nextTick(async () => {
      await getInfoById();
    });
  }
};
const getInfoById = async () => {
  const data = await getById(form.sysPostId);
  Object.assign(form, data?.data);
  console.log('form', form);
};
const selectDeptTree = async () => {
  const data = await getDeptTree();
  Object.assign(treeData, data?.data);
};
const close = () => {
  formRef.value?.resetFields();
  dialogFormVisible.value = false;
};
const submit = (formRef: any) => {
  if (!formRef) return;
  formRef.validate(async (valid: any, fields: any) => {
    if (valid) {
      if (!form.sysPostId) {
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
