<template>
  <div class="index-box">
    <StatisticCard></StatisticCard>
    <!-- <el-row :gutter="16">
      <el-col :span="14">
        <notice />
      </el-col>
      <el-col :span="10">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-card shadow="never">
              <template #header>
                <el-divider direction="vertical" />
                <span>手机APP</span>
              </template>
              <el-image
                style="width: 100px; height: 100px"
                :src="appUrl"
                :zoom-rate="1.2"
                :preview-src-list="[appUrl]"
                :initial-index="4"
                fit="cover"
              />
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="never">
              <div>
                <el-divider direction="vertical" />
                <span>小程序</span>
              </div>
              <el-image
                style="width: 100px; height: 100px"
                :src="miniProgramUrl"
                :zoom-rate="1.2"
                :preview-src-list="[miniProgramUrl]"
                :initial-index="4"
                fit="cover"
              />
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row> -->
    <el-row :gutter="16">
      <el-col :span="18">
        <RealTimeStatistic />
        <div style="height: 10px"></div>
        <Test />
      </el-col>
      <el-col :span="6">
        <QuickAccess />
        <div style="height: 10px"></div>
        <Notice />
        <div style="height: 10px"></div>
        <QrCode />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import avatarUrl from '@/assets/logo.png';

import StatisticCard from './components/statistic-card.vue';
import RealTimeStatistic from './components/real-time-statistic.vue';
import Notice from './components/notice.vue';
import QuickAccess from './components/quick-access.vue';
import TodoToday from './components/todo-today.vue';
import QrCode from './components/qr-code.vue';
import Test from './components/test.vue';
</script>

<style lang="scss" scoped>
.index-box {
  .welcome {
    margin-bottom: 10px;
  }
}
</style>
