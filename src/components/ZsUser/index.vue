<template>
  <el-popover
    :visible="visible"
    placement="bottom-start"
    trigger="click"
    popper-class="popoverStyle"
    :teleported="false"
  >
    <template #reference>
      <el-input
        :modelValue="realName"
        placeholder="请选择用户"
        style="width: 100%"
        @click="visible = true"
        clearable
        @clear="handleClear"
      />
    </template>
    <template #default>
      <div>
        <el-container>
          <el-header>
            <el-form>
              <el-form-item prop="realName">
                <el-input
                  v-model="form.realName"
                  placeholder="请输入姓名"
                  @clear="useUserStore.resetForm(ruleFormRef)"
                  @input="useUserStore.queryData"
                  clearable
                >
                  <!-- <template #append>
                    <el-button
                      :icon="Search"
                      @click="useUserStore.queryData()"
                    />
                  </template> -->
                </el-input>
              </el-form-item>
            </el-form>
          </el-header>
          <el-main>
            <el-table
              :data="tableData"
              border
              @row-click="handleClick"
              size="small"
            >
              <el-table-column prop="realName" label="姓名" />
              <el-table-column prop="sex" label="性别">
                <template #default="{ row }">
                  <span v-if="row.sex === 0">男</span>
                  <span v-else-if="row.sex === 1">女</span>
                  <span v-else>未知</span>
                </template>
              </el-table-column>
              <el-table-column prop="phone" label="手机号" />
            </el-table>
          </el-main>
          <el-footer>
            <el-pagination
              small
              background
              :currentPage="form.page"
              layout="total,  prev, pager, next"
              :page-size="5"
              :total="total"
              @current-change="useUserStore.handleCurrentChange"
              @size-change="useUserStore.handleSizeChange"
            />
          </el-footer>
        </el-container>
      </div>
    </template>
  </el-popover>
</template>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import { userStore } from '@/store/modules/sys/user/userStore';
import { storeToRefs } from 'pinia';
const useUserStore = userStore();
const { form, total, ruleFormRef, tableData } = storeToRefs(useUserStore);

const visible = ref(false);
const emits = defineEmits(['on-click', 'on-clear']);
const props = defineProps({
  sysUserId: {
    type: String,
    default: '',
  },
  realName: {
    type: String,
    default: '',
  },
});

const handleClick = (row: any) => {
  visible.value = false;
  emits('on-click', row);
};

const handleClear = (row: any) => {
  emits('on-clear', row);
};

onMounted(() => {
  form.value.size = 5;
  useUserStore.queryData();
});
defineExpose({
  props,
});
</script>
