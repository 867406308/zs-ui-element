<template>
  <el-drawer
    v-model="dialogFormVisible"
    :title="!form.sysDictTypeId ? '新增' : '修改'"
    @close="useDictTypeAddOrEditStore.close"
    :close-on-click-modal="false"
  >
    <el-form
      :model="form"
      ref="formRef"
      label-width="auto"
      :rules="useDictTypeAddOrEditStore.rules"
    >
      <el-form-item label="字典类型" prop="dictType">
        <el-input
          v-model="form.dictType"
          placeholder="请输入字典类型"
        ></el-input>
      </el-form-item>
      <el-form-item label="字典名称" prop="dictName">
        <el-input
          v-model="form.dictName"
          placeholder="请输入字典名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="form.sort" :min="0" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :value="0">禁用</el-radio>
          <el-radio :value="1">启用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="useDictTypeAddOrEditStore.close">取消</el-button>
        <el-button
          type="primary"
          @click="useDictTypeAddOrEditStore.submit(formRef, emits)"
          >确定</el-button
        >
      </span>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { dictTypeAddOrEditStore } from '@/store/modules/sys/dict/dictTypeAddOrEditStore';
import { storeToRefs } from 'pinia';
const useDictTypeAddOrEditStore = dictTypeAddOrEditStore();
const { dialogFormVisible, formRef, form } = storeToRefs(
  useDictTypeAddOrEditStore,
);
const emits = defineEmits(['dict-type-list']);

defineExpose({
  form,
  init: useDictTypeAddOrEditStore.init,
});
</script>
