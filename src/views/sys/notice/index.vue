<template>
  <div class="notice-container">
    <el-container>
      <el-header>
        <el-form :inline="true" label-width="auto">
          <el-form-item label="标题">
            <el-input
              v-model="form.title"
              placeholder="请输入关键词"
              clearable
            />
          </el-form-item>
          <el-form-item label="类型">
            <el-select
              v-model="form.type"
              placeholder="请选择"
              style="width: 200px"
              clearable
            >
              <el-option label="通知" value="1" />
              <el-option label="公告" value="2" />
              <el-option label="其他" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="级别">
            <el-select
              v-model="form.level"
              placeholder="请选择"
              style="width: 200px"
              clearable
            >
              <el-option label="紧急" value="1" />
              <el-option label="重要" value="2" />
              <el-option label="普通" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select
              v-model="form.status"
              placeholder="请选择"
              style="width: 200px"
              clearable
            >
              <el-option label="已撤销" value="0" />
              <el-option label="草稿箱" value="1" />
              <el-option label="已发布" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="useNoticeStore.queryData"
              >查询</el-button
            >
            <el-button type="primary" @click="useNoticeStore.reset"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <ZsToolbar>
          <template #left>
            <el-button type="primary" @click="useNoticeStore.handleAddOrEdit">
              新增
            </el-button>
          </template>
          <template #right>
            <el-space>
              <el-input
                v-model="form.title"
                placeholder="请输入资产名称"
                class="input-with-select"
                clearable
                @blur="useNoticeStore.queryData()"
              >
              </el-input>
              <el-button-group class="ml-4">
                <el-button :icon="Grid" />
                <el-button :icon="FullScreen" />
                <el-button :icon="Search" />
              </el-button-group>
            </el-space>
          </template>
        </ZsToolbar>
        <el-table
          border
          :data="tableData"
          v-loading="loading"
          class="table-style"
        >
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="55"
          />
          <el-table-column prop="type" label="类型" width="120" align="center">
            <template #default="scope">
              <el-text v-if="scope.row.type === 1">通知</el-text>
              <el-text v-if="scope.row.type === 2">公告</el-text>
              <el-text v-if="scope.row.type === 3">其他</el-text>
            </template>
          </el-table-column>
          <el-table-column prop="level" label="级别" width="120" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.level === 1" effect="dark">普通</el-tag>
              <el-tag v-if="scope.row.level === 2" type="warning" effect="dark">
                一般
              </el-tag>
              <el-tag v-if="scope.row.level === 3" type="danger" effect="dark">
                紧急
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题">
            <template #default="scope">
              <el-link
                :underline="false"
                type="primary"
                @click="useNoticeStore.handleNoticeInfo(scope.row)"
                >{{ scope.row.title }}</el-link
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="releaseTime"
            label="发送时间"
            width="180"
            align="center"
          />
          <el-table-column
            prop="status"
            label="状态"
            width="120"
            align="center"
          >
            <template #default="scope">
              <el-tag v-if="scope.row.status === 0" type="danger"
                >已撤销</el-tag
              >
              <el-tag v-if="scope.row.status === 1" type="info">存草稿</el-tag>
              <el-tag v-if="scope.row.status === 2" type="primary">
                已发布
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="realName"
            label="创建人"
            width="120"
            align="center"
          />
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="180"
            align="center"
          />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="120"
          >
            <template #default="{ row }">
              <el-button
                link
                type="primary"
                @click="useNoticeStore.handleAddOrEdit(row)"
                >编辑</el-button
              >
              <el-divider direction="vertical" />
              <el-button link type="danger">删除</el-button>
            </template>
          </el-table-column>
          <template #empty>
            <ZsEmpty />
          </template>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
          background
          :current-page="form.page"
          layout="total, sizes, prev, pager, next"
          :page-size="form.size"
          :total="total"
          @current-change="useNoticeStore.handleCurrentChange"
          @size-change="useNoticeStore.handleSizeChange"
        />
      </el-footer>
    </el-container>
    <notice-add-or-edit
      ref="addEditRef"
      @query-data="useNoticeStore.queryData"
    />
    <notice-info ref="infoRef" />
  </div>
</template>
<script lang="ts" setup>
import { Grid, FullScreen, Search } from '@element-plus/icons-vue';
import NoticeAddOrEdit from './components/notice-add-or-update.vue';
import NoticeInfo from './components/notice-info.vue';
import { noticeStore } from '@/store/modules/sys/notice/noticeStore';
import { storeToRefs } from 'pinia';
const useNoticeStore = noticeStore();
const { loading, total, tableData, addEditRef, infoRef, form } =
  storeToRefs(useNoticeStore);

onMounted(() => {
  useNoticeStore.queryData();
});
</script>
<style lang="scss" scoped>
.zs-table {
  height: calc($main-box-height - 60px) !important;
}
</style>
