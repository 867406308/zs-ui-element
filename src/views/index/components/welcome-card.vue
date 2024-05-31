<template>
  <div class="welcome-card">
    <el-card shadow="never">
      <el-avatar :size="50" :src="circleUrl" />
      <div class="welcome-card-content">
        <div class="welcome-card-title">{{ realName }}，欢迎回来！</div>
        <div class="welcome-card-sub-title">
          <ZsIcon icon="clock" />
          <el-text>
            {{ '上次访问时间：' + new Date().toLocaleString() }}
          </el-text>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { loginStore } from '@/store/modules/common/loginStore';
const { realName, avatar } = loginStore();
const circleUrl = ref(
  'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
);
</script>
<style lang="scss" scoped>
.welcome-card {
  .zs-card {
    :deep() {
      .zs-card__body {
        display: flex;
        align-items: center;
        padding: 10px 20px;

        .welcome-card-content {
          padding: 20px 10px;
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .welcome-card-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 4px;
          }

          .welcome-card-sub-title {
            margin-top: 2px;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .zs-text {
              margin-left: 4px;
            }
          }
        }
      }
    }
  }
}
</style>
