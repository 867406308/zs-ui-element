<template>
  <div class="echars">
    <ZsCard title="用户增长数">
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
          name: '用户增长数',
          icon: 'rect',
          itemStyle: {
            color: getThemeColor(),
          },
        },
      ],
    },
    calculable: true,
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月',
        ],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '用户增长数',
        type: 'bar',
        barWidth: '30%',

        itemStyle: {
          color: getThemeColor(),
        },

        label: {
          show: true,
          position: 'top',
        },
        data: [20, 49, 70, 232, 256, 767, 135, 162, 212, 200, 630, 1140],
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
// 获取当前主题色
const getThemeColor = () => {
  // document.documentElement 是全局变量时
  const el = document.documentElement;
  // 获取 css 变量
  const themeColor =
    getComputedStyle(el).getPropertyValue(`--zs-color-primary`);
  return themeColor;
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
    background-color: var(--zs-bg-color);
    width: 100%;
    height: 300px;
  }
}
</style>
