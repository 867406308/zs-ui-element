<template>
  <div ref="echarsDom" class="main"></div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts';
const echarsDom: Ref<HTMLElement | any> = ref(null);
onMounted(() => {
  const myChart = echarts.init(echarsDom.value);
  console.log(myChart);
  myChart.setOption({
    title: {
      text: '访问实时数据',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['今日', '1天前', '7天前'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
        '24:00',
      ],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '今日',
        type: 'line',
        stack: 'Total',
        showSymbol: false,
        smooth: true,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 20, 30, 40, 35, 40, 20, 25, 15, 0, 15, 10, 0, 0, 0, 0],
      },
      {
        name: '1天前',
        type: 'line',
        stack: 'Total',
        showSymbol: false,
        smooth: true,
        data: [0, 0, 0, 0, 0, 0, 95, 0, 98, 15, 50, 0, 85, 54, 45, 36, 45, 56, 0, 79, 85, 91, 97, 102, 0],
      },
      {
        name: '7天前',
        type: 'line',
        stack: 'Total',
        showSymbol: false,
        smooth: true,
        data: [0, 0, 0, 0, 0, 0, 48, 0, 103, 0, 105, 0, 32, 39, 0, 102, 0, 114, 0, 52, 39, 0, 35, 39, 0],
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
  background-color: #fff;
  width: 100%;
  height: 400px;
}
</style>
