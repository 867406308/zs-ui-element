<template>
  <el-row class="statistic">
    <el-col :span="6">
      <div class="statistic-card">
        <el-statistic :value="620" title="累计用户数" :value-style="valueStyle">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              累计用户数
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <div>
              <span>较昨日</span>
              <span class="green">
                +1.4%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
            <div>
              <span>7日前</span>
              <span class="green">
                +4%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="statistic-card">
        <el-statistic
          :value="120"
          title="日新增用户数"
          :value-style="valueStyle"
        >
          <template #title>
            <div style="display: inline-flex; align-items: center">
              日新增用户数
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <div>
              <span>较昨日</span>
              <span class="red">
                -1.4%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
            <div>
              <span>7日前</span>
              <span class="green">
                +4%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="statistic-card">
        <el-statistic
          :value="180"
          title="New transactions today"
          :value-style="valueStyle"
        >
          <template #title>
            <div style="display: inline-flex; align-items: center">
              日访问人数
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <div>
              <span>较昨日</span>
              <span class="green">
                +1.4%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
            <div>
              <span>7日前</span>
              <span class="green">
                +4%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="statistic-card">
        <el-statistic
          :value="72000"
          title="New transactions today"
          :value-style="valueStyle"
        >
          <template #title>
            <div style="display: inline-flex; align-items: center">
              日流失数
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <div>
              <span>较昨日</span>
              <span class="red">
                -1.4%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
            <div>
              <span>7日前</span>
              <span class="red">
                -4%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { CaretTop } from '@element-plus/icons-vue';
const valueStyle = {
  // fontSize: '36px',
  // fontWeight: 600,
};
</script>
<style lang="scss" scoped>
.statistic-card {
  height: 100px;
  padding: 20px;
  background-color: #fff;

  .zs-statistic {
    --el-statistic-content-font-size: 28px;
  }
  .statistic-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    color: #606266;
    margin-top: 16px;
    .footer-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        span:last-child {
          display: inline-flex;
          align-items: center;
          margin-left: 4px;
        }
        .green {
          color: #67c23a;
        }
        .red {
          color: #f56c6c;
        }
      }
    }
  }
}
</style>
