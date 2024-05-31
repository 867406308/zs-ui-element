<template>
  <div class="qr-container">
    <ZsCard title="联系我们" class="qr-card">
      <div class="qr-code">
        <el-image
          style="width: 100px; height: 100px"
          :src="myWechatUrl"
          :zoom-rate="1.2"
          :preview-src-list="[myWechatUrl]"
          :initial-index="4"
          fit="cover"
        />
        <ZsGap height="10" />
        <div>微信</div>
      </div>
      <div class="qr-code">
        <el-image
          style="width: 100px; height: 100px"
          :src="myWechatUrl"
          :zoom-rate="1.2"
          :preview-src-list="[myWechatUrl]"
          :initial-index="4"
          fit="cover"
        />
        <ZsGap height="10" />
        <div>QQ群</div>
      </div>
    </ZsCard>
  </div>
</template>
<script lang="ts" setup>
import myWechatUrl from '@/assets/images/my-wechat.jpg';
</script>
<style lang="scss" scoped>
.qr-container {
  width: 100%;
  height: 210px;

  .qr-card {
    :deep(.content) {
      display: flex;
      justify-content: space-evenly;
      .qr-code {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
