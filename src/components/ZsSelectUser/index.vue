<template>
  <el-space wrap>
    <el-tag
      v-for="item in selectedUser"
      :key="item.sysUserId"
      type="primary"
      effect="light"
      closable
      :disable-transitions="false"
      @close="useUserSelectStore.handleRemove(item)"
    >
      {{ item.realName }}
    </el-tag>
    <el-button text bg :icon="Plus" size="small" circle @click="onAddClick" />
  </el-space>
  <el-dialog
    v-model="dialogVisible"
    title="选择用户"
    align-center
    width="1180px"
    draggable
  >
    <div class="user-select">
      <el-row justify="space-between" :gutter="20">
        <el-col :span="6">
          <el-tabs v-model="activeName" :stretch="true">
            <el-tab-pane label="部门" name="first">
              <ZsDept @node-click="useUserSelectStore.handleNodeClick" />
            </el-tab-pane>
            <el-tab-pane label="岗位" name="second">
              <el-tree
                :data="postList"
                :props="postProps"
                @node-click="useUserSelectStore.handlePostNodeClick"
              >
                <template #default="{ node, data }">
                  <ZsIcon icon="post-colour" style="margin-right: 8px" />
                  <span>{{ node.label }}</span>
                </template>
              </el-tree>
            </el-tab-pane>
            <el-tab-pane label="角色" name="third">
              <el-tree
                :data="roleList"
                :props="roleProps"
                @node-click="useUserSelectStore.handleRoleNodeClick"
              >
                <template #default="{ node, data }">
                  <ZsIcon icon="role-colour" style="margin-right: 8px" />
                  <span>{{ node.label }}</span>
                </template>
              </el-tree>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="12">
          <UserList :multiple="multiple" />
        </el-col>
        <el-col :span="6">
          <UserSelected />
        </el-col>
      </el-row>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
import UserList from './components/user-list.vue';
import UserSelected from './components/user-selected.vue';
import { storeToRefs } from 'pinia';
import { userSelectStore } from '@/store/modules/sys/user/userSelectStore';
import { postStore } from '@/store/modules/sys/position/postStore';
import { roleStore } from '@/store/modules/sys/role/roleStore';
import { multiply } from 'lodash';

const useUserSelectStore = userSelectStore();
const { tableData, total, form, formRef, tableAddUserData, selectedUser } =
  storeToRefs(useUserSelectStore);

// 岗位
const usePostStore = postStore();
const { postList } = storeToRefs(usePostStore);

// 角色
const useRoleStore = roleStore();
const { roleList } = storeToRefs(useRoleStore);

const dialogVisible = ref(false);
const activeName = ref('first');

const postProps = {
  children: 'children',
  label: 'postName',
  value: 'sysPostId',
};

const roleProps = {
  children: 'children',
  label: 'roleName',
  value: 'sysRoleId',
};

const props = defineProps({
  modelValue: {
    type: [Array, String],
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});

watch(
  () => props.modelValue,
  (newValue) => {
    useUserSelectStore.initSelectedData(newValue);
  },
  { deep: true },
);

const emits = defineEmits(['update:modelValue', 'onSelect']);

const handleConfirm = () => {
  dialogVisible.value = false;
  selectedUser.value = tableAddUserData.value;
  emits(
    'update:modelValue',
    props.multiple
      ? selectedUser.value.map((item) => item.sysUserId)
      : selectedUser.value[0]?.sysUserId,
  );
  emits(
    'onSelect',
    props.multiple ? selectedUser.value : selectedUser.value[0],
  );
};

const onAddClick = () => {
  dialogVisible.value = true;
};
onMounted(() => {
  usePostStore.queryList();
  useRoleStore.queryList();
  useUserSelectStore.queryData();
});
</script>
<style scoped lang="scss">
.append-button {
  background-color: #409eff !important;
  color: #fff !important;
}

.user-select {
  height: 500px;
  display: flex;
  justify-content: space-between;

  .zs-tabs {
    height: 100%;
    border: 1px solid #ebeef5;

    :deep() {
      .zs-tabs__header {
        height: 40px;
        padding: 0 10px;
      }
      .zs-tabs__content {
        height: calc(100% - 55px);
        overflow: auto;

        .zs-tab-pane {
          height: 100%;
        }
      }
    }
  }

  .zs-row {
    width: 100%;

    .zs-col {
      height: 100%;
      .user-select-left {
        height: 100%;

        .zs-tree {
          padding: 4px;
        }
      }

      .zs-scrollbar {
        width: 100%;
      }
    }
  }
}
</style>
