<template>
  <div class="todo-today">
    <div class="header">
      <div class="title">
        <span>今日待办</span>
      </div>
      <div>
        <ZsIcon icon="arrow-right" />
      </div>
    </div>
    <div class="content">
      <el-calendar ref="calendar">
        <template #header="{ date }">
          <span>{{ date }}</span>
          <el-button-group>
            <el-button size="small" @click="selectDate('prev-month')">
              <template #icon>
                <ZsIcon icon="arrow-left"></ZsIcon>
              </template>
            </el-button>
            <el-button size="small" @click="selectDate('today')">今日</el-button>
            <el-button size="small" @click="selectDate('next-month')">
              <template #icon>
                <ZsIcon icon="arrow-right"></ZsIcon>
              </template>
            </el-button>
          </el-button-group>
        </template>
      </el-calendar>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { CalendarDateType, CalendarInstance } from 'element-plus';

const calendar = ref<CalendarInstance>();
const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) return;
  calendar.value.selectDate(val);
};
</script>
<style lang="scss" scoped>
.todo-today {
  height: 260px;
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
  .content {
    padding: 0px 20px;
  }
}
</style>
