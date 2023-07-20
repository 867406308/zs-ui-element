<template>
  <div>
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
  </div>
</template>
<script lang="ts" setup>
import appUrl from '@/assets/images/app.png';
import miniProgramUrl from '@/assets/images/mini-program.jpg';
</script>
