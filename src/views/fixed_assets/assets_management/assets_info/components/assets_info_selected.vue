<template>
  <el-dialog
    title="资产列表"
    v-model="assetsInfoSelectedVisible"
    width="70%"
    :show-close="false"
    :align-center="true"
    :fullscreen="fullscreen"
  >
    <template #header="{ close }">
      <div class="my-header">
        <div>资产列表</div>
        <div class="icons">
          <ZsIcon icon="full-screen" @click="fullscreen = !fullscreen" />
          <ZsIcon icon="close" @click="close" />
        </div>
      </div>
    </template>
    <div class="assets-info">
      <el-container>
        <el-aside>
          <el-scrollbar class="my-scrollbar">
            <el-form
              :model="assetsInfoForm"
              ref="ruleFormRef"
              label-width="auto"
              label-position="top"
            >
              <el-form-item label="资产名称" prop="name">
                <el-input
                  v-model="assetsInfoForm.name"
                  placeholder="请输入资产名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="资产分级" prop="levelId">
                <el-select
                  v-model="assetsInfoForm.levelId"
                  placeholder="请选择资产分级"
                  style="width: 100%"
                  clearable
                >
                  <el-option label="一级" value="1000"></el-option>
                  <el-option label="二级" value="1001"></el-option>
                  <el-option label="三级" value="1002"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="管理部门" prop="manageOrgId">
                <el-tree-select
                  v-model="assetsInfoForm.manageOrgId"
                  :render-after-expand="false"
                  :data="deptTree"
                  :props="{
                    label: 'deptName',
                    value: 'sysDeptId',
                    children: 'children',
                  }"
                  style="width: 100%"
                  placeholder="请选择管理部门"
                  @change="useAssetsInfoStore.changeManageOrg"
                  clearable
                />
              </el-form-item>
              <el-form-item label="管理部门负责人" prop="manageUserId">
                <el-select
                  v-model="assetsInfoForm.manageUserId"
                  placeholder="请选择管理部门负责人"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in manageUserList"
                    :key="item.sysUserId"
                    :label="item.realName"
                    :value="item.sysUserId"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="使用部门" prop="useOrgId">
                <el-tree-select
                  v-model="assetsInfoForm.useOrgId"
                  :data="deptTree"
                  :render-after-expand="false"
                  check-strictly
                  :props="{
                    label: 'deptName',
                    value: 'sysDeptId',
                    children: 'children',
                  }"
                  style="width: 100%"
                  placeholder="请选择使用部门"
                  @change="useAssetsInfoStore.changeUseOrg"
                  clearable
                />
              </el-form-item>
              <el-form-item label="使用人" prop="useUserId">
                <el-select
                  v-model="assetsInfoForm.useUserId"
                  placeholder="请选择管理部门负责人"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in useUserList"
                    :key="item.sysUserId"
                    :label="item.realName"
                    :value="item.sysUserId"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="useAssetsInfoStore.resetQueryForm(ruleFormRef)"
                  >重置</el-button
                >
                <el-button type="primary" @click="useAssetsInfoStore.queryData"
                  >查询</el-button
                >
              </el-form-item>
            </el-form>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <AssetsInfoTable class="assets-info-table" />
        </el-main>
      </el-container>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="assetsInfoSelectedVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="useAssetsInfoStore.handleSelectionChange"
        >
          确认选中
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import AssetsInfoTable from '@/views/fixed_assets/assets_management/assets_info/components/assets_info_table.vue';
import { assetsInfoStore } from '@/store/modules/fixed_assets/assets_management/assets_info/assetsInfoStore';
import { storeToRefs } from 'pinia';
const useAssetsInfoStore = assetsInfoStore();
const {
  assetsInfoSelectedVisible,
  assetsInfoForm,
  deptTree,
  useUserList,
  manageUserList,
  ruleFormRef,
} = storeToRefs(useAssetsInfoStore);

const emits = defineEmits(['selected-change']);
defineExpose({
  init: useAssetsInfoStore.selectedInit,
});

const fullscreen = ref(false);
</script>
<style lang="scss" scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .icons {
    display: flex;
    justify-content: center;
    align-items: center;

    > * {
      margin-left: 15px;
    }
  }
}

.assets-info {
  .zs-container {
    .zs-aside {
      padding: var(--zs-main-padding);
      .my-scrollbar {
        height: calc($main-box-height - 60px) !important;
      }
    }
    .zs-main {
      .assets-info-table {
        height: calc($main-box-height - 60px) !important;
      }
    }
  }
}

.zs-dialog.is-fullscreen {
  .assets-info {
    height: 100%;
    .zs-container {
      height: 100%;
      .zs-aside {
        height: 100%;
        .my-scrollbar {
          height: 100% !important;
        }
      }
      .zs-main {
        height: 100%;
        .assets-info-table {
          height: 100% !important;

          :deep(.table-style) {
            height: 100% !important;
          }
        }
      }
    }
  }
}
</style>
