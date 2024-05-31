<template>
  <div class="login-log">
    <ZsCard title="访问记录">
      <el-scrollbar>
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in todayList"
            :key="index"
            :timestamp="item.loginTime"
            :hollow="true"
            type="primary"
          >
            {{ item.ipAddress + '   ' + item.city }}
          </el-timeline-item>
        </el-timeline>
      </el-scrollbar>
    </ZsCard>
  </div>
</template>
<script lang="ts" setup>
import { loginLogStore } from '@/store/modules/sys/log/loginLogStore';
import { storeToRefs } from 'pinia';
const useLoginLogStore = loginLogStore();

const { todayList } = storeToRefs(useLoginLogStore);

onMounted(() => {
  useLoginLogStore.queryTodayList();
});
</script>
<style lang="scss" scoped>
.login-log {
  height: 400px;
}
</style>
