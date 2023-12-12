<template>
  <el-drawer
    v-model="dialogFormVisible"
    :title="!form.sysDictDataId ? '新增' : '修改'"
    @close="useDictDataAddOrEditStore.close"
    :close-on-click-modal="false"
  >
    <el-form
      :model="form"
      ref="formRef"
      label-width="auto"
      :rules="useDictDataAddOrEditStore.rules"
    >
      <el-form-item label="字典分类" prop="sysDictDataId">
        <el-select
          v-model="form.sysDictTypeId"
          placeholder="请选择字典分类"
          style="width: 100%"
          @change="useDictDataAddOrEditStore.handleDictTypeChange"
        >
          <el-option
            v-for="item in dictTypeList"
            :key="item.sysDictTypeId"
            :label="item.dictName"
            :value="item.sysDictTypeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="字典类型" prop="dictType">
        <el-input
          v-model="form.dictType"
          placeholder="请输入字典类型"
          :readonly="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="字典标签" prop="dictLabel">
        <el-input
          v-model="form.dictLabel"
          placeholder="请输入字典标签"
        ></el-input>
      </el-form-item>
      <el-form-item label="字典键值" prop="dictValue">
        <el-input
          v-model="form.dictValue"
          placeholder="请输入字典键值"
        ></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="form.sort" :min="0" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">停用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="useDictDataAddOrEditStore.close">取消</el-button>
        <el-button
          type="primary"
          @click="useDictDataAddOrEditStore.submit(formRef, emits)"
          >确定</el-button
        >
      </span>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { dictDataAddOrEditStore } from '@/store/modules/sys/dict/dictDataAddOrEditStore';
import { storeToRefs } from 'pinia';
const useDictDataAddOrEditStore = dictDataAddOrEditStore();
const { dialogFormVisible, formRef, form, dictTypeList } = storeToRefs(
  useDictDataAddOrEditStore,
);
const emits = defineEmits(['query-data']);

defineExpose({
  form,
  init: useDictDataAddOrEditStore.init,
});
</script>
