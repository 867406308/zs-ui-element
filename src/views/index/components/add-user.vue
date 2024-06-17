<template>
  <div ref="echarsDom" class="main"></div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts';
const echarsDom: Ref<HTMLElement | any> = ref(null);
onMounted(() => {
  const myChart = echarts.init(echarsDom.value);
  myChart.setOption({
    color: ['#a0cfff'],
    title: {
      text: '新用户',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['1', '2', '3', '4', '5', '6', '7'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '新用户',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 2,
          opacity: 0.8,
          color: '#409eff',
        },
        areaStyle: {},
        label: {
          show: true,
          position: 'top',
        },
        emphasis: {
          focus: 'series',
        },
        data: [5, 18, 19, 23, 29, 30, 10],
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
  height: 400px;
}
</style>
