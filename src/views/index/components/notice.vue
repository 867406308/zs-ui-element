<template>
  <div class="home-notice-container">
    <ZsCard title="通知公告">
      <template #default>
        <div
          v-for="(item, index) in limitData"
          :key="index"
          class="home-notice-item"
        >
          <el-text truncated class="home-notice-item-title">
            <el-tag type="primary" v-if="item.type === 1" size="small">
              通知
            </el-tag>
            <el-tag type="success" v-if="item.type === 2" size="small">
              公告
            </el-tag>
            <el-tag type="warning" v-if="item.type === 3" size="small">
              其他
            </el-tag>
            {{ item.title }}
            <ZsIcon v-if="item.level === 3" icon="urgent" />
          </el-text>
          <el-text truncated class="home-notice-item-time">{{
            item.releaseTime
          }}</el-text>
        </div>
      </template>
    </ZsCard>
  </div>
</template>
<script lang="ts" setup>
import { noticeStore } from '@/store/modules/sys/notice/noticeStore';
import { storeToRefs } from 'pinia';
const useNoticeStore = noticeStore();
const { limitData } = storeToRefs(useNoticeStore);

onMounted(() => {
  useNoticeStore.queryLimit();
});
</script>
<style lang="scss" scoped>
.home-notice-container {
  height: 330px;

  .home-notice-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 10px;
    cursor: pointer;

    &-title {
      width: calc(100% - 100px);
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .zs-tag {
        margin-right: 5px;
      }
      :deep(.svg-icon) {
        margin-left: 0px;

        svg {
          height: 20px !important;
          width: 34px !important;
        }
      }
    }

    &-time {
      width: 80px;
      text-align: end;
      padding-left: 20px;
    }
  }
}
</style>
