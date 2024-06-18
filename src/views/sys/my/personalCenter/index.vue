<template>
  <div class="personal-container">
    <el-row :gutter="20">
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <ZsCard :showHeader="false">
          <template #default>
            <div class="user-info">
              <el-avatar :src="logo" size="large" fit="cover" />
              <h1>张三</h1>
              <el-text>诚信、奉献、拼搏、争先</el-text>
              <ul class="personal-list">
                <li class="personal-list-item">
                  <!-- <User /> -->
                </li>
                <li class="personal-list-item">
                  <el-icon> <User /></el-icon>
                  张三
                </li>
                <li class="personal-list-item">
                  <el-icon> <Male /></el-icon>
                  男
                </li>
                <li class="personal-list-item">
                  <el-icon> <OfficeBuilding /></el-icon>
                  XX集团-技术部
                </li>
                <li class="personal-list-item">
                  <el-icon> <Location /></el-icon>
                  中国-山西-太原
                </li>
                <li class="personal-list-item">
                  <el-icon> <CollectionTag /></el-icon
                  >java、vue、uniapp、flutter、python、c++
                </li>
                <li class="personal-list-item">
                  <div class="personal-info">
                    <div>个人标签</div>
                    <el-space wrap>
                      <el-tag
                        v-for="item in items"
                        :key="item.label"
                        type="primary"
                        effect="light"
                        round
                      >
                        {{ item.label }}
                      </el-tag>
                    </el-space>
                  </div>
                </li>
                <li class="personal-list-item"></li>
                <li class="personal-list-item"></li>
                <li class="personal-list-item"></li>
              </ul>
            </div>
          </template>
        </ZsCard>
      </el-col>
      <el-col :lg="16" :md="12" :sm="24" :xl="16" :xs="24">
        <ZsCard :showHeader="false">222</ZsCard>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import logo from '@/assets/logo.png';
import {
  User,
  Male,
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
</script>
<style lang="scss" scoped>
.personal-container {
  .user-info {
    text-align: center;
    padding: var(--zs-main-padding);
    .zs-avatar {
      margin-bottom: 10px;
      --zs-avatar-bg-color: var(--zs-color-primary-light-9);
      --zs-avatar-size: 120px;

      :deep(img) {
        box-sizing: border-box;
        padding: var(--zs-main-padding);
      }
    }
    .personal-list {
      list-style: none;
      line-height: 30px;
      .personal-list-item {
        display: flex;
        align-items: center;
        font-size: var(--zs-font-size-base);

        .zs-icon {
          margin-right: 8px;
        }

        .personal-info {
          margin-top: 20px;
          text-align: left;

          .zs-space {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
