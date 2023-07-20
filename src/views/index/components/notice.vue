<template>
  <div class="notice">
    <div class="header">
      <div class="title">
        <ZsIcon icon="add-location"></ZsIcon>
        <span>通知公告</span>
      </div>
      <div>更多</div>
    </div>
    <el-divider />
    <div class="content">
      <div v-for="(item, index) in notices" :key="index" class="text">
        <span class="title">{{ item.title }}</span>
        <span class="date">{{ item.date }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const notices = reactive([
  {
    title: '学校通知',
    content: '学校将于本周五举行体育活动，所有学生请务必参加。',
    date: '2023-07-01',
  },
  {
    title: '假期安排',
    content: '公司决定将本年度年假从7月调整至8月，请员工注意并合理安排假期。',
    date: '2023-07-01',
  },
  {
    title: '重要会议通知',
    content: '请各部门经理参加本周五下午2点的紧急会议，地点在会议室A。',
    date: '2023-07-01',
  },
  {
    title: '施工通知',
    content: '为了修复楼道电梯，本周末将关闭楼道，请居民使用备用电梯。',
    date: '2023-07-01',
  },
  {
    title: '暂停水电供应通知',
    content: '由于维护工作，本周六上午8点至12点将暂停水电供应，请提前做好准备。',
    date: '2023-07-01',
  },
  {
    title: '电子系统升级通知',
    content: '电子系统升级通知',
    date: '2023-07-01',
  },
  {
    title: '社区活动通知',
    content: '本月底将举行社区嘉年华活动，欢迎居民踊跃参加，详情见社区公告栏。',
    date: '2023-07-01',
  },
  {
    title: '缴费提醒',
    content: '请所有业主及时缴纳本月的物业管理费用，逾期将产生滞纳金。',
    date: '2023-07-01',
  },
  {
    title: '健康宣传通告',
    content: '提醒大家秋冬季节注意保暖，预防感冒和流感，多吃水果蔬菜增强免疫力。',
    date: '2023-07-01',
  },
]);
</script>
<style lang="scss" scoped>
.notice {
  height: 300px;
  background-color: #fff;

  .header {
    height: 30px;
    padding: 10px 10px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      display: flex;
      justify-content: start;
      align-items: center;
      div {
        margin-right: 5px;
      }
    }
  }
  .zs-divider--horizontal {
    margin: 5px;
  }
  .content {
    padding: 0px 20px;
    line-height: 26px;

    .text {
      display: flex;
      justify-content: space-between;

      .date {
        color: #909399;
        font-size: 10px;
      }
    }
  }
}
</style>
