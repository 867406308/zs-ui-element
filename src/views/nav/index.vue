<template>
  <el-container>
    <el-container>
      <el-header>
        <!--顶部-->
        <zs-nav-bar />
      </el-header>
      <el-main>
        <el-space wrap>
          <div v-for="i in 20" :key="i">
            <el-button text @click="handleClick"> Text button </el-button>
          </div>
        </el-space>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
const router = useRouter();
const handleClick = () => {
  router.push('/index');
};
</script>
<style lang="scss" scoped>
.zs-header {
  --zs-header-padding: 0px;
}
</style>
