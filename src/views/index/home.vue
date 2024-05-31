<template>
  <!-- 欢迎卡 -->
  <el-row :gutter="10">
    <el-col :span="24">
      <WelcomeCard />
    </el-col>
  </el-row>

  <ZsGap height="10" />
  <!-- 统计和公告通知 -->
  <el-row :gutter="10">
    <el-col :span="16">
      <StatisticCard />
      <ZsGap height="10" />
      <RealTimeStatistic />
    </el-col>
    <el-col :span="8">
      <Notice />
      <ZsGap height="10" />
      <QrCode />
    </el-col>
  </el-row>

  <ZsGap height="10" />
  <!-- 统计和公告通知 -->
  <el-row :gutter="10">
    <el-col :span="16">
      <AccessAgeDistribution />
    </el-col>
    <el-col :span="8">
      <LoginLog />
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import WelcomeCard from './components/welcome-card.vue';
import StatisticCard from './components/statistic-card.vue';
import RealTimeStatistic from './components/real-time-statistic.vue';
import Notice from './components/notice.vue';
import UseProportion from './components/user-proportion.vue';
import QrCode from './components/qr-code.vue';
import LoginLog from './components/login-log.vue';
import TodoToday from './components/todo-today.vue';
import AccessAgeDistribution from './components/access-age-distribution.vue';
</script>
<style lang="scss" scoped>
.welcome-text {
  height: 100%;
  background-color: #fff;
  background-image: url('@/assets/home1.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right;
}
</style>
