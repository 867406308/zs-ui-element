<template>
  <div class="nav-bar">
    <div class="left-menu">
      <div @click="clickCollapse" class="nav-collapse">
        <el-icon v-if="!collapse"><Fold /></el-icon>
        <el-icon v-if="collapse"><Expand /></el-icon>
      </div>
      <div class="nav-breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in route.matched">{{ item.meta.title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <div class="right-menu">
      <div>
        <span class="zs-dropdown-link">
          <el-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />

          <span>{{ username }}</span>

          <el-dropdown>
            <el-icon class="el-icon--right">
              <CaretBottom />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-icon @click="change(item)">
            <component :is="arr" />
          </el-icon>
          <!-- 抽屉 -->
          <el-drawer v-model="drawer" title="I am the title" :with-header="false">
            <div v-for="(iten, index) in list" :key="index">
              <div
                :style="{ backgroundColor: iten.color }"
                style="width: 30px; height: 30px; border-radius: 4px; margin: 10px 10px"
                @click="changeColor(iten)"
              ></div>
            </div>
          </el-drawer>
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useSettingStore } from '@/store/modules/setting';
import { useUserStore } from '@/store/modules/sys/user';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const { username } = userStore;

const settingStore = useSettingStore();
const { clickCollapse } = settingStore;
const { collapse } = storeToRefs(settingStore);
const router = useRouter();
const route = useRoute();
const arr = ref('Grid');

const drawer = ref(false);

let list = reactive([]);

const message = () => {
  let list1 = [
    { name: 'blue', color: '#409EFF' },
    { name: 'green', color: '#67C23A' },
    { name: 'orange', color: '#E6A23C' },
    { name: 'red', color: '#F56C6C' },
    { name: 'gray', color: '#909399' },
  ];
  list.push(...list1);
  console.log(arr);
};

const change = (data) => {
  drawer.value = true;
};
const changeColor = (data) => {
  console.log(data);
  window.localStorage.setItem('data', data.name);
  window.document.documentElement.setAttribute('data-theme', window.localStorage.getItem('data'));
};
onMounted(() => {
  window.document.documentElement.setAttribute('data-theme', window.localStorage.getItem('data'));
  message();
  // console.log('1212', route.matched)
  // console.log(username)
});
</script>
<style lang="scss" scoped>
.nav-bar {
  height: $nav-height;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e6eb;

  .left-menu {
    display: flex;
    align-items: center;
    .zs-icon {
      margin-left: 10px;
      cursor: pointer;
    }
  }

  .nav-breadcrumb {
    margin-left: 10px;
  }

  .right-menu {
    margin-right: 20px;
    .zs-dropdown-link {
      display: flex;
      justify-content: start;
      align-items: center;

      span {
        margin-left: 10px;
      }
    }
  }
}
</style>
