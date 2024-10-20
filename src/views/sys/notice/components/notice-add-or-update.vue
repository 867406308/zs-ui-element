<template>
  <el-drawer
    v-model="noticeAddOrEditVisible"
    :title="!form.sysNoticeId ? '新增通知公告' : '修改通知公告'"
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
      <el-form-item label="接收者" prop="receivingType">
        <div style="width: 100%">
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
            <ZsSelectUser
              v-if="form.receivingType === 2"
              multiple
              v-model="form.receiverIds"
            />
            <el-select
              v-if="form.receivingType === 3"
              v-model="form.receiverIds"
              multiple
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="5"
              placeholder="请选择角色"
              style="width: 100%"
            >
              <el-option
                v-for="item in roleList"
                :key="item.sysRoleId"
                :label="item.roleName"
                :value="item.sysRoleId"
              >
              </el-option>
            </el-select>

            <el-tree-select
              v-if="form.receivingType === 4"
              v-model="form.receiverIds"
              :data="deptData"
              multiple
              :render-after-expand="false"
              show-checkbox
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="3"
              style="width: 100%"
              placeholder="请选择部门"
            />

            <el-select
              v-if="form.receivingType === 3"
              v-model="form.receiverIds"
              multiple
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="5"
              placeholder="请选择角色"
              style="width: 100%"
            >
              <el-option
                v-for="item in roleList"
                :key="item.sysRoleId"
                :label="item.roleName"
                :value="item.sysRoleId"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="公告内容" prop="content">
        <ZsEditor @change="handleEditorChange" v-model="form.content" />
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
import { roleStore } from '@/store/modules/sys/role/roleStore';
import { postStore } from '@/store/modules/sys/position/postStore';
import { deptStore } from '@/store/modules/sys/dept/deptStore';
import { storeToRefs } from 'pinia';

const useNoticeAddOrEditStore = noticeAddOrEditStore();
const { noticeAddOrEditVisible, form, rules, formRef } = storeToRefs(
  useNoticeAddOrEditStore,
);

const defaultProps = {
  label: 'deptName',
  value: 'sysDeptId',
  children: 'children',
};

// 角色store
const useRoleStore = roleStore();
const { roleList } = storeToRefs(useRoleStore);

// 岗位
const usePostStore = postStore();
const { postList } = storeToRefs(usePostStore);

// 部门
const useDeptStore = deptStore();
const { deptTreeData } = storeToRefs(useDeptStore);

const handleEditorChange = (val: string) => {
  form.value.content = val;
};
const emits = defineEmits(['query-data']);

const deptData = ref([]);
const handleData = (list: any) => {
  const data = list.map((item: any) => {
    return {
      label: item.deptName,
      value: item.sysDeptId,
      children: item.children ? handleData(item.children) : [],
    };
  });
  return data;
};
onMounted(async () => {
  useRoleStore.queryList();
  await useDeptStore.queryData();
  usePostStore.queryList();

  const data = useDeptStore.deptTreeData;
  deptData.value = handleData(data);
});

defineExpose({
  init: useNoticeAddOrEditStore.init,
  form,
});
</script>
