<template>
  <div class="personal-container">
    <el-container>
      <el-header class="header-container">
        <div class="header-left">
          <div class="header-left-logo">
            <el-avatar :src="logo" size="small" fit="cover" />
          </div>
          <div class="header-left-info">
            <div class="header-left-info-header">
              <el-space wrap>
                <el-text>张三 / A0001</el-text>
                <el-tag size="small" type="primary">青年才俊</el-tag>
                <el-tag size="small" type="primary">研发工程师</el-tag>
                <el-tag size="small" type="primary">25岁</el-tag>
              </el-space>
            </div>
            <div class="header-left-info-footer">
              <el-space wrap size="large">
                <el-text>
                  <el-icon>
                    <Female />
                  </el-icon>
                  男
                </el-text>
                <el-text>
                  <el-icon>
                    <OfficeBuilding />
                  </el-icon>
                  技术部
                </el-text>
                <el-text>
                  <el-icon>
                    <CollectionTag />
                  </el-icon>
                  软件开发工程师
                </el-text>
                <el-text>
                  <el-icon>
                    <Location />
                  </el-icon>
                  中国-山西-太原
                </el-text>
              </el-space>
            </div>
          </div>
        </div>
      </el-header>
      <!-- <el-aside width="200px" class="menu-aside">
        <h5 class="mb-2">Default colors</h5>
        <el-menu default-active="1">
          <el-menu-item index="1">
            <span>个人资料</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span>我的下属</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span>系统权限</span>
          </el-menu-item>
          <el-menu-item index="4">
            <span>系统日志</span>
          </el-menu-item>
        </el-menu>
      </el-aside> -->
      <el-main>
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="基本信息" name="first">
            <BasicInfo />
          </el-tab-pane>
          <el-tab-pane label="账号绑定" name="second">Config</el-tab-pane>
          <el-tab-pane label="我的权限" name="third">Role</el-tab-pane>
          <el-tab-pane label="系统日志" name="fourth">Task</el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import BasicInfo from './components/BasicInfo.vue';
import logo from '@/assets/logo.png';
import {
  User,
  Female,
  OfficeBuilding,
  Location,
  CollectionTag,
} from '@element-plus/icons-vue';
const items = [
  { label: 'java' },
  { label: 'vue' },
  { label: 'uniapp' },
  { label: 'flutter' },
  { label: 'python' },
  { label: 'c++' },
];

const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
<style lang="scss" scoped>
.personal-container {
  .zs-container {
    .zs-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      height: 160px !important;
      .header-left {
        display: flex;
        align-items: center;
        .header-left-logo {
          margin-left: 35px;
          .zs-avatar {
            --zs-avatar-bg-color: var(--zs-color-primary-light-9);
            --zs-avatar-size: 100px;

            :deep(img) {
              box-sizing: border-box;
              padding: var(--zs-main-padding);
            }
          }
        }
        .header-left-info {
          margin-left: 35px;
          .header-left-info-header {
            .zs-text {
              font-size: var(--zs-font-size-extra-large) !important;
              font-weight: var(--zs-font-weight-primary) !important;
              color: var(--zs-text-color-primary) !important;
              padding-right: 10px;
            }
          }
          .header-left-info-footer {
            margin-top: 30px;
          }
        }
      }
    }
  }
}
</style>
