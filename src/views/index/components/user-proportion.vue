<template>
  <ZsCard title="用户类型占比">
    <template #default>
      <div ref="echarsDom" class="main"></div>
    </template>
  </ZsCard>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts';
const echarsDom: Ref<HTMLElement | any> = ref(null);
onMounted(() => {
  const myChart = echarts.init(echarsDom.value);
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      show: false,
    },
    yAxis: {
      type: 'category',
      show: false,
    },
    series: [
      {
        name: 'PC端',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [320],
      },
      {
        name: '安卓',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [120],
      },
      {
        name: '苹果',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [220],
      },
      {
        name: '鸿蒙',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [150],
      },
      {
        name: '微信小程序',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [820],
      },
    ],
  });
  /**
   * 自适应大小
   */
  window.onresize = function () {
    myChart.resize();
  };
});
</script>
<style lang="scss" scoped>
.main {
  margin-bottom: 10px;
  border-radius: 4px;
  padding: 20px 0px;
  background-color: var(--zs-bg-color);
  width: 100%;
  height: 100px;
}
</style>
