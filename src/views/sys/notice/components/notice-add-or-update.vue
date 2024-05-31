<template>
  <el-drawer
    v-model="noticeAddOrEditVisible"
    :title="!form.sysNoticeId ? '新增' : '修改'"
    :close-on-click-modal="false"
    size="60%"
  >
    <el-form :model="form" ref="formRef" label-width="auto" :rules="rules">
      <el-form-item label="公告标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入公告标题" />
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="公告类型" prop="type">
            <el-radio-group v-model="form.type" placeholder="请选择公告类型">
              <el-radio :value="1">通知</el-radio>
              <el-radio :value="2">公告</el-radio>
              <el-radio :value="3">其他</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公告等级" prop="level">
            <el-radio-group v-model="form.level" placeholder="请选择公告等级">
              <el-radio :value="1">普通</el-radio>
              <el-radio :value="2">一般</el-radio>
              <el-radio :value="3">紧急</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="公告内容" prop="content">
        <ZsEditor @change="handleEditorChange" />
      </el-form-item>
      <el-form-item label="附件">
        <el-upload
          class="upload-demo"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
          style="width: 100%"
        >
          <el-button type="primary">上传附件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="接收者" prop="receivingType">
        <div>
          <div>
            <el-radio-group
              v-model="form.receivingType"
              @change="useNoticeAddOrEditStore.handleReceivingTypeChange"
            >
              <el-radio :value="1">全体用户</el-radio>
              <el-radio :value="2">指定用户</el-radio>
              <el-radio :value="3">指定角色</el-radio>
              <el-radio :value="4">指定部门</el-radio>
              <el-radio :value="5">指定岗位</el-radio>
            </el-radio-group>
          </div>
          <ZsGap height="10" />
          <div>
            <ZsSelectUser v-if="form.receivingType === 2" />
            <el-tree-select
              v-if="form.receivingType === 4"
              v-model="form.receivingType"
              :data="deptList"
              check-strictly
              show-checkbox
              :props="{
                label: 'deptName',
                value: 'sysDeptId',
                children: 'children',
              }"
              style="width: 100%"
              placeholder="请选择父级菜单"
            />
          </div>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button>取消</el-button>
      <el-button
        type="warning"
        @click="useNoticeAddOrEditStore.handleSaveDraft(formRef, emits)"
        >保存草稿</el-button
      >
      <el-button type="primary">立即发布</el-button>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
import { noticeAddOrEditStore } from '@/store/modules/sys/notice/noticeAddOrEditStore';
import { storeToRefs } from 'pinia';

const useNoticeAddOrEditStore = noticeAddOrEditStore();
const { noticeAddOrEditVisible, form, rules, formRef, deptList } = storeToRefs(
  useNoticeAddOrEditStore,
);
const handleEditorChange = (val: string) => {
  form.value.content = val;
};
const emits = defineEmits(['query-data']);
defineExpose({
  init: useNoticeAddOrEditStore.init,
  form,
});
</script>
