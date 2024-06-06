<template>
  <el-container>
    <el-aside>
      <el-tabs tab-position="left" style="height: 200px" class="demo-tabs">
        <el-tab-pane label="User">User</el-tab-pane>
        <el-tab-pane label="Config">Config</el-tab-pane>
        <el-tab-pane label="Role">Role</el-tab-pane>
        <el-tab-pane label="Task">Task</el-tab-pane>
      </el-tabs>
    </el-aside>
    <el-main>
      <!--内容-->
      <zs-app-main />
    </el-main>
  </el-container>
</template>
