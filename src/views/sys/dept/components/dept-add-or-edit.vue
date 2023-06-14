<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="!form.sysDeptId ? '新增' : '修改'"
    @close="close"
    :close-on-click-modal="false"
  >
    <el-form :model="form" ref="formRef" label-width="auto" :rules="rules">
      <el-form-item label="父级菜单" prop="pid">
        <el-tree-select
          v-model="form.pid"
          :data="treeData"
          check-strictly
          :props="{
            label: 'deptName',
            value: 'sysDeptId',
            children: 'children',
          }"
          style="width: 100%"
          placeholder="请选择父级菜单"
        />
      </el-form-item>
      <el-form-item label="部门名称" prop="deptName">
        <el-input v-model="form.deptName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="部门负责人" prop="deptHead">
        <el-input v-model="form.deptHead"></el-input>
      </el-form-item> -->
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">停用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="form.sort" :min="0" />
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
import { getDeptTree, getById, save, edit } from '@/api/sys/dept';
import type { FormInstance, FormRules } from 'element-plus';
const emits = defineEmits(['query-data']);
const dialogFormVisible = ref(false);
const formRef = ref<FormInstance>();
const treeData = ref([{}]);
const form = reactive({
  sysDeptId: '',
  pid: '',
  deptName: '',
  deptHead: '',
  status: 1,
  remark: '',
  sort: 0,
});
const rules = reactive<FormRules>({
  pid: [{ required: true, message: '请选择父级菜单', trigger: 'change' }],
  deptName: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
});
// onBeforeMount(() => {
//   getTree();
// });
const init = async () => {
  dialogFormVisible.value = true;
  await getTree();
  console.log('11111');
  if (form.sysDeptId) {
    nextTick(async () => {
      await getInfoById();
    });
  }
};
const getInfoById = async () => {
  const data = await getById(form.sysDeptId);
  Object.assign(form, data?.data);
};
const getTree = async () => {
  const data = await getDeptTree();
  treeData.value = [
    {
      sysDeptId: '0',
      deptName: '主类目',
      pid: 0,
      children: data?.data,
    },
  ];
};
const close = () => {
  formRef.value?.resetFields();
  dialogFormVisible.value = false;
};
const submit = (formRef: any) => {
  if (!formRef) return;
  formRef.validate(async (valid: any, fields: any) => {
    if (valid) {
      if (!form.sysDeptId) {
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
