<template>
  <div class="echars">
    <ZsCard title="访问实时数据">
      <div ref="echarsDom" class="main" id="echarsDom"></div>
    </ZsCard>
  </div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts';
const echarsDom: Ref<HTMLElement | any> = ref(null);

const initEchars = () => {
  const myChart = echarts.init(echarsDom.value);
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      selectedMode: 'false',
      data: [
        {
          name: '访问人次',
          icon: 'rect',
          itemStyle: {
            color: '#00c48f',
          },
        },
      ],
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
        name: '访问人次',
        type: 'line',
        stack: 'Total',
        showSymbol: false,
        smooth: true,
        lineStyle: {
          color: '#00c48f',
        },
        areaStyle: {
          color: '#e0eee8',
        },
        data: [
          59, 41, 39, 30, 35, 40, 58, 65, 80, 90, 105, 95, 89, 95, 100, 105,
          120, 125, 130, 100, 95, 85, 75, 60, 50,
        ],
      },
    ],
  });

  // 创建一个ResizeObserver实例并传入回调函数
  let resizeObserver = new ResizeObserver((entries) => {
    // 当观察到的元素尺寸变化时，更新ECharts图表的大小
    myChart.resize();
  });

  // 观察需要自适应的DOM元素
  let chartContainer = document.getElementById('echarsDom');
  resizeObserver.observe(chartContainer);
};
// 初始化图表
onMounted(() => {
  initEchars();
});
</script>
<style lang="scss" scoped>
.echars {
  height: 400px;
  width: 100%;
  .main {
    margin-bottom: 10px;
    border-radius: 4px;
    padding: 20px 0px;
    background-color: #fff;
    width: 100%;
    height: 300px;
  }
}
</style>
