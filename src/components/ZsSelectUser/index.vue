<template>
  <el-input v-model="value" placeholder="请选择用户">
    <template #append>
      <el-button class="append-button" @click="dialogVisible = true">
        选择用户
      </el-button>
    </template>
  </el-input>
  <el-dialog
    v-model="dialogVisible"
    title="选择用户"
    align-center
    width="1180px"
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
          <UserList />
        </el-col>
        <el-col :span="6">
          <UserSelected />
        </el-col>
      </el-row>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import UserList from './components/user-list.vue';
import UserSelected from './components/user-selected.vue';
import { storeToRefs } from 'pinia';
import { userSelectStore } from '@/store/modules/sys/user/userSelectStore';
const useUserSelectStore = userSelectStore();
const { tableData, total, form, formRef, selectedData } =
  storeToRefs(useUserSelectStore);

// 岗位
import { postStore } from '@/store/modules/sys/position/postStore';
const usePostStore = postStore();
const { postList } = storeToRefs(usePostStore);

// 角色
import { roleStore } from '@/store/modules/sys/role/roleStore';
const useRoleStore = roleStore();
const { roleList } = storeToRefs(useRoleStore);

const value = ref('');
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

onMounted(() => {
  usePostStore.queryList();
  useRoleStore.queryList();
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
