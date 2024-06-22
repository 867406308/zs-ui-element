<template>
  <div class="breadcrumb-box">
    <div @click="useSettingStore.clickCollapse" class="nav-collapse">
      <ZsIcon v-if="!collapse" icon="fold" />
      <ZsIcon v-if="collapse" icon="expand" />
    </div>
    <div class="nav-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in routeList">
          <div class="breadcrumb-item">
            <ZsIcon :icon="item.meta.icon" size="14px" />
            <span>{{ item.meta.title }}</span>
          </div>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { settingStore } from '@/store/modules/config/setting';
import { storeToRefs } from 'pinia';

const useSettingStore = settingStore();
const { collapse } = storeToRefs(useSettingStore);

const route = useRoute();
const routeList = ref([]);
watch(
  () => route.matched,
  () => {
    routeList.value = route.matched.filter(
      (item: any) => item.name != null && item.name != undefined,
    );
  },
);
onMounted(() => {
  routeList.value = route.matched.filter(
    (item: any) => item.name != null && item.name != undefined,
  );
});
</script>
<style lang="scss" scoped>
.breadcrumb-box {
  width: 100%;
  display: flex;
  align-items: center;
  .nav-collapse {
    padding-left: 20px;
    .zs-icon {
      margin-left: 10px;
      cursor: pointer;
    }
  }
  .nav-breadcrumb {
    margin-left: 10px;

    .breadcrumb-item {
      display: flex;
      align-items: center;

      .svg-icon {
        margin-right: 5px;
      }
    }
  }
}
</style>
