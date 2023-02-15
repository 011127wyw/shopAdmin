<template>
  <el-container>
    <el-header>
      <!-- 头部 -->
      <f-header />
    </el-header>
    <el-container>
      <el-aside :width="$store.state.asideWidth">
        <!-- 侧边导航栏 -->
        <f-menu />
      </el-aside>
      <el-main>
        <!-- 标签导航 -->
        <f-tag-list />
        <!-- 主内容页 -->
        <!-- keep-alive 实现页面缓存 -->
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <!-- 最多可缓存组件  :max="x"-->
            <keep-alive :max="10">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
  

<script setup>
import FHeader from "./components/FHeader.vue";
import FMenu from "./components/FMenu.vue";
import FTagList from "./components/FTagList.vue";
</script>

<style>
.el-aside {
  transition: all 0.5s;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-active {
  transition-delay: 0.3s;
}
</style>