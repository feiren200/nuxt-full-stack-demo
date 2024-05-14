<template>
  <div class="common-layout">
    <el-container class="container">
      <el-header>Header</el-header>
      <el-container style="overflow: hidden">
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-main class="main">
            <el-scrollbar>
              <slot></slot>
            </el-scrollbar>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.common-layout {
  height: 100vh;
  .container {
    height: 100%;
    .main {
    }
  }
}
</style>
